const { Schema, model } = require("mongoose");
const transaction = new Schema(
  {
    hash: {
      index: true,
      type: String,
      required: [true, "hash is required"],
      unique: true,
    },
    blockHash: {
      type: String,
      required: [true, "blockHash is required"],
    },
    blockNumber: {
      type: String,
      required: [true, "blockNumber is required"],
      index: true,
    },
    from: {
      index: true,

      type: String,
      required: [true, "from is required"],
    },
    gas: {
      type: String,
      required: [true, "gas is required"],
    },
    gasPrice: {
      type: String,
      required: [true, "gasPrice is required"],
    },
    maxFeePerGas: {
      type: String,
      default: null,
    },
    maxPriorityFeePerGas: {
      type: String,
      default: null,
    },

    to: {
      type: String,
      index: true,
    },
    transactionIndex: {
      type: String,
      required: [true, "transactionIndex is required"],
    },
    value: {
      type: String,
      required: [true, "value is required"],
    },

    timestamp: {
      type: String,
      required: [true, "timestamp is required"],
    },
    totalfee: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

transaction.pre("save", async function (next) {
  const transaction = this;
  if (!transaction.isModified("gas")) next();
  const totanWithMaxFee =
    parseInt(transaction.gas) * parseInt(transaction.maxFeePerGas);
  const total = parseInt(transaction.gas) * parseInt(transaction.gasPrice);
  transaction.totalfee = totanWithMaxFee ? totanWithMaxFee : total;
  next();
});
const Transaction = model("transaction", transaction);
module.exports = Transaction;
