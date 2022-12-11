const Channel = require("../db/model/channnel");
const Employee = require("../db/model/employee");
const Message = require("../db/model/message");
const formatDate = require("./formatDate");

const meModel = {
  displayDM: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    const channels = await Channel.findAll();
    await Message.sync();
    const messages = await Message.findAll({
      where: { channel_id: 2 },
    });
    const formatedMessages = [];
    for (const message of messages) {
      const formatedMessage = {
        content: message.content,
        time: formatDate(message.time),
        message_id: message.message_id,
        employee_id: message.employee_id,
      };
      formatedMessages.push(formatedMessage);
    }
    res.render("me", {
      user,
      channels,
      messages: formatedMessages,
    });
  },

  addMessage: async (req, res) => {
    const reqData = req.body;

    await Message.create({
      content: reqData.content,
      channel_id: 2,
      employee_id: "ee000000",
    });
    res.redirect("/channels/me");
  },
};

module.exports = meModel;
