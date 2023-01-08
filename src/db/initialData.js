const {
  Position,
  Employee,
  GroupEmployees,
  Group,
  AllMessage,
  GroupMessage,
  DirectMessage,
} = require("./model");

const createInitialData = async () => {
  await Position.sync();
  await Employee.sync();
  await AllMessage.sync();
  await Group.sync();
  await GroupEmployees.sync();
  await GroupMessage.sync();
  await DirectMessage.sync();
  await createPositionData();
  await createEmployeeData();
  await createGroup();
  await createMessage();
};

const createPositionData = async () => {
  await Position.create({
    id: 1,
    position: "社長",
  });
  await Position.create({
    id: 2,
    position: "リーダー",
  });
  await Position.create({
    id: 3,
    position: "平社員",
  });
};

const createEmployeeData = async () => {
  await Employee.create({
    id: "ee000000",
    name: "takeyama",
    password: "password",
    PositionId: 1,
  });
  await Employee.create({
    id: "ee111111",
    name: "iguchi",
    password: "hogehoge",
    PositionId: 2,
  });
  await Employee.create({
    id: "ee222222",
    name: "reishi",
    password: "foobar",
    PositionId: 2,
  });
  await Employee.create({
    id: "ee333333",
    name: "fumito",
    password: "hogehogehoge",
    PositionId: 3,
  });
  await Employee.create({
    id: "ee444444",
    name: "takeuchi",
    password: "fugafuga",
    PositionId: 3,
  });
  await Employee.create({
    id: "ee555555",
    name: "akito",
    password: "fugafuga",
    PositionId: 3,
  });
  await Employee.create({
    id: "ee666666",
    name: "mochi",
    password: "barbaz",
    PositionId: 3,
  });
};

const createGroup = async () => {
  // group1の作成
  const group1 = await Group.create({
    name: "group1",
  });
  // group2の作成
  const group2 = await Group.create({
    name: "group2",
  });

  // group1に従業員を追加
  const employee0 = await Employee.findOne({
    where: {
      id: "ee000000",
    },
  });
  await employee0.addGroup(group1, { through: { selfGranted: false } });
  const employee1 = await Employee.findOne({
    where: {
      id: "ee111111",
    },
  });
  await employee1.addGroup(group1, { through: { selfGranted: false } });
  const employee2 = await Employee.findOne({
    where: {
      id: "ee222222",
    },
  });
  await employee2.addGroup(group1, { through: { selfGranted: false } });
  // group2に従業員を追加
  const employee3 = await Employee.findOne({
    where: {
      id: "ee333333",
    },
  });
  await employee3.addGroup(group2, { through: { selfGranted: false } });
  const employee4 = await Employee.findOne({
    where: {
      id: "ee444444",
    },
  });
  await employee4.addGroup(group2, { through: { selfGranted: false } });
  const employee5 = await Employee.findOne({
    where: {
      id: "ee555555",
    },
  });
  await employee5.addGroup(group2, { through: { selfGranted: false } });
  const employee6 = await Employee.findOne({
    where: {
      id: "ee666666",
    },
  });
  await employee6.addGroup(group2, { through: { selfGranted: false } });
};

const createMessage = async () => {
  // 全体向けメッセージの追加
  await AllMessage.create({
    content: "initial message(all)",
    EmployeeId: "ee000000",
  });
  await AllMessage.create({
    content: "second message(all)",
    EmployeeId: "ee111111",
  });

  // group1のメッセージの追加
  await GroupMessage.create({
    content: "initial message(group1)",
    EmployeeId: "ee000000",
    GroupId: 1,
  });
  await GroupMessage.create({
    content: "second message(group1)",
    EmployeeId: "ee111111",
    GroupId: 1,
  });

  // group2のメッセージの追加
  await GroupMessage.create({
    content: "initial message(group2)",
    EmployeeId: "ee333333",
    GroupId: 2,
  });
  await GroupMessage.create({
    content: "second message(group2)",
    EmployeeId: "ee444444",
    GroupId: 2,
  });

  // DMの追加
  await DirectMessage.create({
    content: "initial message(ee000000-ee111111)",
    EmployeeId: "ee000000",
    receiver: "ee111111",
  });
  await DirectMessage.create({
    content: "second message(ee000000-ee111111)",
    EmployeeId: "ee111111",
    receiver: "ee000000",
  });
  await DirectMessage.create({
    content: "initial message(ee000000-ee222222)",
    EmployeeId: "ee000000",
    receiver: "ee222222",
  });
  await DirectMessage.create({
    content: "second message(ee000000-ee222222)",
    EmployeeId: "ee222222",
    receiver: "ee000000",
  });
};

module.exports = createInitialData;
