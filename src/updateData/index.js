const { default: axios } = require("axios");
const Transaction = require("../models/schemasMongoose/transaction");
const { prepareTransactionData } = require("./preperaTransactionData");
const { saveTransactionToDB } = require("./saveArrayTransactionToDB");
const API_BASE_URL = process.env.API_HOOK;
const MAX_TRANSACTIONS_TO_LOAD = 1000;
const LOAD_TRANSACTION_DELAY_MS = 5000;
let alreadyDone = 0;

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const updateData = async () => {
  const alreadyLoaded = await hasTransactions();
  if (!alreadyLoaded && !alreadyDone) {
    alreadyDone = 1;
    await loadPreviusTransactions();
  }
  await loadTransactionsFromBlock();
};

const loadTransactionsFromBlock = async (numberBlock, index) => {
  let params = `&module=proxy&action=eth_getBlockByNumber&boolean=true`;
  if (numberBlock) params = `${params}&tag=${numberBlock}`;
  try {
    const result = await instance.get(params);
    if (!result.data || result.data === undefined) {
      return;
    }
    const prepereTransactions = await prepareTransactionData(result.data);
    await saveTransactionToDB(prepereTransactions, index);
  } catch (error) {
    throw new Error(error);
  }
};

const loadPreviusTransactions = async () => {
  try {
    const { data } = await instance.get(`&module=proxy&action=eth_blockNumber`);
    const { result } = data;
    const resultInt = parseInt(result);

    for (let index = 0; index < MAX_TRANSACTIONS_TO_LOAD; index++) {
      setTimeout(async () => {
        await loadTransactionsFromBlock(
          (resultInt - index).toString(16),
          index
        );
      }, index * LOAD_TRANSACTION_DELAY_MS);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const hasTransactions = async () => {
  const transaction = await Transaction.findOne();
  return transaction;
};

module.exports = {
  updateData,
};
