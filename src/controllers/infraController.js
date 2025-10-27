// controllers/infraController.js
import { Infra } from "../models/infra.model.js";
import { InfraMetric } from "../models/infra_metric.model.js";
import * as infraService from "../services/infraService.js";
import { generateUniqueApiKey } from "../utils/apiKeyGenerator.js";
import { encryptShKey } from "../utils/shkeys.js";

export const createInfra = async (req, res) => {
  try {
    let apiKey;
    let isUnique = false;

    // Keep generating until a unique API key is found
    while (!isUnique) {
      apiKey = await generateUniqueApiKey(req.user.id); // returns string
      const existing = await Infra.findOne({ apiKey });
      if (!existing) isUnique = true;
    }

    const infra = await Infra.create({
      ...req.body,
      apiKey,
      userId: req.user.id,
    });

    const encryptedApiKey = infra.apiKey ? encryptShKey(infra.apiKey) : null;

    res.status(201).json({
      ...infra.toObject(),
      apiKey: encryptedApiKey,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listInfra = async (req, res) => {
  try {
    const infraList = await Infra.find({ userId: req.user.id }).select(
      "+apiKey"
    );
    if (infraList.length === 0)
      return res.status(200).json({ message: "No infra found", infra: [] });

    const encryptedInfraList = infraList.map((infra) => {
      const encryptedApiKey = infra.apiKey ? encryptShKey(infra.apiKey) : null;
      return {
        ...infra.toObject(),
        apiKey: encryptedApiKey,
      };
    });

    res.json({
      message: "Infra fetched successfully",
      infra: encryptedInfraList,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getInfra = async (req, res) => {
  try {
    const infra = await infraService.getInfra(req.params.id);
    if (!infra) return res.status(404).json({ message: "Infra not found" });
    res.status(200).json(infra);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateInfra = async (req, res) => {
  try {
    const infra = await infraService.updateInfra(req.params.id, req.body);
    res.json(infra);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteInfra = async (req, res) => {
  try {
    await infraService.deleteInfra(req.params.id);
    res.json({ message: "Infra deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const heartbeat = async (req, res) => {
  try {
    const infra = await Infra.findOne({
      userId: req.user.id,
      apiKey: req.apiKey,
    });

    if (!infra) return res.status(404).json({ message: "Infra not found" });
    infra.lastHeartbeat = new Date();
    infra.hostname = req.body.hostname;
    infra.os = req.body.os;
    infra.ipAddress = req.body.ipAddress;
    infra.cpuCores = req.body.cpuCores;
    infra.memoryGB = req.body.memoryGB;
    infra.diskGB = req.body.diskGB;
    infra.agentVersion = req.body.agentVersion;
    infra.status = "acknowledged";
    await infra.save();

    res.json({ success: true, message: "Heartbeat received", infra });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const saveMetrics = async (req, res) => {
  try {
    const infra = await Infra.findOne({
      userId: req.user.id,
      apiKey: req.apiKey,
    });


    if (!infra) return res.status(404).json({ message: "Infra not found" });

    let metric = await InfraMetric.create({
      ...req.body,
      infraId: infra._id,
      timestamp: new Date(),
    });

    infra.status = "online";

    await infra.save();

    res.json({ success: true, message: "Metrics saved", metric });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getInfraMetrics = async (req, res) => {
  try {
    const infra = await Infra.findOne({
      userId: req.user.id,
      _id: req.params.id,
    }).lean();

    if (!infra) return res.status(404).json({ message: "Infra not found" });

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get the latest 60 metrics from the last 24 hours (descending), then reverse to chronological order
    const metrics = await InfraMetric.find({
      infraId: infra._id,
      timestamp: { $gte: since },
    })
      .sort({ timestamp: -1 }) // newest first
      .limit(60)
      .lean();

    // reverse so it's oldest -> newest for plotting
    metrics.reverse();

    res.json({ success: true, message: "Metrics fetched", metrics, infra });
  } catch (err) {
    console.error("getInfraMetrics error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const stopInfraAgent = async (req, res) => {
  try {
    const infra = await Infra.findOne({
      userId: req.user.id,
      apiKey: req.apiKey,
    });

    if (!infra) return res.status(404).json({ message: "Infra not found" });
    infra.lastHeartbeat = new Date();
    infra.status = "offline";
    await infra.save();

    res.json({ success: true, message: "Infra Agent Stopped" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
