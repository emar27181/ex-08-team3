const { Group } = require("../../../src/db/model");

describe("database: channel table test", () => {
  beforeEach(async () => {
    await Group.sync({ force: true });
  });

  describe("create channel test", () => {
    it("チャンネル作成", async () => {
      const group = await Group.create({
        name: "todoアプリプロジェクト",
      });
      expect(group.id).toBe(1);
      expect(group.name).toBe("todoアプリプロジェクト");
    });
    it("チャンネルの名前指定なしで作成", async () => {
      const group = await Group.create({});
      expect(group.id).toBe(1);
      expect(group.name).toBe("no name");
    });
    it("idの確認", async () => {
      await Group.create({
        name: "チャットアプリプロジェクト",
      });
      const group = await Group.create({});
      expect(group.id).toBe(2);
      expect(group.name).toBe("no name");
    });
  });

  describe("find channel test", () => {
    it("チャンネルの取り出し", async () => {
      await Group.create({
        name: "hoge",
      });
      const groups = await Group.findAll();
      expect(groups[0].id).toBe(1);
      expect(groups[0].name).toBe("hoge");
    });
    it("複数のタスクの取り出し", async () => {
      await Group.create({
        name: "hogehoge",
      });
      await Group.create({
        name: "fuga",
      });
      const groups = await Group.findAll();
      const total = await Group.count();
      expect(groups[1].id).toBe(2);
      expect(groups[1].name).toBe("fuga");
      expect(total).toBe(2);
    });
    it("取り出し条件を指定", async () => {
      await Group.create({
        name: "foo",
      });
      await Group.create({
        name: "bar",
      });
      const group = await Group.findOne({
        where: {
          id: 2,
        },
      });
      expect(group.name).toBe("bar");
    });
  });

  describe("delete test", () => {
    it("タスクの取り消し", async () => {
      await Group.create({
        name: "hogehoge",
      });
      await Group.destroy({ truncate: true });
      const count = await Group.count();
      expect(count).toBe(0);
    });
    it("channelのidを指定して削除", async () => {
      await Group.create({
        name: "hogehoge",
      });
      await Group.create({
        name: "hogegehoge",
      });
      await Group.destroy({
        where: {
          id: 1,
        },
      });
      const count = await Group.count();
      const channels = await Group.findAll();
      expect(channels[0].id).toBe(2);
      expect(channels[0].name).toBe("hogegehoge");
      expect(count).toBe(1);
    });
    it("nameを指定して削除", async () => {
      await Group.create({
        name: "foooo",
      });
      await Group.create({
        name: "barrrrrr",
      });
      await Group.create({
        name: "bazzzzzzz",
      });
      await Group.destroy({
        where: {
          name: "bazzzzzzz",
        },
      });
      const count = await Group.count();
      const groups = await Group.findAll();
      expect(groups[1].id).toBe(2);
      expect(count).toBe(2);
    });
  });

  describe("update test", () => {
    it("channelのnameを変更", async () => {
      await Group.create({
        name: "hogehoge",
      });
      await Group.update(
        { name: "hogehogehoge" },
        {
          where: {
            id: 1,
          },
        }
      );
      const groups = await Group.findAll();
      expect(groups[0].name).toBe("hogehogehoge");
    });
    it("channelのnameを指定してアップデート（複数存在する状態で）", async () => {
      await Group.create({
        name: "hoge",
      });
      await Group.create({
        name: "fuga",
      });
      await Group.create({
        name: "hoge",
      });
      await Group.update(
        { name: "hogege" },
        {
          where: {
            name: "hoge",
          },
        }
      );
      const groups = await Group.findAll({
        where: {
          name: "hogege",
        },
      });
      expect(groups[0].id).toBe(1);
      expect(groups[1].id).toBe(3);
    });
  });
});
