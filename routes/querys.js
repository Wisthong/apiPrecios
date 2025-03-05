const express = require("express");
// const { validatorCustomer, validatorID } = require("../validators/customers");
const router = express.Router();
const { postDO } = require("../controller/querys");

router.post("/", [postDO]);
// router.get("/:id", [validatorEAN, getOneP14]);

module.exports = router;
