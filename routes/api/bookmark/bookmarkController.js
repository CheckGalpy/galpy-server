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

exports.getBookmarkListByCreatorId = async function (req, res, next) {
  const creatorId = req.query.creatorId;

  try {
    const bookmarks = await Bookmark.find({ creatorId });
    res.status(200).json(bookmarks);
  } catch (err) {
    next(err);
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

exports.updateBookmark = async function (req, res, next) {
  const { bookmarkId } = req.params;
  const updatedBookmark = req.body;

  try {
    const bookmark = await Bookmark.findByIdAndUpdate(
      bookmarkId,
      { $set: updatedBookmark },
      { new: true },
    );

    res.status(200).json(bookmark);
  } catch (error) {
    next(error);
  }
};

exports.deleteBookmark = async function (req, res, next) {
  const { bookmarkId } = req.params;

  try {
    const bookmark = await Bookmark.findByIdAndDelete(bookmarkId);
    res.status(204).json(bookmark);
  } catch (error) {
    next(error);
  }
};
