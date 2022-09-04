const momentjs = require("moment");
const data = {
  август: "08",
  сентябрь: "09",
  октябрь: "10",
  ноябрь: "11",
  декабрь: "12",
  январь: "01",
  февраль: "02",
  март: "03",
  апрель: "04",
  май: "05",
  июнь: "06",
  июль: "07",
};

const time = (date) => {
  let vaqt = date.split(" ");
  let vat = data[vaqt[3]] + "-" + vaqt[2] + "-" + vaqt[4];

  const time = new Date(vat).getTime();
  return time;
};
module.exports = time;
