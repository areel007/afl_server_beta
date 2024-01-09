const express = require("express");
const router = express.Router();
const ourService = require("../../controllers/about.us/our.service.text");

router.route("/").post(ourService.addServiceText);
router
  .route("/:id")
  .get(ourService.getOurServiceText)
  .patch(ourService.updateOurServiceText);

module.exports = router;
