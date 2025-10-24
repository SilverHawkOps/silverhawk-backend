// config/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.TIMESCALE_HOST || "localhost",
  port: process.env.TIMESCALE_PORT
    ? parseInt(process.env.TIMESCALE_PORT)
    : 5432,
  user: process.env.TIMESCALE_USER || "postgres",
  password: process.env.TIMESCALE_PASSWORD || "postgres",
  database: process.env.TIMESCALE_DB || "analytics",
  max: 20, // max number of connections
  idleTimeoutMillis: 30000, // 30s idle timeout
  connectionTimeoutMillis: 2000, // 2s connection timeout
});

n// export const createAnalyticsTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS analytics_metrics (
//       id SERIAL PRIMARY KEY,
//       event_name TEXT NOT NULL,
//       user_id TEXT NOT NULL,
//       value NUMERIC,
//       created_at TIMESTAMPTZ DEFAULT NOW()
//     );
//   `;

//   try {
//     await pool.query(query);
//     console.log("✅ Table 'analytics_metrics' is ready");
//   } catch (err) {
//     console.error("❌ Error creating table:", err);
//   }
// };

// export const insertAnalyticsEvent = async ({ event_name, user_id, value }) => {
//   const query = `
//     INSERT INTO analytics_metrics (event_name, user_id, value)
//     VALUES ($1, $2, $3)
//     RETURNING *;
//   `;

//   try {
//     const { rows } = await pool.query(query, [event_name, user_id, value]);
//     console.log("Inserted row:", rows[0]);
//     return rows[0];
//   } catch (err) {
//     console.error("Insert error:", err);
//     throw err;
//   }
// };

// Optional: test connection on startup
pool
  .connect()
  .then(async (client) => {
    console.log("✅ TimescaleDB connected successfully");
    await createAnalyticsTable();

    await insertAnalyticsEvent({
      event_name: "page_view",
      user_id: "user_123",
      value: 1,
    });
    await insertAnalyticsEvent({
      event_name: "click",
      user_id: "user_456",
      value: 2,
    });

    client.release();
  })
  .catch((err) => {
    console.error("❌ TimescaleDB connection error:", err.stack);
    process.exit(1);
  });
