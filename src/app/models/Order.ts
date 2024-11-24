import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema(
  {
    email: { type: String, required: true },
    product: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderModel = model("order", orderSchema);
