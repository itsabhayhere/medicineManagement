const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  reminderTime: {
    type: String,   // or Date if you want a timestamp
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Medicine", medicineSchema);
