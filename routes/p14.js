const express = require("express");
// const { validatorCustomer, validatorID } = require("../validators/customers");
const router = express.Router();
const { getOneP14 } = require("../controller/p14");
const { validatorEAN } = require("../validators/items");

// router.get("/", [getPublic]);
router.get("/:id", [validatorEAN, getOneP14]);

module.exports = router;
