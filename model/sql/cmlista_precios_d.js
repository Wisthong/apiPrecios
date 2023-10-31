const { sequelize } = require("../../db/sql/connection");
const { DataTypes } = require("sequelize");

const Cmlista_precios_d = sequelize.define(
  "CMLISTA_PRECIOS_D",
  {
    ID_LIPRE1: {
      type: DataTypes.STRING,
      primaryKey: false,
      // allowNull: false,
    },
    ID_ITEM: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    PRECIO_MIN_1: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    tableName:'CMLISTA_PRECIOS_D',
    freezeTableName: true,
    timestamps: false,
  }
);

Cmlista_precios_d.removeAttribute("id");

module.exports = Cmlista_precios_d;
