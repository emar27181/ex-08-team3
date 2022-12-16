const Channel = require("../db/model/channnel");
const Employee = require("../db/model/employee");
const Message = require("../db/model/message");
const formatDate = require("./formatDate");

const allModel = {
  displayMessage: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
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
      user,
      channels,
      messages: formatedMessages,
    });
  },

  displayAdmin: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    await Message.sync();
    const channels = await Channel.findAll();
    res.render("admin", {
      user,
      channels,
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
