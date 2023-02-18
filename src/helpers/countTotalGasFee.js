// const jwt = require('jsonwebtoken');

const countTotalGasFee = async (usedGas, baseFee , priorityFee) => {
  //The total fee is calculated as "units of gas used * (base fee + priority fee)"

  return usedGas*(baseFee+priorityFee);
};

module.exports = { countTotalGasFee };
