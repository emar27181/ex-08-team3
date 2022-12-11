const Channel = require("../../db/model/channnel");
const Message = require("../../db/model/message");
const formatDate = require("../formatDate");

const groupModel = {
  displayGruopPage: async (req, res) => {
    const channels = await Channel.findAll();
    const messages = await Message.findAll({
      where: { channel_id: 3 },
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
    res.render("group", {
      channels,
      messages: formatedMessages,
    });
  },
};

module.exports = groupModel;
