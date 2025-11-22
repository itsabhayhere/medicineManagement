// index.js

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// ========== CONNECT MONGODB ==========
connectDB();

// ========== MIDDLEWARE ==========
app.use(express.json());              
app.use(express.urlencoded({ extended: true }));

// ========== ROUTES ==========
const medicineRoutes = require("./routes/medicine");
const appointmentRoutes = require("./routes/appointment");

app.get("/", (req, res) => {
  res.json({ message: "API working 🚀" });
});

app.use("/api/medicine", medicineRoutes);
app.use("/api/appointment", appointmentRoutes);

// ========== GLOBAL ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ========== SERVER START ==========
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
