const mongoose = require("mongoose");

const SimilarUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  hashtagsFrequency: {
    type: Object,
    required: true,
  },
  similarUser: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        similarityScore: { type: Number, required: true },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("SimilarUser", SimilarUserSchema);
