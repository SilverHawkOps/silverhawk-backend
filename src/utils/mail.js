// Node example (Nodemailer)
import nodemailer from "nodemailer";

export default async function sendMail({userEmail, subject, htmlContent  }){
  // creates a test account (Ethereal)
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"SilverHawk APM" <silverhawkapm@gmail.com>',
    to: userEmail,
    subject: subject,
    html: htmlContent,
  });

  console.log("Message ID:", info.messageId);
  // nodemailer provides a preview URL for Ethereal
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}


sendMail({
    userEmail: "user@example.com",
    subject: "Hello from SilverHawk APM",
    htmlContent: "<b>Hello world</b>",
}).catch(console.error);