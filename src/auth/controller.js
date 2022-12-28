const express = require("express");
const authRouter = express.Router();
const Employee = require("../db/model/employee");
const all = require("../channels/all.model.js");
const admin = require("../channels/admin.model.js");
const mypage = require("../channels/mypage.model.js");

authRouter.get("/login", (req, res) => {
  res.render("login", {});
});

authRouter.get("/admin", all.displayAdmin);
authRouter.get("/admin/involve", admin.displayInvolve);
authRouter.get("/mypage", mypage.displayMypage);
authRouter.post("/admin/involve", admin.addMember);
authRouter.post("/admin", admin.editMember);

authRouter.post("/login", async (req, res) => {
  const employee = req.body;
  const result = await Employee.findOne({
    where: { employee_id: employee.id },
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
