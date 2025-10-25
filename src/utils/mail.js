// Node example (Nodemailer)
import nodemailer from "nodemailer";
import { CONFIG } from "../config/config.js";

export default async function sendMail({ userEmail, subject, htmlContent }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: CONFIG.MAIL_USERNAME,
      pass: CONFIG.MAIL_PASSWORD, // the 16-character app password
    },
  });

  const info = await transporter.sendMail({
    from: `"SilverHawk APM" <${CONFIG.MAIL_USERNAME}>`,
    to: userEmail,
    subject: subject,
    html: htmlContent,
  });

  console.log("Message ID:", info.messageId);
}
