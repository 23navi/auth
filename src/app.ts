require("dotenv").config();
import express from "express";
import config from "config";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routers";

const port = config.get<number>("port");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(router);

app.listen(port, () => {
  log.info(`Server is running on port ${port}`);
  connectToDb();
});
