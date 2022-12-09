const session = require("supertest-session");
const app = require("../../src/app");
const Channel = require("../../src/db/model/channnel");
const Employee = require("../../src/db/model/employee");
const Member = require("../../src/db/model/member");
const Message = require("../../src/db/model/message");
const Position = require("../../src/db/model/position");

jest.setTimeout(20000);
let testSession = null;

describe("Test the login path", () => {
  beforeAll(async () => {
    await Channel.sync({ force: true });
    await Employee.sync({ force: true });
    await Member.sync({ force: true });
    await Message.sync({ force: true });
    await Position.sync({ force: true });
    await Position.create({
      position_id: 1,
      position: "社長",
    });
    await Position.create({
      position_id: 2,
      position: "リーダー",
    });
    await Position.create({
      position_id: 3,
      position: "平社員",
    });
    await Employee.create({
      employee_id: "ee000000",
      name: "takeyama",
      password: "password",
      position_id: 1,
    });
    testSession = session(app);
  });

  it("should response the GET method", () =>
    testSession.get("/login").then((response) => {
      expect(response.statusCode).toBe(200);
    }));

  it("should login", async () => {
    expect.assertions(2);
    const response = await testSession
      .post("/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ id: "ee000000", password: "password" })
      .expect(302);

    expect(response.status).toBe(302);
    expect(response.text).toBe("Found. Redirecting to /channels");
  });

  it("should logout", async () => {
    expect.assertions(2);
    const response = await testSession
      .post("/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ id: "ee000000", password: "hoge" })
      .expect(302);

    expect(response.status).toBe(302);
    expect(response.text).toBe("Found. Redirecting to /login");
  });
});
