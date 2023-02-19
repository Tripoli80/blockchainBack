const Transaction = require("../models/schemasMongoose/transaction");

const getQueryTransactions = async ({ filter, search, size, page }) => {
  const query = new RegExp(".*" + search + ".*", "i");
  const skip = size * (page - 1);
  const total = await Transaction.find({

    [filter]: { $regex: query },
  }).count();
  const lastBlock = await Transaction.find().sort({ _id: -1 }).limit(1);
  const transaction = await Transaction.find({
    [filter]: { $regex: query },
  })
    .allowDiskUse(true)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(size);
  return {
    total,
    page,
    result_size: size,
    lastBlock: lastBlock[0].blockNumber,
    result: transaction,
  };
};

const getTransactions = async ({ size, page }) => {
  const total = await Transaction.find().allowDiskUse(true).count();
  const lastBlock = await Transaction.find().sort({ timestamp: -1 }).limit(1);

  const transaction = await Transaction.find()
    .allowDiskUse(true)
    .sort({ _id: -1 })
    .skip(size * (page - 1))
    .limit(size);

  return {
    total,
    page,
    result_size: size,
    lastBlock: lastBlock[0].blockNumber,
    result: transaction,
  };
};

module.exports = {
  getTransactions,
  getQueryTransactions,
};
