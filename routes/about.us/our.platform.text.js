const express = require("express");
const router = express.Router();
const ourPlatform = require("../../controllers/about.us/our.platform.text");

router.route("/").post(ourPlatform.addOurPlatformText);
router
  .route("/:id")
  .get(ourPlatform.getOurPlatformText)
  .patch(ourPlatform.updateOurPlatformText);

module.exports = router;
