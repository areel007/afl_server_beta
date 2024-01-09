const mongoose = require("mongoose");

const ourServiceTextSchema = mongoose.Schema({
  ourServiceText: String,
});

const OurServiceText = mongoose.model("OurServiceText", ourServiceTextSchema);

module.exports = OurServiceText;
