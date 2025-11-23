const Appointment = require("../models/Appointment");

// BOOK APPOINTMENT (POST)
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

    // If request is from browser (EJS form)
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect("/appointments");
    }

    // API Response (JSON)
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment
    });

  } catch (error) {
    console.error(error);

    // UI Error Response
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.status(500).send("Failed to book appointment");
    }

    // API Error Response
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

    // If UI route → render EJS
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.render("appointments", { appointments });
    }

    // API → return JSON
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });

  } catch (error) {
    console.error(error);

    // UI Error Response
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.status(500).send("Failed to fetch appointments");
    }

    // API Error Response
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments"
    });
  }
};
