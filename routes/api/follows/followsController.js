const Follow = require("../../../models/Follow");

exports.follow = async (req, res) => {
  const { followerId, followeeId } = req.body;

  try {
    await Follow.create({ followerId, followeeId });
    res.status(201).json({ message: "성공적으로 팔로우 하였습니다." });
  } catch (error) {
    res.status(500).json({ message: "팔로우에 실패하였습니다.", error });
  }
};

exports.unfollow = async (req, res) => {
  const { followerId, followeeId } = req.body;

  try {
    await Follow.deleteOne({ followerId, followeeId });
    res.status(200).json({ message: "성공적으로 언팔로우 되었습니다" });
  } catch (error) {
    res.status(500).json({ message: "언팔로우에 실패했습니다: ", error });
  }
};

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
