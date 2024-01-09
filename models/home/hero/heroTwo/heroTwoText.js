const mongoose = require("mongoose");

const heroTwoTextSchema = new mongoose.Schema({
  heroTwoText: {
    type: String,
  },
});

const HeroTwoText = mongoose.model("HeroTwoText", heroTwoTextSchema);

module.exports = HeroTwoText;
