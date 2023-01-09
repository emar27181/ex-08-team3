const express = require("express");
const group = require("./model");
const admin = require("../group_admin.model");
const groupRouter = express.Router({ mergeParams: true });

groupRouter.get("/admin", admin.displayGAdmin);
groupRouter.get("/", group.displayGruopPage);
groupRouter.post("/messages", group.addMessage);

module.exports = groupRouter;
