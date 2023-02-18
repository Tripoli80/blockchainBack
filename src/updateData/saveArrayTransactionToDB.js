const Transaction = require("../models/schemasMongoose/transaction");

const saveTransactionToDB = async (prepereTransactions, index) => {
  try {
    await Transaction.insertMany(prepereTransactions, { ordered: false });
  } catch (error) {
    console.log("Can't not All save index", index);
    // throw new Error(error);
  }
};

module.exports = { saveTransactionToDB };
