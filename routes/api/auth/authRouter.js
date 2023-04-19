const router = require("express").Router();

const authController = require("./authController");

router.post("/signin", authController.signInUser);
router.get("/verify", authController.verifyUser);

module.exports = router;
