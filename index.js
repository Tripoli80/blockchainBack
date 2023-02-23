const app = require("./src/app");
require("dotenv").config();
const mongoose = require("mongoose");
const { updateData } = require("./src/updateData");

(() => {
  const PORT = process.env.PORT || 3000;
  const uriDb = process.env.URL_DB;
  console.log("🚀 ~ file: index.js:9 ~ uriDb", uriDb);

  const connection = mongoose.connect(uriDb, {
    promiseLibrary: global.Promise,
  });

  connection
    .then(() => {
      function getData() {
        updateData();
        setTimeout(getData, 8000);
      }
      getData();
    })
    .then(
      app.listen(PORT, () => {
        console.log("Server running. Use our API on port: ", PORT);
      })
    )
    .catch((err) => {
      console.log(`Server not running. Error message: ${err.message}`);
      process.exit(1);
    });
})();
