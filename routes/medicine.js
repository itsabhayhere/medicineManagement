const express = require("express");
const router = express.Router();

const Medicine = require("../models/Medicine");
const { addMedicine, getAllMedicines } = require("../controllers/medicineController");

// ================================
// UI ROUTES (EJS PAGES)
// ================================

// Medicines List Page
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });

    res.render("medicines", { medicines });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading medicines page");
  }
});

// Add Medicine Form Page
router.get("/add", (req, res) => {
  res.render("add-medicine");
});

// Add Medicine Form Handler (POST)
router.post("/add", addMedicine);


// ================================
// API ROUTES (JSON RESPONSES)
// ================================

// Get All Medicines (API)
router.get("/api/all", getAllMedicines);

// Add Medicine (API)
router.post("/api/add", addMedicine);

module.exports = router;
