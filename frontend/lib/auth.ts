import { betterAuth } from "better-auth";
import { magicLink, admin } from "better-auth/plugins";
import { APIError } from "better-auth/api";
import { isEmailAllowed } from "@/service/authService";
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
      \nPokud odkaz nelze rozkliknout, zkopíruj ho a vlož do adresního řádku prohlížeče.`,
    html: `<p>Ahoj,</p><p>pro přihlášení na stránky <strong>${websiteName}</strong> klikni na odkaz níže:</p><p><a href="${url}">${url}</a></p><p>Pokud odkaz nelze rozkliknout, zkopíruj ho a vlož do adresního řádku prohlížeče.</p>`,
    headers: { "X-Entity-Ref-ID": uniqueId },
  };
  try {
    const info = await transporter.sendMail(emailMessage);
    console.log("Message sent:", info.messageId);
  } catch (err) {
    return false;
  }
  return true;
};

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: db,
  plugins: [
    admin(),
    magicLink({
      disableSignUp: true,
      sendMagicLink: async ({ email, token, url }, ctx) => {
        //console.log(email, token, url);
        const isAllowed = await isEmailAllowed(email);
        if (!isAllowed) {
          throw new APIError("UNAUTHORIZED", {
            code: "401",
            message: "Nemáš přístup.",
          });
        }
        const emailSended = await sendMail(url, email);
        if (!emailSended) {
          throw new APIError("INTERNAL_SERVER_ERROR", {
            code: "500",
            message: "Interní chyba. Přijď, prosím, později.",
          });
        }
        // console.log(emailSended);
      },
    }),
  ],
});
