const router = require("express").Router();

const followsController = require("./followsController");

router.get("/:userId/following", followsController.getFollowingList);

module.exports = router;
