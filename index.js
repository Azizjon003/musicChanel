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
dotenv.config({ path: "config.env" });
const getAllMusicList = require("./parser/xitmuzonparser");
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
bot.on("channel_post", async (ctx) => {
  console.log(ctx.update);
  const text = ctx.update.channel_post.text;
  if (text == process.env.KEY_WORD) {
    const id = ctx.update.channel_post.chat.id;
    const postId = ctx.update.channel_post.message_id;
    await ctx.telegram.deleteMessage(id, postId);
    await ctx.telegram.sendMessage(id, "Biroz kuting iltimos");
    const musics = await getAllMusicList(
      "https://xitmuzon.net/musics/uzbek/page/1/"
    );
    console.log(musics);
    for (let i = 0; i < musics.length; i++) {
      const music = await Music.create(musics[i]);
      if (!music) {
        console.log(cli.red("qo'shiqni bazaga qo'sha olmadim"));
      }
    }
    //await cst.telegram.sendMessage(id, "qo'shiqlarni bazaga qo'shdim");
    for (let i = 0; i < musics.length; i++) {
      await ctx.telegram.sendAudio(id, musics[i].downUrl);
    }
  }
});
bot.on("my_chat_member", async (ctx) => {
  const id = ctx.update.my_chat_member.chat.id;
  const test = ctx.update.my_chat_member.new_chat_member.status;
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
