import { betterAuth } from "better-auth";
import { magicLink, admin } from "better-auth/plugins";
import Database from "better-sqlite3";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// TODO check if user can enter
const isEmailAllowed = (email: string) => {
  const normalized = email.toLowerCase();
  return true;
};

const websiteName = process.env.WEBSITE_NAME;

const sendMail = async (url: string, emailTo: string) => {
  const uniqueId = uuidv4();
  console.log(uniqueId);
  const emailMessage = {
    from: process.env.SMTP_USER,
    to: emailTo,
    subject: `Přihlášení na ${websiteName} [ID ${uniqueId.split("-")[0]}]`,
    text: `Ahoj,\npro přihlášení na stránky ${websiteName} klikni na odkaz níže:
      \n${url}
      \nPokud odkaz nelze rozkliknout, zkopíruj ho do prohlížeče.`,
    headers: { "X-Entity-Ref-ID": uniqueId },
  };

  (async () => {
    const info = await transporter.sendMail(emailMessage);

    console.log("Message sent:", info.messageId);
  })();
};

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: db,
  plugins: [
    admin(),
    magicLink({
      sendMagicLink: async ({ email, token, url }, ctx) => {
        console.log(email, token, url);

        await sendMail(url, email);
      },
    }),
  ],
});
