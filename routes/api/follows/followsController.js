const Follow = require("../../../models/Follow");

exports.getFollowingList = async function (req, res, next) {
  const { userId } = req.params;

  try {
    const following = await Follow.find({ followerId: userId }).populate(
      "followeeId",
    );
    const followingUsers = following.map((follow) => follow.followeeId);
    res.status(200).json(followingUsers);
  } catch (error) {
    res.status(500).json({ error: "팔로잉 목록을 가져오는데 실패하였습니다." });
  }
};
