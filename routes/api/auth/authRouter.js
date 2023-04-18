const router = require("express").Router();

const usersController = require("./authController");

router.post("/signin", usersController.signInUser);
router.get("/verify", usersController.verifyUser);

module.exports = router;
