import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide email",
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
  },
});

const userModel = new mongoose.model("userModel", userSchema);
export default userModel;
