const mongoose = require("mongoose");
const admin = new mongoose.Schema({
  role: { type: String, default: "Admin" },
  display_photo: { type: String },
  wrs_name: { type: String },
  gmail: { type: String, unique: true },
  contact_number: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  gender: { type: String },
  birthday: { type: Date },
  password: { type: String },
  verify: { type: Boolean, default: false },
  address: {
    region: { type: String, lowercase: true },
    province: { type: String, lowercase: true },
    city: { type: String, lowercase: true },
    barangay: { type: String, lowercase: true },
    street_building: { type: String, lowercase: true },
  },
  geolocation: {
    lat: { type: String },
    lng: { type: String },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      // required: true,
    },
    coordinates: {
      type: [Number],
      // required: true,
    },
  },
  date_created: {
    type: Date,
    default: () => Math.floor(new Date().valueOf() / 1000),
  },
});
admin.set("timestamps", true);
admin.index({ location: "2dsphere" });
module.exports = admin;
