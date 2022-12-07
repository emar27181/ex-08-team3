const express = require("express");
const makeChannelRouter = express.Router();

makeChannelRouter.get("/channel", (req, res) => {
  res.render("channel", {});
});

module.exports = makeChannelRouter;
