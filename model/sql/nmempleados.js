const { sequelize } = require("../../db/sql/connection");
const { DataTypes } = require("sequelize");

const Nmempleados = sequelize.define(
  "NMEMPLEADOS",
  {
    // CODIGO: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    EMPLEADO: {
      type: DataTypes.MEDIUMINT,
      primaryKey: true,
      // allowNull: false,
    },
    NOMBRES: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    APELLIDO1: {
      type: DataTypes.STRING,
    },
    APELLIDO2: {
      type: DataTypes.STRING,
    },
    NOMBRE_COMPLETO: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    FECHA_INGRESO_EMPLEADO: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    MOTIVO_RETIRO: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CIUDAD_EXPEDICION: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Nmempleados;
