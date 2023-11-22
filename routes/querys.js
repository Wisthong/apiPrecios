const express = require("express");
// const { validatorCustomer, validatorID } = require("../validators/customers");
const router = express.Router();
const { getAll } = require("../controller/querys");

router.get("/", [getAll]);
// router.get("/:id", [validatorEAN, getOneP14]);

module.exports = router;
