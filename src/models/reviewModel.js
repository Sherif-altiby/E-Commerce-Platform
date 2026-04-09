import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const reviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    media: [
      {
        type: String,
        trim: true,
      },
    ],
    verifiedPurchase: {
      type: Boolean,
      default: true,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    vendorResponse: {
      message: {
        type: String,
        trim: true,
      },
      respondedAt: {
        type: Date,
      },
    },
    status: {
      type: String,
      enum: ["published", "hidden", "reported"],
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

const Review = models.Review || model("Review", reviewSchema);

export default Review;
