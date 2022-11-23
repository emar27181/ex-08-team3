const express = require("express");
const app = express();
const loginRouter = require("./login/login.controller");
const channelsRouter = require("./channels.controller");

app.set("view engine", "ejs");
app.use(express.static("dist/public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello team3");
});

app.use("/login", loginRouter);
app.use("/channels", channelsRouter);

module.exports = app;
