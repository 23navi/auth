import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = config.get(keyName);
}

export function verifyJwt(
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {}
