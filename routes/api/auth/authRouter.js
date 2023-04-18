const router = require("express").Router();

const usersController = require("./authController");

router.post("/signin", usersController.signInUser);

module.exports = router;
