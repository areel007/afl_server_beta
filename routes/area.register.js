const express = require("express");

const router = express.Router();

const areaController = require("../controllers/area.register");

router
  .route("/")
  .post(areaController.createAreaRegister)
  .get(areaController.getAreas);

router.route("/admin").post(areaController.createAreaRegisterAdmin);

router.route("/:selectedAddress").get(areaController.getArea);

router.route("/:areaId").patch(areaController.toggleIsPlanned);

module.exports = router;
