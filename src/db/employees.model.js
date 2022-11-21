const { DataTypes } = require("sequelize");
const sequelize = require("./connect");

const Employee = sequelize.define("Employee", {
  employee_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    validate: {
      is: /[a-z][a-z][0-9]{6}/u,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "unsettled name",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "password",
  },
  position_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      is: /[0-2]/u,
    },
    defaultValue: 2,
  },
});

module.exports = Employee;
