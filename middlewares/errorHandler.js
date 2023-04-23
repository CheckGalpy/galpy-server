function handle404NotFound(req, res, next) {
  const err = new Error("Not Found: 해당 페이지를 찾을 수 없습니다.");
  err.status = 404;
  next(err);
}

function handleErrors(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  if (err.status === 500) {
    return res.json({
      message: "서버 내부에 문제가 발생했습니다",
      error: { status: err.status },
    });
  }
  res.json({ message: err.message });
}

module.exports = {
  handle404NotFound,
  handleErrors,
};
