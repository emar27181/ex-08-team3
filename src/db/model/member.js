const { DataTypes } = require("sequelize");
const sequelize = require("../connect");
const Channel = require("./channnel");
const Employee = require("./employee");

const Member = sequelize.define("Member", {
  channel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Channel.hasMany(Member, { foreignKey: "channel_id" });
Member.belongsTo(Employee);

Employee.hasMany(Member, { foreignKey: "employee_id" });
Member.belongsTo(Channel);

module.exports = Member;
