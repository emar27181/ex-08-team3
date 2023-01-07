const { Position, Employee, AllMessage } = require("../../../src/db/model");
const { Op } = require("sequelize");

jest.setTimeout(20000);
describe("messages table test", () => {
  beforeEach(async () => {
    await AllMessage.sync({ force: true });
    await Employee.sync({ force: true });
    await Position.sync({ force: true });

    await Position.create({ id: 1, position: "社長" });
    await Position.create({ id: 2, position: "リーダー" });
    await Position.create({ id: 3, position: "平社員" });

    await Employee.create({ id: "aa123456", name: "a" });
    await Employee.create({ id: "aa234567", name: "b" });
    await Employee.create({ id: "aa345678", name: "c" });
    await Employee.create({ id: "aa456789", name: "d" });
    await Employee.create({ id: "aa567890", name: "e" });
    await Employee.create({ id: "aa678901", name: "f" });
    await Employee.create({ id: "aa789012", name: "g" });
    await Employee.create({ id: "aa890123", name: "h" });
    await Employee.create({ id: "aa901234", name: "i" });
  });

  describe("create test", () => {
    it("add message", async () => {
      expect.assertions(3);
      const message = await AllMessage.create({
        id: 12345678,
        content: "create test 1",
        EmployeeId: "aa345678",
      });
      expect(message.id).toStrictEqual(12345678);
      expect(message.content).toStrictEqual("create test 1");
      expect(message.EmployeeId).toStrictEqual("aa345678");
    });

    it("default content", async () => {
      expect.assertions(1);
      const message = await AllMessage.create({
        id: 12345678,
        EmployeeId: "aa345678",
      });
      expect(message.content).toStrictEqual("no content");
    });

    it("primary key test", async () => {
      expect.assertions(1);
      await AllMessage.create({
        id: 12345678,
        content: "primary key test 1-1",
        EmployeeId: "aa345678",
      });
      await expect(() =>
        AllMessage.create({
          id: 12345678,
          content: "primary key test 1-2",
          EmployeeId: "aa456789",
        })
      ).rejects.toThrow(Error);
    });

    it("auto increment test", async () => {
      expect.assertions(2);
      await AllMessage.create({
        content: "auto increment test 1-1",
        EmployeeId: "aa345678",
      });
      await AllMessage.create({
        content: "auto increment test 1-2",
        EmployeeId: "aa456789",
      });
      const messages = await AllMessage.findAll();
      expect(messages[0].id).toStrictEqual(1);
      expect(messages[1].id).toStrictEqual(2);
    });
  });

  describe("find test", () => {
    it("findall message", async () => {
      expect.assertions(3);
      await AllMessage.create({
        id: 12345678,
        content: "find test 1-1",
        EmployeeId: "aa345678",
      });
      await AllMessage.create({
        id: 13579086,
        content: "find test 1-2",
        EmployeeId: "aa567890",
      });
      const messages = await AllMessage.findAll();
      expect(messages[0].id).toStrictEqual(12345678);
      expect(messages[0].content).toStrictEqual("find test 1-1");
      expect(messages[0].EmployeeId).toStrictEqual("aa345678");
    });

    it("count message", async () => {
      expect.assertions(1);
      await AllMessage.create({
        id: 12345678,
        content: "find test 1-1",
        EmployeeId: "aa345678",
      });
      await AllMessage.create({
        id: 13579086,
        content: "find test 1-2",
        EmployeeId: "aa567890",
      });
      const count = await AllMessage.count();
      expect(count).toStrictEqual(2);
    });
  });

  describe("delete test", () => {
    it("delete a message", async () => {
      expect.assertions(3);
      await AllMessage.create({
        id: 13579086,
        content: "delete test 1-1",
        EmployeeId: "aa567890",
      });
      await AllMessage.create({
        id: 12345678,
        content: "delete test 1-2",
        EmployeeId: "aa345678",
      });
      const first = await AllMessage.findOne({
        where: { id: 13579086 },
      });
      await first.destroy();
      const messages = await AllMessage.findAll();
      expect(messages[0].id).toStrictEqual(12345678);
      expect(messages[0].content).toStrictEqual("delete test 1-2");
      expect(messages[0].EmployeeId).toStrictEqual("aa345678");
    });

    it("count message", async () => {
      expect.assertions(1);
      await AllMessage.create({
        id: 13579086,
        content: "delete test 2-1",
        EmployeeId: "aa567890",
      });
      await AllMessage.create({
        id: 12345678,
        content: "delete test 2-2",
        EmployeeId: "aa345678",
      });
      const first = await AllMessage.findOne({
        where: { id: 13579086 },
      });
      await first.destroy();
      const count = await AllMessage.count();
      expect(count).toStrictEqual(1);
    });

    it("delete some messages", async () => {
      expect.assertions(2);
      await AllMessage.create({
        id: 12345678,
        content: "delete test 3-1",
        EmployeeId: "aa123456",
      });
      await AllMessage.create({
        id: 23456789,
        content: "delete test 3-2",
        EmployeeId: "aa234567",
      });
      await AllMessage.create({
        id: 34567890,
        content: "delete test 3-3",
        EmployeeId: "aa345678",
      });
      await AllMessage.create({
        id: 45678901,
        content: "delete test 3-4",
        EmployeeId: "aa456789",
      });
      await AllMessage.destroy({
        where: {
          id: {
            [Op.gte]: 12345678,
            [Op.lt]: 45678901,
          },
        },
      });
      const messages = await AllMessage.findAll();
      const count = await AllMessage.count();
      expect(count).toStrictEqual(1);
      expect(messages[0].content).toStrictEqual("delete test 3-4");
    });
  });

  describe("update test", () => {
    it("edit message by message id", async () => {
      expect.assertions(2);
      await AllMessage.create({
        id: 12345678,
        content: "update test 1-1",
        EmployeeId: "aa345678",
      });
      await AllMessage.create({
        id: 45678901,
        content: "update test 1-2",
        EmployeeId: "aa567890",
      });
      const bef = await AllMessage.findOne({
        where: { id: 12345678 },
      });
      await AllMessage.update(
        { content: "updated content" },
        {
          where: { id: 12345678 },
        }
      );
      const aft = await AllMessage.findOne({
        where: { id: 12345678 },
      });
      expect(bef.content).toStrictEqual("update test 1-1");
      expect(aft.content).toStrictEqual("updated content");
    });
  });
});
