const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const cli = require("cli-color");
const name = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(name, user, password, {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log(cli.blue("connected"));
  })
  .catch((err) => {
    console.log(cli.red(err));
  });
const db = {};
db.sequelize = sequelize;
db.music = require("./music")(sequelize, DataTypes);
db.channel = require("./channel")(sequelize, DataTypes);
db.user = require("./user")(sequelize, DataTypes);
// db.sequelize
//   .sync({ alter: true, force: true })
//   .then(() => {
//     console.log(cli.green("synced"));
//   })
//   .catch((err) => {
//     console.log(cli.red(err));
//   });
module.exports = db;
