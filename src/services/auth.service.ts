import { DocumentType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { signJwt } from "../utils/jwt";

export function signAccessToken(user: DocumentType<User>) {
  const payload = user.toJSON();
  const accessToken = signJwt(payload, "accessTokenPrivateKey");
  return accessToken;
}

export function signRefreshToken() {}
