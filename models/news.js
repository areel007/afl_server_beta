const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "News must have a title"],
  },
  subtitle: {
    type: String,
  },
  content: {
    type: Object,
    required: [true, "News must have a detail"],
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "News must have a category"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const New = mongoose.model("New", newSchema);

module.exports = New;
