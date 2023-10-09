import express from "express";
import config from "config";
const router = express.Router();
import { createUserSchema, verifyUserSchema } from "../schemas/user.schema";
import validateRequest from "../middlewares/validateResources";
import {
  creatUserHandler,
  verifyUserHandler,
} from "../controllers/user.controller";

router.post("/", validateRequest(createUserSchema), creatUserHandler);

router.post(
  "/verify/:userId/:verificationCode",
  validateRequest(verifyUserSchema),
  verifyUserHandler
);

export default router;
