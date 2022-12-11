const express = require("express");
const group = require("./model");
const groupRouter = express.Router();

groupRouter.get("/", group.displayGruopPage);
groupRouter.post("/", group.addMessage, (req, res) => {
  res.redirect("/channels/group");
});

module.exports = groupRouter;
