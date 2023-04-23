const router = require("express").Router();

const usersController = require("./usersController");

router.get("/search", usersController.searchUser);
router.get("/:userId", usersController.getUser);

module.exports = router;
