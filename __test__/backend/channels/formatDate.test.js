const formatDate = require("../../../src/channels/formatDate");

describe("test format date", () => {
  it("check format", () => {
    expect.assertions(1);
    const date = new Date(2020, 11, 9, 8, 29, 18);
    const formatedDate = formatDate(date);
    expect(formatedDate.toString()).toStrictEqual("2020/12/9(水) 8:29:18");
  });
  it("check format of leap year", () => {
    expect.assertions(1);
    const date = new Date(2024, 0, 15, 12, 0, 59);
    const formatedDate = formatDate(date);
    expect(formatedDate.toString()).toStrictEqual("2024/1/15(月) 12:00:59");
  });
});
