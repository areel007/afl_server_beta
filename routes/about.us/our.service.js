const express = require("express");
const router = express.Router();
const ourService = require("../../controllers/about.us/our.service");

router.route("/").post(ourService.addOurServiceImg);
router
  .route("/:id")
  .get(ourService.getOurServiceImg)
  .patch(ourService.updateOurServiceImg);

module.exports = router;
