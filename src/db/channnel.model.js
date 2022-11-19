const { DataTypes } = require("sequelize");
const sequelize = require("./connect");

const Channel = sequelize.define("Channel", {
  channle_id: {
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
