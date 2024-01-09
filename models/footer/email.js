const mongoose = require("mongoose");

const emailSchema = mongoose.Schema({
  email: String,
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
