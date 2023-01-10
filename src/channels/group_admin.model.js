const { Employee, GroupEmployees, Group } = require("../db/model");

const gadminModel = {
  displayGAdmin: async (req, res) => {
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
    const employees = await Employee.findAll({
      order: [["id", "asc"]],
    });
    const chname = await Group.findOne({
      where: { id: req.params.id },
    });
    const members = await GroupEmployees.findAll({
      where: { GroupId: req.params.id },
    });
    const formatedGroupMembers = [];
    const formatedEmployees = [];
    for (const member of members) {
      const formatedGroupMember = {
        channel_id: chname.GroupId,
        employee_id: member.EmployeeId,
      };
      formatedGroupMembers.push(formatedGroupMember);
    }
    for (const employee of employees) {
      const formatedEmployee = {
        employee_id: employee.id,
        name: employee.name,
        password: employee.password,
        position_id: employee.PositionId,
      };
      formatedEmployees.push(formatedEmployee);
    }
    res.render("group_admin", {
      user,
      channels,
      chname,
      members: formatedGroupMembers,
      employees: formatedEmployees,
    });
  },

  editGMember: async (req, res) => {
    const reqData = req.body;

    let btnkey = "";
    let memid = "";
    for (const [key, value] of Object.entries(reqData)) {
      btnkey = `${key}`;
      memid = `${value}`;
    }
    const member = await GroupEmployees.findOne({
      where: {
        GroupId: req.params.id,
        EmployeeId: memid,
      },
    });

    if (btnkey === "g_add") {
      await GroupEmployees.create({
        GroupId: req.params.id,
        EmployeeId: memid,
      });
    } else if (btnkey === "g_del") {
      member.destroy();
    }
    res.redirect(`/channels/groups/${req.params.id}/members`);
  },
};

module.exports = gadminModel;
