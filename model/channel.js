const channel = (sequelize, DataTypes) => {
  const channel = sequelize.define("channel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telegram_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    music_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "music",
        key: "id",
      },
    },
  });
  return channel;
};
module.exports = channel;
