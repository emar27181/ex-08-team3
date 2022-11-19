const Member = require("../src/db/members.model");
// const Channel = require("../src/db/channels.model");
// const Employee = require("../src/db/employees.model");

jest.setTimeout(20000);
describe("database: members table test", () => {
  beforeEach(async () => {
    await Member.sync({ force: true });
    // await Channel.sync({ force: true });
    // await Employee.sync({ force: true });
  });

  describe("database: create test", () => {
    it("メンバーの追加", async () => {
      const member = await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      expect(member.channel_id).toBe(1);
      expect(member.employee_id).toBe("ee123456");
    });
  });

  describe("database: find test", () => {
    it("特定のemployeeの取り出し", async () => {
      await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      const member = await Member.findAll();
      expect(member[0].channel_id).toBe(1);
      expect(member[0].employee_id).toBe("ee123456");
    });
    it("idを指定した際にすべてのemployeeがいるか", async () => {
      await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 1,
        employee_id: "ee234567",
      });
      await Member.create({
        channel_id: 2,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 1,
        employee_id: "ee345678",
      });
      const members = await Member.findAll({
        where: {
          channel_id: 1,
        },
      });
      const total = await members.length;
      expect(members[0].employee_id).toBe("ee123456");
      expect(members[1].employee_id).toBe("ee234567");
      expect(members[2].employee_id).toBe("ee345678");
      expect(total).toBe(3);
    });
    it("employeeを指定した際にすべてのidがあるか", async () => {
      await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 2,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 2,
        employee_id: "ee234567",
      });
      await Member.create({
        channel_id: 3,
        employee_id: "ee123456",
      });
      const members = await Member.findAll({
        where: {
          employee_id: "ee123456",
        },
      });
      const total = await members.length;
      expect(members[0].channel_id).toBe(1);
      expect(members[1].channel_id).toBe(2);
      expect(members[2].channel_id).toBe(3);
      expect(total).toBe(3);
    });
  });
  
  describe("database: delete test", () => {
    it("メンバーの削除", async () => {
      await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      await Member.destroy({ truncate: true });
      const count = await Member.count();
      expect(count).toBe(0);
    });
    it("指定したchannelの削除（チームの解散）", async () => {
      await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 1,
        employee_id: "ee234567",
      });
      await Member.create({
        channel_id: 2,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 1,
        employee_id: "ee345678",
      });
      await Member.destroy({
        where: {
          channel_id: 1,
        },
      });
      const members = await Member.findAll();
      const total = await Member.count();
      expect(members[0].employee_id).toBe("ee123456");
      expect(total).toBe(1);
    });
    it("memberをすべてのchannelから削除（退社）", async () => {
      await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 2,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 2,
        employee_id: "ee234567",
      });
      await Member.create({
        channel_id: 3,
        employee_id: "ee123456",
      });
      await Member.destroy({
        where: {
          employee_id: "ee123456",
        },
      });
      const members = await Member.findAll();
      const total = await Member.count();
      expect(members[0].channel_id).toBe(2);
      expect(total).toBe(1);
    });
    it("channelから特定のemployeeを削除（開発チームからの脱退）", async () => {
      await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 2,
        employee_id: "ee123456",
      });
      await Member.create({
        channel_id: 2,
        employee_id: "ee234567",
      });
      await Member.create({
        channel_id: 3,
        employee_id: "ee123456",
      });
      await Member.destroy({
        where: {
          channel_id: 2,
          employee_id: "ee123456",
        },
      });
      const members = await Member.findAll({
        where: {
          employee_id: "ee123456",
        },
      });
      const total = await members.length;
      expect(members[0].channel_id).toBe(1);
      expect(members[1].channel_id).toBe(3);
      expect(total).toBe(2);
    });
  });
});
