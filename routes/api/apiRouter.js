const router = require("express").Router();

const authRouter = require("./auth/authRouter");
const bookmarkRouter = require("./bookmark/bookmarkRouter");
const followingRouter = require("./following/followingRouter");

router.use("/auth", authRouter);
router.use("/bookmark", bookmarkRouter);

module.exports = router;
