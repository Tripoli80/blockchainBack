// const jwt = require('jsonwebtoken');

const countTotalGasFee =  ({gas, gasPrice, maxFeePerGas}) => {
  //The total fee is calculated as "units of gas used * (base fee + priority fee)"

  const totanWithMaxFee = parseInt(gas) * parseInt(maxFeePerGas);
  const total = parseInt(gas) * parseInt(gasPrice);

  totalfee = totanWithMaxFee ? totanWithMaxFee : total;

  // return usedGas * (baseFee + priorityFee);
  return totalfee.toString(16);
};

module.exports = { countTotalGasFee };
