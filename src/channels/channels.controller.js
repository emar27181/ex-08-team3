const express = require("express");
const channels = require("./channels.model");
const all = require("./all.model");
const me = require("./me.model");
const channelsRouter = express.Router();

channelsRouter.get("/", channels.redirectToAll);
channelsRouter.get("/all", all.displayMessage);
channelsRouter.post("/all", all.addMessage);
channelsRouter.get("/me", me.displayDM);
channelsRouter.post("/me", me.addMessage);

channelsRouter.get("/group", (req, res) => {
  res.render("group", {});
});

module.exports = channelsRouter;
