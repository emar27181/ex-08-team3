const Message = require("../../../src/db/model/message");
const Channel = require("../../../src/db/model/channnel");
const Employee = require("../../../src/db/model/employee");
const Position = require("../../../src/db/model/position");
const { Op } = require("sequelize");

jest.setTimeout(20000);
describe("messages table test", () => {
  beforeEach(async () => {
    await Message.sync({ force: true });
    await Channel.sync({ force: true });
    await Employee.sync({ force: true });
    await Position.sync({ force: true });

    await Channel.create({ channel_id: 12345678, name: "a" });
    await Channel.create({ channel_id: 23456789, name: "b" });
    await Channel.create({ channel_id: 34567890, name: "c" });
    await Channel.create({ channel_id: 45678901, name: "d" });
    await Channel.create({ channel_id: 56789012, name: "e" });
    await Channel.create({ channel_id: 67890123, name: "f" });
    await Channel.create({ channel_id: 78901234, name: "g" });
    await Channel.create({ channel_id: 89012345, name: "h" });
    await Channel.create({ channel_id: 90123456, name: "i" });

    await Position.create({ position_id: 1, position: "社長" });
    await Position.create({ position_id: 2, position: "リーダー" });
    await Position.create({ position_id: 3, position: "平社員" });

    await Employee.create({ employee_id: "aa123456", name: "a" });
    await Employee.create({ employee_id: "aa234567", name: "b" });
    await Employee.create({ employee_id: "aa345678", name: "c" });
    await Employee.create({ employee_id: "aa456789", name: "d" });
    await Employee.create({ employee_id: "aa567890", name: "e" });
    await Employee.create({ employee_id: "aa678901", name: "f" });
    await Employee.create({ employee_id: "aa789012", name: "g" });
    await Employee.create({ employee_id: "aa890123", name: "h" });
    await Employee.create({ employee_id: "aa901234", name: "i" });
  });

  describe("create test", () => {
    it("add message", async () => {
      expect.assertions(5);
      const message = await Message.create({
        message_id: 12345678,
        content: "create test 1",
        time: new Date(2022, 11, 19, 9, 30),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      expect(message.message_id).toStrictEqual(12345678);
      expect(message.content).toStrictEqual("create test 1");
      expect(message.time).toStrictEqual(new Date(2022, 11, 19, 9, 30));
      expect(message.channel_id).toStrictEqual(23456789);
      expect(message.employee_id).toStrictEqual("aa345678");
    });

    it("default content", async () => {
      expect.assertions(1);
      const message = await Message.create({
        message_id: 12345678,
        time: new Date(2022, 11, 19, 9, 30),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      expect(message.content).toStrictEqual("no content");
    });

    it("default time", async () => {
      expect.assertions(1);
      const begin = new Date();
      const message = await Message.create({
        message_id: 12345678,
        content: "create test 2",
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      const now = new Date();
      const end = new Date();
      expect(now - message.time <= end - begin).toStrictEqual(true);
    });

    it("primary key test", async () => {
      expect.assertions(1);
      await Message.create({
        message_id: 12345678,
        content: "primary key test 1-1",
        time: new Date(),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      await expect(() =>
        Message.create({
          message_id: 12345678,
          content: "primary key test 1-2",
          time: new Date(),
          channel_id: 45678901,
          employee_id: "aa456789",
        })
      ).rejects.toThrow(Error);
    });

    it("auto increment test", async () => {
      expect.assertions(2);
      await Message.create({
        content: "auto increment test 1-1",
        time: new Date(),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      await Message.create({
        content: "auto increment test 1-2",
        time: new Date(),
        channel_id: 45678901,
        employee_id: "aa456789",
      });
      const messages = await Message.findAll();
      expect(messages[0].message_id).toStrictEqual(1);
      expect(messages[1].message_id).toStrictEqual(2);
    });
  });

  describe("find test", () => {
    it("findall message", async () => {
      expect.assertions(5);
      await Message.create({
        message_id: 12345678,
        content: "find test 1-1",
        time: new Date(2022, 11, 20, 23, 0),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      await Message.create({
        message_id: 13579086,
        content: "find test 1-2",
        time: new Date(2022, 11, 19, 9, 30),
        channel_id: 34567890,
        employee_id: "aa567890",
      });
      const messages = await Message.findAll();
      expect(messages[0].message_id).toStrictEqual(12345678);
      expect(messages[0].content).toStrictEqual("find test 1-1");
      expect(messages[0].time).toStrictEqual(new Date(2022, 11, 20, 23, 0));
      expect(messages[0].channel_id).toStrictEqual(23456789);
      expect(messages[0].employee_id).toStrictEqual("aa345678");
    });

    it("count message", async () => {
      expect.assertions(1);
      await Message.create({
        message_id: 12345678,
        content: "find test 1-1",
        time: new Date(2022, 11, 20, 23, 0),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      await Message.create({
        message_id: 13579086,
        content: "find test 1-2",
        time: new Date(2022, 11, 19, 9, 30),
        channel_id: 34567890,
        employee_id: "aa567890",
      });
      const count = await Message.count();
      expect(count).toStrictEqual(2);
    });
  });

  describe("delete test", () => {
    it("delete a message", async () => {
      expect.assertions(5);
      await Message.create({
        message_id: 13579086,
        content: "delete test 1-1",
        time: new Date(2022, 11, 20, 23, 0),
        channel_id: 34567890,
        employee_id: "aa567890",
      });
      await Message.create({
        message_id: 12345678,
        content: "delete test 1-2",
        time: new Date(2022, 11, 19, 9, 30),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      const first = await Message.findOne({
        where: { time: new Date(2022, 11, 20, 23, 0) },
      });
      await first.destroy();
      const messages = await Message.findAll();
      expect(messages[0].message_id).toStrictEqual(12345678);
      expect(messages[0].content).toStrictEqual("delete test 1-2");
      expect(messages[0].time).toStrictEqual(new Date(2022, 11, 19, 9, 30));
      expect(messages[0].channel_id).toStrictEqual(23456789);
      expect(messages[0].employee_id).toStrictEqual("aa345678");
    });

    it("count message", async () => {
      expect.assertions(1);
      await Message.create({
        message_id: 13579086,
        content: "delete test 2-1",
        time: new Date(2022, 11, 20, 23, 0),
        channel_id: 34567890,
        employee_id: "aa567890",
      });
      await Message.create({
        message_id: 12345678,
        content: "delete test 2-2",
        time: new Date(2022, 11, 19, 9, 30),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      const first = await Message.findOne({
        where: { time: new Date(2022, 11, 20, 23, 0) },
      });
      await first.destroy();
      const count = await Message.count();
      expect(count).toStrictEqual(1);
    });

    it("delete some messages", async () => {
      expect.assertions(3);
      await Message.create({
        message_id: 12345678,
        content: "delete test 3-1",
        time: new Date(2022, 1, 1),
        channel_id: 12345678,
        employee_id: "aa123456",
      });
      await Message.create({
        message_id: 23456789,
        content: "delete test 3-2",
        time: new Date(2022, 2, 2),
        channel_id: 23456789,
        employee_id: "aa234567",
      });
      await Message.create({
        message_id: 34567890,
        content: "delete test 3-3",
        time: new Date(2020, 3, 3),
        channel_id: 34567890,
        employee_id: "aa345678",
      });
      await Message.create({
        message_id: 45678901,
        content: "delete test 3-4",
        time: new Date(2022, 4, 4),
        channel_id: 45678901,
        employee_id: "aa456789",
      });
      await Message.destroy({
        where: {
          time: {
            [Op.gte]: new Date(2022, 0, 0, 0, 0, 0),
            [Op.lt]: new Date(2023, 0, 0, 0, 0, 0),
          },
        },
      });
      const messages = await Message.findAll();
      const count = await Message.count();
      expect(count).toStrictEqual(1);
      expect(messages[0].content).toStrictEqual("delete test 3-3");
      expect(messages[0].time.getFullYear()).toStrictEqual(2020);
    });
  });

  describe("update test", () => {
    it("edit message by message id", async () => {
      expect.assertions(2);
      await Message.create({
        message_id: 12345678,
        content: "update test 1-1",
        time: new Date(2022, 11, 19, 9, 30),
        channel_id: 23456789,
        employee_id: "aa345678",
      });
      await Message.create({
        message_id: 45678901,
        content: "update test 1-2",
        time: new Date(2022, 11, 20, 23, 0),
        channel_id: 56789012,
        employee_id: "aa567890",
      });
      const bef = await Message.findOne({
        where: { message_id: 12345678 },
      });
      await Message.update(
        { content: "updated content" },
        {
          where: { message_id: 12345678 },
        }
      );
      const aft = await Message.findOne({
        where: { message_id: 12345678 },
      });
      expect(bef.content).toStrictEqual("update test 1-1");
      expect(aft.content).toStrictEqual("updated content");
    });
  });
});
