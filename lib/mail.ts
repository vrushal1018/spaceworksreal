import nodemailer from "nodemailer";

export type Mail = { to: string; subject: string; text: string; replyTo?: string };

/** Sends through SMTP when SMTP_HOST is set; otherwise prints the email to the server log (handy in development). */
export async function sendMail(m: Mail) {
  const from = process.env.MAIL_FROM || "Ina SpaceWorks <evolve@inaspaceworks.com>";
  if (!process.env.SMTP_HOST) {
    console.log(`[mail] (no SMTP_HOST, not sent)\nTo: ${m.to}\nSubject: ${m.subject}\n\n${m.text}\n`);
    return;
  }
  const t = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  await t.sendMail({ from, ...m });
}

export const TEAM_INBOX = () => process.env.MAIL_TO || "evolve@inaspaceworks.com";
