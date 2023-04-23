const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "이메일을 입력해주세요"],
  },
  familyName: {
    type: String,
    required: [true, "성을 입력해주세요"],
    maxlength: 15,
    minlength: 1,
  },
  givenName: {
    type: String,
    required: [true, "이름을 입력해주세요"],
    maxlength: 15,
    minlength: 1,
  },
  avatarURL: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
