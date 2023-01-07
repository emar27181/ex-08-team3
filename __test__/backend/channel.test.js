const session = require("supertest-session");
const app = require("../../src/app");
const { Position, Employee, AllMessage } = require("../../src/db/model");

jest.setTimeout(20000);
let testSession = null;
let authenticatedSession = null;

describe("Test the login path", () => {
  beforeAll(async () => {
    await Employee.sync({ force: true });
    await Position.sync({ force: true });
    await AllMessage.sync({ force: true });
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
  });

  beforeEach(async () => {
    testSession = session(app);
    await testSession
      .post("/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ id: "ee000000", password: "password" })
      .expect(302);
    authenticatedSession = testSession;
  });

  it("get all page", async () => {
    expect.assertions(1);
    await authenticatedSession.get("/channels/all").then((response) => {
      expect(response.statusCode).toBe(200);
    });
  });

  it("post message to all", async () => {
    const response = await authenticatedSession
      .post("/channels/all")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ content: "hogehoge" })
      .expect(302);
    expect(response.text).toBe("Found. Redirecting to /channels/all");
    const messages = await AllMessage.findAll({
      where: {
        content: "hogehoge",
      },
    });
    expect(messages[0].id).toBe(1);
  });
});
