const formatDate = require("../../../src/channels/formatDate");

describe("test format date", () => {
  it("check format", () => {
    expect.assertions(1);
    const date = new Date(2020, 11, 9, 8, 29, 18);
    const formatedDate = formatDate(date);
    expect(formatedDate.toString()).toStrictEqual("2020/12/9 8:29");
  });
  it("check format of leap year", () => {
    expect.assertions(1);
    const date = new Date(2024, 0, 15, 12, 0, 59);
    const formatedDate = formatDate(date);
    expect(formatedDate.toString()).toStrictEqual("2024/1/15 12:00");
  });
  it("check format now", () => {
    expect.assertions(1);
    const date = new Date();
    const formatedDate = formatDate(date);
    expect(formatedDate.toString()).toStrictEqual(
      `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    );
  });
  it("check format this year", () => {
    expect.assertions(1);
    const date = new Date(new Date().getFullYear(), 4, 9, 12, 30, 9);
    const formatedDate = formatDate(date);
    expect(formatedDate.toString()).toStrictEqual("5/9 12:30");
  });
});
