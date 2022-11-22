const request = require("supertest");
const app = require("../../src/app");
jest.setTimeout(20000);
describe("Test the root path", () => {
  it("should response the GET method", () =>
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      }));
});
