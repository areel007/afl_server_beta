const express = require("express");
const router = express.Router();
const aboutHero = require("../../controllers/about.us/hero");

router.route("/").post(aboutHero.addHeroImg);
router.route("/:id").get(aboutHero.getHeroImg).patch(aboutHero.updateHeroImg);
router.route("/text").post(aboutHero.addHeroText).get(aboutHero.getHeroText);
module.exports = router;
