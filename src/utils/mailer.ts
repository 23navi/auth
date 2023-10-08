import nodemailer from "nodemailer";
import config from "config";

//We can go to the website: 'https://ethereal.email' and get the cred, or use the below to get cred. One time only
// async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }
// createTestCreds();

type Tsmtp = {
  username: string;
  pass: string;
  port: number;
  host: string;
  secure: boolean;
};

const smpt = config.get<Tsmtp>("smtp");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "alycia.reinger26@ethereal.email",
    pass: "xgYAgGdqKvJSAFHS2y",
  },
});

export const sendEmail = () => {};
