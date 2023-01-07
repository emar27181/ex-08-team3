const Channel = require("../db/model/channnel");
const Employee = require("../db/model/employee");
const Member = require("../db/model/member");

const mypageModel = {
  displayMypage: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    const channelsJoin = await Member.findAll({
      where: { employee_id: req.session.id },
    });
    const channels = await Channel.findAll();
    const employees = await Employee.findAll();
    const formatedEmployees = [];
    for (const employee of employees) {
      const formatedEmployee = {
        employee_id: employee.employee_id,
        name: employee.name,
        password: employee.passwoed,
        position_id: employee.position_id,
      };
      formatedEmployees.push(formatedEmployee);
    }
    res.render("mypage", {
      user,
      channelsJoin,
      channels,
      employees: formatedEmployees,
    });
  },

  editMe: async (req, res) => {
    const reqData = req.body;
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });

    if (reqData.new_name !== user.new_name) {
      user.name = reqData.new_name;
      user.save();
    }
    if (reqData.new_password !== user.new_password) {
      user.password = reqData.new_password;
      user.save();
    }
    res.redirect("/mypage");
  },
};

module.exports = mypageModel;
