const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//connect to mongo db database
db.once("open", () => {
  app.listen(port, () => {
    console.log(`API server is listening on port ${port}`);
  });
});
