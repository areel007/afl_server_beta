const mongoose = require("mongoose");

const heroOneTextSchema = new mongoose.Schema({
  heroOneText: {
    type: String,
  },
});

const HeroOneText = mongoose.model("HeroOneText", heroOneTextSchema);

module.exports = HeroOneText;
