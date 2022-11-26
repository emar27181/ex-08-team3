const express = require("express");
const channels = require("./channels.model");
const all = require("./all.model");
const channelsRouter = express.Router();

channelsRouter.get("/", channels.redirectToAll);
channelsRouter.get("/all", all.displayMessage);

module.exports = channelsRouter;
