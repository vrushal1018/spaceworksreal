"use client";
// Apply form: posts the CV to /api/careers, where it is stored privately and screened against the role.
import { useEffect, useRef, useState } from "react";
import { ROLES } from "@/lib/content";

const HINT = "PDF or Word, up to 5 MB. Drop it here or click to choose.";
const OK = /\.(pdf|docx?)$/i, MAX = 5 * 1024 * 1024;

export default function CareersForm() {
  const [fileNote, setFileNote] = useState(HINT);
  const [over, setOver] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const roleRef = useRef<HTMLSelectElement>(null), nameRef = useRef<HTMLInputElement>(null);

  // "Apply" buttons in the role list pick the role here and scroll to the form
  useEffect(() => {
    const pick = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-role]"); if (!a) return;
      e.preventDefault();
      if (roleRef.current) roleRef.current.value = a.dataset.role || "";
      document.getElementById("apply")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 500);
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFileNote(!f ? HINT : !OK.test(f.name) ? "Please attach a PDF or Word file." : f.size > MAX ? "That file is over 5 MB. Please attach a smaller one." : f.name);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget, f = new FormData(form), file = f.get("cv") as File | null;
    const need: string[] = [];
    for (const [k, l] of [["role", "a role"], ["name", "your name"], ["email", "your email"], ["phone", "your phone"]]) if (!String(f.get(k) || "").trim()) need.push(l);
    if (!file || !file.name || !OK.test(file.name) || file.size > MAX) need.push("your CV (PDF or Word, up to 5 MB)");
    if (f.get("consent") !== "yes") need.push("your consent");
    if (need.length) { setMsg("Almost there. Please add " + need.join(", ") + "."); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/careers", { method: "POST", body: f });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Something went wrong. Please try again.");
      setMsg(`Thanks, ${String(f.get("name")).trim().split(" ")[0]}. Your CV is in, and we've emailed you a receipt.`);
      form.reset(); setFileNote(HINT);
    } catch (err) { setMsg((err as Error).message); } finally { setBusy(false); }
  }

  return (
    <form id="cv" noValidate onSubmit={submit}>
      <label className="full">Role<select ref={roleRef} id="cv-role" name="role" required defaultValue="">
        <option value="">Choose a role</option>{ROLES.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}<option value="other">Other</option>
      </select></label>
      <label>Full name<input ref={nameRef} id="cv-name" name="name" autoComplete="name" required /></label>
      <label>Email<input id="cv-email" name="email" type="email" autoComplete="email" required /></label>
      <label>Phone<input id="cv-phone" name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Current city<input id="cv-city" name="city" autoComplete="address-level2" /></label>
      <label>Total experience (years)<input id="cv-exp" name="experience" type="number" min="0" max="50" inputMode="numeric" /></label>
      <label>Notice period<select id="cv-notice" name="notice" defaultValue="">
        <option value="">Choose</option>{["Immediate", "Up to 15 days", "Up to 30 days", "Up to 60 days", "More than 60 days"].map(o => <option key={o}>{o}</option>)}
      </select></label>
      <label className="full">Portfolio or LinkedIn link (optional)<input id="cv-link" name="link" type="url" inputMode="url" placeholder="https://" /></label>
      <label className={"drop full" + (over ? " over" : "")} onDragEnter={() => setOver(true)} onDragOver={() => setOver(true)} onDragLeave={() => setOver(false)} onDrop={() => setOver(false)}>
        <input id="cv-file" name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required onChange={onFile} />
        <b>Attach your CV</b><span className="file">{fileNote}</span>
      </label>
      <label className="consent full"><input type="checkbox" id="cv-ok" name="consent" value="yes" required /><span>I agree that Ina SpaceWorks may store my CV and contact me about roles for up to 12 months.</span></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <div className="full" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        <button className="btn primary" type="submit" disabled={busy}>{busy ? "Sending…" : "Send application"}</button>
      </div>
      {msg && <div className="sent" role="status">{msg}</div>}
    </form>
  );
}
