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
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let full = `${month}-${day}-${year} ` + dateA[3];
    date = new Date(full).getTime();
  } else {
    if (dateA[2].includes("Вчера")) {
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate() - 1;
      let year = new Date().getFullYear();
      let full = `${month}-${day}-${year} ` + dateA[3];
      date = new Date(full).getTime();
    } else {
      //   console.log("bugun emas");
      let kun = dateA[2].split(".")[0].split("-")[0];
      let oy = dateA[2].split(".")[0].split("-")[1];
      let yil = dateA[2].split(".")[0].split("-")[2];
      console.log(oy + "-" + kun + "-" + yil + " " + dateA[3]);
      date = new Date(oy + "-" + kun + "-" + yil).getTime();
    }
  }

  const downUrl = $(".fbtn.fdl.anim").attr().href;
  let nameLotin = krilLotin(name);

  console.log(name, url, downUrl, date, nameLotin);
  return { name, url, downUrl, date, nameLotin };
};

module.exports = getAllMusicList;
