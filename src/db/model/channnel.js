const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

const Channel = sequelize.define("Channel", {
  channel_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "no name",
  },
});

module.exports = Channel;
