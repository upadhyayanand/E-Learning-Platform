import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import { Cashfree } from "cashfree-pg"; // Adjust the import if 'Cashfree' is a class from a specific module
import cors from "cors";

dotenv.config();

// Ensure environment variables are correctly named and in uppercase
export const instance = new Cashfree({
  XClientId_id: process.env.CLIENT_ID, // Changed to uppercase for consistency
  XClientSecret_secret: process.env.CLIENT_SECRET,
  XEnvironment: Cashfree.Environment.SANDBOX,
});

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Setting a default port if not provided in environment variables
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is working");
});

// Serving static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Importing routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

// Using routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

// Connecting to the database before starting the server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with a failure code
  });

// Optional: Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
