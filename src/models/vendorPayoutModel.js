import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const vendorPayoutSchema = new Schema(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    periodStart: {
      type: Date,
      required: true,
    },
    periodEnd: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "paid", "failed", "cancelled"],
      default: "pending",
      index: true,
    },
    processedAt: {
      type: Date,
      default: null,
    },
    statementUrl: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const VendorPayout =
  models.VendorPayout || model("VendorPayout", vendorPayoutSchema);

export default VendorPayout;
