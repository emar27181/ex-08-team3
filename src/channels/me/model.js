const { Op } = require("sequelize");
const {
  Employee,
  GroupEmployees,
  Group,
  DirectMessage,
} = require("../../db/model");
const formatDate = require("../formatDate");
const matchMyId = require("../matchMyId");

const groupModel = {
  display: async (req, res) => {
    // ログインしているユーザーの取得
    const user = await Employee.findOne({
      where: { id: req.session.id },
    });
    const receiver = await Employee.findOne({
      where: { id: req.params.id },
    });
    if (receiver === null) {
      // receiverのidがなかったとき
      res.status(400).send("bad request").end();
      return;
    }
    const JoinChannels = await GroupEmployees.findAll({
      where: { EmployeeId: req.session.id },
    });
    const joinChannelsId = [];
    for (const JoinChannel of JoinChannels) {
      joinChannelsId.push(JoinChannel.GroupId);
    }
    const channels = await Group.findAll({
      where: { id: joinChannelsId },
    });
    const messages = await DirectMessage.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { EmployeeId: req.session.id },
              { receiver: receiver.id },
            ],
          },
          {
            [Op.and]: [
              { EmployeeId: receiver.id },
              { receiver: req.session.id },
            ],
          },
        ],
      },
      include: Employee,
    });
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
    res.render("directMessage", {
      user,
      channels,
      receiver,
      messages: formatedMessages,
    });
  },

  add: async (req, res) => {
    const reqData = req.body;
    const employee = await Employee.findOne({
      where: { id: req.params.id },
    });

    if (employee === null) {
      res.status(400).send("bad request").end();
      return;
    }
    await DirectMessage.create({
      content: reqData.content,
      receiver: employee.id,
      EmployeeId: req.session.id,
    });
    res.redirect(`/channels/me/employees/${req.params.id}`);
  },
};

module.exports = groupModel;
