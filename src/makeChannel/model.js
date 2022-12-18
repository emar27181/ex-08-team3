const Channel = require("../db/model/channnel");

const makeChannelModel = {
  renderToChannel: (req, res) => {
    res.render("channel", {});
  },
};

module.exports = makeChannelModel;