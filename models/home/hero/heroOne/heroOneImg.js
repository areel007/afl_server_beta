const mongoose = require("mongoose");

const heroOneImageSchema = new mongoose.Schema({
  heroOneImgUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const HeroOneImage = mongoose.model("HeroOneImage", heroOneImageSchema);

module.exports = HeroOneImage;
