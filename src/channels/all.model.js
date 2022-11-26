const Message = require("../db/model/message");

const allModel = {
  displayAll: async (req, res) => {
    await Message.sync();
    const messages = await Message.findAll();
    const formatedMessages = [];
    for (const message of messages) {
      const formatedMessage = {
        content: message.content,
        time: message.time,
        message_id: message.message_id,
        channel_id: message.channel_id,
      };
      formatedMessages.push(formatedMessage);
    }
    res.render("all", {
      messages: formatedMessages,
    });
  },
};

module.exports = allModel;
