import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const orderItemSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    fulfillmentStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "returned", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const OrderItem = models.OrderItem || model("OrderItem", orderItemSchema);

export default OrderItem;
