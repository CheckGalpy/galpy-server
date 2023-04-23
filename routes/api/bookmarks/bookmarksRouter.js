const router = require("express").Router();

const bookmarksController = require("./bookmarksController");

router.post("/", bookmarksController.createBookmark);
router.get("/creator", bookmarksController.getBookmarkListByCreatorId);
router.get("/:bookmarkId", bookmarksController.getBookmark);
router.patch("/:bookmarkId", bookmarksController.updateBookmark);
router.delete("/:bookmarkId", bookmarksController.deleteBookmark);

module.exports = router;
