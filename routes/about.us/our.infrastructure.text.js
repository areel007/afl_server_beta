const express = require("express");
const router = express.Router();
const ourInfrastructure = require("../../controllers/about.us/our.infrastructure.text");

router.route("/").post(ourInfrastructure.addOurInfrastructureText);
router
  .route("/:id")
  .get(ourInfrastructure.getOurInfrastructureText)
  .patch(ourInfrastructure.updateOurInfrastructureText);

module.exports = router;
