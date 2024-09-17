import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "Hey there! Sharing thoughts, ideas, and a bit of myself on X.",
    },
    profilePic: {
      type: String,
      default: "", // Default to an empty string or a placeholder URL
    },
    coverPic: {
      type: String,
      default: "", // Default to an empty string or a placeholder URL
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    bookmarks: {
      type: Array,
      default: [],
    },
    tweets: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
