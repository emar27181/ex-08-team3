const { Employee, GroupEmployees, Group } = require("../db/model");

const gadminModel = {
  displayGAdmin: async (req, res) => {
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
    const employees = await Employee.findAll();
    const formatedEmployees = [];
    for (const employee of employees) {
      const formatedEmployee = {
        employee_id: employee.id,
        name: employee.name,
        password: employee.password,
        position_id: employee.PositionId,
      };
      formatedEmployees.push(formatedEmployee);
    }
    res.render("group_admin", {
      user,
      channels,
      employees: formatedEmployees,
    });
  },
};

module.exports = gadminModel;
