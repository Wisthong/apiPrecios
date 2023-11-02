const { response, request } = require("express");
const { connection } = require("../db/connection");
const { matchedData } = require("express-validator");

const getOneP14 = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    connection.query(
      `SELECT ITEMS.DESCRIPCION,ITEMS.ID_ITEM, ITEMS.ID_CODBAR, CMLISTA_PRECIOS_D.ID_LIPRE1,CMLISTA_PRECIOS_D.PRECIO_MIN_1 FROM ITEMS INNER JOIN CMLISTA_PRECIOS_D ON ITEMS.ID_ITEM=CMLISTA_PRECIOS_D.ID_ITEM WHERE CMLISTA_PRECIOS_D.ID_LIPRE1 = 'P14' AND ITEMS.ID_CODBAR = ${id}`,
      function (err, results, fields) {
        if (!err) {
          res.send({
            ok: true,
            data: results,
            // fields: fields,
          });
        } else {
          res.send({
            message: "Query_ERROR_204",
          });
          console.log("Query_ERROR_204");
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getOneP14,
};
