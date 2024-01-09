const mongoose = require("mongoose");

const aboutHeroImg = mongoose.Schema({
  aboutHeroImg: String,
  cloudinaryId: String,
});

const AboutHeroImg = mongoose.model("AboutHeroImg", aboutHeroImg);

module.exports = AboutHeroImg;
