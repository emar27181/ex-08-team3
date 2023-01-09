const session = require("supertest-session");
const app = require("../../../src/app");
const {
  Position,
  Employee,
  GroupEmployees,
  Group,
  GroupMessage,
} = require("../../../src/db/model");

jest.setTimeout(20000);
let testSession = null;

describe("Test the group path", () => {
  beforeAll(async () => {
    await Group.sync({ force: true });
    await Employee.sync({ force: true });
    await GroupEmployees.sync({ force: true });
    await GroupMessage.sync({ force: true });
    await Position.sync({ force: true });
    await Position.create({
      id: 1,
      position: "社長",
    });
    await Position.create({
      id: 2,
      position: "リーダー",
    });
    await Position.create({
      id: 3,
      position: "平社員",
    });
    await Employee.create({
      id: "ee000000",
      name: "takeyama",
      password: "password",
      PositionId: 1,
    });
    await Group.create({
      name: "group1",
    });
    await Group.create({
      name: "group2",
    });
    testSession = session(app);
    await testSession
      .post("/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ id: "ee000000", password: "password" });
  });

  describe("GET /channels/group", () => {
    it("response status", async () => {
      expect.assertions(1);
      const res = await testSession.get("/channels/groups/1/messages");
      expect(res.status).toStrictEqual(200);
    });

    it("response type", async () => {
      expect.assertions(1);
      const res = await testSession.get("/channels/groups/1/messages");
      expect(res.type).toStrictEqual("text/html");
    });
  });

  describe("POST /channels/group", () => {
    it("response status", async () => {
      expect.assertions(2);
      const res = await testSession
        .post("/channels/groups/1/messages")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({ content: "hello" })
        .expect(302);

      const message = await GroupMessage.findAll({
        where: {
          content: "hello",
        },
      });
      expect(message[0].content).toStrictEqual("hello");
      expect(res.status).toStrictEqual(302);
    });
  });
});
