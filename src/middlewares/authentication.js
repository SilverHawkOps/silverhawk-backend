import User from "../models/user.model.js";
import { verifyToken } from "../utils/jwt.js";
import { decryptShKey } from "../utils/shkeys.js";

async function authentication(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    // ----- 1. Check Bearer JWT token -----
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      req.user = user;
      return next();
    }

    // ----- 2. Check API key -----
    if (authHeader.startsWith("ApiKey ")) {
      let [scheme, apiKey] = authHeader.split(" ");

      const decryptedApiKey = decryptShKey(apiKey);

      let userId = decryptedApiKey.split("-")[0];
      const user = await User.findById(userId).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      req.user = user;
      req.apiKey = decryptedApiKey;
      return next();
    }

    // ----- 3. No auth provided -----
    return res
      .status(401)
      .json({ success: false, message: "Authorization required" });
  } catch (err) {
    console.error("Auth error", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
}

export default authentication;
