const Transaction = require("../models/schemasMongoose/transaction");

const saveTransactionToDB = async (prepereTransactions) => {
  try {
    await Transaction.insertMany(prepereTransactions, { ordered: false });
  } catch (error) {
    console.log("error save to DB");
  }
};

module.exports = { saveTransactionToDB };
