require("dotenv").config();
require("./config/database");

const express = require("express");
const cors = require("cors");
const app = express();

const apiRouter = require("./routes/api/apiRouter");
const {
  handle404NotFound,
  handleErrors,
} = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.use(handle404NotFound);
app.use(handleErrors);

module.exports = app;
