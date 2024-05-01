import express from "express";
const router = express.Router();
import validateRequest from "../middlewares/validateResources";
import { createSessionSchema } from "../schemas/auth.schema";
import {
  creatSessionHandler,
  refreshSessionHandler,
} from "../controllers/auth.controller";

// router.get("/session", (req, res) => {
//   res.send("Auth get route");
// });

router.post(
  "/session",
  validateRequest(createSessionSchema),
  creatSessionHandler
);

router.post("/session/refresh", refreshSessionHandler);

export default router;
