const Message = require("../db/model/message");

const allModel = {
  displayMessage: async (req, res) => {
    await Message.sync();
    const messages = await Message.findAll();
    const formatedMessages = [];
    for (const message of messages) {
      const formatedMessage = {
        content: message.content,
        time: message.time,
        message_id: message.message_id,
        channel_id: message.channel_id,
        employee_id: message.employee_id,
      };
      formatedMessages.push(formatedMessage);
    }
    res.render("all", {
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
