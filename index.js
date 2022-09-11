const { Telegraf } = require("telegraf");
const fs = require("fs");
const cli = require("cli-color");
const dotenv = require("dotenv");
const db = require("./model/index");
// models
const Music = db.music;
const User = db.user;
const Channel = db.channel;
//models

var cron = require("node-cron");
const updateBase = require("./utility/bazaUpdate");

dotenv.config({ path: "config.env" });
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);
require("./model");
bot.start(async (ctx) => {
  const id = ctx.update.message.from.id;
  const username =
    ctx.update.message.from.username ||
    ctx.update.message.from.first_name ||
    ctx.update.message.from.last_name;
  const findUser = await User.findOne({ where: { telegram_id: id } });
  const name = ctx.update.message.from.first_name;
  if (!findUser) {
    const users = await User.create({
      telegram_id: id,
      username: username,
    });
  }
  ctx.telegram.sendMessage(
    id,
    `Assalomu alaykum <a href = "t.me/${username}">${name}</a>!.Botga xush kelibsiz!`,
    {
      parse_mode: "HTML",
    }
  );
});
cron.schedule("1 * * * * *", async () => {
  console.log(cli.red("running a task every minute"));
  // await bot.telegram.sendMessage("@ubuntulinuxaau", "ishla qani");
  // const id = ctx.update.channel_post.chat.id;
  const channelId = await Channel.findAll();
  // const channelId = await Channel.findOne({ where: { telegram_id: id } });
  for (let i = 0; i < channelId.length; i++) {
    if (!channelId[i].music_id) {
      const yangiMusic = await Music.findAll({ order: [["date", "DESC"]] });
      Channel.update(
        { music_id: yangiMusic[0].id },
        { where: { telegram_id: channelId[i].telegram_id } }
      );
      for (let j = 0; j < 10; j++) {
        await bot.telegram.sendAudio(
          channelId[i].telegram_id,
          yangiMusic[j].downUrl,
          {
            title: yangiMusic[j].name,
          }
        );
      }
    } else {
      const music = await Music.findOne({
        where: { id: channelId[i].music_id },
      });
      const music2 = await Music.findAll({
        where: {
          date: {
            [db.Op.gte]: music.date,
          },
        },
        order: [["date", "DESC"]],
      });
      console.log(music2[0].dataValues);
      if (!music2) {
        bot.telegram.sendMessage(
          channelId[i].telegram_id,
          "Bazada yangi musiqalar yo'q"
        );
      }
      let upt = await Channel.update(
        {
          music_id: music2[0].dataValues.id,
        },
        {
          where: { telegram_id: channelId[i].telegram_id },
        }
      );
      if (upt) {
        for (let j = 0; j < music2.length; j++) {
          await bot.telegram.sendAudio(id, music2[j].dataValues.downUrl, {
            title: music2.name,
          });
        }
      }
    }
  }
});
cron.schedule("* 3 * * * *", async () => {
  console.log("1 min bo'ldi");
  await updateBase(Music);
});

bot.on("channel_post", async (ctx) => {
  console.log(ctx.update);
  const text = ctx.update.channel_post.text;
  if (text == process.env.KEY_WORD) {
    const id = ctx.update.channel_post.chat.id;
    const channelId = await Channel.findOne({ where: { telegram_id: id } });

    const postId = ctx.update.channel_post.message_id;
    await ctx.telegram.deleteMessage(id, postId);
    await ctx.telegram.sendMessage(id, "Biroz kuting iltimos");
    if (!channelId.music_id) {
      const yangiMusic = await Music.findAll({ order: [["date", "DESC"]] });
      Channel.update(
        { music_id: yangiMusic[0].id },
        { where: { telegram_id: id } }
      );
      for (let i = 0; i < 10; i++) {
        await ctx.telegram.sendAudio(id, yangiMusic[i].downUrl, {
          title: yangiMusic.name,
        });
      }
    } else {
      const music = await Music.findOne({ where: { id: channelId.music_id } });
      const music2 = await Music.findAll({
        where: {
          date: {
            [db.Op.gte]: music.date,
          },
        },
        order: [["date", "DESC"]],
      });
      console.log(music2[0].dataValues);
      if (!music2) {
        ctx.telegram.sendMessage(id, "Bazada yangi musiqalar yo'q");
      }
      let upt = await Channel.update(
        {
          music_id: music2[0].dataValues.id,
        },
        {
          where: { telegram_id: id },
        }
      );
      if (upt) {
        for (let i = 0; i < music2.length; i++) {
          await ctx.telegram.sendAudio(id, music2[i].dataValues.downUrl, {
            title: music2.name,
          });
        }
      }
    }
  }
});
bot.on("my_chat_member", async (ctx) => {
  const id = ctx.update.my_chat_member.chat.id; //  chat idsi
  const test = ctx.update.my_chat_member.new_chat_member.status; // test status
  console.log(ctx.update.my_chat_member.new_chat_member);
  const username = ctx.update.my_chat_member.chat.username;
  const userid = ctx.update.my_chat_member.from.id;
  let findUser = await User.findOne({ where: { telegram_id: userid } });
  if (!findUser) {
    findUser = await User.create({
      telegram_id: userid,
      username: username,
    });
  }
  const findChannel = await Channel.findOne({ where: { telegram_id: id } });
  let channel;
  if (!findChannel) {
    console.log("ishla");
    channel = await Channel.create({
      name: username,
      telegram_id: id,
      userId: findUser.id,
    });
  }
  if (test == "administrator") {
    ctx.telegram.sendMessage(
      userid,
      " Bot ushbu kanalga muvaffaqiyatli qo'shildi"
    );
  }
});

bot.catch((err, ctx) => {
  console.log(err);
  console.log(ctx);
});

bot.launch();
