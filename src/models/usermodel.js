import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    phone: {
      type: String,  
      required: [true, "Please provide a phone number"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      default: "customer",
    },
    avatar: {
        type: String,
        required: [true,'Please provide an avatar']
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
