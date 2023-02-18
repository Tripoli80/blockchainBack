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
      timestamp,
    };
    return currentTransaction;
  });
    
  return preparedTransactions;
};
module.exports = {
  prepareTransactionData,
};
// const {
//   baseFeePerGas,
//   difficulty,
//   extraData,
//   gasLimit,
//   gasUsed,
//   number,
//   parentHash,
//   receiptsRoot,
//   sha3Uncles,
//   size,
//   stateRoot,
//   timestamp,
//   totalDifficulty,
//   transactions: {
//     blockHash,
//     blockNumber,
//     from,
//     gas,
//     gasPrice,
//     maxFeePerGas,
//     maxPriorityFeePerGas,
//     hash,
//     input,
//     nonce,
//     to,
//     transactionIndex,
//     value,
//     type,
//     accessList,
//     chainId,
//     v,
//     r,
//     s,
//   },
// } = item;
