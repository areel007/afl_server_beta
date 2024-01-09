const mongoose = require("mongoose");

const heroFiveImageSchema = new mongoose.Schema({
  heroFiveImgUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const HeroFiveImage = mongoose.model("HeroFiveImage", heroFiveImageSchema);

module.exports = HeroFiveImage;
