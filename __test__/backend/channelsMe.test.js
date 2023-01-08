const session = require("supertest-session");
const app = require("../../src/app");
const { Position, Employee, DirectMessage } = require("../../src/db/model");

jest.setTimeout(20000);
let testSession = null;
let authenticatedSession = null;

describe("Test the login path", () => {
  beforeAll(async () => {
    await Employee.sync({ force: true });
    await Position.sync({ force: true });
    await DirectMessage.sync({ force: true });
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
    await Employee.create({
      id: "ee111111",
      name: "iguchi",
      password: "password",
      PositionId: 2,
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

  it("get direct message page", async () => {
    expect.assertions(1);
    await authenticatedSession
      .get("/channels/me/employees/ee111111")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("wrong request", async () => {
    expect.assertions(1);
    await authenticatedSession
      .get("/channels/me/employees/bb111111")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it("post message to direct message", async () => {
    const response = await authenticatedSession
      .post("/channels/me/employees/ee111111/messages")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ content: "hogehoge" })
      .expect(302);
    expect(response.text).toBe(
      "Found. Redirecting to /channels/me/employees/ee111111"
    );
    const messages = await DirectMessage.findAll({
      where: {
        content: "hogehoge",
      },
    });
    expect(messages[0].id).toBe(1);
  });
});
