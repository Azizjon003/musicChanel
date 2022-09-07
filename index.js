const { Telegraf } = require("telegraf");
const fs = require("fs");
const cli = require("cli-color");
const dotenv = require("dotenv");
const db = require("./model/index");
const Music = db.music;
dotenv.config({ path: "config.env" });
const getAllMusicList = require("./parser/muztvparser");
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);
require("./model");
bot.start(async (ctx) => {
  // console.log(ctx);
  const id = ctx.update.message.from.id;
  console.log(id);
  ctx.reply(id, "ishla ");
});
bot.on("channel_post", async (ctx) => {
  // console.log(ctx.update.channel_post);
  const id = ctx.update.channel_post.chat.id;
  const postId = ctx.update.channel_post.message_id;
  await ctx.telegram.deleteMessage(id, postId);
  await ctx.telegram.sendMessage(id, "Biroz kuting iltimos");
  const musics = await getAllMusicList("http://muztv.net/mp3/page/1/");
  for (let i = 0; i < musics.length; i++) {
    // console.log(musics[i]);fa fa-musicconsol
    const music = await Music.create(musics[i]);
    if (!music) {
      console.log(cli.red("qo'shiqni bazaga qo'sha olmadim"));
    }
  }
  //await cst.telegram.sendMessage(id, "qo'shiqlarni bazaga qo'shdim");
  for (let i = 0; i < musics.length; i++) {
    await ctx.telegram.sendAudio(id, musics[i].downUrl);
  }
});
bot.catch((err, ctx) => {
  console.log(err);
  console.log(ctx);
  const id = ctx.update.channel_post.message_id;
});
bot.launch();
