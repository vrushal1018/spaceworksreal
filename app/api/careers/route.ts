// POST /api/careers: the Careers form. Saves the CV privately, screens it against the role, emails a receipt.
import { NextResponse } from "next/server";
import { extractText, screen } from "@/lib/ats/screen.mjs";
import { insertApplication, recentApplication, storeFile } from "@/lib/ats/store";
import { sendMail, TEAM_INBOX } from "@/lib/mail";
import { ROLES } from "@/lib/content";

export const runtime = "nodejs";            // CV parsing needs Node, not the edge runtime
const MAX = 5 * 1024 * 1024;
const OK = /\.(pdf|docx?)$/i;
const ROLE_IDS = [...ROLES.map(r => r.id), "other"];

export async function POST(req: Request) {
  let form: FormData;
  try { form = await req.formData(); } catch { return NextResponse.json({ error: "Please send the form again." }, { status: 400 }); }
  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, 500);
  const file = form.get("cv");
  const role = get("role"), name = get("name"), email = get("email"), phone = get("phone");

  if (get("website")) return NextResponse.json({ ok: true });   // honeypot: bots fill hidden fields
  if (!ROLE_IDS.includes(role) || !name || !/^\S+@\S+\.\S+$/.test(email) || !phone)
    return NextResponse.json({ error: "Please add a role, your name, a valid email and your phone." }, { status: 400 });
  if (!(file instanceof File) || !OK.test(file.name) || file.size > MAX)
    return NextResponse.json({ error: "Please attach your CV as a PDF or Word file, up to 5 MB." }, { status: 400 });
  if (get("consent") !== "yes") return NextResponse.json({ error: "Please tick the consent box." }, { status: 400 });
  if (await recentApplication(email, role, 24)) return NextResponse.json({ ok: true, duplicate: true });

  const buf = Buffer.from(await file.arrayBuffer());
  const fileKey = await storeFile(buf, file.name);
  let text = "";
  try { text = await extractText(buf, file.name); } catch (e) { console.error("[careers] could not read CV", e); }
  const result = screen(text, { role, experience: get("experience"), city: get("city"), notice: get("notice") });

  const now = new Date();
  const id = await insertApplication({
    role, name, email, phone, city: get("city"), experience: get("experience"), notice: get("notice"), link: get("link"),
    fileKey, fileName: file.name.slice(0, 200), score: result.score, band: result.band, result, status: "new",
    createdAt: now.toISOString(), deleteAfter: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).toISOString(),
  });

  // A receipt only. Nobody is rejected automatically: the team confirms every "no" by hand.
  await sendMail({
    to: email, subject: `We've received your application · ${result.role}`,
    text: `Hi ${name.split(" ")[0]},\n\nThanks for applying for ${result.role} at Ina SpaceWorks. Your CV is with our team, and if it's a fit we'll call you.\nEither way, you'll hear from us.\n\nIna SpaceWorks\nAn interior vertical of Ina TechFM`,
  }).catch(e => console.error("[careers] receipt not sent", e));
  if (result.band === "Shortlist") await sendMail({
    to: TEAM_INBOX(), subject: `Shortlist · ${result.role} · ${name} (${result.score})`,
    text: `Matched: ${result.matched.join(", ")}\nExperience: ${result.experience.years ?? "?"} yrs\nOpen: ${process.env.NEXT_PUBLIC_SITE_URL || ""}/admin/careers#${id}`,
  }).catch(e => console.error("[careers] team alert not sent", e));

  return NextResponse.json({ ok: true });
}
