const router = require("express").Router();

const usersController = require("./usersController");

router.get("/:userId", usersController.getUser);

module.exports = router;
