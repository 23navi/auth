import { Request, Response } from "express";
import {
  CreateUserInput,
  VerifyUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../schemas/user.schema";
import {
  createUser,
  findUserById,
  findUserByEmail,
} from "../services/user.service";
import { sendEmail } from "../utils/mailer";
import log from "../utils/logger";
import { nanoid } from "nanoid";

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
      text: `To confirm the email, please use this code: ${user.verificationCode}\n or click below to verify: http://localhost:3005/api/users/verify/${user._id}/${user.verificationCode}\n\nThank you`,
    });
    return res.status(201).send(user);
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("User already exists");
    }
    return res.status(500).send(e);
  }
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

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  const userEmail = req.body.email;

  const message = "Please check you email for the password reset code.";

  const user = await findUserByEmail(userEmail);

  if (!user) {
    log.debug(`No user with that email: ${userEmail}`);
    return res.send(message);
  }

  if (!user.verified) {
    return res.send("User is not verified, please verify your account first");
  }

  // Create new forgot password code and send it to the user's email after attaching it to user.passwordResetCode

  user.verificationCode = nanoid();
  user.save();

  sendEmail({
    from: "navisureka23@gmail.com",
    to: user.email,
    subject: "Use the given code to reset your password",
    text: `To reset the password use this code with id, please use this code: ${user.verificationCode}\n or click below to verify: http://localhost:3005/api/users/verify/${user._id}/${user.verificationCode}\n\nThank you`,
  });

  return res.send(message);
}

// One thing is missing, how do we manage expiration of reset token?
export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  // We can also think of adding code that will expire the password reset code after a certain time.
  const { id, passwordResetCode } = req.params;
  const { password } = req.body;

  const user = await findUserById(id);

  if (!user || !user.verified) {
    return res.sendStatus(404);
  }
  if (!user.verified) {
    return res.status(404).send("First verify the account");
  }

  if (!user.passwordResetCode) {
    return res.sendStatus(403);
  }

  if (user.passwordResetCode !== passwordResetCode) {
    return res.sendStatus(403);
  }

  user.password = password;
  user.passwordResetCode = null;
  user.save();

  return res.sendStatus(200);
}

export async function getMeHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
