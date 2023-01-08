const { Employee, GroupEmployees, Group } = require("../db/model");

const meModel = {
  displayDM: async (req, res) => {
    const user = await Employee.findOne({
      where: { id: req.session.id },
    });
    const channelsJoin = await GroupEmployees.findAll({
      where: { EmployeeId: req.session.id },
    });
    const channels = await Group.findAll();
    await Employee.sync();
    const employees = await Employee.findAll({
      attributes: ["id", "name", "PositionId"],
    });
    res.render("me", {
      user,
      channelsJoin,
      channels,
      employees,
    });
  },
};

module.exports = meModel;
