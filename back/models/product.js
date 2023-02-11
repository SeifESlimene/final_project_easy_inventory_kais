import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String, require: true },
  number: { type: Number, require: true },
  state: {
    type: String,
    enum: ["In Stock", "Not In Stock"],
    default: "In Stock",
  },
  buyingPrice: { type: Number, require: true },
  price: { type: Number, require: true },
  count: { type: Number, default: 0 },
  description: { type: String },
  quantity: { type: Number, default: 0 },
  invoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice"
    }
  ]
});

export default mongoose.model("Product", ProductSchema);
