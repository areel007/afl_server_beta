const mongoose = require("mongoose");

const partnersSchema = mongoose.Schema({
  partnerImgUrl: String,
  cloudinaryId: String,
});

const Partner = mongoose.model("Partner", partnersSchema);

module.exports = Partner;
