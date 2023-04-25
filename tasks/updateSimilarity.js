const mongoose = require("mongoose");
const cron = require("node-cron");

const User = require("../models/User");
const Bookmark = require("../models/Bookmark");
const SimilarUser = require("../models/SimilarUser");

const SIMILLARITY_LIMIT = 0.01;

function startCronJob() {
  cron.schedule("0 0 4 * * *", updateSimilarityScores);
}

async function updateSimilarityScores() {
  const similarUsers = {};
  const users = await User.find().exec();

  for (let i = 0; i < users.length; i++) {
    const user1 = users[i]._id;

    if (i === 0) {
      const user1HashtagsFrequency = await getUserHashtagsFrequency(user1);
      similarUsers[user1] = {
        hashtagsFrequency: { ...user1HashtagsFrequency },
        similarUser: [],
      };
    }

    for (let j = i + 1; j < users.length; j++) {
      const user2 = users[j]._id;

      if (!similarUsers[user2]) {
        const user2HashtagsFrequency = await getUserHashtagsFrequency(user2);
        similarUsers[user2] = {
          hashtagsFrequency: { ...user2HashtagsFrequency },
          similarUser: [],
        };
      }

      const similarityScore = await calculateUsersSimilarity(user1, user2);
      if (similarityScore > SIMILLARITY_LIMIT) {
        similarUsers[user1]["similarUser"].push({
          userId: user2,
          similarityScore,
        });
        similarUsers[user2]["similarUser"].push({
          userId: user1,
          similarityScore,
        });
      }
    }
    similarUsers[user1]["similarUser"].sort(
      (a, b) => a.similarityScore - b.similarityScore,
    );

    try {
      await SimilarUser.findOneAndUpdate(
        { userId: user1 },
        {
          userId: user1,
          hashtagsFrequency: similarUsers[user1].hashtagsFrequency,
          similarUser: similarUsers[user1].similarUser,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    } catch (error) {
      console.error(`추천알고리즘을 실행하지 못했습니다: ${user1}:`, error);
    }
  }
}

async function calculateUsersSimilarity(userId1, userId2) {
  const user1HashtagsFrequency = await getUserHashtagsFrequency(userId1);
  const user2HashtagsFrequency = await getUserHashtagsFrequency(userId2);

  const similarity = cosineSimilarity(
    user1HashtagsFrequency,
    user2HashtagsFrequency,
  );

  return similarity;
}

async function getUserHashtagsFrequency(userId) {
  const bookmarks = await Bookmark.find({ creatorId: userId }).exec();

  const hashtagsFrequency = bookmarks.reduce((acc, bookmark) => {
    for (const hashtag of bookmark.hashtags) {
      if (hashtag in acc) {
        acc[hashtag]++;
      } else {
        acc[hashtag] = 1;
      }
    }
    return acc;
  }, {});

  return hashtagsFrequency;
}

function cosineSimilarity(vectorA, vectorB) {
  const dotProductAB = dotProduct(vectorA, vectorB);
  const magnitudeA = magnitude(vectorA);
  const magnitudeB = magnitude(vectorB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProductAB / (magnitudeA * magnitudeB);
}

const dotProduct = (vectorA, vectorB) => {
  return Object.keys(vectorA).reduce((sum, key) => {
    if (key in vectorB) {
      return sum + vectorA[key] * vectorB[key];
    }
    return sum;
  }, 0);
};

const magnitude = (vector) => {
  return Math.sqrt(
    Object.values(vector).reduce((sum, val) => {
      return sum + Math.pow(val, 2);
    }, 0),
  );
};

module.exports = startCronJob;
