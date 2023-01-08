const express = require("express");
const directMessage = require("./model");
const meRouter = express.Router({ mergeParams: true });

meRouter.get("/", directMessage.display);

module.exports = meRouter;
