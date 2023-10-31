const { response, request } = require("express");
const { vendedoresModel } = require("../model/index");

const getItems = async (req = request, res = response) => {
  try {
    const data = await vendedoresModel.findAll({});
    console.log("Hola mundo");
    res.send({
      data,
      ok: true,
      message: "Has obtenido la lista de los dispositivos",
    });
  } catch (error) {
    res.status(404).send("Catch error" + error);
  }
};

const createItem = async (req, res) => {
  try {
    console.log(req.body);
    const data = await vendedoresModel.create(req);
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(404).send("Catch error" + error);
  }
};

module.exports = { getItems, createItem };
