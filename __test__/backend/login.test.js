const session = require("supertest-session");
const app = require("../../src/app");
const { Position, Employee } = require("../../src/db/model");

jest.setTimeout(20000);
let testSession = null;

describe("Test the login path", () => {
  beforeAll(async () => {
    await Position.sync({ force: true });
    await Employee.sync({ force: true });
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
