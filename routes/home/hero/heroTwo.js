const express = require("express");
const router = express.Router();
const heroTwo = require("../../../controllers/home/hero/heroTwo");

router
  .route("/hero/img/:id")
  .get(heroTwo.getHeroTwoImg)
  .patch(heroTwo.updateHeroTwoImg);
router.route("/hero/img").post(heroTwo.addHeroTwoImg);
router.route("/hero/text").post(heroTwo.addHeroTwoText);
router
  .route("/hero/text/:id")
  .patch(heroTwo.updateHeroTwoText)
  .get(heroTwo.getHeroTwoText);

module.exports = router;