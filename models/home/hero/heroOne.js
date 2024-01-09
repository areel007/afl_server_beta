const mongoose = require("mongoose");

const heroOneSchema = new mongoose.Schema({
  heroOneImage: String,
  heroOneText: String,
});

const HeroOne = mongoose.model(
  "HeroOne",
  heroOneSchema
);

module.exports = HeroOne;