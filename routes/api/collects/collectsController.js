const Collect = require("../../../models/Collect");

exports.checkCollectExists = async function (req, res, next) {
  const { userId, bookmarkId } = req.params;

  try {
    const collectExists = await Collect.findOne({
      collectorId: userId,
      collectedBookmarkId: bookmarkId,
    });

    if (collectExists) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "책갈피 즐겨찾기 상태를 불러오는데 실패하였습니다" });
  }
};
