const express = require("express");
const group = require("./model");
const admin = require("../group_admin.model");
const groupRouter = express.Router({ mergeParams: true });

groupRouter.get("/members", admin.displayGAdmin);
groupRouter.get("/", group.redirectToGroupMessages);
groupRouter.get("/messages", group.displayGruopPage);
groupRouter.post("/messages", group.addMessage);
groupRouter.post("/members", admin.editGMember);

module.exports = groupRouter;
