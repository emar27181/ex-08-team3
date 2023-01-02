const Channel = require("../db/model/channnel");
const Employee = require("../db/model/employee");

const makeChannelModel = {
  renderToChannel: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    const channels = await Channel.findAll();
    res.render("channel", {
      user,
      channels,
    });
  },
  addChannel: async (req, res) => {
    const reqData = req.body;

    await Channel.create({
      name: reqData.channel,
    });
    res.redirect("/channels/group");
  },
};

module.exports = makeChannelModel;
