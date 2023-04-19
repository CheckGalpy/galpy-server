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

exports.getBookmark = async function (req, res, next) {
  const { bookmarkId } = req.params;

  try {
    const bookmark = await Bookmark.findById(bookmarkId);
    res.status(200).json(bookmark);
  } catch (error) {
    next(error);
  }
};

