const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const characterRoutes = require("./routes/characterRoutes");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

app.use("/api/characters", characterRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
