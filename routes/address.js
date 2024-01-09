const express = require("express");

const router = express.Router();

const address = require("../controllers//address");

router.route("/").post(address.addAddress);

module.exports = router;
