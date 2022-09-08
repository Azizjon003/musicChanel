const cheerio = require("cheerio");
const axios = require("axios");
const krilLotin = require("../utility/krilLotin");
const fs = require("fs");
const db = require("../model/index");
const Music = db.music;

const getUrl = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const getAllMusicList = async (url) => {
  const data = await getUrl(url);
  const $ = cheerio.load(data);
  let musicList = [];
  $(".track-share.anim.js-share").each((_, e) => {
    musicList.push($(e).attr()["data-link"]);
  });
  let arr = [];
  for (let i = 0; i < musicList.length; i++) {
    const malumot = await urlInfo(musicList[i]);
    arr.push(malumot);
  }
  return arr;
};
const urlInfo = async (url) => {
  const data = await getUrl(url);
  const $ = cheerio.load(data);
  let name = $(".fheader.fx-row").children("h1").children("div").text();
  console.log(name);
  let date = $(".finfo.fx-row").children("li").last().text();
  let dateA = date.split(" ");
  if (dateA[2].includes("Сегодня")) {
    // console.log("bugun");
    date = new Date().getTime();
  } else {
    if (dateA[2].includes("Вчера")) {
      //   console.log("kecha");
      date = new Date().getTime() - 86400000;
    } else {
      //   console.log("bugun emas");
      date = new Date(dateA[2].split(",")[0]).getTime();
    }
  }

  const downUrl = $(".fbtn.fdl.anim").attr().href;
  let nameLotin = krilLotin(name);

  console.log(name, url, downUrl, date, nameLotin);
  return { name, url, downUrl, date, nameLotin };
};
//
// getAllMusicList("https://xitmuzon.net/musics/uzbek/page/1/");

module.exports = getAllMusicList;
