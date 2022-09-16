const getAllMusicList = require("../parser/xitmuzonparser");
const db = require("../model/index");
const cli = require("cli-color");

const music = db.music;

async function updateDataUzbek(model) {
  //   let data = await model.findAll({
  //     where: { turi: "uzbek" },
  //     order: [["date", "DESC"]],
  //   });

  //   let test = data[0].date;
  let test = new Date().getTime() - 86400000 * 10;
  //   console.log(test);

  let shart = true;
  let son = 1;
  let mainArr = [];
  while (shart) {
    let arr = await getAllMusicList(
      `https://xitmuzon.net/musics/uzbek/page/${son}/`
    );
    let arr2 = arr.sort((a, b) => {
      return b.date * 1 - a.date * 1;
    });
    console.log(arr2[0]);
    if (arr2[0].date >= test) {
      for (let i = 0; i < arr.length; i++) {
        if (arr2[i].date > test) {
          arr2[i].turi = "uzbek";
          mainArr.push(arr2[i]);
        }
      }
    } else {
      shart = false;
    }
    son++;
  }

  console.log(mainArr);
  for (let i = 0; i < mainArr.length; i++) {
    let son = await model.create(mainArr[i]);
    console.log(cli.blue(`${i + 1} eleamnt bazaga qo'shildi => ${son.name}`));
  }
}

async function updateDataTurk(model) {
  //   let data = await model.findAll({
  //     where: { turi: "turk" },
  //     order: [["date", "DESC"]],
  //   });

  //   let test = data[0].date;
  let test = new Date().getTime() - 86400000 * 10;
  //   console.log(test);
  let shart = true;
  let son = 1;
  let mainArr = [];
  while (shart) {
    let arr = await getAllMusicList(
      `https://xitmuzon.net/musics/foreign/page/${son}/`
    );
    let arr2 = arr.sort((a, b) => {
      return b.date * 1 - a.date * 1;
    });
    console.log(arr2[0]);
    if (arr2[0].date >= test) {
      for (let i = 0; i < arr.length; i++) {
        if (arr2[i].date > test) {
          arr2[i].turi = "turk";
          mainArr.push(arr2[i]);
        }
      }
    } else {
      shart = false;
    }
    son++;
  }

  console.log(mainArr);
  for (let i = 0; i < mainArr.length; i++) {
    let son = await model.create(mainArr[i]);
    console.log(cli.blue(`${i + 1} eleamnt bazaga qo'shildi => ${son.name}`));
  }
}
async function updateDataAzer(model) {
  //   let data = await model.findAll({
  // where: { turi: "azer" },
  // order: [["date", "DESC"]],
  //   });
  //
  //   let test = data[0].date;
  let test = new Date().getTime() - 86400000 * 10;
  //   console.log(test);
  let shart = true;
  let son = 1;
  let mainArr = [];
  while (shart) {
    let arr = await getAllMusicList(
      `https://xitmuzon.net/musics/azer/page/${son}/`
    );
    let arr2 = arr.sort((a, b) => {
      return b.date * 1 - a.date * 1;
    });
    console.log(arr2[0]);
    if (arr2[0].date >= test) {
      for (let i = 0; i < arr.length; i++) {
        if (arr2[i].date > test) {
          arr2[i].turi = "azer";
          mainArr.push(arr2[i]);
        }
      }
    } else {
      shart = false;
    }
    son++;
  }

  console.log(mainArr);
  for (let i = 0; i < mainArr.length; i++) {
    let son = await model.create(mainArr[i]);
    console.log(cli.blue(`${i + 1} eleamnt bazaga qo'shildi => ${son.name}`));
  }
}
async function updateDataTiktok(model) {
  //   let data = await model.findAll({
  //     where: {
  //       turi: "tiktok",
  //     },
  //     order: [["date", "DESC"]],
  //   });

  //   let test = data[0].date;
  let test = new Date().getTime() - 86400000 * 10;
  //   console.log(test);
  let shart = true;
  let son = 1;
  let mainArr = [];
  while (shart) {
    let arr = await getAllMusicList(
      `https://xitmuzon.net/musics/tiktok/page/${son}/`
    );
    let arr2 = arr.sort((a, b) => {
      return b.date * 1 - a.date * 1;
    });
    console.log(arr2[0]);
    if (arr2[0].date >= test) {
      for (let i = 0; i < arr.length; i++) {
        if (arr2[i].date > test) {
          arr2[i].turi = "tiktok";
          mainArr.push(arr2[i]);
        }
      }
    } else {
      shart = false;
    }
    son++;
  }

  console.log(mainArr);
  for (let i = 0; i < mainArr.length; i++) {
    let son = await model.create(mainArr[i]);
    console.log(cli.blue(`${i + 1} eleamnt bazaga qo'shildi => ${son.name}`));
  }
}

async function updateDataArab(model) {
  //   let data = await model.findAll({
  //     where: {
  //       turi: "arab",
  //     },
  //     order: [["date", "DESC"]],
  //   });

  //   let test = data[0].date;
  let test = new Date().getTime() - 86400000 * 10;
  //   console.log(test);
  let shart = true;
  let son = 1;
  let mainArr = [];
  while (shart) {
    let arr = await getAllMusicList(
      `https://xitmuzon.net/musics/arab/page/${son}/`
    );
    let arr2 = arr.sort((a, b) => {
      return b.date * 1 - a.date * 1;
    });
    console.log(arr2[0]);
    if (arr2[0].date >= test) {
      for (let i = 0; i < arr.length; i++) {
        if (arr2[i].date > test) {
          arr2[i].turi = "arab";
          mainArr.push(arr2[i]);
        }
      }
    } else {
      shart = false;
    }
    son++;
  }

  console.log(mainArr);
  for (let i = 0; i < mainArr.length; i++) {
    let son = await model.create(mainArr[i]);
    console.log(cli.blue(`${i + 1} eleamnt bazaga qo'shildi => ${son.name}`));
  }
}
async function ishla(model) {
  await updateDataUzbek(model);
  await updateDataAzer(model);
  await updateDataTiktok(model);
  await updateDataArab(model);
  await updateDataTurk(model);
}
ishla(music);
// module.exports = ishla;
// console.log(new Date("09-5-2022 18:22").getTime());
// console.log(new Date().getFullYear());
