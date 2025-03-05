const express = require("express");
// const { validatorCustomer, validatorID } = require("../validators/customers");
const router = express.Router();
const { postDO,uploadFile } = require("../controller/querys");

router.post("/", [postDO]);
router.post("/upload", [uploadFile]);

module.exports = router;
