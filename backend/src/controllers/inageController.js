import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { User } from "../models/userSchema.js";

process.loadEnvFile();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

export const uploadProfilePicture = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    await User.findByIdAndUpdate(id, {
      $set: {
        profilePic: uploadResult.secure_url,
      },
    });
    // Remove file from local storage after upload
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File successfully deleted from local storage");
      }
    });

    console.log(uploadResult.secure_url);
    res.status(200).json(uploadResult);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};
export const uploadCoverPicture = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    await User.findByIdAndUpdate(id, {
      $set: {
        coverPic: uploadResult.secure_url,
      },
    });
    // Remove file from local storage after upload
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File successfully deleted from local storage");
      }
    });

    console.log(uploadResult.secure_url);
    res.status(200).json(uploadResult);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};
