const mongoose = require("mongoose");

const aboutHeroText = mongoose.Schema({
  aboutHeroText: String,
});

const AboutHeroText = mongoose.model("AboutHeroText", aboutHeroText);

module.exports = AboutHeroText;
