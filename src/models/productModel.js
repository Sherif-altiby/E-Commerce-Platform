import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const bulkPricingTierSchema = new Schema(
  {
    minQuantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const productVariantSchema = new Schema(
  {
    sku: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    options: {
      size: {
        type: String,
        trim: true,
      },
      color: {
        type: String,
        trim: true,
      },
      material: {
        type: String,
        trim: true,
      },
    },
    price: {
      type: Number,
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
    },
    bulkPricingTiers: [bulkPricingTierSchema],
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      min: 0,
      default: 5,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["draft", "active", "out_of_stock", "archived"],
      default: "draft",
      index: true,
    },
    isMadeToOrder: {
      type: Boolean,
      default: false,
    },
    variants: [productVariantSchema],
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    customAttributes: {
      type: Map,
      of: String,
      default: {},
    },
    shipping: {
      weight: {
        type: Number,
        min: 0,
      },
      dimensions: {
        length: {
          type: Number,
          min: 0,
        },
        width: {
          type: Number,
          min: 0,
        },
        height: {
          type: Number,
          min: 0,
        },
      },
    },
    seo: {
      metaTitle: {
        type: String,
        trim: true,
      },
      metaDescription: {
        type: String,
        trim: true,
      },
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ title: "text", description: "text", brand: "text" });
productSchema.index({ vendor: 1, status: 1 });
productSchema.index({ category: 1, status: 1, price: 1 });

const Product = models.Product || model("Product", productSchema);

export default Product;
