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
  console.log(ctx);
  const id = ctx.update.message.from.id;
  console.log(id);
  ctx.reply(id, "ishla ");
});
bot.on("channel_post", async (ctx) => {
  console.log(ctx.update.channel_post);
  const id = ctx.update.channel_post.chat.id;
  const postId = ctx.update.channel_post.message_id;
  await ctx.telegram.deleteMessage(id, postId);
  const musics = await getAllMusicList("http://muztv.net/mp3/page/1/");
  for (let i = 0; i < musics.length; i++) {
    console.log(musics[i]);
    const music = await Music.create(musics[i]);
    if (!music) {
      console.log(cli.red("qo'shiqni bazaga qo'sha olmadim"));
    }
  }
  //await cst.telegram.sendMessage(id, "qo'shiqlarni bazaga qo'shdim");

  await ctx.telegram.sendAudio(
    id,
    "http://muztv.net/mp3/Uzbek/Alisher%20Zokirov%20-%20O%27sha%20Kun.mp3"
  );
});
bot.catch((err, ctx) => {
  console.log(err);
  const id = msg.from.id;
  ctx.telegram.sendMessage(
    id,
    "Botda xatolik aniqlandi /start buyrug'ini bosing"
  );
});

bot.launch();
