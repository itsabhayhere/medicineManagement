const Medicine = require("../models/Medicine");

// ADD MEDICINE
exports.addMedicine = async (req, res) => {
  try {
    const {
      medicineName,
      companyName,
      expiryDate,
      quantity,
      price,
      reminderTime
    } = req.body;

    const newMedicine = new Medicine({
      medicineName,
      companyName,
      expiryDate,
      quantity,
      price,
      reminderTime
    });

    await newMedicine.save();

    // If request is from browser form → Redirect to medicine list
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect("/medicines");
    }

    // Otherwise return JSON (API)
    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      data: newMedicine
    });

  } catch (err) {
    console.error(err);

    // UI Error Response
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.status(500).send("Failed to add medicine");
    }

    // API Error Response
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// GET ALL MEDICINES (API + UI)
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });

    // If browser → render EJS page
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.render("medicines", { medicines });
    }

    // If API → return JSON
    res.status(200).json({
      success: true,
      count: medicines.length,
      data: medicines
    });

  } catch (err) {
    console.error(err);

    // UI Error Response
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.status(500).send("Failed to fetch medicines");
    }

    // API Error Response
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines"
    });
  }
};
