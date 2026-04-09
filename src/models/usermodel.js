import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required."],
      select: false,
    },
    userType: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      required: true,
      default: "customer",
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "banned", "pending"],
      default: "active",
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    emailVerifiedAt: {
      type: Date,
    },
    lastLoginAt: {
      type: Date,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 }, { unique: true });

const User = models.User || model("User", userSchema);

export default User;
