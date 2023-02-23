const Reqip = require("../models/schemasMongoose/req");

const saveClientIP = async (req, res, next) => {
  const ip = req.ip;
  const reqvest = await Reqip.findOne({ reqip: ip });
  if (reqvest) {
    reqvest.count = parseInt(reqvest.count) + 1;
    await reqvest.save();
    return next();
  }

  const client = new Reqip({ reqip: ip });

  try {
    await client.save();
  } catch (error) {
    console.log("error:", error);
  }
  return next();
};
module.exports = saveClientIP;
