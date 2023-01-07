const {
  Position,
  Employee,
  GroupEmployees,
  Group,
  AllMessage,
  GroupMessage,
  DirectMessage,
} = require("./model");
const createInitialData = require("./initialData");

(async () => {
  await Position.sync({ force: true });
  await Employee.sync({ force: true });
  await AllMessage.sync({ force: true });
  await Group.sync({ force: true });
  await GroupEmployees.sync({ force: true });
  await GroupMessage.sync({ force: true });
  await DirectMessage.sync({ force: true });
  await createInitialData();
})();
