require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connection } = require("./db/connection");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// connection.query(
//   "SELECT ITEMS.ID_ITEM, ITEMS.ID_CODBAR, CMLISTA_PRECIOS_D.ID_LIPRE1,CMLISTA_PRECIOS_D.PRECIO_MIN_1 FROM ITEMS INNER JOIN CMLISTA_PRECIOS_D ON ITEMS.ID_ITEM=CMLISTA_PRECIOS_D.ID_ITEM",
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

/**
 * API Rest
 */
app.use("/api", require("./routes"));


app.listen(port, () =>
  console.log(`Tu server esta listo por el puerto ${port}`)
);

/**
 * Define your database engine
 */

// dbConnectMySQL();
