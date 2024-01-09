const mongoose = require("mongoose");

const heroTwoImageSchema = new mongoose.Schema({
  heroTwoImgUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const HeroTwoImage = mongoose.model("HeroTwoImage", heroTwoImageSchema);

module.exports = HeroTwoImage;
