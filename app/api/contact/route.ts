// POST /api/contact: the enquiry form. Emails the team; the reply-to is the person who wrote in.
import { NextResponse } from "next/server";
import { sendMail, TEAM_INBOX } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Please send the form again." }, { status: 400 }); }
  const s = (k: string) => String(b[k] ?? "").trim().slice(0, 2000);
  if (s("website")) return NextResponse.json({ ok: true });   // honeypot
  if (!s("name") || (!/^\S+@\S+\.\S+$/.test(s("email")) && !s("phone")))
    return NextResponse.json({ error: "Please add your name and an email or phone number." }, { status: 400 });
  const needs = Array.isArray(b.needs) ? (b.needs as unknown[]).map(String).slice(0, 6).join(", ") : "";
  await sendMail({
    to: TEAM_INBOX(), replyTo: s("email") || undefined,
    subject: `Enquiry · ${s("name")}${s("company") ? " · " + s("company") : ""}`,
    text: `Name: ${s("name")}\nCompany: ${s("company")}\nPhone: ${s("phone")}\nEmail: ${s("email")}\nNeeds: ${needs}\n\n${s("message")}`,
  });
  return NextResponse.json({ ok: true });
}
