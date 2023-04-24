const router = require("express").Router();

const authRouter = require("./auth/authRouter");
const usersRouter = require("./users/usersRouter");
const bookmarkRouter = require("./bookmarks/bookmarksRouter");
const followsRouter = require("./follows/followsRouter");
const collectsRouter = require("./collects/collectsRouter");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/bookmarks", bookmarkRouter);
router.use("/follows", followsRouter);
router.use("/collects", collectsRouter);

module.exports = router;
