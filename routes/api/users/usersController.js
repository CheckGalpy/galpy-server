const User = require("../../../models/User");
const Follow = require("../../../models/Follow");

exports.searchUser = async function (req, res, next) {
  const { keyword, currentUserId } = req.query;

  try {
    const targetUsers = await User.find({
      $or: [
        { familyName: new RegExp(keyword, "i") },
        { givenName: new RegExp(keyword, "i") },
        { email: { $regex: new RegExp("^" + keyword, "i") } },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$familyName", "$givenName"] },
              regex: new RegExp(keyword, "i"),
            },
          },
        },
      ],
    }).exec();

    const targetUsersFollowingStatus = {};

    for (const targetUser of targetUsers) {
      const existingFollow = await Follow.findOne({
        followerId: currentUserId,
        followeeId: targetUser._id,
      });

      targetUsersFollowingStatus[targetUser._id] = !!existingFollow;
    }

    res.status(200).json({ targetUsers, targetUsersFollowingStatus });
  } catch (error) {
    res.status(500).json({
      error: "서버 에러가 발생하여 사용자 검색에 실패하였습니다.",
    });
  }
};

exports.getUser = async function (req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
