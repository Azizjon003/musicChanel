const getAllMusicList = require("../parser/xitmuzonparser");
const db = require("../model/index");
const cli = require("cli-color");
const music = db.music;
async function updateData(model) {
  let data = await model.findAll({ order: [["date", "DESC"]] });
  let test = data[0].date - 86400000 * 100;
  console.log(test);
  console.log(data[0].name);
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
        if (arr2[i].date >= test) {
          mainArr.push(arr2[i]);
        }
      }
    } else {
      console.log("xatolik", arr2);
      shart = false;
    }
    son++;
  }
  for (let i = 0; i < mainArr.length; i++) {
    let son = await model.create(mainArr[i]);
    console.log(cli.blue(`${i + 1} eleamnt bazaga qo'shildi => ${son.name}`));
  }
}
updateData(music);
console.log(1654714800000 < 1661849304317);
