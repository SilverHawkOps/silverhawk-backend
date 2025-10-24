// Node example (Nodemailer)
import nodemailer from "nodemailer";

async function sendTest() {
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
    from: '"Dev" <dev@example.com>',
    to: "user@example.com",
    subject: "Hello from Ethereal",
    text: "Hello world",
    html: "<b>Hello world</b>",
  });

  console.log("Message ID:", info.messageId);
  // nodemailer provides a preview URL for Ethereal
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}

sendTest().catch(console.error);
