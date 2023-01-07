const { Employee, GroupEmployees, Group } = require("../db/model");

const makeChannelModel = {
  renderToChannel: async (req, res) => {
    const user = await Employee.findOne({
      where: { id: req.session.id },
    });
    const channelsJoin = await GroupEmployees.findAll({
      where: { EmployeeId: req.session.id },
    });
    const channels = await Group.findAll();
    res.render("channel", {
      user,
      channelsJoin,
      channels,
    });
  },

  addChannel: async (req, res) => {
    const reqData = req.body;

    const makedChannel = await Group.create({
      name: reqData.channel,
    });
    await GroupEmployees.create({
      GroupId: makedChannel.id,
      EmployeeId: req.session.id,
    });
    res.redirect(`/channels/groups/${makedChannel.id}`);
  },
};

module.exports = makeChannelModel;
