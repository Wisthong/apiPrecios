const express = require("express");
const { getItems, getItem } = require("../controller/items");
const router = express.Router();

router.get("/", getItems);

router.get("/:id", getItem);
// router.post("/", createItem);

module.exports = router;
