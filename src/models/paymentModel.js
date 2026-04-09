import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const paymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
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
    transactionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "authorized", "paid", "failed", "refunded", "cancelled"],
      default: "pending",
      index: true,
    },
    provider: {
      type: String,
      trim: true,
    },
    paidAt: {
      type: Date,
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

const Payment = models.Payment || model("Payment", paymentSchema);

export default Payment;
