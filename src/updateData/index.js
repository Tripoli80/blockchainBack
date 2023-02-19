const { default: axios } = require("axios");
const Transaction = require("../models/schemasMongoose/transaction");
const { prepareTransactionData } = require("./preperaTransactionData");
const { saveTransactionToDB } = require("./saveArrayTransactionToDB");

const instance = axios.create({
  baseURL: process.env.API_HOOK,
});
let alredyDo = 0;
const updateData = async () => {
  const isPresent = await Transaction.findOne();

  if (!isPresent && !alredyDo) {
    console.log("Data no exist");
    alredyDo = 1;
    await getDataFirstTime();
  }
  await getDataByBlock();
};

const getDataByBlock = async (numberBlock, index) => {
  if (numberBlock) {
  }
  try {
    const params = numberBlock
      ? `&module=proxy&tag=${numberBlock}&action=eth_getBlockByNumber&boolean=true`
      : `&module=proxy&action=eth_getBlockByNumber&boolean=true`;
    const result = await instance.get(params);

    if (!result.data || result.data === undefined) {
      console.log("noData");
      return;
    }


    const prepereTransactions = await prepareTransactionData(result.data);

    await saveTransactionToDB(prepereTransactions, index);
  } catch (error) {
    throw new Error(error);
  }
};

const getDataFirstTime = async () => {
  try {
    // получить текущий блок
    // сделать цикл запросов в -1000 от последнего блока
    //в котором запросить транзакции по каждому блоку и передать в сохранения

    const { data } = await instance.get(`&module=proxy&action=eth_blockNumber`);
    const { result } = data; // текущий блок
    const resultInt = parseInt(result);

    for (let index = 0; index < 1000; index++) {
      setTimeout(async () => {
        console.log("🚀 ~ file: index.js:54 ~ index", index);
        await getDataByBlock((resultInt - index).toString(16), index);
        console.log("🚀 ~ saved ~ index", index);
      }, index * 5000);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  updateData,
};
