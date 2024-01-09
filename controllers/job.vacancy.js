const JobVacancy = require("../models/job.vacancy");

exports.createJob = async (req, res) => {
  const { jobTitle, jobObjective, location, jobContent } = req.body;
  try {
    const newJob = await JobVacancy({
      jobTitle,
      jobObjective,
      jobContent,
      location,
    });

    newJob.save();

    res.status(201).json({
      status: "success",
      msg: "new position successfully created",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobVacancy.find();
    res.status(200).json({
      status: "success",
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await JobVacancy.findByIdAndDelete(id);

    if (!job) {
      return res
        .status(404)
        .json({ msg: `cannot find any job with ID ${id}` });
    }
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getJob = async (req, res) => {
  const { id } = req.params;
   try {
    const job = await JobVacancy.findById(id)
    if (!job) {
      return res.status(404).json({
        status: "fail",
        msg: `cannot find any job with ID ${id}`
      })
    }
    res.status(200).json({
      status: "success",
      job
    })
   } catch (error) {
    res.status(500).json({
      status: "fail",
      error
    })
   }
}
