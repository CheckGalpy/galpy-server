const router = require("express").Router();

const bookmarkController = require("./bookmarkController");

router.post("/", bookmarkController.createBookmark);
router.get("/:bookmarkId", bookmarkController.getBookmark);

module.exports = router;
