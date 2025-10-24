import app from "./src/config/app.js";
import dotenv from "dotenv";
import logger from "./src/config/logger.js";
import connectDB from "./src/config/db.js";
import { WebSocketServer } from "ws"; // npm install ws
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB(); // ensure DB is connected before starting the server

  // Create HTTP server from Express app
  // const server = http.createServer(app);

  // // Create WebSocket server
  // const wss = new WebSocketServer({ server, path: "/ws" });


  // // Handle WebSocket connections
  // wss.on("connection", (ws) => {
  //   logger.info("New WebSocket client connected");

  //   // Listen for messages from client
  //   ws.on("message", (message) => {
  //     logger.info(`Received message: ${message}`);
  //     // Echo message back to client
  //     ws.send(`Server received: ${message}`);
  //   });

  //   ws.on("close", () => {
  //     logger.info("WebSocket client disconnected");
  //   });

  //   // Optional: send a welcome message
  //   ws.send("Welcome to Silverhawk WebSocket server!");
  // });

  app.listen(PORT, () => {
    logger.info(
      `Silverhawk APM backend running on port ${PORT} in ${process.env.NODE_ENV} mode`
    );
  });
};

startServer();
