const { Employee, GroupEmployees, Group, AllMessage } = require("../db/model");
const formatDate = require("./formatDate");
const matchMyId = require("./matchMyId");

const allModel = {
  displayMessage: async (req, res) => {
    const user = await Employee.findOne({
      where: { id: req.session.id },
    });
    const channelsJoin = await GroupEmployees.findAll({
      where: { EmployeeId: req.session.id },
    });
    await AllMessage.sync();
    const channels = await Group.findAll();
    const messages = await AllMessage.findAll();
    const formatedMessages = [];
    for (const message of messages) {
      const formatedMessage = {
        content: message.content,
        time: formatDate(message.createdAt),
        message_id: message.id,
        channel_id: message.GroupId,
        employee_id: message.Employee.name,
        who: matchMyId(message.EmployeeId, req.session.id),
      };
      formatedMessages.push(formatedMessage);
    }
    res.render("all", {
      user,
      channelsJoin,
      channels,
      messages: formatedMessages,
    });
  },

  addMessage: async (req, res) => {
    const reqData = req.body;

    await AllMessage.create({
      content: reqData.content,
      EmployeeId: req.session.id,
    });
    res.redirect("/channels/all");
  },

  displayAdmin: async (req, res) => {
    const user = await Employee.findOne({
      where: { id: req.session.id },
    });
    const channelsJoin = await GroupEmployees.findAll({
      where: { id: req.session.id },
    });
    await AllMessage.sync();
    const channels = await Group.findAll();
    const employees = await Employee.findAll();
    const formatedEmployees = [];
    for (const employee of employees) {
      const formatedEmployee = {
        employee_id: employee.id,
        name: employee.name,
        password: employee.password,
        position_id: employee.PositionId,
      };
      formatedEmployees.push(formatedEmployee);
    }
    res.render("admin", {
      user,
      channelsJoin,
      channels,
      employees: formatedEmployees,
    });
  },
};

module.exports = allModel;
