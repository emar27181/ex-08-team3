const express = require("express");
const group = require("./model");
const groupRouter = express.Router({ mergeParams: true });

groupRouter.get("/", group.displayGruopPage);
groupRouter.post("/", group.addMessage, (req, res) => {
  res.redirect(`/channels/${req.params.id}`);
});

module.exports = groupRouter;
