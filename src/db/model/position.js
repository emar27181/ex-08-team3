const { DataTypes } = require("sequelize");
const sequelize = require("../connect");

const Position = sequelize.define("Position", {
  position_id: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "平社員",
    validate: {
      isIn: [["社長", "リーダー", "平社員"]],
    },
  },
});

module.exports = Position;
