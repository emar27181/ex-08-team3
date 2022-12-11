const express = require("express");
const channels = require("./channels.model");
const all = require("./all.model");
const me = require("./me.model");
const groupRouter = require("./group/controller");
const channelsRouter = express.Router();

channelsRouter.get("/", channels.redirectToAll);

channelsRouter.post("/", (req, res) => {
  if (req.body.transition === "+") {
    res.redirect("/channel");
  } else if (req.body.transition === "1") {
    res.redirect("/channels/all");
  } else if (req.body.transition === "2") {
    res.redirect("/channels/me");
  } else if (req.body.transition === "3") {
    res.redirect("/channels/group");
  } else {
    res.redirect(req.headers.referer);
  }
});

channelsRouter.get("/all", all.displayMessage);
channelsRouter.post("/all", all.addMessage);
channelsRouter.get("/me", me.displayDM);
channelsRouter.post("/me", me.addMessage);

channelsRouter.use("/group", groupRouter);

module.exports = channelsRouter;
