const { Position, Employee, DirectMessage } = require("../../../src/db/model");
const { Op } = require("sequelize");

jest.setTimeout(20000);
describe("messages table test", () => {
  beforeEach(async () => {
    await DirectMessage.sync({ force: true });
    await Employee.sync({ force: true });
    await Position.sync({ force: true });

    await Position.create({ id: 1, position: "社長" });
    await Position.create({ id: 2, position: "リーダー" });
    await Position.create({ id: 3, position: "平社員" });

    await Employee.create({ id: "aa000000", name: "a" });
    await Employee.create({ id: "aa111111", name: "b" });
    await Employee.create({ id: "bb000000", name: "c" });
    await Employee.create({ id: "bb111111", name: "d" });
    await Employee.create({ id: "cc000000", name: "e" });
    await Employee.create({ id: "cc111111", name: "f" });
    await Employee.create({ id: "cc222222", name: "g" });
  });

  describe("create test", () => {
    it("add message", async () => {
      expect.assertions(4);
      const message = await DirectMessage.create({
        id: 12345678,
        content: "create test 1",
        receiver: "cc222222",
        EmployeeId: "aa000000",
      });
      expect(message.id).toStrictEqual(12345678);
      expect(message.content).toStrictEqual("create test 1");
      expect(message.receiver).toStrictEqual("cc222222");
      expect(message.EmployeeId).toStrictEqual("aa000000");
    });

    it("default content", async () => {
      expect.assertions(1);
      const message = await DirectMessage.create({
        id: 12345678,
        receiver: "cc222222",
        EmployeeId: "aa000000",
      });
      expect(message.content).toStrictEqual("no content");
    });

    it("validation test", async () => {
      expect.assertions(1);
      await expect(() =>
        DirectMessage.create({
          id: 12345678,
          content: "primary key test 1-2",
          receiver: "hogehoge",
          EmployeeId: "aa456789",
        })
      ).rejects.toThrow(Error);
    });

    it("foregin key test", async () => {
      expect.assertions(1);
      await expect(() =>
        DirectMessage.create({
          id: 12345678,
          content: "primary key test 1-2",
          receiver: 45678901,
          EmployeeId: "aa123456",
        })
      ).rejects.toThrow(Error);
    });
  });

  describe("find test", () => {
    it("findall message", async () => {
      expect.assertions(4);
      await DirectMessage.create({
        id: 12345678,
        content: "find test 1-1",
        receiver: "cc222222",
        EmployeeId: "aa111111",
      });
      await DirectMessage.create({
        id: 13579086,
        content: "find test 1-2",
        receiver: "cc111111",
        EmployeeId: "bb000000",
      });
      const messages = await DirectMessage.findAll();
      expect(messages[0].id).toStrictEqual(12345678);
      expect(messages[0].content).toStrictEqual("find test 1-1");
      expect(messages[0].receiver).toStrictEqual("cc222222");
      expect(messages[0].EmployeeId).toStrictEqual("aa111111");
    });

    it("count message", async () => {
      expect.assertions(1);
      await DirectMessage.create({
        id: 12345678,
        content: "find test 1-1",
        receiver: "cc222222",
        EmployeeId: "cc000000",
      });
      await DirectMessage.create({
        id: 13579086,
        content: "find test 1-2",
        receiver: "cc222222",
        EmployeeId: "cc111111",
      });
      const count = await DirectMessage.count();
      expect(count).toStrictEqual(2);
    });
  });

  describe("delete test", () => {
    it("delete a message", async () => {
      expect.assertions(4);
      await DirectMessage.create({
        id: 13579086,
        content: "delete test 1-1",
        receiver: "cc222222",
        employee_id: "aa111111",
      });
      await DirectMessage.create({
        id: 12345678,
        content: "delete test 1-2",
        receiver: "cc111111",
        EmployeeId: "aa000000",
      });
      const first = await DirectMessage.findOne({
        where: { id: 13579086 },
      });
      await first.destroy();
      const messages = await DirectMessage.findAll();
      expect(messages[0].id).toStrictEqual(12345678);
      expect(messages[0].content).toStrictEqual("delete test 1-2");
      expect(messages[0].receiver).toStrictEqual("cc111111");
      expect(messages[0].EmployeeId).toStrictEqual("aa000000");
    });

    it("count message", async () => {
      expect.assertions(1);
      await DirectMessage.create({
        id: 13579086,
        content: "delete test 2-1",
        receiver: "aa111111",
        EmployeeId: "cc111111",
      });
      await DirectMessage.create({
        id: 12345678,
        content: "delete test 2-2",
        receiver: "aa111111",
        EmployeeId: "cc222222",
      });
      const first = await DirectMessage.findOne({
        where: { id: 13579086 },
      });
      await first.destroy();
      const count = await DirectMessage.count();
      expect(count).toStrictEqual(1);
    });

    it("delete some messages", async () => {
      expect.assertions(2);
      await DirectMessage.create({
        id: 12345678,
        content: "delete test 3-1",
        receiver: "bb111111",
        EmployeeId: "aa111111",
      });
      await DirectMessage.create({
        id: 12345679,
        content: "delete test 3-2",
        receiver: "aa111111",
        EmployeeId: "bb111111",
      });
      await DirectMessage.create({
        id: 12345680,
        content: "delete test 3-3",
        receiver: "bb111111",
        EmployeeId: "aa111111",
      });
      await DirectMessage.create({
        id: 45678901,
        content: "delete test 3-4",
        receiver: "aa111111",
        EmployeeId: "aa000000",
      });
      await DirectMessage.destroy({
        where: {
          id: {
            [Op.gte]: 12345678,
            [Op.lt]: 12345681,
          },
        },
      });
      const messages = await DirectMessage.findAll();
      const count = await DirectMessage.count();
      expect(count).toStrictEqual(1);
      expect(messages[0].content).toStrictEqual("delete test 3-4");
    });
  });

  describe("update test", () => {
    it("edit message by message id", async () => {
      expect.assertions(2);
      await DirectMessage.create({
        id: 12345678,
        content: "update test 1-1",
        receiver: "aa111111",
        EmployeeId: "aa000000",
      });
      await DirectMessage.create({
        id: 45678901,
        content: "update test 1-2",
        receiver: "aa111111",
        EmployeeId: "bb111111",
      });
      const bef = await DirectMessage.findOne({
        where: { id: 12345678 },
      });
      await DirectMessage.update(
        { content: "updated content" },
        {
          where: { id: 12345678 },
        }
      );
      const aft = await DirectMessage.findOne({
        where: { id: 12345678 },
      });
      expect(bef.content).toStrictEqual("update test 1-1");
      expect(aft.content).toStrictEqual("updated content");
    });
  });
});
