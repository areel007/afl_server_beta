const mongoose = require("mongoose");

const rolloutTextSchema = mongoose.Schema({
  rolloutText: String,
});

const RolloutText = mongoose.model("RolloutText", rolloutTextSchema);

module.exports = RolloutText;
