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
    .allowDiskUse(true)
    .sort({ _id: 1 })
    .skip(skip)
    .limit(size);
  return { total, page, result_size: size, result: transaction };
};

const getTransactions = async ({ size, page }) => {
  console.log("🚀 ~ file: transactionServices.js:30 ~ size", size)
  const total = await Transaction.find().allowDiskUse(true).count();
  const transaction = await Transaction.find()
    .allowDiskUse(true)
    .sort({ _id: 1 })
    .skip(size * (page - 1))
    .limit(size);

  return { total, page, result_size: size, result: transaction };
};

module.exports = {
  getTransactions,
  getQueryTransactions,
};
