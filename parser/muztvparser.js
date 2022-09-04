const cheerio = require("cheerio");
const axios = require("axios");
const cli = require("cli-color");

const time = require("../utility/time");
const krilLotin = require("../utility/krilLotin");

const getAllMusicList = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let musicList = [];
    $(".play-desc.fx-1").each((_, e) => {
      let url = "";
      url = $(e).attr().href;
      musicList.push(url);
    });
    let arr = [];
    for (let i = 0; i < 20; i++) {
      const data = await urlInfo(musicList[i]);
      arr.push(data);
    }

    return arr;
    console.log(cli.green("success"));
  } catch (error) {
    console.log(cli.red(error));
  }
};
const urlInfo = async (url) => {
  // try {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const downUrl = $(".fbtn.fx-row.fx-middle.fdl").attr().href;
  const name = $(".fright.fx-1").children("h1").text().trim();
  let date = $(".finfo").children("li").last().text();
  date = time(date);
  let nameLotin = krilLotin(name);
  return { name, downUrl, date, nameLotin };
};

module.exports = getAllMusicList;
