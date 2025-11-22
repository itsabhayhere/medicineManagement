const express = require("express");
const router = express.Router();
const { bookAppointment, getAllAppointments } = require("../controllers/appointmentController");

// BOOK APPOINTMENT
router.post("/book", bookAppointment);

// GET ALL APPOINTMENTS
router.get("/all", getAllAppointments);

module.exports = router;
