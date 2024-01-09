const express = require("express");
const router = express.Router();
const heroThree = require("../../../controllers/home/hero/heroThree");

router
  .route("/hero/img/:id")
  .get(heroThree.getHeroThreeImg)
  .patch(heroThree.updateHeroThreeImg);
router.route("/hero/img").post(heroThree.addHeroThreeImg);
router.route("/hero/text").post(heroThree.addHeroThreeText);
router
  .route("/hero/text/:id")
  .patch(heroThree.updateHeroThreeText)
  .get(heroThree.getHeroThreeText);

module.exports = router;