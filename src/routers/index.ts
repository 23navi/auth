import express from "express";
import config from "config";
import userRouter from "./user.router";
import authRouter from "./auth.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);

router.get("/healthcheck", (_, res) => {
  res.status(200).send("OK");
});

export default router;
