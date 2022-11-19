const { DataTypes } = require("sequelize");
const sequelize = require("./connect");

const Message = sequelize.define("Message", {
  message_id: DataTypes.INTEGER,
  content: DataTypes.TEXT,
  time: DataTypes.DATE,
  channel_id: DataTypes.INTEGER,
  employee_id: DataTypes.INTEGER,
});

module.exports = Message;
