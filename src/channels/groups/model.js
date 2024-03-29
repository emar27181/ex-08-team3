const {
  Employee,
  GroupEmployees,
  Group,
  GroupMessage,
} = require("../../db/model");
const formatDate = require("../formatDate");
const matchMyId = require("../matchMyId");

const groupModel = {
  redirectToGroupMessages: (req, res) => {
    res.redirect(`/channels/groups/${req.params.id}/messages`);
  },
  displayGruopPage: async (req, res) => {
    // ログインしているユーザーの取得
    const user = await Employee.findOne({
      where: { id: req.session.id },
    });
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
    // params.idからグループを取得
    const group = await Group.findOne({
      where: { id: req.params.id },
    });
    const messages = await GroupMessage.findAll({
      where: { GroupId: group.id },
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
    res.render("group", {
      user,
      channels,
      chname: group,
      messages: formatedMessages,
    });
  },

  addMessage: async (req, res) => {
    const reqData = req.body;
    const group = await Group.findOne({
      where: { id: req.params.id },
    });

    if (group !== null) {
      await GroupMessage.create({
        content: reqData.content,
        GroupId: group.id,
        EmployeeId: req.session.id,
      });
    }

    res.redirect(`/channels/groups/${req.params.id}/messages`);
  },
};

module.exports = groupModel;
