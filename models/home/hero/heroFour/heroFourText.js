const mongoose = require("mongoose");

const heroFourTextSchema = new mongoose.Schema({
  heroFourText: {
    type: String,
  },
});

const HeroFourText = mongoose.model("HeroFourText", heroFourTextSchema);

module.exports = HeroFourText;
