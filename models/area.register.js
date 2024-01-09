const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "This field is required"]
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "This field is required"]
  },
  area: {
    type: String,
    required: [true, "This field is required"]
  },
  isPlanned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AreaRegister = mongoose.model("AreaRegister", areaSchema);

module.exports = AreaRegister;
