const express = require("express");

const router = express.Router();

const newsController = require("../controllers/news");

router
  .route("/")
  .post(newsController.postNewsController)
  .get(newsController.allNewsController);

router.route("/dashboard").get(newsController.allNewsForDashboardController);

router
  .route("/:id")
  .delete(newsController.deleteNewsController)
  .get(newsController.getNewsController);

module.exports = router;
