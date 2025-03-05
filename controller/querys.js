const { response, request } = require("express");
const { connection } = require("../db/connection");
const { matchedData } = require("express-validator");

const postDO = async (req = request, res = response) => {
  try {
    const { id_item, lapso_inicio, lapso_fin, id_co } = req.body; // Si los parámetros vienen en el cuerpo de la solicitud

    if (!id_item || !lapso_inicio || !lapso_fin || !id_co) {
      return res.status(400).send({
        ok: false,
        message:
          "Faltan parámetros necesarios: id_item, lapso_inicio, lapso_fin, id_co",
      });
    }

    const query = `
    SELECT 
      MV.ID_ITEM AS item,
      MV.ID_CO AS centro_operacion,
      ITMS.DESCRIPCION AS "nombre_item",
      ITMS.ID_TERC AS "proveedor_codigo",
      ITMS.NOM_TERC AS "proveedor_nombre",
      MIN(MV.FECHA_DCTO) AS fecha,  
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
      AND MV.ID_CO = ?
    `;

    // Aquí se incluyen todos los parámetros que la consulta necesita
    connection.query(
      query,
      [id_item, lapso_inicio, lapso_fin, id_co],  // Agregamos id_co aquí
      function (err, results, fields) {
        if (!err) {
          if (results[0].item !== null) {
            res.send({
              ok: true,
              data: results,
            });
          } else {
            res.send({
              ok: false,
              data: results,
            });
          }
        } else {
          console.log(err);
          res.status(500).send({
            message: "Error en la petición",
            err,
          });
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
