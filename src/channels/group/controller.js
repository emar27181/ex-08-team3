const express = require("express");
const group = require("./model");
const groupRouter = express.Router();

groupRouter.get("/", group.displayGruopPage);

module.exports = groupRouter;
