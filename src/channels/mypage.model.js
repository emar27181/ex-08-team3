const Channel = require("../db/model/channnel");
const Employee = require("../db/model/employee");

const mypageModel = {
  displayMypage: async (req, res) => {
    const user = await Employee.findOne({
      where: { employee_id: req.session.id },
    });
    const channels = await Channel.findAll();
    const employees = await Employee.findAll();
    const formatedEmployees = [];
    for (const employee of employees) {
      const formatedEmployee = {
        employee_id: employee.employee_id,
        name: employee.name,
        password: employee.passwoed,
        position_id: employee.position_id,
      };
      formatedEmployees.push(formatedEmployee);
    }
    res.render("mypage", {
      user,
      channels,
      employees: formatedEmployees,
    });
  },
};

module.exports = mypageModel;
