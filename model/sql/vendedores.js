const { sequelize } = require("../../db/sql/connection");
const { DataTypes } = require("sequelize");

const Vendedores = sequelize.define(
  "VENDEDORES",
  {
    CODIGO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CEDULA: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    DESCRIPCION: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    ID_RUTA: {
      type: DataTypes.STRING,
    },
    ID_CLASE: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    ID_SUPERVISOR: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    CLASE_DESC_VEND: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Vendedores;
