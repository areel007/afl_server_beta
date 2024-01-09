const mongoose = require("mongoose");

const rolloutSchema = mongoose.Schema({
  rolloutImg: String,
  cloudinaryId: String,
});

const Rollout = mongoose.model("Rollout", rolloutSchema);

module.exports = Rollout;
