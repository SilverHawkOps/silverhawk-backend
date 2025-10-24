import mongoose from "mongoose";

const PerCoreSchema = new mongoose.Schema({
  load: { type: Number, required: true },
  loadUser: { type: Number, required: true },
  loadSystem: { type: Number, required: true },
  loadIdle: { type: Number, required: true },
});

const CpuSchema = new mongoose.Schema({
  cores: { type: Number, required: true },
  speed: { type: Number, required: true },
  load: { type: Number, required: true },
  perCore: { type: [PerCoreSchema], default: [] },
});

const MemorySchema = new mongoose.Schema({
  totalGB: { type: Number, required: true },
  usedGB: { type: Number, required: true },
});

const DiskSchema = new mongoose.Schema({
  mount: { type: String, required: true },
  sizeGB: { type: Number, required: true },
  usedGB: { type: Number, required: true },
});

const NetworkSchema = new mongoose.Schema({
  iface: { type: String, required: true },
  rx_bytes: { type: Number, required: true },
  tx_bytes: { type: Number, required: true },
});

const MetricSchema = new mongoose.Schema({
  infraId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Infra",
    required: true,
  },
  timestamp: { type: Date, required: true, default: Date.now },
  hostname: { type: String, required: true },
  cpu: { type: CpuSchema, required: true },
  memory: { type: MemorySchema, required: true },
  disk: { type: [DiskSchema], default: [] },
  network: { type: [NetworkSchema], default: [] },
});

export const InfraMetric = mongoose.model("InfraMetric", MetricSchema);
