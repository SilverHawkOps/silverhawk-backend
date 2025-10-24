import { FeatureFlag } from "../models/feature_flags.model.js";

// Get all feature flags
export const getApplicationFeatureFlags = async (req, res) => {
  try {
    const flagsArray = await FeatureFlag.find(); // returns array of documents

    // Convert to key:value object
    const flags = {};
    flagsArray.forEach((flag) => {
      flags[flag.key] = flag.is_enabled; // assuming model has `key` and `enabled` fields
    });

    res.status(200).json(flags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
