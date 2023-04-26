const router = require("express").Router();

const collectsController = require("./collectsController");

router.post("/collect", collectsController.collect);
router.post("/discard", collectsController.discard);
router.get("/:userId/collected", collectsController.getCollectedBookmarks);
router.get("/:bookmarkId/exists", collectsController.checkAnyCollectExists);
router.get(
  "/:userId/:bookmarkId/exists",
  collectsController.checkUserCollectExists,
);

module.exports = router;
