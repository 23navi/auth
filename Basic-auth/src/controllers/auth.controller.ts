// All the strategies will go here, like email/password, google login, facebook ....

// We will only have email password strategy

import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/auth.schema";
import { findUserByEmail, findUserById } from "../services/user.service";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../services/auth.service";
import { verifyJwt } from "../utils/jwt";
import SessionModel from "../models/session.model";

export async function creatSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const { email, password: candidatePassword } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.json({ message: "Email/password not correct" });
  }
  if (!user.verified) {
    return res.json({ message: "Verify your account first" });
  }
  if (!(await user.validatePassword(candidatePassword))) {
    return res.json({ message: "Email/password not correct" });
  }

  /// If we reach here, we will know that user provided correct creds, we need to provide them with token.

  // 1) Sign access token

  const accessToken = signAccessToken(user);

  // 2) Sign refresh token

  const refreshToken = await signRefreshToken(user.id);

  // 3) Send tokens back (Sending as body not header)

  res.send({ email, accessToken, refreshToken });
}

export async function refreshSessionHandler(req: Request, res: Response) {
  const refreshToken = (req.headers["x-refresh"] || "") as string | "";
  if (!refreshToken) {
    return res.send("Invalid refresh token");
  }
  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPrivateKey"
  );
  if (!decoded) {
    return res.send("Invalid refresh token");
  }
  const session = await findSessionById(decoded?.session);

  if (!session || !session.vaild) {
    return res.send("Could not refresh the token");
  }

  const user = await findUserById(String(session.user));
  if (!user) {
    return res.send("Could not refresh the token");
  }
  const accessToken = signAccessToken(user);
  return res.send({ accessToken });
}
