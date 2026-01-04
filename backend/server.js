// server.js - Render / Linux ready

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const schemeRoutes = require("./routes/schemeRoutes");
require("dotenv").config(); // still useful for local development

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Serve frontend (adjust path relative to backend folder)
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/schemes", schemeRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI environment variable not set!");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

