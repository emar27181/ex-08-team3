const express = require("express");
const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
    res.status(418).end();
});

module.exports = loginRouter;