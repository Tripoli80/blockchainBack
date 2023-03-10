const { countTotalGasFee } = require("../helpers/countTotalGasFee");

const prepareTransactionData = (data) => {
  const { timestamp, transactions } = data.result;
  const preparedTransactions = transactions.map((item) => {
    const {
      blockHash,
      blockNumber,
      from,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      hash,
      to,
      transactionIndex,
      value,
    } = item;

    const totalfee = countTotalGasFee({
      gas,
      maxPriorityFeePerGas,
      gasPrice,
      maxFeePerGas,
    });

    const currentTransaction = {
      hash,
      blockHash,
      blockNumber,
      from,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      to,
      transactionIndex,
      value,
      totalfee,
      timestamp,
    };
    return currentTransaction;
  });

  return preparedTransactions;
};
module.exports = {
  prepareTransactionData,
};
