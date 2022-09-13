const mp3Cutter = require("mp3-cutter");
function cutter(name) {
  mp3Cutter.cut({
    src: __dirname + "/" + name + ".mp3",
    target: __dirname + "/cut/" + name + ".mp3",
    start: 10,
    end: 50,
  });
}
cutter("Sami Yusuf - Asma Allah");
