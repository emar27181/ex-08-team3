const Channel = require("../db/model/channnel");
const Employee = require("../db/model/employee");
const Member = require("../db/model/member");

const makeChannelModel = {
  renderToChannel: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    const ch = await Member.findAll({
      where: { employee_id: req.session.id },
    });
    const channels = await Channel.findAll();
    res.render("channel", {
      user,
      ch,
      channels,
    });
  },

  addChannel: async (req, res) => {
    const reqData = req.body;

    const chacha = await Channel.create({
      name: reqData.channel,
    });
    // const chacha = await Channel.findOne({
    //   where: { name: reqData.channel },
    // });
    await Member.create({
      channel_id: chacha.channel_id,
      employee_id: req.session.id,
    });
    res.redirect(`/channels/${chacha.name}`);
  },
};

module.exports = makeChannelModel;
