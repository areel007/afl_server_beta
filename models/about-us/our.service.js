const mongoose = require("mongoose");

const ourServiceSchema = mongoose.Schema({
  ourServiceImg: String,
  cloudinaryId: String,
});

const OurService = mongoose.model("OurService", ourServiceSchema);

module.exports = OurService;
