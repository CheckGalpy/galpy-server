const router = require("express").Router();

const bookmarkController = require("./bookmarkController");

router.post("/", bookmarkController.createBookmark);

module.exports = router;
