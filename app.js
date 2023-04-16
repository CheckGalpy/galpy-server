require("dotenv").config();

const express = require("express");

const app = express();
require("./config/database");

const {
  handle404Error,
  handleOtherErrors,
} = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(handle404Error);
app.use(handleOtherErrors);

module.exports = app;
