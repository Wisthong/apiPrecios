const { check } = require("express-validator");
const { validateResult } = require("../helpers/handleValidator");

const validatorEAN = [
  check("id", "El código de barra no esta catalogado").exists().notEmpty(),

  // .isEAN(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorEAN };
