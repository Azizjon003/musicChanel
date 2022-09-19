const mp3Cutter = require("mp3-cutter");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
async function cutter(ctx, id, name, link, username) {
  const data = await axios.get(link, {
    responseType: "stream",
  });

  await data.data.pipe(fs.createWriteStream(`${__dirname}/${name}.mp3`));
  await axios.get(link, {
    responseType: "stream",
  });
  mp3Cutter.cut({
    src: __dirname + "/" + name + ".mp3",
    target: __dirname + "/cut/" + name + ".mp3",
    start: 10,
    end: 50,
  });

  const url = path.join(__dirname + "/cut/" + name + ".mp3");
  const data2 = await fs.readFileSync(__dirname + "/cut/" + name + ".mp3");
  await ctx.telegram.sendVoice(
    id,
    { source: data2, filename: name },
    {
      caption: `${name}\n<a href = 't.me/${username}'>Bizning kanal obuna bo'lib qo'ying</a>\n To'liq musiqa pastda`,
      parse_mode: "HTML",
    }
  );
}

module.exports = cutter;
