import { Request, Response } from "express";
import { CreateUserInput, VerifyUserInput } from "../schemas/user.schema";
import { createUser, findUserById } from "../services/user.service";
import { sendEmail } from "../utils/mailer";

export async function creatUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  // We got the type but we still don't know if the validation passed or not. To validate, we need middleware.
  const body = req.body;

  //   // We could have also done. // but as cast which is not good
  //   const body2 = req.body as CreateUserInput;
  try {
    const user = await createUser(body);
    sendEmail({
      from: "navisureka23@gmail.com",
      to: user.email,
      subject: "Please confirm you account",
      text: `To confirm the email, please use this code: ${user.verificationCode}`,
    });
    return res.status(201).send(user);
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("User already exists");
    }
    return res.status(500).send(e);
  }

  res.send(body);
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const id = req.params.userId;
  const verificationCode = req.params.verificationCode;

  const user = await findUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  if (user.verified) {
    return res.sendStatus(200);
  }

  if (user.verificationCode !== verificationCode) {
    return res.sendStatus(403);
  }

  user.verified = true;

  await user.save();

  return res.sendStatus(200);
}
