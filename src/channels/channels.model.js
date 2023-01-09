const channelsModel = {
  redirectToAllMessages: (req, res) => {
    res.redirect("/channels/all/messages");
  },
};

module.exports = channelsModel;
