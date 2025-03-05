const express = require("express");
const router = express.Router();
const { getOnePublic, getPublic } = require("../controller/publico");
const { validatorEAN } = require("../validators/items");

// router.get("/", [getPublic]);
router.get("/:id", [validatorEAN, getOnePublic]);

module.exports = router;
