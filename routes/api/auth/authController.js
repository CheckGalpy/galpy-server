const jwt = require("jsonwebtoken");

const User = require("../../../models/User");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

exports.signInUser = async function (req, res, next) {
  const { _id, email, givenName, familyName, avatarURL } = req.body;

  try {
    let user = await User.findById(_id);

    if (!user) {
      user = await User.create({
        _id,
        email,
        givenName,
        familyName,
        avatarURL,
      });
    }

    const payload = { _id, email };
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "14d",
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

