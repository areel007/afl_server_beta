const express = require("express");
const router = express.Router();
const heroFive = require("../../../controllers/home/hero/heroFive");

router
  .route("/hero/img/:id")
  .get(heroFive.getHeroFiveImg)
  .patch(heroFive.updateHeroFiveImg);
router.route("/hero/img").post(heroFive.addHeroFiveImg);
router.route("/hero/text").post(heroFive.addHeroFiveText);
router
  .route("/hero/text/:id")
  .patch(heroFive.updateHeroFiveText)
  .get(heroFive.getHeroFiveText);

module.exports = router;