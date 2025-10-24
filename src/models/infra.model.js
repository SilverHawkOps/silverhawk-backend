import mongoose from "mongoose";

const infraSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: { type: [String], default: [] },
    environment: {
      type: String,
      enum: ["production", "staging", "development", "testing"],
      default: "testing",
    },

    // System Info
    os: { type: String, required: false, default: null },
    hostname: { type: String, index: true }, // indexed for faster lookup
    ipAddress: { type: String, index: true },
    cpuCores: { type: Number, default: 0 },
    memoryGB: { type: Number, default: 0 },
    diskGB: { type: Number, default: 0 },

    // Agent Info
    agentVersion: { type: String },
    status: {
      type: String,
      enum: ["online", "offline", "maintenance", "new", "acknowledged"],
      default: "new",
    },
    lastHeartbeat: { type: Date, default: null },
    apiKey: { type: String, required: true, unique: true, select: false }, // Unique key for agent authentication

    // Metrics / Monitoring
    metrics: {
      cpuLoad: { type: Number, default: 0 }, // Latest CPU load %
      memoryUsage: { type: Number, default: 0 }, // Latest memory usage GB
      diskUsage: { type: Number, default: 0 }, // Latest disk usage GB
      networkIn: { type: Number, default: 0 }, // Network in MB/s
      networkOut: { type: Number, default: 0 }, // Network out MB/s
    },

    // Optional Flags
    isActive: { type: Boolean, default: true }, // soft delete / active flag
  },
  { timestamps: true }
);

// Indexes for fast search / filtering
infraSchema.index({ userId: 1, environment: 1 });
infraSchema.index({ tags: 1 });
infraSchema.index({ status: 1, lastHeartbeat: -1 });

export const Infra = mongoose.model("Infra", infraSchema);
