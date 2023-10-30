import { Request, Response, NextFunction } from "express";

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!res.locals.user) {
    return res.status(403).send("Not authorized");
  }
  return next();
}
