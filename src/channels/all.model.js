const Channel = require("../db/model/channnel");
const Message = require("../db/model/message");
const formatDate = require("./formatDate");

const allModel = {
  displayMessage: async (req, res) => {
    await Message.sync();
    const channels = await Channel.findAll();
    const messages = await Message.findAll({
      where: { channel_id: 1 },
    });
    const formatedMessages = [];
    for (const message of messages) {
      const formatedMessage = {
        content: message.content,
        time: formatDate(message.time),
        message_id: message.message_id,
        channel_id: message.channel_id,
        employee_id: message.employee_id,
      };
      formatedMessages.push(formatedMessage);
    }
    res.render("all", {
      channels,
      messages: formatedMessages,
    });
  },

  addMessage: async (req, res) => {
    const reqData = req.body;

    await Message.create({
      content: reqData.content,
      channel_id: 1,
      employee_id: "ee000000",
    });
    res.redirect("/channels/all");
  },
};

module.exports = allModel;
