import { DocumentType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { signJwt } from "../utils/jwt";
import SessionModel from "../models/session.model";

async function createSession(userId: string) {
  return SessionModel.create({ user: userId });
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = user.toJSON();
  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "10m",
  });
  return accessToken;
}

// This will do two things, create new entry in db and then sign that _id as refreshToken
export async function signRefreshToken(userId: string) {
  const session = await createSession(userId);
  const refreshToken = signJwt(
    { session: session._id },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );
  return refreshToken;
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}
