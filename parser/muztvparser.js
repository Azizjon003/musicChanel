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
  let downUrl;
  const name = $(".fright.fx-1").children("h1").text().trim();
  let date = $(".finfo").children("li").last().text();
  console.log(name);
  if (name.includes("(HD Clip)")) {
    console.log("ishlash");
    downUrl = $(".fa.fa-music").parent().parent().attr().href;
  } else {
    downUrl = $(".fbtn.fx-row.fx-middle.fdl").attr().href;
  }
  console.log(downUrl);

  date = time(date);
  let nameLotin = krilLotin(name);
  return { name, url, downUrl, date, nameLotin };
};

module.exports = getAllMusicList;
