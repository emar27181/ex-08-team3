const Message = require("../db/model/message");
const formatDate = require("./formatDate");

const meModel = {
  displayDM: async (req, res) => {
    await Message.sync();
    const messages = await Message.findAll();
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
    res.render("me", {
      messages: formatedMessages,
    });
  },
};

module.exports = meModel;
