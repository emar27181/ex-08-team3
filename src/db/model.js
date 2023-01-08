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

// PositionテーブルとEmployeeテーブルの関連付け
// 一対多
Position.hasMany(Employee, {
  foreignKey: {
    defaultValue: 3,
  },
});
Employee.belongsTo(Position);

// 全体向けメッセージのテーブルを定義
const AllMessage = sequelize.define("AllMessage", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "no content",
  },
});

// EmployeeとGroupMessageの関連付け
// 一対多
Employee.hasMany(AllMessage);
AllMessage.belongsTo(Employee);

// グループのテーブルを定義
const Group = sequelize.define("Group", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "no name",
  },
});

// GroupとEmployeeの中間テーブル
const GroupEmployees = sequelize.define("GroupEmployees", {});

// GroupとEmployeeの関連付け
// 多対多
Group.belongsToMany(Employee, { through: GroupEmployees });
Employee.belongsToMany(Group, { through: GroupEmployees });

// Groupのメッセージテーブルを定義
const GroupMessage = sequelize.define("GroupMessage", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "no content",
  },
});

// EmployeeとGroupMessageの関連付け
// 一対多
Employee.hasMany(GroupMessage);
GroupMessage.belongsTo(Employee);

// GroupとGroupMessageの関連付け
// 一対多
Group.hasMany(GroupMessage);
GroupMessage.belongsTo(Group);

// DirectMessageのテーブルの定義
const DirectMessage = sequelize.define("DirectMessage", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "no content",
  },
  // メッセージの受信相手のidを保存
  receiver: {
    type: DataTypes.STRING,
    validate: {
      is: /[a-z][a-z][0-9]{6}/u,
    },
  },
});

// EmplyeeとDirectMessageの関連付け
// 一対多
Employee.hasMany(DirectMessage);
DirectMessage.belongsTo(Employee);

module.exports = {
  Position,
  Employee,
  AllMessage,
  Group,
  GroupEmployees,
  GroupMessage,
  DirectMessage,
};
