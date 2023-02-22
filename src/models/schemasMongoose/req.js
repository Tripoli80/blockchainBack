const { Schema, model } = require("mongoose");
const reqip = new Schema(
  {
    reqip: {
      type: String,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Reqip = model("reqip", reqip);
module.exports = Reqip;
