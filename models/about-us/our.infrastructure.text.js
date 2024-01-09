const mongoose = require("mongoose");

const ourInfrastructureTextSchema = mongoose.Schema({
  ourInfrastructureText: String,
});

const OurInfrastructureText = mongoose.model(
  "OurInfrastructureText",
  ourInfrastructureTextSchema
);

module.exports = OurInfrastructureText;
