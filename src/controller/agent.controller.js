import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");

// Load JSON data
const dataPath = path.resolve("./src/utils/agentData.json");
const agentData = require(dataPath);

/**
 * GET /api/agent
 * Returns the list of agents from JSON
 */
export const getAgentData = (req, res) => {
  try {
    // You can manipulate/filter data here if needed
    res.status(200).json({
      success: true,
      data: agentData,
    });
  } catch (err) {
    console.error("Failed to fetch agent data:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const agentHeartbeat = (req, res) => {
  try {

    // You can implement heartbeat logic here
    res.status(200).json({
      success: true,
      message: "Agent heartbeat received",
    });
  } catch (err) {
    console.error("Failed to process agent heartbeat:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};