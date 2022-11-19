const { DataTypes } = require("sequelize");
const sequelize = require("./connect");
// const Channels = require("./channels.model");
// const Employees = require("./employees.model");

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

// Member.belongsTo(Channels, {foreignkey: 'channel_id'});
// Member.belongsTo(Employees, {foreignkey: 'employee_id'});

module.exports = Member;
