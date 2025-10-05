import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { limiter } from "../middlewares/rateLimiter.js";
import { notFound } from "../middlewares/notFound.js";
import v1Routes from "../routes/index.route.js";
import globalErrorHandler from "../middlewares/globalErrorHandler.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("combined"));
app.use(limiter);

// Routes
app.use("/v1", v1Routes);

// 404 & Error Handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;
