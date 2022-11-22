const { DataTypes } = require("sequelize");
const sequelize = require("./connect");

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

module.exports = Member;
