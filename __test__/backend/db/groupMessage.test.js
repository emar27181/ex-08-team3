const {
  Group,
  Position,
  Employee,
  GroupMessage,
} = require("../../../src/db/model");
const { Op } = require("sequelize");

jest.setTimeout(20000);
describe("messages table test", () => {
  beforeEach(async () => {
    await GroupMessage.sync({ force: true });
    await Group.sync({ force: true });
    await Employee.sync({ force: true });
    await Position.sync({ force: true });

    await Group.create({ name: "a" });
    await Group.create({ name: "b" });
    await Group.create({ name: "c" });

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
      const message = await GroupMessage.create({
        id: 12345678,
        content: "create test 1",
        GroupId: 1,
        EmployeeId: "aa000000",
      });
      expect(message.id).toStrictEqual(12345678);
      expect(message.content).toStrictEqual("create test 1");
      expect(message.GroupId).toStrictEqual(1);
      expect(message.EmployeeId).toStrictEqual("aa000000");
    });

    it("default content", async () => {
      expect.assertions(1);
      const message = await GroupMessage.create({
        id: 12345678,
        GroupId: 2,
        EmployeeId: "aa000000",
      });
      expect(message.content).toStrictEqual("no content");
    });

    it("foregin key test", async () => {
      expect.assertions(1);
      await expect(() =>
        GroupMessage.create({
          id: 12345678,
          content: "primary key test 1-2",
          GroupId: 1,
          EmployeeId: "aa456789",
        })
      ).rejects.toThrow(Error);
    });

    it("foregin key test2", async () => {
      expect.assertions(1);
      await expect(() =>
        GroupMessage.create({
          id: 12345678,
          content: "primary key test 1-2",
          GroupId: 45678901,
          EmployeeId: "aa000000",
        })
      ).rejects.toThrow(Error);
    });
  });

  describe("find test", () => {
    it("findall message", async () => {
      expect.assertions(4);
      await GroupMessage.create({
        id: 12345678,
        content: "find test 1-1",
        GroupId: 3,
        EmployeeId: "aa111111",
      });
      await GroupMessage.create({
        id: 13579086,
        content: "find test 1-2",
        GroupId: 2,
        EmployeeId: "bb000000",
      });
      const messages = await GroupMessage.findAll();
      expect(messages[0].id).toStrictEqual(12345678);
      expect(messages[0].content).toStrictEqual("find test 1-1");
      expect(messages[0].GroupId).toStrictEqual(3);
      expect(messages[0].EmployeeId).toStrictEqual("aa111111");
    });

    it("count message", async () => {
      expect.assertions(1);
      await GroupMessage.create({
        id: 12345678,
        content: "find test 1-1",
        GroupId: 3,
        EmployeeId: "cc000000",
      });
      await GroupMessage.create({
        id: 13579086,
        content: "find test 1-2",
        GroupId: 3,
        EmployeeId: "cc111111",
      });
      const count = await GroupMessage.count();
      expect(count).toStrictEqual(2);
    });
  });

  describe("delete test", () => {
    it("delete a message", async () => {
      expect.assertions(4);
      await GroupMessage.create({
        id: 13579086,
        content: "delete test 1-1",
        GroupId: 2,
        EmployeeId: "aa111111",
      });
      await GroupMessage.create({
        id: 12345678,
        content: "delete test 1-2",
        GroupId: 1,
        EmployeeId: "aa000000",
      });
      const first = await GroupMessage.findOne({
        where: { id: 13579086 },
      });
      await first.destroy();
      const messages = await GroupMessage.findAll();
      expect(messages[0].id).toStrictEqual(12345678);
      expect(messages[0].content).toStrictEqual("delete test 1-2");
      expect(messages[0].GroupId).toStrictEqual(1);
      expect(messages[0].EmployeeId).toStrictEqual("aa000000");
    });

    it("count message", async () => {
      expect.assertions(1);
      await GroupMessage.create({
        id: 13579086,
        content: "delete test 2-1",
        GroupId: 3,
        EmployeeId: "cc111111",
      });
      await GroupMessage.create({
        id: 12345678,
        content: "delete test 2-2",
        GroupId: 2,
        EmployeeId: "cc222222",
      });
      const first = await GroupMessage.findOne({
        where: { id: 13579086 },
      });
      await first.destroy();
      const count = await GroupMessage.count();
      expect(count).toStrictEqual(1);
    });

    it("delete some messages", async () => {
      expect.assertions(2);
      await GroupMessage.create({
        id: 12345678,
        content: "delete test 3-1",
        GroupId: 3,
        EmployeeId: "aa111111",
      });
      await GroupMessage.create({
        id: 12345679,
        content: "delete test 3-2",
        GroupId: 3,
        EmployeeId: "bb111111",
      });
      await GroupMessage.create({
        id: 12345680,
        content: "delete test 3-3",
        GroupId: 3,
        EmployeeId: "aa111111",
      });
      await GroupMessage.create({
        id: 45678901,
        content: "delete test 3-4",
        GroupId: 3,
        Employeeid: "aa000000",
      });
      await GroupMessage.destroy({
        where: {
          id: {
            [Op.gte]: 12345678,
            [Op.lt]: 12345681,
          },
        },
      });
      const messages = await GroupMessage.findAll();
      const count = await GroupMessage.count();
      expect(count).toStrictEqual(1);
      expect(messages[0].content).toStrictEqual("delete test 3-4");
    });
  });

  describe("update test", () => {
    it("edit message by message id", async () => {
      expect.assertions(2);
      await GroupMessage.create({
        id: 12345678,
        content: "update test 1-1",
        GroupId: 1,
        EmployeeId: "aa000000",
      });
      await GroupMessage.create({
        id: 45678901,
        content: "update test 1-2",
        GroupId: 2,
        EmployeeId: "bb111111",
      });
      const bef = await GroupMessage.findOne({
        where: { id: 12345678 },
      });
      await GroupMessage.update(
        { content: "updated content" },
        {
          where: { id: 12345678 },
        }
      );
      const aft = await GroupMessage.findOne({
        where: { id: 12345678 },
      });
      expect(bef.content).toStrictEqual("update test 1-1");
      expect(aft.content).toStrictEqual("updated content");
    });
  });
});
