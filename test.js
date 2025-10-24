import WebSocket from "ws";

const ws = new WebSocket(`ws://localhost:5000/ws`);

ws.on("open", () => {
  console.log("✅ Connected to WebSocket server");
  ws.send(JSON.stringify({ event: "ping", data: "hello server" }));
});

ws.on("message", (data) => {
  console.log("📩 Message from server:", data.toString());
});

ws.on("close", () => {
  console.log("❌ Disconnected");
});

ws.on("error", (err) => {
  console.error("⚠️ Error:", err.message);
});
