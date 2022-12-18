const Channel = require("../db/model/channnel");

const makeChannelModel = {
  renderToChannel: (req, res) => {
    res.render("channel", {});
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
