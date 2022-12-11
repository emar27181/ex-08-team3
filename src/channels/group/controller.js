const express = require("express");
const groupRouter = express.Router();

groupRouter.get("/", (req, res) => {
  res.render("group", {});
});

module.exports = groupRouter;
