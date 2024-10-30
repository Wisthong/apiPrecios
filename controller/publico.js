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
      `
        SELECT 
            ITEMS.DESCRIPCION,          -- Descripción del artículo
            CMLISTA_PRECIOS_D.ID_LIPRE1,  -- Identificador de la lista de precios
            CMLISTA_PRECIOS_D.PRECIO_MIN_1, -- Precio mínimo del artículo
            ITEMS.ID_ITEM               -- Identificador del artículo
        FROM 
            CMLISTA_PRECIOS_D 
        INNER JOIN 
            ITEMS ON ITEMS.ID_ITEM = CMLISTA_PRECIOS_D.ID_ITEM   -- Unir con la tabla ITEMS
        INNER JOIN 
            COD_BARRAS ON ITEMS.ID_ITEM = COD_BARRAS.ID_ITEMS     -- Unir con la tabla COD_BARRAS
        WHERE 
            CMLISTA_PRECIOS_D.ID_LIPRE1 = 'PUB'                    -- Filtrar por lista de precios 'PUB'
            AND COD_BARRAS.ID_CODBAR = ${id};                      -- Filtrar por código de barras específico
      `,
      function (err, results, fields) {
        if (!err) {
          if (results.length > 0) {
            res.send({
              results,
            });
          } else {
            res.status(405).send({
              ok: false,
              message:
                "Item no catalogado, por favor dirigite con los asesores",
            });
          }
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
