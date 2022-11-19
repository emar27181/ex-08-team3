const Channel = require("../src/db/channnel.model");

describe("database: channel table test", () => {
  beforeEach(async () => {
    await Channel.sync({ force: true });
  });

  describe("create channel", () => {
    it("チャンネル作成", async () => {
      const channel = await Channel.create({
        name: "todoアプリプロジェクト",
      });
      expect(channel.id).toBe(1);
      expect(channel.name).toBe("todoアプリプロジェクト");
    });
    it("チャンネルの名前指定なしで作成", async () => {
      const channel = await Channel.create({});
      expect(channel.id).toBe(1);
      expect(channel.name).toBe("no name");
    });
  });
});
