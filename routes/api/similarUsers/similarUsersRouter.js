const router = require("express").Router();

const similarUsersController = require("./similarUsersController");

router.get("/:userId", similarUsersController.getRecommendation);

module.exports = router;
