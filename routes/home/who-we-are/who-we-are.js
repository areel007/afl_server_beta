const express = require("express");
const router = express.Router();
const whoWeAre = require("../../../controllers/home/who-we-are/who-we-are");

router.route("/").post(whoWeAre.addWhoWeAreImg);
router
  .route("/:id")
  .get(whoWeAre.getWhoWeAreImg)
  .patch(whoWeAre.updateWhoWeAreImg);

module.exports = router;
