import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import characterRoutes from "./routes/characterRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Routes
app.use("/api/characters", characterRoutes);
app.use("/api/auth", authRoutes); // 👈 New auth route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
