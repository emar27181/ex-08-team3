const express = require("express");
const authRouter = express.Router();
const { Employee } = require("../db/model");
const all = require("../channels/all.model.js");
const admin = require("../channels/admin.model.js");
const mypage = require("../channels/mypage.model.js");
const gadmin = require("../channels/group_admin.model.js");

authRouter.get("/login", (req, res) => {
  res.render("login", {});
});

authRouter.get("/admin", all.displayAdmin);
authRouter.get("/admin/involve", admin.displayInvolve);
authRouter.get("/mypage", mypage.displayMypage);
authRouter.get("/group_admin", gadmin.displayGAdmin);
authRouter.post("/admin/involve", admin.addMember);
authRouter.post("/admin", admin.editMember);
authRouter.post("/mypage/edit/name", mypage.editName);
authRouter.post("/mypage/edit/password", mypage.editPassword);

authRouter.post("/login", async (req, res) => {
  const employee = req.body;
  const result = await Employee.findOne({
    where: { id: employee.id },
  });
  if (result === null) {
    req.session = null;
    res.redirect("/login");
  } else if (result.password !== employee.password) {
    req.session = null;
    res.redirect("/login");
  } else {
    req.session.id = employee.id;
    res.redirect("/channels");
  }
});

authRouter.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

module.exports = authRouter;
