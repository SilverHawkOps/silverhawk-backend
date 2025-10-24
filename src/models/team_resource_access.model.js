const mongoose = require("mongoose");

const teamResourceAccessSchema = new mongoose.Schema(
  {
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    resourceType: { type: String, enum: ["Infrastructure", "Alerts", "FeatureFlags"], required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId, default: null }, // optional, null for all resources
    accessLevel: { type: String, enum: ["read", "write", "admin"], default: "read" },
  },
  { timestamps: true }
);

export const TeamResourceAccessModel = mongoose.model("TeamResourceAccess", teamResourceAccessSchema);