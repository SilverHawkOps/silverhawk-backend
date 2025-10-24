import express from "express";
import { getAgentData, agentHeartbeat } from "../controller/agent.controller.js";

const agentRoutes = express.Router();

// Route to fetch agent data

agentRoutes.get("/", getAgentData);

agentRoutes.post("/heartbeat", agentHeartbeat)

export default agentRoutes;
