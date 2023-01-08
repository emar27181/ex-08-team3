const { Employee, GroupEmployees, Group } = require("../db/model");
const { Op } = require("sequelize");

const meModel = {
  displayDM: async (req, res) => {
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
    await Employee.sync();
    const employees = await Employee.findAll({
      attributes: ["id", "name", "PositionId"],
      where: {
        id: {
          [Op.ne]: user.id,
        },
      },
    });
    res.render("me", {
      user,
      channels,
      employees,
    });
  },
};

module.exports = meModel;
