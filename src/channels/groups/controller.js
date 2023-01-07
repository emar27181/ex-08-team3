const express = require("express");
const group = require("./model");
const groupRouter = express.Router({ mergeParams: true });

groupRouter.get("/", group.displayGruopPage);
groupRouter.post("/messages", group.addMessage);

module.exports = groupRouter;
