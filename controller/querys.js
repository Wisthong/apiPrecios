const { response, request } = require("express");
const { connection } = require("../db/connection");
const { matchedData } = require("express-validator");

const postDO = async (req = request, res = response) => {
  try {
    const { id_item, lapso_inicio, lapso_fin } = req.body; // Si los parámetros vienen en el cuerpo de la solicitud
    // Si los parámetros vienen en la URL, puedes usar req.params en lugar de req.body

    if (!id_item || !lapso_inicio || !lapso_fin) {
      return res.status(400).send({
        ok: false,
        message:
          "Faltan parámetros necesarios: id_item, lapso_inicio, lapso_fin",
      });
    }

    // const query = `
    //   SELECT MV.LAPSO_DOC AS Lapso,
    //     MV.ID_CO AS "Centro de Operacion",
    //     CO.DESCRIPCION AS "Nombre Centro de Operacion",
    //     MV.ID_ITEM AS Item,
    //     ITMS.DESCRIPCION AS "Nombre Item",
    //     ITMS.ID_TERC AS "Proveedor Codigo Item",
    //     ITMS.NOM_TERC AS "Proveedor Nombre Item",
    //     MV.FECHA_DCTO AS Fecha,
    //     MV.ID_LIDES AS "Lista Descuento",
    //     MV.CANTIDAD_CAP AS "Cantidad 1",
    //     MV.DSCTO_NETOS AS "Valor Descuentos",
    //     MV.TOT_BRUTO AS "Valor Neto"
    //   FROM
    //     ITEMS ITMS
    //     RIGHT OUTER JOIN (CENTRO_OPERACION CO
    //     RIGHT OUTER JOIN MOVIMIENTO_VENTAS MV ON CO.CODIGO = MV.ID_CO)
    //     ON ITMS.ID_ITEM = MV.ID_ITEM AND ITMS.ID_EXT_ITM = MV.ID_EXT_ITM
    //   WHERE
    //     MV.ID_ITEM = ?
    //     AND MV.FECHA_DCTO BETWEEN ? AND ?
    //     AND MV.ID_LIDES IS NOT NULL
    //     AND MV.ID_LIDES != ''
    // `;

    const query = `
    SELECT 
      MV.ID_ITEM AS item,
      ITMS.DESCRIPCION AS "nombre_item",
      ITMS.ID_TERC AS "proveedor_codigo",
      ITMS.NOM_TERC AS "proveedor_nombre",
      MIN(MV.FECHA_DCTO) AS fecha,  -- Te muestra la primera fecha para el Item en el rango
      MV.ID_LIDES AS "lista_descuento",
      SUM(MV.DSCTO_NETOS) AS "valor_descuentos"
    FROM 
      ITEMS ITMS 
      RIGHT OUTER JOIN (CENTRO_OPERACION CO 
      RIGHT OUTER JOIN MOVIMIENTO_VENTAS MV ON CO.CODIGO = MV.ID_CO) 
      ON ITMS.ID_ITEM = MV.ID_ITEM AND ITMS.ID_EXT_ITM = MV.ID_EXT_ITM
    WHERE 
      MV.ID_ITEM = ? 
      AND MV.FECHA_DCTO BETWEEN ? AND ?
      AND MV.ID_LIDES IS NOT NULL 
      AND MV.ID_LIDES != ''
    `;

    connection.query(
      query,
      [id_item, lapso_inicio, lapso_fin],
      function (err, results, fields) {
        if (!err) {
          console.log(fields);
          console.log(results);

          res.send({
            ok: true,
            data: results,
          });
        } else {
          res.status(500).send({
            message: "Query_ERROR_204",
          });
          console.log("Query_ERROR_204");
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  postDO,
};
