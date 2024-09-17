import express from "express";
import { connectDB } from "./src/config/db.js";
import bodyParser from "body-parser";
import userRoute from "./src/routes/userRoute.js";
import tweetRoute from "./src/routes/tweetRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const app = express();

// Configure CORS options
const corsOptions = {
  origin: "https://x-clone-7ppu.onrender.com",
  credentials: true, // Allow credentials like cookies
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Load environment variables
// if (process.env.NODE_ENV !== 'production') {
//   process.loadEnvFile();
// }

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined

// Middleware
app.use(
  express.urlencoded({
    extended: true, // fixed typo from 'extends' to 'extended'
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/image", imageRoute);

app.use("/api/v1/tweet", tweetRoute);
// app.get("/home", (req, res) => {
//   // Example of setting a cookie
//   res.cookie('token', 'your-cookie-value', {
//     httpOnly: true, // Ensure the cookie is not accessible via JavaScript
//     secure: false, // Set to true if using HTTPS
//     sameSite: 'Lax', // Adjust based on your needs (e.g., 'Lax', 'Strict', 'None')
//     maxAge: 3600000 // Set cookie expiration time (in milliseconds)
//   });
//   res.status(200).json({
//     message: "coming from backend...",
//   });
// });

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
