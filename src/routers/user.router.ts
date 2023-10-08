import express from "express";
import config from "config";
const router = express.Router();
import { createUserSchema } from "../schemas/user.schema";
import validateRequest from "../middlewares/validateResources";
import { creatUserHandler } from "../controllers/user.controller";

router.post("/", validateRequest(createUserSchema), creatUserHandler);

export default router;
