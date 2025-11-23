const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const { bookAppointment, getAllAppointments } = require("../controllers/appointmentController");

// ==========================================
// UI ROUTES (EJS)
// ==========================================

// Appointments List Page
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });
    res.render("appointments", { appointments });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading appointments");
  }
});

// Add Appointment Form Page
router.get("/add", (req, res) => {
  res.render("add-appointment");
});

// Add Appointment (POST - UI Form)
router.post("/add", bookAppointment);


// ==========================================
// API ROUTES (JSON)
// ==========================================

// API - Book Appointment
router.post("/api/book", bookAppointment);

// API - Get All Appointments
router.get("/api/all", getAllAppointments);


module.exports = router;
