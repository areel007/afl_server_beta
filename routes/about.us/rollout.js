const express = require("express");
const router = express.Router();
const rollout = require("../../controllers/about.us/rollout");

router.route("/").post(rollout.addRolloutImg);
router.route("/:id").get(rollout.getRolloutImg).patch(rollout.updateRolloutImg);

module.exports = router;
