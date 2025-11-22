const express = require("express");
const router = express.Router();
const { addMedicine, getAllMedicines } = require("../controllers/medicineController");

router.post("/add", addMedicine);
router.get("/all", getAllMedicines);

module.exports = router;
