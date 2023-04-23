const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashtags: [{ type: String, minlength: 1, maxlength: 20 }],
  book: {
    title: {
      type: String,
      minlength: 1,
      maxlength: 100,
    },
    author: {
      type: String,
      minlength: 1,
      maxlength: 50,
    },
    page: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
