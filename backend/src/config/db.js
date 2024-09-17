import mongoose from "mongoose";
import "dotenv/config";
// process.loadEnvFile();
export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
