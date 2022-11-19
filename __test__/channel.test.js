const Channel = require("../src/db/channnel.model");

describe("database: channel table test", () => {
  beforeEach(async () => {
    await Channel.sync({ force: true });
  });

  describe("create channel test", () => {
    it("チャンネル作成", async () => {
      const channel = await Channel.create({
        name: "todoアプリプロジェクト",
      });
      expect(channel.channel_id).toBe(1);
      expect(channel.name).toBe("todoアプリプロジェクト");
    });
    it("チャンネルの名前指定なしで作成", async () => {
      const channel = await Channel.create({});
      expect(channel.channel_id).toBe(1);
      expect(channel.name).toBe("no name");
    });
    it("idの確認", async () => {
      await Channel.create({
        name: "チャットアプリプロジェクト",
      });
      const channel = await Channel.create({});
      expect(channel.channel_id).toBe(2);
      expect(channel.name).toBe("no name");
    });
  });

  describe("find channel test", () => {
    it("チャンネルの取り出し", async () => {
      await Channel.create({
        name: "hoge",
      });
      const channels = await Channel.findAll();
      expect(channels[0].channel_id).toBe(1);
      expect(channels[0].name).toBe("hoge");
    });
    it("複数のタスクの取り出し", async () => {
      await Channel.create({
        name: "hogehoge",
      });
      await Channel.create({
        name: "fuga",
      });
      const channels = await Channel.findAll();
      const total = await Channel.count();
      expect(channels[1].channel_id).toBe(2);
      expect(channels[1].name).toBe("fuga");
      expect(total).toBe(2);
    });
    it("取り出し条件を指定", async () => {
      await Channel.create({
        name: "foo",
      });
      await Channel.create({
        name: "bar",
      });
      const channel = await Channel.findOne({
        where: {
          channel_id: 2,
        },
      });
      expect(channel.name).toBe("bar");
    });
  });

  describe("delete test", () => {
    it("タスクの取り消し", async () => {
      await Channel.create({
        name: "hogehoge",
      });
      await Channel.destroy({ truncate: true });
      const count = await Channel.count();
      expect(count).toBe(0);
    });
    it("channelのidを指定して削除", async () => {
      await Channel.create({
        name: "hogehoge",
      });
      await Channel.create({
        name: "hogegehoge",
      });
      await Channel.destroy({
        where: {
          channel_id: 1,
        },
      });
      const count = await Channel.count();
      const channels = await Channel.findAll();
      expect(channels[0].channel_id).toBe(2);
      expect(channels[0].name).toBe("hogegehoge");
      expect(count).toBe(1);
    });
    it("nameを指定して削除", async () => {
      await Channel.create({
        name: "foooo",
      });
      await Channel.create({
        name: "barrrrrr",
      });
      await Channel.create({
        name: "bazzzzzzz",
      });
      await Channel.destroy({
        where: {
          name: "bazzzzzzz",
        },
      });
      const count = await Channel.count();
      const channels = await Channel.findAll();
      expect(channels[1].channel_id).toBe(2);
      expect(count).toBe(2);
    });
  });

  describe("update test", () => {
    it("channelのnameを変更", async () => {
      await Channel.create({
        name: "hogehoge",
      });
      await Channel.update(
        { name: "hogehogehoge" },
        {
          where: {
            channel_id: 1,
          },
        }
      );
      const channels = await Channel.findAll();
      expect(channels[0].name).toBe("hogehogehoge");
    });
    it("channelのnameを指定してアップデート（複数存在する状態で）", async () => {
      await Channel.create({
        name: "hoge",
      });
      await Channel.create({
        name: "fuga",
      });
      await Channel.create({
        name: "hoge",
      });
      await Channel.update(
        { name: "hogege" },
        {
          where: {
            name: "hoge",
          },
        }
      );
      const channels = await Channel.findAll({
        where: {
          name: "hogege",
        },
      });
      expect(channels[0].channel_id).toBe(1);
      expect(channels[1].channel_id).toBe(3);
    });
  });
});
