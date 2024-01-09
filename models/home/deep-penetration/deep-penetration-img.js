const mongoose = require("mongoose");

const deepPenetrationSchema = new mongoose.Schema({
  deepPenetrationImgUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
});

const DeepPenetration = mongoose.model("DeepPenetration", deepPenetrationSchema);

module.exports = DeepPenetration;
