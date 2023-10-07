import express from "express";
import config from "config";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth get route");
});

export default router;
