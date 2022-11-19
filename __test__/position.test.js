const Position = require("../src/db/position.model");

describe("position test", () => {
  beforeEach(async () => {
    await Position.sync({ force: true });
  });

  describe("create test", () => {
    it("ポジションの追加のテスト", async () => {
      const position = await Position.create({
        position_id: 2,
        position: "平社員",
      });
      expect(position.position_id).toBe(2);
      expect(position.position).toBe("平社員");
    });
    it("position_idのデフォルトのテスト", async () => {
      const position = await Position.create({
        position: "平社員",
      });
      expect(position.position).toBe("平社員");
      expect(position.position_id).toBe(2);
    });
    it("positionのデフォルトのテスト", async () => {
      const position = await Position.create({
        position_id: 2,
      });
      expect(position.position).toBe("平社員");
      expect(position.position_id).toBe(2);
    });
  });

  describe("find test", () => {
    it("ポジションの取り出し", async () => {
      await Position.create({
        position_id: 2,
        position: "平社員",
      });
      const positions = await Position.findAll();
      expect(positions[0].position_id).toBe(2);
      expect(positions[0].position).toBe("平社員");
    });
  });
});
