import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  phone: { type: String },
  email: { type: String, require: true },
  password: { type: String, require: true },
  created_at: {type: Date, default: Date.now()},
  role: {
    type: String,
    enum: ["Manager", "Cashier", "Stock Manager"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
});

export default mongoose.model("User", userSchema);