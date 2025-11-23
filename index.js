// index.js

require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// ========== CONNECT MONGODB ==========
connectDB();

// ========== MIDDLEWARE ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== SETUP EJS ==========
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ========== STATIC FILES ==========
app.use(express.static(path.join(__dirname, "public")));

// ========== MODELS ==========
const Medicine = require("./models/Medicine");
const Appointment = require("./models/Appointment");

// ========== DASHBOARD ROUTE ==========
app.get("/", async (req, res) => {
  const totalMedicines = await Medicine.countDocuments();
  const totalAppointments = await Appointment.countDocuments();
  const expiredMedicines = await Medicine.countDocuments({
    expiryDate: { $lt: new Date() }
  });

  const today = new Date().toISOString().split("T")[0];
  const todayReminders = await Medicine.countDocuments({ reminderTime: today });

  res.render("index", {
    totalMedicines,
    totalAppointments,
    expiredMedicines,
    todayReminders
  });
});

// ========== ROUTES ==========
const medicineRoutes = require("./routes/medicine");
const appointmentRoutes = require("./routes/appointment");

// UI + API Routes
app.use("/medicines", medicineRoutes);
app.use("/appointments", appointmentRoutes);

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
