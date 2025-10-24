import express from "express";
import userRoutes from "./user.route.js";
import notificationRoutes from "./notification.route.js";
import featureFlagsRoutes from "./featureFlagsRoutes.route.js";

const adminRoutes = express.Router();

adminRoutes.get("/health-check", (req, res) => {
    res.send("OK")
})

adminRoutes.use('/users', userRoutes);

adminRoutes.use("/notifications", notificationRoutes);

adminRoutes.use("/feature-flags", featureFlagsRoutes);

export default adminRoutes;