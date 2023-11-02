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
      `SELECT ID_ITEM,DESCRIPCION FROM ITEMS WHERE ITEMS.ID_CODBAR = ${id}`,
      // `SELECT ITEMS.DESCRIPCION,ITEMS.ID_ITEM, ITEMS.ID_CODBAR, CMLISTA_PRECIOS_D.ID_LIPRE1,CMLISTA_PRECIOS_D.PRECIO_MIN_1 FROM ITEMS INNER JOIN CMLISTA_PRECIOS_D ON ITEMS.ID_ITEM=CMLISTA_PRECIOS_D.ID_ITEM WHERE CMLISTA_PRECIOS_D.ID_LIPRE1 = 'PUB' AND ITEMS.ID_CODBAR = ${id}`,
      function (err, results, fields) {
        if (!err) {
          const { ID_ITEM } = results[0];
          const { DESCRIPCION } = results[0];
          connection.query(
            `SELECT CMLISTA_PRECIOS_D.ID_LIPRE1 , CMLISTA_PRECIOS_D.PRECIO_MIN_1 FROM CMLISTA_PRECIOS_D WHERE CMLISTA_PRECIOS_D.ID_LIPRE1 = 'PUB' AND CMLISTA_PRECIOS_D.ID_ITEM =${ID_ITEM} `,
            (error, resultado, fields) => {
              if (!error) {
                const { ID_LIPRE1, PRECIO_MIN_1 } = resultado[0];
                const data = {
                  DESCRIPCION,
                  ID_LIPRE1,
                  PRECIO_MIN_1,
                };
                res.send({
                  ok: true,
                  message: "Exito",
                  data,
                });
              } else {
                return res.send({
                  message: "Error QUERY",
                });
              }
            }
          );
        } else {
          res.send({
            message: "Query_ERROR_204",
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
