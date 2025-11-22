const Medicine = require("../models/Medicine");

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

    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      data: newMedicine
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

exports.getAllMedicines = async (req, res) => {
    try {
      const medicines = await Medicine.find().sort({ createdAt: -1 }); // latest first
  
      res.status(200).json({
        success: true,
        count: medicines.length,
        data: medicines
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch medicines"
      });
    }
  };
  