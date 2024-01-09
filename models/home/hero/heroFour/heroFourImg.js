const mongoose = require("mongoose");

const heroFourImageSchema = new mongoose.Schema({
  heroFourImgUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const HeroFourImage = mongoose.model("HeroFourImage", heroFourImageSchema);

module.exports = HeroFourImage;
