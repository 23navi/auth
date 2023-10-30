// All the strategies will go here, like email/password, google login, facebook ....

// We will only have email password strategy

import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/auth.schema";
import { findUserByEmail } from "../services/user.service";

export async function creatSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const { email, password: candidatePassword } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.json({ message: "Email/password not correct" });
  }
  if (user.verified) {
    return res.json({ message: "Verify your account first" });
  }
  if (!(await user.validatePassword(candidatePassword))) {
    return res.json({ message: "Email/password not correct" });
  }

  /// If we reach here, we will know that user provided correct creds, we need to provide them with token.

  // 1) Sign access token

  // 2) Sign refresh token

  // 3) Send tokens back
}
