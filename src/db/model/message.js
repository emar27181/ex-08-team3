const { DataTypes } = require("sequelize");
const sequelize = require("../connect");
const Channel = require("./channnel");
const Employee = require("./employee");

const Message = sequelize.define("Message", {
  message_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "no content",
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  channel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Channel.hasMany(Message, { foreignKey: "channel_id" });
Message.belongsTo(Employee);

Employee.hasMany(Message, { foreignKey: "employee_id" });
Message.belongsTo(Channel);

module.exports = Message;
