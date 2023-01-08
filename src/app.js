const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const authRouter = require("./auth/controller");
const makeChannelRouter = require("./makeChannel/controller");
const channelsRouter = require("./channels/channels.controller");
const groupRouter = require("./channels/groups/controller");
const meRouter = require("./channels/me/controller");

app.set("view engine", "ejs");
app.use(express.static("dist/public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    secret: "m6J9FE5FEKreVwwdL8zFDIZkN4fUrGnF",
    // Cookie Options
    // 24 hours
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use("/", authRouter);
app.use("/", makeChannelRouter);

app.use((req, res, next) => {
  if (typeof req.session.id === "undefined") {
    res.redirect("/login");
  } else {
    next();
  }
});

app.use("/channels/groups/:id", groupRouter);
app.use("/channels", channelsRouter);
app.use("/channels/me", meRouter);
app.get("/", (req, res) => {
  res.redirect("/login");
});

module.exports = app;
