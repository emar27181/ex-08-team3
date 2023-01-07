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
  await GroupEmployees.create({
    GroupId: group1.id,
    EmployeeId: "ee000000",
  });
  await GroupEmployees.create({
    GroupId: group1.id,
    EmployeeId: "ee111111",
  });
  await GroupEmployees.create({
    GroupId: group1.id,
    EmployeeId: "ee222222",
  });
  // group2に従業員を追加
  await GroupEmployees.create({
    GroupId: group2.id,
    EmployeeId: "ee333333",
  });;
  await GroupEmployees.create({
    GroupId: group2.id,
    EmployeeId: "ee444444",
  });
  await GroupEmployees.create({
    GroupId: group2.id,
    EmployeeId: "ee555555",
  });
  await GroupEmployees.create({
    GroupId: group2.id,
    EmployeeId: "ee666666",
  });
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
    GroupId: 1,
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
