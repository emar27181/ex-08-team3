const { Employee, GroupEmployees, Group } = require("../db/model");

const adminModel = {
  displayInvolve: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    const JoinChannels = await GroupEmployees.findAll({
      where: { EmployeeId: req.session.id },
    });
    const joinChannelsId = [];
    for (const JoinChannel of JoinChannels) {
      joinChannelsId.push(JoinChannel.GroupId);
    }
    const channels = await Group.findAll({
      where: { id: joinChannelsId },
    });
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
    res.render("involve", {
      user,
      channels,
      employees: formatedEmployees,
    });
  },

  addMember: async (req, res) => {
    const reqData = req.body;
    const employees = await Employee.findAll();
    let flag = true;

    for (const employee of employees) {
      if (reqData.employee_id === employee.employee_id) {
        flag = false;
      }
    }
    if (flag) {
      await Employee.create({
        employee_id: reqData.employee_id,
        name: reqData.name,
        password: reqData.password,
        position_id: reqData.position_id,
      });
      res.redirect("/admin");
    } else {
      res.redirect("/admin/involve");
    }
  },

  editMember: async (req, res) => {
    const reqData = req.body;

    let btnkey = "";
    let change = "";
    for (const [key, value] of Object.entries(reqData)) {
      btnkey = `${key}`;
      change = `${value}`;
    }
    if (btnkey === "p_change") {
      const user = await Employee.findOne({
        where: { employee_id: change },
      });
      if (user.position_id === 3) {
        user.position_id = 2;
      } else if (user.position_id === 2) {
        user.position_id = 3;
      }
      user.save();
    } else if (btnkey === "m_delete") {
      const user = await Employee.findOne({
        where: { employee_id: change },
      });
      user.destroy();
    }
    res.redirect("/admin");
  },
};

module.exports = adminModel;
