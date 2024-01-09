const mongoose = require("mongoose");

const ourPlatformSchema = mongoose.Schema({
  ourPlatformImg: String,
  cloudinaryId: String,
});

const OurPlatform = mongoose.model("OurPlatform", ourPlatformSchema);

module.exports = OurPlatform;
