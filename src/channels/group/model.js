const Channel = require("../../db/model/channnel");
const Employee = require("../../db/model/employee");
const Message = require("../../db/model/message");
const formatDate = require("../formatDate");
const matchMyId = require("../matchMyId");

const groupModel = {
  displayGruopPage: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    const channels = await Channel.findAll();
    const chname = await Channel.findOne({
      where: { name: req.params.id },
    });
    const messages = await Message.findAll({
      where: { channel_id: chname.channel_id },
    });
    const formatedMessages = [];
    for (const message of messages) {
      const formatedMessage = {
        content: message.content,
        time: formatDate(message.time),
        message_id: message.message_id,
        channel_id: message.channel_id,
        employee_id: message.employee_id,
        who: matchMyId(message.employee_id, req.session.id),
      };
      formatedMessages.push(formatedMessage);
    }
    res.render("group", {
      user,
      channels,
      chname,
      messages: formatedMessages,
    });
  },

  addMessage: async (req, res, next) => {
    const reqData = req.body;
    const chname = await Channel.findOne({
      where: { name: req.params.id },
    });

    await Message.create({
      content: reqData.content,
      channel_id: chname.channel_id,
      employee_id: req.session.id,
    });

    next();
  },
};

module.exports = groupModel;
