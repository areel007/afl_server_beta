const express = require("express");
const router = express.Router();
const rollout = require("../../controllers/about.us/rollout.text");

router.route("/").post(rollout.addRolloutText);
router
  .route("/:id")
  .get(rollout.getRolloutText)
  .patch(rollout.updateRolloutText);

module.exports = router;
