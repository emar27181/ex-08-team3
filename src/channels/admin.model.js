const { Employee, GroupEmployees, Group } = require("../db/model");

const adminModel = {
  displayInvolve: async (req, res) => {
    const user = await Employee.findOne({
      where: { id: req.session.id },
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
    res.render("involve", {
      user,
      channels,
    });
  },

  addMember: async (req, res) => {
    const reqData = req.body;
    const employees = await Employee.findAll();
    let flag = true;

    for (const employee of employees) {
      if (reqData.employee_id === employee.id) {
        flag = false;
      }
    }
    if (flag) {
      await Employee.create({
        id: reqData.employee_id,
        name: reqData.name,
        password: reqData.password,
        PositionId: reqData.position_id,
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
    const employee = await Employee.findOne({
      where: { id: change },
    });

    if (employee.PositionId !== 1) {
      if (btnkey === "p_change") {
        if (employee.PositionId === 3) {
          employee.PositionId = 2;
        } else if (employee.PositionId === 2) {
          employee.PositionId = 3;
        }
        employee.save();
      } else if (btnkey === "m_delete") {
        employee.destroy();
      }
    }
    res.redirect("/admin");
  },
};

module.exports = adminModel;
