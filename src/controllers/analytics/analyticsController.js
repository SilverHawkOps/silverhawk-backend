import { analyticsQueue } from "../../config/queue.js";

export const insertAnalyticsMetrics = async (req, res) => {
  const events = req.body;

  console.log(events)
  clg
  if (!Array.isArray(events))
    return res.status(400).json({ error: "Invalid payload" });

  try {
    for (const event of events) {
      await analyticsQueue.add("analytics_event", event);
    }
    console.log(`📥 Queued ${events.length} analytics events`);
    res.status(200).json({ success: true, queued: events.length });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
