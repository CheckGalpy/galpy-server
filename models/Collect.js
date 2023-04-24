const mongoose = require("mongoose");

const collectSchema = new mongoose.Schema({
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collectedBookmarkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bookmark",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Collect", collectSchema);
