const { response, request } = require("express");
const { connection } = require("../db/connection");
const { matchedData } = require("express-validator");

const getPublic = async (req = request, res = response) => {
  try {
    connection.query(
      "SELECT ITEMS.DESCRIPCION, ITEMS.ID_ITEM, ITEMS.ID_CODBAR, CMLISTA_PRECIOS_D.ID_LIPRE1,CMLISTA_PRECIOS_D.PRECIO_MIN_1 FROM ITEMS INNER JOIN CMLISTA_PRECIOS_D ON ITEMS.ID_ITEM=CMLISTA_PRECIOS_D.ID_ITEM WHERE CMLISTA_PRECIOS_D.ID_LIPRE1 = 'PUB'",
      function (err, results, fields) {
        if (!err) {
          res.send({
            ok: true,
            data: results,
            // fields: fields,
          });
          console.log(results); // results contains rows returned by server
          // console.log(fields); // fields contains extra meta data about results, if available
        } else {
          res.send({
            message: "Query_ERROR_204",
          });
          console.log("Query_ERROR_204");
        }
      }
    );
  } catch (error) {
    res.send({
      error,
    });
    // handleHttpError(res, error);
  }
};

const getOnePublic = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    connection.query(
      `SELECT ITEMS.DESCRIPCION,CMLISTA_PRECIOS_D.ID_LIPRE1 , CMLISTA_PRECIOS_D.PRECIO_MIN_1 FROM CMLISTA_PRECIOS_D INNER JOIN ITEMS ON ITEMS.ID_ITEM=CMLISTA_PRECIOS_D.ID_ITEM INNER JOIN COD_BARRAS ON ITEMS.ID_ITEM=COD_BARRAS.ID_ITEMS WHERE 
      CMLISTA_PRECIOS_D.ID_LIPRE1 = 'PUB' AND COD_BARRAS.ID_CODBAR=${id}`,
      function (err, results, fields) {
        if (!err) {
          res.send({
            results,
          });
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getPublic,
  getOnePublic,
};
