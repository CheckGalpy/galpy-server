const SimilarUser = require("../../../models/SimilarUser");

exports.getRecommendation = async function (req, res, next) {
  const { userId } = req.params;

  try {
    const recommendation = await SimilarUser.findOne({ userId });
    res.status(200).json(recommendation);
  } catch (error) {
    next(error);
  }
};
