// const jwt = require('jsonwebtoken');

const countTotalGasFee =  ({gas, gasPrice, maxPriorityFeePerGas, maxFeePerGas}) => {
 const maxPriorityFee = maxPriorityFeePerGas
   ? BigInt(gas) * BigInt(maxPriorityFeePerGas)
   : BigInt(0);
 const maxFee = maxFeePerGas ? BigInt(gas) * BigInt(maxFeePerGas) : BigInt(0);
 const fee = maxPriorityFee > maxFee ? maxFee : maxPriorityFee;
 const transactionFee = BigInt(gas) * BigInt(gasPrice) + fee;
 return transactionFee.toString();
};


module.exports = { countTotalGasFee };
