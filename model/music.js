const music = (sequelize, DataTypes) => {
  const music = sequelize.define("music", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
        max: 20,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 5,
        max: 100,
        isUrl: true,
      },
    },
    nameLotin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
        max: 20,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    downUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    turi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return music;
};
module.exports = music;
