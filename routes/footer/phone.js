const express = require("express");
const router = express.Router();
const phone = require("../../controllers/footer/phone");

router.route("/").post(phone.addPhone);
router.route("/:id").patch(phone.updatePhone).get(phone.getPhone);

module.exports = router;
