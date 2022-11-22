const Employee = require("../src/db/employees.model");

jest.setTimeout(20000);
describe("database: employee table test", () => {
  beforeEach(async () => {
    await Employee.sync({ force: true });
  });

  describe("create employee test", () => {
    it("社員の追加", async () => {
      const employee = await Employee.create({
        employee_id: "aa000000",
        name: "加藤",
        password: "kato",
        position_id: 0,
      });
      expect(employee.employee_id).toBe("aa000000");
      expect(employee.name).toBe("加藤");
      expect(employee.password).toBe("kato");
      expect(employee.position_id).toBe(0);
    });
    it("nameのデフォルト値のテスト", async () => {
      const employee = await Employee.create({
        employee_id: "aa000000",
        password: "software",
        position_id: 2,
      });
      expect(employee.employee_id).toBe("aa000000");
      expect(employee.name).toBe("unsettled name");
      expect(employee.password).toBe("software");
      expect(employee.position_id).toBe(2);
    });
    it("passwordのデフォルト値のテスト", async () => {
      const employee = await Employee.create({
        employee_id: "aa000000",
        name: "定別當",
        position_id: 2,
      });
      expect(employee.employee_id).toBe("aa000000");
      expect(employee.name).toBe("定別當");
      expect(employee.password).toBe("password");
      expect(employee.position_id).toBe(2);
    });
    it("position_idのデフォルト値のテスト", async () => {
      const employee = await Employee.create({
        employee_id: "aa000000",
        name: "平出",
        password: "jyoubetto",
      });
      expect(employee.employee_id).toBe("aa000000");
      expect(employee.name).toBe("平出");
      expect(employee.password).toBe("jyoubetto");
      expect(employee.position_id).toBe(2);
    });
  });

  describe("delete test", () => {
    it("社員の取り消し", async () => {
      await Employee.create({
        employee_id: "aa000000",
        name: "江馬",
        password: "ema",
        position_id: 2,
      });
      await Employee.destroy({ truncate: true });
      const count = await Employee.count();
      expect(count).toBe(0);
    });
    it("社員のidを指定して削除", async () => {
      await Employee.create({
        employee_id: "aa000000",
        name: "井口",
        password: "iguti",
        position_id: 2,
      });
      await Employee.create({
        employee_id: "aa000001",
        name: "情科",
        password: "jyouka",
        position_id: 2,
      });
      await Employee.destroy({
        where: {
          employee_id: "aa000000",
        },
      });
      const count = await Employee.count();
      const employees = await Employee.findAll();
      expect(employees[0].employee_id).toBe("aa000001");
      expect(count).toBe(1);
    });
  });

  describe("update test", () => {
    it("名前の変更", async () => {
      await Employee.create({
        employee_id: "aa000000",
        name: "明治",
        password: "meiji",
        position_id: 2,
      });
      await Employee.update(
        { name: "めいじろう" },
        {
          where: {
            employee_id: "aa000000",
          },
        }
      );
      const employees = await Employee.findAll();
      expect(employees[0].name).toBe("めいじろう");
    });
    it("役職の変更", async () => {
      await Employee.create({
        employee_id: "aa000000",
        name: "ソフトウェア",
        password: "software",
        position_id: 1,
      });
      await Employee.update(
        { position_id: 2 },
        {
          where: {
            employee_id: "aa000000",
          },
        }
      );
      const employees = await Employee.findAll();
      expect(employees[0].position_id).toBe(2);
    });
  });
});
