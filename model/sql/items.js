const { sequelize } = require("../../db/sql/connection");
const { DataTypes } = require("sequelize");
const Cmlista_precios_d = require("./cmlista_precios_d");

const Items = sequelize.define(
  "ITEMS",
  {
    ID_ITEM: {
      type: DataTypes.STRING,
      primaryKey: true,
      // allowNull: false,
    },
    ID_REFERENCIA: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    ID_CODBAR: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// Items.hasMany(Cmlista_precios_d);

module.exports = Items;
