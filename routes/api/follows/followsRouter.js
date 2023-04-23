const router = require("express").Router();

const followsController = require("./followsController");

router.post("/follow", followsController.follow);
router.get("/:userId/following", followsController.getFollowingList);

module.exports = router;
