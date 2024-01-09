const express = require("express");
const router = express.Router();
const partners = require("../../../controllers/home/partners/partners");

router.route("/").post(partners.addPartner).get(partners.getPartners);
router.route("/:id").delete(partners.deletePartner);

module.exports = router;
