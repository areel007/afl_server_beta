const mongoose = require("mongoose");

const phoneSchema = mongoose.Schema({
  phone: String,
});

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
