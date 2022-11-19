const express = require("express");
const app = express();

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

module.exports = app;
