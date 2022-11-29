const express = require("express");
const authRouter = express.Router();
const Employee = require("../db/model/employee");

authRouter.get("/login", (req, res) => {
  res.render("login", {});
});

authRouter.post("/login", async (req, res) => {
  res.status(418).end();
});

module.exports = authRouter;
