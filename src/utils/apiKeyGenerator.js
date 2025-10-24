import crypto from "crypto";

/**
 * Generate a unique API key for an agent/infra.
 * 
 * Key format: <last 6 chars of userId>-<24 hex chars>
 * 
 * Explanation:
 * 1. crypto.randomBytes(12) generates 12 random bytes = 96 bits.
 * 2. Converting to hex gives 24 hex characters (2 chars per byte).
 * 3. Each hex character has 16 possible values (0-9, a-f).
 * 4. Total combinations for 24 hex characters = 16^24 = 2^96 ≈ 7.9 × 10^28.
 * 5. The userId prefix is just a tag and does not reduce entropy.
 * 
 * Therefore, for each user, you can generate ~7.9 × 10^28 unique keys.
 * Collisions are extremely unlikely, even at scale of millions of agents.
 * 
 * @param {String} userId - MongoDB ObjectId of the user
 * @returns {Promise<String>} - Unique API key
 */
export const generateUniqueApiKey = async (userId) => {
  if (!userId) {
    return null;
  }
  const randomStr = crypto.randomBytes(12).toString("hex"); // 24 chars
  let apiKey = `${userId.toString()}-${randomStr}`;

  return apiKey;
};
