import express from "express";
import config from "config";
const router = express.Router();

router.get("/healthcheck", (_, res) => {
  res.status(200).send("OK");
});

export default router;
