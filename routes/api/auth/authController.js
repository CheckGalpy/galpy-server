const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

exports.signInUser = async function (req, res, next) {
  const { email, givenName, familyName, avatarURL } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      user = await User.create({
        email,
        givenName,
        familyName,
        avatarURL,
      });
    }

    const payload = { _id: user._id, email };
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "14d",
    });
    res.json({ accessToken, refreshToken, userId: user._id });
  } catch (error) {
    next(error);
  }
};

exports.verifyUser = async function (req, res, next) {
  const { authorization, refresh } = req.headers;

  const accessToken = authorization.replace("Bearer ", "");
  const authResponse = {};

  try {
    const accessTokenDecoded = jwt.verify(accessToken, accessTokenSecret);

    authResponse["authStatus"] = "authorized";
    authResponse["userId"] = accessTokenDecoded._id;
  } catch (err) {
    try {
      const refreshTokenDecoded = jwt.verify(refresh, refreshTokenSecret);
      const payload = {
        _id: refreshTokenDecoded._id,
        email: refreshTokenDecoded.email,
      };

      const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: "1m",
      });

      authResponse["authStatus"] = "refreshed";
      authResponse["token"] = {
        accessToken: accessToken,
        refreshToken: refresh,
      };
      authResponse["userId"] = refreshTokenDecoded._id;
    } catch {
      authResponse["authStatus"] = "expired";
    }
  }

  return res.json(authResponse);
};
