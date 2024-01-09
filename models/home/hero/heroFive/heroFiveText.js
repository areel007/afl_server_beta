const mongoose = require("mongoose");

const heroFiveTextSchema = new mongoose.Schema({
  heroFiveText: {
    type: String,
  },
});

const HeroFiveText = mongoose.model("HeroFiveText", heroFiveTextSchema);

module.exports = HeroFiveText;
