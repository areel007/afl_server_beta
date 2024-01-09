const mongoose = require("mongoose");

const jobVacancySchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, "This field is required"],
  },
  jobObjective: {
    type: String,
    required: [true, "This field is required"],
  },
  location: {
    type: String,
    required: [true, "This field is required"]
  },
  jobContent: {
    type: Object,
    required: [true, "News must have a detail"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobVacancy = mongoose.model("JobVacancy", jobVacancySchema);

module.exports = JobVacancy;
