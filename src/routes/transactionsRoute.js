const express = require("express");
const { tryWrapper } = require("../helpers");
const {
  queryTransactions,
  allTransactions,
} = require("../controllers/transactionsController");
const { validatorQuery } = require("../middleware/validationDATA");
const { schemaQUERY, schemaAll } = require("../models/schemasJoi");
const setDataPigination = require("../middleware/pagination");

const router = express.Router();

router.get(
  "/",
  validatorQuery(schemaAll),
  setDataPigination,
  tryWrapper(allTransactions)
);

router.get(
  "/",
  validatorQuery(schemaQUERY),
  setDataPigination,
  tryWrapper(queryTransactions)
);


module.exports = router;
