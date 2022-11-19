const { DataTypes } = require("sequelize");
const sequelize = require("./connect");

const Channel = sequelize.define("Channel", {
  channle_id: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.TEXT,
  },
});

module.exports = Channel;
