const Appointment = require("../models/Appointment");

// BOOK APPOINTMENT
exports.bookAppointment = async (req, res) => {
  try {
    const { patientName, doctorName, appointmentDate, appointmentTime, reason } = req.body;

    const newAppointment = new Appointment({
      patientName,
      doctorName,
      appointmentDate,
      appointmentTime,
      reason
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to book appointment"
    });
  }
};


// GET ALL APPOINTMENTS
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments"
    });
  }
};
