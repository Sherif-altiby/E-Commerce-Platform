import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const customerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    defaultAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    notificationPreferences: {
      orderUpdates: {
        type: Boolean,
        default: true,
      },
      priceAlerts: {
        type: Boolean,
        default: true,
      },
      promotionalEmails: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
