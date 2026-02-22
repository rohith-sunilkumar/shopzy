import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows null/missing values while maintaining uniqueness for others
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    index: true,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  avatar: {
    type: String,
  }
});

export default mongoose.model("User", userSchema);
