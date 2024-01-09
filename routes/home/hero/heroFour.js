const express = require("express");
const router = express.Router();
const heroFour = require("../../../controllers/home/hero/heroFour");

router
  .route("/hero/img/:id")
  .get(heroFour.getHeroFourImg)
  .patch(heroFour.updateHeroFourImg);
router.route("/hero/img").post(heroFour.addHeroFourImg);
router.route("/hero/text").post(heroFour.addHeroFourText);
router
  .route("/hero/text/:id")
  .patch(heroFour.updateHeroFourText)
  .get(heroFour.getHeroFourText);

module.exports = router;