import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: "user" },
  title: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("post", userSchema);
