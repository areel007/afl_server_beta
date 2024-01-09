const mongoose = require("mongoose");

const ourPlatformTextSchema = mongoose.Schema({
  ourPlatformText: String,
});

const OurPlatformText = mongoose.model(
  "OurPlatformText",
  ourPlatformTextSchema
);

module.exports = OurPlatformText;
