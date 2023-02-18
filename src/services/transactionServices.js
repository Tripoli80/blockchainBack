const Transaction = require("../models/schemasMongoose/transaction");

const getQueryTransactions = async ({ filter, search, size, page }) => {
  const query = new RegExp(".*" + search + ".*", "i");
  const skip = size * (page - 1);
  const total = await Transaction.find({
    [filter]: { $regex: query },
  }).count();
  const transaction = await Transaction.find({
    [filter]: { $regex: query },
  })
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(size);
  return { total, page, result_size: size, result: transaction };
};

const getTransactions = async ({ size, page }) => {
  const total = await Transaction.find({}, []).sort({ created_at: -1 }).count();
  const transaction = await Transaction.find({}, [])
    .sort({ created_at: -1 })
    .skip(size * (page - 1))
    .limit(size);

  return { total, page, result_size: size, result: transaction };
};

module.exports = {
  getTransactions,
  getQueryTransactions,
};
