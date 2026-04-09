import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotalAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    shippingAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
      index: true,
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    billingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
    paymentMethod: {
      type: String,
      enum: [
        "card",
        "paypal",
        "apple_pay",
        "google_pay",
        "bank_transfer",
        "cash_on_delivery",
      ],
      required: true,
    },
    shippingMethod: {
      type: String,
      enum: ["standard", "express", "pickup"],
      default: "standard",
    },
    trackingNumber: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    placedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.index({ customer: 1, createdAt: -1 });

const Order = models.Order || model("Order", orderSchema);

export default Order;
