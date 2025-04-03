import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import medicalRoutes from "./routes/medicalRoutes.js";

// App config
const app = express();
// Use environment variable PORT or default to 4000 (Render.com will override with its assigned port)
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/medical-records", medicalRoutes);

app.use(express.urlencoded({ extended: true })); // Handle URL-encoded form data (optional)

// Home endpoint
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server and log the port for confirmation
app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on http://0.0.0.0:${port}`);
  console.log(`Listening on port: ${port}`); // Explicitly log the port in use
});
