const { DataTypes } = require("sequelize");
const sequelize = require("./connect");

// Positionsテーブルの定義
const Position = sequelize.define("Position", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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

// Employeeテーブルの定義
const Employee = sequelize.define("Employee", {
  id: {
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
});

// PositionテーブルｔｐEmployeeテーブルの関連付け
// 一対多
Position.hasMany(Employee, {
  foreignKey: {
    defaultValue: 3,
  },
});
Employee.belongsTo(Position);

module.exports = {
  Position,
  Employee,
};
