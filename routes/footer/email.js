const express = require("express");
const router = express.Router();
const email = require("../../controllers/footer/email");

router.route("/").post(email.addEmail);
router.route("/:id").patch(email.updateEmail).get(email.getEmail);

module.exports = router;
