const mongoose = require("mongoose");

const whoWeAreSchema = new mongoose.Schema({
  whoWeAreImgUrl: String,
  cloudinaryId: String,
});

const WhoWeAre = mongoose.model("WhoWeAre", whoWeAreSchema);

module.exports = WhoWeAre;
