const Channel = require("./model/channnel");
const Employee = require("./model/employee");
const Message = require("./model/message");
const Position = require("./model/position");

const createInitialData = async () => {
  await createPositionData();
  await createEmployeeData();
  await createChannel();
  await createMessage();
};

const createPositionData = async () => {
  await Position.create({
    position_id: 1,
    position: "社長",
  });
  await Position.create({
    position_id: 2,
    position: "リーダー",
  });
  await Position.create({
    position_id: 3,
    position: "平社員",
  });
};

const createEmployeeData = async () => {
  await Employee.create({
    employee_id: "ee000000",
    name: "takeyama",
    password: "password",
    position_id: 1,
  });
  await Employee.create({
    employee_id: "ee111111",
    name: "iguchi",
    password: "hogehoge",
    position_id: 2,
  });
  await Employee.create({
    employee_id: "ee222222",
    name: "reishi",
    password: "foobar",
    position_id: 2,
  });
  await Employee.create({
    employee_id: "ee333333",
    name: "fumito",
    password: "hogehogehoge",
    position_id: 3,
  });
  await Employee.create({
    employee_id: "ee444444",
    name: "takeuchi",
    password: "fugafuga",
    position_id: 3,
  });
  await Employee.create({
    employee_id: "ee555555",
    name: "akito",
    password: "fugafuga",
    position_id: 3,
  });
  await Employee.create({
    employee_id: "ee666666",
    name: "mochi",
    password: "barbaz",
    position_id: 3,
  });
};

const createChannel = async () => {
  await Channel.create({
    name: "all",
  });
  await Channel.create({
    name: "me",
  });
};

const createMessage = async () => {
  await Message.create({
    content: "initial message",
    time: new Date(),
    employee_id: "ee000000",
    channel_id: 1,
  });
  await Message.create({
    content: "second message",
    time: new Date(),
    employee_id: "ee111111",
    channel_id: 1,
  });

  await Message.create({
    content: "initial message(channel_id=2)",
    time: new Date(),
    employee_id: "ee000000",
    channel_id: 2,
  });
  await Message.create({
    content: "second message(channel_id=2)",
    time: new Date(),
    employee_id: "ee111111",
    channel_id: 2,
  });
};

module.exports = createInitialData;
