const Channel = require("../db/model/channnel");
const Employee = require("../db/model/employee");
const Message = require("../db/model/message");

const gadminModel = {
  displayGAdmin: async (req, res) => {
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
    res.render("group_admin", {
      user,
      channels,
      employees: formatedEmployees,
    });
  },
};

module.exports = gadminModel;
