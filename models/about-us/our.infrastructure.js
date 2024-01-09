const mongoose = require("mongoose");

const ourInfrastructureSchema = mongoose.Schema({
  ourInfrastructureImg: String,
  cloudinaryId: String,
});

const OurInfrastructureImg = mongoose.model(
  "OurInfrastructureImg",
  ourInfrastructureSchema
);

module.exports = OurInfrastructureImg;
