const { Position } = require("../../../src/db/model");

describe("position test", () => {
  beforeEach(async () => {
    await Position.sync({ force: true });
  });

  describe("create test", () => {
    it("ポジションの追加のテスト", async () => {
      const position = await Position.create({
        id: 2,
        position: "平社員",
      });
      expect(position.id).toBe(2);
      expect(position.position).toBe("平社員");
    });
    it("idのデフォルトのテスト", async () => {
      const position = await Position.create({
        position: "平社員",
      });
      expect(position.position).toBe("平社員");
      expect(position.id).toBe(3);
    });
    it("positionのデフォルトのテスト", async () => {
      const position = await Position.create({
        id: 2,
      });
      expect(position.position).toBe("平社員");
      expect(position.id).toBe(2);
    });
  });

  describe("find test", () => {
    it("ポジションの取り出し", async () => {
      await Position.create({
        id: 2,
        position: "平社員",
      });
      const positions = await Position.findAll();
      expect(positions[0].id).toBe(2);
      expect(positions[0].position).toBe("平社員");
    });
  });
});
