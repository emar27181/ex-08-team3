const { Employee, GroupEmployees, Group, Position } = require("../db/model");

const mypageModel = {
  displayMypage: async (req, res) => {
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
    const employees = await Employee.findAll({
      include: Position,
    });
    const formatedEmployees = [];
    for (const employee of employees) {
      const formatedEmployee = {
        employee_id: employee.id,
        name: employee.name,
        password: employee.passwoed,
        position_id: employee.PositionId,
      };
      formatedEmployees.push(formatedEmployee);
    }
    res.render("mypage", {
      user,
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
