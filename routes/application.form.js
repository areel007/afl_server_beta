const express = require("express");

const router = express.Router();

const applicationFormController = require("../controllers/application.form");

router
  .route("/")
  .post(applicationFormController.submitApplication)
  .get(applicationFormController.getApplications);

router.route("/:id").delete(applicationFormController.deleteApplication);

module.exports = router;
