const express = require("express");
const channels = require("./channels.model");
const channelsRouter = express.Router();

channelsRouter.get("/", channels.redirectToAll);

module.exports = channelsRouter;
