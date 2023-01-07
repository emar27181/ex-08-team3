const { Employee } = require("../../../src/db/model");
const { Position } = require("../../../src/db/model");

jest.setTimeout(20000);
describe("database: employee table test", () => {
  beforeAll(async () => {
    await Position.sync({ force: true });
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
    await Employee.sync({ force: true });
  });

  describe("create employee test", () => {
    it("社員の追加", async () => {
      await Position.sync();
      await Employee.sync({ force: true });
      const employee = await Employee.create({
        id: "aa000000",
        name: "加藤",
        password: "kato",
        PositionId: 3,
      });
      expect(employee.id).toBe("aa000000");
      expect(employee.name).toBe("加藤");
      expect(employee.password).toBe("kato");
      expect(employee.PositionId).toBe(3);
    });
    it("nameのデフォルト値のテスト", async () => {
      await Position.sync();
      await Employee.sync({ force: true });
      await Employee.create({
        id: "bb000000",
        password: "software",
        PositionId: 2,
      });
      const employee = await Employee.findOne({
        where: {
          id: "bb000000",
        },
      });
      expect(employee.id).toBe("bb000000");
      expect(employee.name).toBe("unsettled name");
      expect(employee.password).toBe("software");
      expect(employee.PositionId).toBe(2);
    });
    it("passwordのデフォルト値のテスト", async () => {
      await Position.sync();
      await Employee.sync({ force: true });
      const employee = await Employee.create({
        id: "aa000000",
        name: "定別當",
        PositionId: 2,
      });
      expect(employee.id).toBe("aa000000");
      expect(employee.name).toBe("定別當");
      expect(employee.password).toBe("password");
      expect(employee.PositionId).toBe(2);
    });
    it("PostionIdのデフォルト値のテスト", async () => {
      await Position.sync();
      await Employee.sync({ force: true });
      const employee = await Employee.create({
        id: "aa000000",
        name: "平出",
        password: "jyoubetto",
      });
      expect(employee.id).toBe("aa000000");
      expect(employee.name).toBe("平出");
      expect(employee.password).toBe("jyoubetto");
      expect(employee.PositionId).toBe(3);
    });
  });

  describe("delete test", () => {
    it("社員の取り消し", async () => {
      await Position.sync();
      await Employee.sync({ force: true });
      await Employee.create({
        id: "aa000000",
        name: "江馬",
        password: "ema",
        PositionId: 2,
      });
      await Employee.destroy({ truncate: true });
      const count = await Employee.count();
      expect(count).toBe(0);
    });
    it("社員のidを指定して削除", async () => {
      await Position.sync();
      await Employee.sync({ force: true });
      await Employee.create({
        id: "aa000000",
        name: "井口",
        password: "iguti",
        PositionId: 2,
      });
      await Employee.create({
        id: "aa000001",
        name: "情科",
        password: "jyouka",
        PositionId: 2,
      });
      await Employee.destroy({
        where: {
          id: "aa000000",
        },
      });
      const count = await Employee.count();
      const employees = await Employee.findAll();
      expect(employees[0].id).toBe("aa000001");
      expect(count).toBe(1);
    });
  });

  describe("update test", () => {
    it("名前の変更", async () => {
      await Position.sync();
      await Employee.sync({ force: true });
      await Employee.create({
        id: "aa000000",
        name: "明治",
        password: "meiji",
        PositionId: 2,
      });
      await Employee.update(
        { name: "めいじろう" },
        {
          where: {
            id: "aa000000",
          },
        }
      );
      const employees = await Employee.findAll();
      expect(employees[0].name).toBe("めいじろう");
    });
    it("役職の変更", async () => {
      await Position.sync();
      await Employee.sync({ force: true });
      await Employee.create({
        id: "aa000000",
        name: "ソフトウェア",
        password: "software",
        PositionId: 1,
      });
      await Employee.update(
        { PositionId: 2 },
        {
          where: {
            id: "aa000000",
          },
        }
      );
      const employees = await Employee.findAll();
      expect(employees[0].PositionId).toBe(2);
    });
  });
});
