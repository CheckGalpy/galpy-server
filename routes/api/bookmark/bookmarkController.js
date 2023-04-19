const Bookmark = require("../../../models/Bookmark");

exports.createBookmark = async function (req, res, next) {
  const { creatorId, content, createdAt, hashtags, book } = req.body;

  try {
    const bookmark = await Bookmark.create({
      creatorId,
      content,
      createdAt,
      hashtags,
      book,
    });

    res.status(201).json(bookmark?._id);
  } catch (error) {
    next(error);
  }
};

