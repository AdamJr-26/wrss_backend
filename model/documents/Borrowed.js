const mongoose = require("mongoose");
const borrowed_gallon = new mongoose.Schema({
  admin: { type: mongoose.Types.ObjectId, ref: "Admin" },
  personel: { type: mongoose.Types.ObjectId, ref: "Personel" },
  customer: { type: mongoose.Types.ObjectId, ref: "Customer" },
  gallon: { type: mongoose.Types.ObjectId, ref: "Gallon" },
  total: { type: Number },
  date: {
    unix_timestamp: {
      type: Number,
      default: () => Math.floor(new Date().valueOf() / 1000),
    },
    utc_date: { type: Date, default: () => new Date() },
  },
});

module.exports = borrowed_gallon;
