// controllers/featureFlagController.js
import { FeatureFlag } from "../../models/feature_flags.model.js";
// import Redis from "ioredis";

// const redisClient = new Redis();

// Create a new feature flag
export const createFeatureFlag = async (req, res) => {
  try {
    const { name, description, is_enabled, targeting, key, type } = req.body;

    // Check if flag already exists
    const existing = await FeatureFlag.findOne({ key });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Feature flag already exists with this key" });
    }

    const flag = await FeatureFlag.create({
      name,
      description,
      is_enabled,
      targeting,
      key,
      type,
    });

    // Cache in Redis
    // await redisClient.setex(`flag:${name}`, 300, JSON.stringify(flag));

    res.status(201).json(flag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createFirstTimeFeatureFlags = async (req, res) => {
  try {
    const data = [
      {
        name: "Overview - Nav Item",
        key: "nav_item_overview",
        description: "Enable overview nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Synthetic Monitoring - Nav Item",
        key: "synthetic_monitoring",
        description: "Enable synthetic monitoring nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Availability - Nav Item",
        key: "nav_item_synthetic_availability",
        description: "Enable availability nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "SSL Certificate Monitoring - Nav Item",
        key: "nav_item_synthetic_ssl",
        description: "Enable ssl certificate monitoring nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Page Link Crawler - Nav Item",
        key: "nav_item_synthetic_crawler",
        description: "Enable page link crawler nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Page Load Performance - Nav Item",
        key: "nav_item_synthetic_pageload",
        description: "Enable page load performance nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Endpoint Availability - Nav Item",
        key: "nav_item_synthetic_endpoint",
        description: "Enable endpoint availability nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Infrastructures - Nav Item",
        key: "nav_item_infrastructures",
        description: "Enable infrastructures nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Alerts & Incidents - Nav Item",
        key: "nav_item_alerts_incidents",
        description: "Enable alerts & incidents nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Team & Access - Nav Item",
        key: "nav_item_team_access",
        description: "Enable team & access nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Feature Flags - Nav Item",
        key: "nav_item_feature_flags",
        description: "Enable feature flags nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Server Monitoring - Nav Item",
        key: "nav_item_server_monitoring",
        description: "Enable server monitoring nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Performance Metrics - Nav Item",
        key: "nav_item_performance_metrics",
        description: "Enable performance metrics nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "System Health - Nav Item",
        key: "nav_item_system_health",
        description: "Enable system health nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Traces - Nav Item",
        key: "nav_item_traces",
        description: "Enable traces nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Logs - Nav Item",
        key: "nav_item_logs",
        description: "Enable logs nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Dashboards - Nav Item",
        key: "nav_item_dashboards",
        description: "Enable dashboards nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Integrations - Nav Item",
        key: "nav_item_integrations",
        description: "Enable integrations nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Services - Nav Item",
        key: "nav_item_services",
        description: "Enable services nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Configuration - Nav Item",
        key: "nav_item_configuration",
        description: "Enable configuration nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
      {
        name: "Documentation - Nav Item",
        key: "nav_item_documentation",
        description: "Enable documentation nav item",
        is_enabled: true,
        targeting: {
          environments: [Array],
          userIds: [],
          roles: [Array],
          percentage: 50,
        },
      },
    ];

    const flags = await FeatureFlag.insertMany(data);

    res.status(201).json(flags);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all feature flags
export const getAllFeatureFlags = async (req, res) => {
  try {
    const flags = await FeatureFlag.find();
    res.status(200).json(flags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single feature flag by name or id
export const getFeatureFlagByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Try Redis first
    const cached = await redisClient.get(`flag:${name}`);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const flag = await FeatureFlag.findOne({ name });
    if (!flag)
      return res.status(404).json({ message: "Feature flag not found" });

    // Cache in Redis
    // await redisClient.setex(`flag:${name}`, 300, JSON.stringify(flag));

    res.status(200).json(flag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a feature flag
export const updateFeatureFlag = async (req, res) => {
  try {
    const { name } = req.params;
    const { description, is_enabled, targeting } = req.body;

    const flag = await FeatureFlag.findOneAndUpdate(
      { name },
      { description, is_enabled, targeting, updatedAt: new Date() },
      { new: true }
    );

    if (!flag)
      return res.status(404).json({ message: "Feature flag not found" });

    // Update Redis cache
    // await redisClient.setex(`flag:${name}`, 300, JSON.stringify(flag));

    res.status(200).json(flag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateFeatureFlagStatus = async (req, res) => {
  try {
    const { name } = req.params;
    const { is_enabled } = req.body;

    const flag = await FeatureFlag.findOneAndUpdate(
      { name },
      { is_enabled, updatedAt: new Date() },
      { new: true }
    );

    if (!flag)
      return res.status(404).json({ message: "Feature flag not found" });

    // Update Redis cache
    // await redisClient.setex(`flag:${name}`, 300, JSON.stringify(flag));

    res.status(200).json(flag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a feature flag
export const deleteFeatureFlag = async (req, res) => {
  try {
    const { name } = req.params;

    const flag = await FeatureFlag.findOneAndDelete({ name });
    if (!flag)
      return res.status(404).json({ message: "Feature flag not found" });

    // Remove from Redis cache
    // await redisClient.del(`flag:${name}`);

    res.status(200).json({ message: "Feature flag deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
