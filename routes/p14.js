const express = require("express");
// const { validatorCustomer, validatorID } = require("../validators/customers");
const router = express.Router();
const { getOneP14 } = require("../controller/p14");
const { validatorEAN } = require("../validators/items");

// router.post(
//   "/",
//   [uploadMiddleware.single("myFile"), validatorCustomer],
//   createCustomer
// );

// router.get("/", [getPublic]);
router.get("/:id", [validatorEAN, getOneP14]);
// router.get("/:id", [getOneP14]);

// router.get("/:id", [validatorID], getCustomer);

module.exports = router;
