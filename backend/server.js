// Import required modules
import express from "express";
import cors from "cors";
import "dotenv/config"; // Load environment variables from .env file

// Import custom configuration and route files (assumed to exist in your project)
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import medicalRoutes from "./routes/medicalRoutes.js";

// Initialize Express app
const app = express();

// Set port: Use Render's assigned PORT or default to 4000 for local development
const port = process.env.PORT || 4000;

// Connect to external services (MongoDB and Cloudinary)
connectDB(); // Assumes this connects to your MongoDB instance
connectCloudinary(); // Assumes this sets up Cloudinary

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({ 
  origin: "*", // Allow all origins (adjust for production if needed)
  methods: ["GET", "POST", "PUT", "DELETE"] // Allowed HTTP methods
}));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data (optional)

// Define API routes
app.use("/api/user", userRouter); // User-related endpoints
app.use("/api/admin", adminRouter); // Admin-related endpoints
app.use("/api/doctor", doctorRouter); // Doctor-related endpoints
app.use("/api/medical-records", medicalRoutes); // Medical records endpoints

// Root endpoint for testing
app.get("/", (req, res) => {
  res.send("API Working - Server is live!");
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
  console.log(`Environment port: ${process.env.PORT || "not set, using default"}`);
});
