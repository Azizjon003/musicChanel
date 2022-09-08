const { Telegraf } = require("telegraf");
const fs = require("fs");
const cli = require("cli-color");
const dotenv = require("dotenv");
const db = require("./model/index");
const Music = db.music;
dotenv.config({ path: "config.env" });
const getAllMusicList = require("./parser/xitmuzonparser");
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
  console.log(ctx);
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
  console.log(ctx);
  const id = ctx.update.my_chat_member.chat.id;
});
bot.catch((err, ctx) => {
  console.log(err);
  console.log(ctx);
  const id = ctx.update.channel_post.message_id;
});

bot.launch();
