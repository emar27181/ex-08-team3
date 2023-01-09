const express = require("express");
const channels = require("./channels.model");
const all = require("./all.model");
const me = require("./me.model");
const channelsRouter = express.Router();

channelsRouter.get("/", channels.redirectToAllMessages);
channelsRouter.get("/all", channels.redirectToAllMessages);
channelsRouter.get("/all/messages", all.displayMessage);
channelsRouter.post("/all/messages", all.addMessage);
channelsRouter.get("/me", me.displayDM);

module.exports = channelsRouter;
