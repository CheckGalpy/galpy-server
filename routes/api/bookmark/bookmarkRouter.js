const router = require("express").Router();

const bookmarkController = require("./bookmarkController");

router.post("/", bookmarkController.createBookmark);
router.get("/:bookmarkId", bookmarkController.getBookmark);
router.patch("/:bookmarkId", bookmarkController.updateBookmark);
router.delete("/:bookmarkId", bookmarkController.deleteBookmark);
router.get("/creator", bookmarkController.getBookmarkListByCreatorId);

module.exports = router;
