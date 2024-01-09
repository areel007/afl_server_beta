const express = require("express");

const router = express.Router();

const jobVacancyController = require("../controllers/job.vacancy");

router
  .route("/")
  .post(jobVacancyController.createJob)
  .get(jobVacancyController.getJobs);

router.route("/:id").delete(jobVacancyController.deleteJob).get(jobVacancyController.getJob)

module.exports = router;
