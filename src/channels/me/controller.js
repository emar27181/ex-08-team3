const express = require("express");
const directMessage = require("./model");
const meRouter = express.Router({ mergeParams: true });

meRouter.get("/employees/:id/", directMessage.display);
meRouter.post("/employees/:id/messages", directMessage.add);

module.exports = meRouter;
