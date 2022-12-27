const Channel = require("../db/model/channnel");
const Employee = require("../db/model/employee");
const Message = require("../db/model/message");
const formatDate = require("./formatDate");
const matchMyId = require("./matchMyId");

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
        who: matchMyId(message.employee_id, req.session.id),
      };
      formatedMessages.push(formatedMessage);
    }
    res.render("all", {
      user,
      channels,
      messages: formatedMessages,
    });
  },

  addMessage: async (req, res) => {
    const reqData = req.body;

    await Message.create({
      content: reqData.content,
      channel_id: 1,
      employee_id: req.session.id,
    });
    res.redirect("/channels/all");
  },

  displayAdmin: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    await Message.sync();
    const channels = await Channel.findAll();
    const employees = await Employee.findAll();
    const formatedEmployees = [];
    for (const employee of employees) {
      const formatedEmployee = {
        employee_id: employee.employee_id,
        name: employee.name,
        password: employee.password,
        position_id: employee.position_id,
      };
      formatedEmployees.push(formatedEmployee);
    }
    res.render("admin", {
      user,
      channels,
      employees: formatedEmployees,
    });
  },
};

module.exports = allModel;
