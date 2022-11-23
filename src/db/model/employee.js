const { DataTypes } = require("sequelize");
const sequelize = require("../connect");
const Position = require("./position");

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
    defaultValue: 3,
  },
});

Position.hasMany(Employee, { foreignKey: "position_id" });
Employee.belongsTo(Position);

module.exports = Employee;
