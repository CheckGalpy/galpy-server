const Collect = require("../../../models/Collect");

exports.collect = async (req, res) => {
  const { collectorId, collectedBookmarkId } = req.body;
  console.log(collectorId, collectedBookmarkId);
  try {
    await Collect.create({ collectorId, collectedBookmarkId });
    res.status(201).json({ message: "성공적으로 즐겨찾기에 등록 하였습니다." });
  } catch (error) {
    res.status(500).json({ message: "즐겨찾기 등록에 실패하였습니다.", error });
  }
};

exports.discard = async (req, res) => {
  const { collectorId, collectedBookmarkId } = req.body;

  try {
    await Collect.deleteOne({ collectorId, collectedBookmarkId });
    res.status(201).json({ message: "성공적으로 즐겨찾기를 해제하였습니다." });
  } catch (error) {
    res.status(500).json({ message: "즐겨찾기 해제에 실패하였습니다.", error });
  }
};

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
