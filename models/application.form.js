const mongoose = require("mongoose");

const applicationFormSchema = new mongoose.Schema({
  position: {
    type: String,
    required: [true, "This field is required"],
  },
  firstname: {
    type: String,
    required: [true, "This field is required"],
  },
  lastname: {
    type: String,
    required: [true, "This field is required"],
  },
  middleName: {
    type: String,
  },
  monthOfBirth: {
    type: String,
    required: [true, "This field is required"],
  },
  dayOfBirth: {
    type: String,
    required: [true, "This field is required"],
  },
  yearOfBirth: {
    type: String,
    required: [true, "This field is required"],
  },
  streetName: {
    type: String,
    required: [true, "This field is required"],
  },
  city: {
    type: String,
    required: [true, "This field is required"],
  },
  state: {
    type: String,
    required: [true, "This field is required"],
  },
  resumeUrl: {
    type: String,
    required: [true, "News must have a detail"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ApplicationForm = mongoose.model(
  "ApplicationForm",
  applicationFormSchema
);

module.exports = ApplicationForm;
