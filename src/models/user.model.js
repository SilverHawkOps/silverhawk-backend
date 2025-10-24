import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
    },

    role: {
      type: String,
      enum: ["admin", "sub-admin", "user"],
      default: "user",
    },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
