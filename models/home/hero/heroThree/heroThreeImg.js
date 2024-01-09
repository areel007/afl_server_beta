const mongoose = require("mongoose");

const heroThreeImageSchema = new mongoose.Schema({
  heroThreeImgUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const HeroThreeImage = mongoose.model("HeroThreeImage", heroThreeImageSchema);

module.exports = HeroThreeImage;
