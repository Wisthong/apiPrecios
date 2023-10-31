const express = require("express");
const { getItems, createItem } = require("../controller/vendedores");
const router = express.Router();

router.get("/", getItems);

router.post("/", createItem);

module.exports = router;
