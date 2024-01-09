const mongoose = require("mongoose");

const heroThreeTextSchema = new mongoose.Schema({
  heroThreeText: {
    type: String,
  },
});

const HeroThreeText = mongoose.model("HeroThreeText", heroThreeTextSchema);

module.exports = HeroThreeText;
