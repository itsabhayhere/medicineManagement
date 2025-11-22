const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String, // or Date if storing actual timestamp
    required: true
  },
  reason: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
