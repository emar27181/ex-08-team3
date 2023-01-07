const { Group, GroupEmployees, Employee } = require("../../../src/db/model");

jest.setTimeout(20000);
describe("database: members table test", () => {
  beforeAll(async () => {
    await Employee.sync({ force: true });
    await Group.sync({ force: true });
    await Group.create({ id: 1, name: "a" });
    await Group.create({ id: 2, name: "b" });
    await Group.create({ id: 3, name: "c" });
    await Employee.create({ id: "ee123456", name: "a" });
    await Employee.create({ id: "ee234567", name: "b" });
    await Employee.create({ id: "ee345678", name: "c" });
  });

  beforeEach(async () => {
    await Employee.sync();
    await Group.sync();
    await GroupEmployees.sync({ force: true });
  });

  describe("database: create test", () => {
    it("メンバーの追加", async () => {
      const member = await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee123456",
      });
      expect(member.GroupId).toBe(1);
      expect(member.EmployeeId).toBe("ee123456");
    });
  });

  describe("database: find test", () => {
    it("特定のemployeeの取り出し", async () => {
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee123456",
      });
      const member = await GroupEmployees.findAll();
      expect(member[0].GroupId).toBe(1);
      expect(member[0].EmployeeId).toBe("ee123456");
    });
    it("idを指定した際にすべてのemployeeがいるか", async () => {
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee234567",
      });
      await GroupEmployees.create({
        GroupId: 2,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee345678",
      });
      const members = await GroupEmployees.findAll({
        where: {
          GroupId: 1,
        },
      });
      const total = await members.length;
      expect(members[0].EmployeeId).toBe("ee123456");
      expect(members[1].EmployeeId).toBe("ee234567");
      expect(members[2].EmployeeId).toBe("ee345678");
      expect(total).toBe(3);
    });
    it("employeeを指定した際にすべてのidがあるか", async () => {
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 2,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 2,
        EmployeeId: "ee234567",
      });
      await GroupEmployees.create({
        GroupId: 3,
        EmployeeId: "ee123456",
      });
      const members = await GroupEmployees.findAll({
        where: {
          EmployeeId: "ee123456",
        },
      });
      const total = await members.length;
      expect(members[0].GroupId).toBe(1);
      expect(members[1].GroupId).toBe(2);
      expect(members[2].GroupId).toBe(3);
      expect(total).toBe(3);
    });
  });

  describe("database: delete test", () => {
    it("メンバーの削除", async () => {
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.destroy({ truncate: true });
      const count = await GroupEmployees.count();
      expect(count).toBe(0);
    });
    it("指定したchannelの削除（チームの解散）", async () => {
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee234567",
      });
      await GroupEmployees.create({
        GroupId: 2,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee345678",
      });
      await GroupEmployees.destroy({
        where: {
          GroupId: 1,
        },
      });
      const members = await GroupEmployees.findAll();
      const total = await GroupEmployees.count();
      expect(members[0].EmployeeId).toBe("ee123456");
      expect(total).toBe(1);
    });
    it("memberをすべてのchannelから削除（退社）", async () => {
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 2,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 2,
        EmployeeId: "ee234567",
      });
      await GroupEmployees.create({
        GroupId: 3,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.destroy({
        where: {
          EmployeeId: "ee123456",
        },
      });
      const members = await GroupEmployees.findAll();
      const total = await GroupEmployees.count();
      expect(members[0].GroupId).toBe(2);
      expect(total).toBe(1);
    });
    it("channelから特定のemployeeを削除（開発チームからの脱退）", async () => {
      await GroupEmployees.create({
        GroupId: 1,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 2,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.create({
        GroupId: 2,
        EmployeeId: "ee234567",
      });
      await GroupEmployees.create({
        GroupId: 3,
        EmployeeId: "ee123456",
      });
      await GroupEmployees.destroy({
        where: {
          GroupId: 2,
          EmployeeId: "ee123456",
        },
      });
      const members = await GroupEmployees.findAll({
        where: {
          EmployeeId: "ee123456",
        },
      });
      const total = await members.length;
      expect(members[0].GroupId).toBe(1);
      expect(members[1].GroupId).toBe(3);
      expect(total).toBe(2);
    });
  });
});
