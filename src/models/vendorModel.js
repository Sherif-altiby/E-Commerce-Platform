import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const vendorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    businessType: {
      type: String,
      enum: ["individual", "llc", "corporation", "partnership", "other"],
      required: true,
    },
    taxId: {
      type: String,
      required: true,
      trim: true,
    },
    commissionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended", "banned"],
      default: "pending",
      index: true,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    storeLogo: {
      type: String,
      trim: true,
    },
    storeDescription: {
      type: String,
      trim: true,
    },
    businessAddress: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    bankAccount: {
      accountHolderName: {
        type: String,
        trim: true,
      },
      bankName: {
        type: String,
        trim: true,
      },
      accountNumberLast4: {
        type: String,
        trim: true,
      },
      iban: {
        type: String,
        trim: true,
      },
    },
    policies: {
      returnPolicy: {
        type: String,
        trim: true,
      },
      shippingPolicy: {
        type: String,
        trim: true,
      },
    },
    payoutSchedule: {
      type: String,
      enum: ["weekly", "bi-weekly", "monthly"],
      default: "weekly",
    },
  },
  {
    timestamps: true,
  },
);

vendorSchema.index({ businessName: 1 });
vendorSchema.index({ storeName: 1 });

const Vendor = models.Vendor || model("Vendor", vendorSchema);

export default Vendor;
