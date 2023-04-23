const User = require("../../../models/User");

exports.getUser = async function (req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
