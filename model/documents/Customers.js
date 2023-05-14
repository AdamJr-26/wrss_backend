const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

// if Admin field is occupied that mean the customer is already subscribed to a wrs.
const customer = new mongoose.Schema({
  admin: { type: mongoose.Types.ObjectId, ref: "Admin" },
  customer_type: { type: String, default: "regular" },
  role: { type: String, default: "Customer" },
  account_provided_by: { type: String },
  display_photo: {
    type: String,
    default:
      "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
  },

  firstname: { type: String, required: true, index: true },
  lastname: { type: String, index: true },
  gender: { type: String },
  mobile_number: { type: String, index: true },
  address: {
    province: { type: String, lowercase: true },
    municipal_city: { type: String, index: true, lowercase: true },
    barangay: { type: String, index: true, lowercase: true },
    street: { type: String, index: true, lowercase: true },
  },
  gmail: { type: String },
  password: { type: String },
  date_created: {
    type: Number,
    default: () => Math.floor(new Date().valueOf() / 1000),
  },
  cloudinary: {
    userFolder: { type: String },
    publicId: { type: String },
    url: { type: String },
    mimetype: { type: String },
  },
});

customer.plugin(mongoosePaginate);
customer.plugin(aggregatePaginate);
module.exports = customer;
