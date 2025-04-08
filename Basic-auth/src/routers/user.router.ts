import express from "express";
const router = express.Router();
import {
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schemas/user.schema";
import validateRequest from "../middlewares/validateResources";
import {
  creatUserHandler,
  verifyUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  getMeHandler,
} from "../controllers/user.controller";

router.post("/", validateRequest(createUserSchema), creatUserHandler);

// What is better, a get request or a post request?

router.post(
  "/verify/:userId/:verificationCode",
  validateRequest(verifyUserSchema),
  verifyUserHandler
);

// Frontend will send a post request to backend to verify the account, we don't want them to send get request directly to backend
// router.get(
//   "/verify/:userId/:verificationCode",
//   validateRequest(verifyUserSchema),
//   verifyUserHandler
// );

router.post(
  "/forgotpassword",
  validateRequest(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/forgotpassword/:id/:passwordResetCode",
  validateRequest(resetPasswordSchema),
  resetPasswordHandler
);

GET /api/users/me
router.get("/me", getMeHandler);

export default router;
