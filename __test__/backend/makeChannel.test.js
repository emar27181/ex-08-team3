const session = require("supertest-session");
const app = require("../../src/app");
const {
  Position,
  Employee,
  GroupEmployees,
  Group,
  AllMessage,
} = require("../../src/db/model");

jest.setTimeout(20000);
let testSession = null;

describe("Test the channel path", () => {
  beforeAll(async () => {
    await Group.sync({ force: true });
    await Employee.sync({ force: true });
    await GroupEmployees.sync({ force: true });
    await AllMessage.sync({ force: true });
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
    testSession = session(app);
    await testSession
      .post("/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ id: "ee000000", password: "password" });
  });

  describe("GET /channel", () => {
    it("response status", async () => {
      expect.assertions(1);
      const res = await testSession.get("/channel");
      expect(res.status).toStrictEqual(200);
    });

    it("response type", async () => {
      expect.assertions(1);
      const res = await testSession.get("/channel");
      expect(res.type).toStrictEqual("text/html");
    });
  });

  describe("POST /channel", () => {
    it("response status", async () => {
      expect.assertions(1);
      const res = await testSession
        .post("/channel")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({ channel: "group9" })
        .expect(302);
      expect(res.status).toStrictEqual(302);
    });
  });
});
