const { Telegraf } = require("telegraf");
const cli = require("cli-color");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
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
  ctx.telegram.sendAudio(
    id,
    "http://muztv.net/mp3/Uzbek/Alisher%20Zokirov%20-%20O%27sha%20Kun.mp3"
  );
});

bot.launch();
