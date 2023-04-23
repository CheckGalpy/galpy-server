const router = require("express").Router();

const followsController = require("./followsController");

router.post("/follow", followsController.follow);
router.post("/unfollow", followsController.unfollow);
router.get("/:userId/following", followsController.getFollowingList);

module.exports = router;
