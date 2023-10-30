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

export function verifyJwt<T>(
  token: string,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey"
): T | null {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    console.log({ decoded });
    return decoded;
  } catch (e) {
    return null;
  }
}
