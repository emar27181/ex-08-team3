const Channel = require("./model/channnel");
const Employee = require("./model/employee");
const Member = require("./model/member");
const Message = require("./model/message");
const Position = require("./model/position");
const createInitialData = require("./initialData");

(async () => {
  await Channel.sync({ force: true });
  await Employee.sync({ force: true });
  await Member.sync({ force: true });
  await Message.sync({ force: true });
  await Position.sync({ force: true });
  await createInitialData();
  const employees = await Employee.findAll();
})();
