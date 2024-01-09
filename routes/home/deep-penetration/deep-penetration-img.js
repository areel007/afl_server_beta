const express = require("express");
const router = express.Router();
const deepPenetration = require("../../../controllers/home/deep-penetration/deep-penetration-img");

router
  .route("/")
  .post(deepPenetration.addDeepPenetrationImg)
  .get(deepPenetration.getDeepPenetration);
router
  .route("/:id")
  .get(deepPenetration.getDeepPenetrationImg)
  .patch(deepPenetration.updateDeepPenetrationImg);

module.exports = router;
