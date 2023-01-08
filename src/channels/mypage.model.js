const { Employee, GroupEmployees, Group } = require("../db/model");

const mypageModel = {
  displayMypage: async (req, res) => {
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
    res.render("mypage", {
      user,
      channels,
    });
  },

  editName: async (req, res) => {
    const reqData = req.body;
    const user = await Employee.findOne({
      where: { id: req.session.id },
    });

    user.name = reqData.new_name;
    user.save();

    res.redirect("/mypage");
  },

  editPassword: async (req, res) => {
    const reqData = req.body;
    const user = await Employee.findOne({
      where: { id: req.session.id },
    });

    user.password = reqData.new_password;
    user.save();

    res.redirect("/mypage");
  },
};

module.exports = mypageModel;
