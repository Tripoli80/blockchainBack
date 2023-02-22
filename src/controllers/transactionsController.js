const {
  getQueryTransactions,
  getTransactions,
} = require("../services/transactionServices");

const allTransactions = async (req, res, next) => {


  const {
    size,
    page,
    query: { filter, search },
  } = req;

  if (filter !== undefined || search !== undefined) return next();

  const response = await getTransactions({ size, page });
  return res.status(200).json(response);
};

const queryTransactions = async (req, res) => {
  let {
    size,
    page,
    query: { filter, search },
  } = req;
  filter = decodeURI(filter);
  search = decodeURI(search);

  if (search.length < 1)
    return res.status(200).json({ massege: "search text min 1 symbol" });
  const response = await getQueryTransactions({ filter, search, size, page });
  return res.status(200).json(response);
};

module.exports = {
  queryTransactions,
  allTransactions,
};
