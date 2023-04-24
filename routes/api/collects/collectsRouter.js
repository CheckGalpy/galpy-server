const router = require("express").Router();

const collectsController = require("./collectsController");

router.get(
  "/:userId/:bookmarkId/exists",
  collectsController.checkCollectExists,
);

module.exports = router;
