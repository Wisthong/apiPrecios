require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { dbConnectMySQL } = require("./db/sql/connection");
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

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

dbConnectMySQL();
