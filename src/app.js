const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const { tryWrapper } = require("./helpers");
const { errorHandler, tryWrapper } = require("./helpers");
const transactionsRouter = require("./routes/transactionsRoute");
const setDataPigination = require("./middleware/pagination");
const saveClientIP = require("./middleware/saveclientip");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(saveClientIP);
app.use("/api/transactions", transactionsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Routs not found" });
});

app.use(errorHandler);
//Connect to the database before listening

module.exports = app;
