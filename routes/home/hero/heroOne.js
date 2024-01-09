const express = require("express");
const router = express.Router();
const heroOne = require("../../../controllers/home/hero/heroOne");

router
  .route("/hero/img/:id")
  .get(heroOne.getHeroOneImg)
  .patch(heroOne.updateHeroOneImg);
router.route("/hero/img").post(heroOne.addHeroOneImg);
router.route("/hero/text").post(heroOne.addHeroOneText);
router
  .route("/hero/text/:id")
  .patch(heroOne.updateHeroOneText)
  .get(heroOne.getHeroOneText);

module.exports = router;