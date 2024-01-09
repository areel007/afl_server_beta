const express = require("express");
const router = express.Router();
const ourPlatform = require("../../controllers/about.us/our.platform");

router.route("/").post(ourPlatform.addOurPlatform);
router
  .route("/:id")
  .get(ourPlatform.getOurPlatform)
  .patch(ourPlatform.updateOurPlatform);

module.exports = router;
