const express = require("express");
const router = express.Router();
const ourInfrastructure = require("../../controllers/about.us/our.infrastructure");

router.route("/").post(ourInfrastructure.addOurInfrastructure);
router
  .route("/:id")
  .get(ourInfrastructure.getOurInfrastructure)
  .patch(ourInfrastructure.updateOurInfrastructure);

module.exports = router;
