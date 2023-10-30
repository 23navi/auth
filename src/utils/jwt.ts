import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  console.log({ signingKey });

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

signJwt({ abc: "abc" }, "accessTokenPrivateKey");

export function verifyJwt(
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {}
