const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {}
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
