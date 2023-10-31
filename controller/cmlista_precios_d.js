const { response, request } = require("express");
const { preciosModel } = require("../model/index");
const Items = require("../model/sql/items");

const getItems = async (req = request, res = response) => {
  try {
    const data = await preciosModel.findAll({
      where: {
        ID_ITEM: "900009",
      },
      include: {
        all
      },
    });
    console.log("Obteniendo ITEMS");
    res.send({
      data,
      ok: true,
      message: "List general of employes",
    });
  } catch (error) {
    res.status(404).send("Catch error" + error);
  }
};

const getItem = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await preciosModel.findAll({
      where: {
        EMPLEADO: id,
        MOTIVO_RETIRO: "",
      },
    });
    // res.send({
    //   ok: true,
    // });
    // const data = await nmEmpleadosModel.findOne({id:id})
    // console.log("Obteniendo NMEMPLEADOS");
    res.send({
      data,
      ok: true,
      message: "FindOne",
    });
  } catch (error) {
    res.status(404).send("Catch error" + error);
  }
};

module.exports = { getItems, getItem };
