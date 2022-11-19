const Member = require("../src/db/members.model");
// const Channel = require("../src/db/channels.model");
// const Employee = require("../src/db/employees.model");

jest.setTimeout(20000);
describe("database test", () => {
  beforeEach(async () => {
    await Member.sync({ force: true });
    // await Channel.sync({ force: true });
    // await Employee.sync({ force: true });
  });

  describe("create test", () => {
    it("メンバーの追加", async () => {
      const member = await Member.create({
        channel_id: 1,
        employee_id: "ee123456",
      });
      expect(member.channel_id).toBe(1);
      expect(member.employee_id).toBe("ee123456");
    });
  });
});
