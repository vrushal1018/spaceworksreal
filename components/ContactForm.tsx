"use client";
import { useState } from "react";

const NEEDS = [["design", "Design"], ["build", "Design & Build"], ["manage", "Project management"], ["care", "Repair & maintenance"]] as const;

export default function ContactForm() {
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body: Record<string, unknown> = { ...Object.fromEntries(f), needs: f.getAll("needs") };
    if (!String(body.name || "").trim()) { setMsg("Please add your name."); return; }
    if (!String(body.email || "").trim() && !String(body.phone || "").trim()) { setMsg("Please add an email or phone number so we can reply."); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Something went wrong.");
      setMsg(`Thanks, ${String(body.name).trim().split(" ")[0]}. We'll reply within one working day.`);
      e.currentTarget?.reset();
    } catch (err) {
      setMsg(`${(err as Error).message} You can also WhatsApp us on +91 9156 802 555.`);
    } finally { setBusy(false); }
  }
  return (
    <form id="enq" noValidate onSubmit={submit}>
      <label>Your name<input id="f-name" name="name" autoComplete="name" required /></label>
      <label>Company<input id="f-co" name="company" autoComplete="organization" /></label>
      <label>Phone<input id="f-phone" name="phone" type="tel" autoComplete="tel" /></label>
      <label>Email<input id="f-email" name="email" type="email" autoComplete="email" /></label>
      <fieldset className="full"><legend>What do you need?</legend>
        {NEEDS.map(([v, l]) => <label key={v} className="chip"><input type="checkbox" name="needs" value={l} id={`c-${v}`} /><span>{l}</span></label>)}
      </fieldset>
      <label className="full">About the space<textarea id="f-msg" name="message" placeholder="For example: reception and two meeting rooms on our 3rd floor, about 2,500 sq ft, Thane."></textarea></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <div className="full" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
        <button className="btn primary" type="submit" disabled={busy}>{busy ? "Sending…" : "Send"}</button>
        <span style={{ fontSize: "13px", color: "var(--sub)" }}>We reply within one working day.</span>
      </div>
      {msg && <div className="sent" role="status">{msg}</div>}
    </form>
  );
}
