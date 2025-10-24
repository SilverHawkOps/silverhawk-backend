import mongoose from "mongoose";

const featureFlagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: {
    type: String,
    unique: true,
    required: true,
  },
  description: { type: String },
  type: {
    type: String,
    enum: ["application", "ui", "feature"],
    default: "application",
    required: false,
  },
  is_enabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

featureFlagSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const FeatureFlag = mongoose.model("FeatureFlag", featureFlagSchema);
