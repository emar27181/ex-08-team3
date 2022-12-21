const matchMyId = require("../../../src/channels/matchMyId");

describe("test check id match", () => {
  it("same id", () => {
    expect.assertions(1);
    const id1 = "ee000000";
    const id2 = "ee000000";
    expect(matchMyId(id1, id2)).toStrictEqual("me");
  });

  it("different id", () => {
    expect.assertions(1);
    const id1 = "ee000000";
    const id2 = "ee111111";
    expect(matchMyId(id1, id2)).toStrictEqual("other");
  });
});
