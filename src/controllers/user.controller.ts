import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";

export async function creatUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  // We got the type but we still don't know if the validation passed or not. To validate, we need middleware.
  const body = req.body;

  //   // We could have also done. // but as cast which is not good
  //   const body2 = req.body as CreateUserInput;

  res.send(body);
}
