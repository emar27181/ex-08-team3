const express = require("express");
const makeChannel = require("./model");
const makeChannelRouter = express.Router();

makeChannelRouter.get("/channel", makeChannel.renderToChannel);
makeChannelRouter.post("/channel", makeChannel.addChannel);
module.exports = makeChannelRouter;
