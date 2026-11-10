// /admin/careers: applications ranked by fit. Behind basic auth (middleware.ts).
import { listApplications } from "@/lib/ats/store";
import { ROLES } from "@/lib/content";

export const dynamic = "force-dynamic";
export const metadata = { title: "Applications", robots: { index: false } };
const TONE: Record<string, string> = { Shortlist: "var(--blue)", Review: "var(--ink)", Hold: "var(--sub)" };

export default async function Admin({ searchParams }: { searchParams: Promise<{ role?: string; band?: string }> }) {
  const q = await searchParams;
  const rows = await listApplications(q);
  return (
    <section className="pagehead"><div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div className="head" style={{ marginBottom: 0 }}><p className="eyebrow">Careers · admin</p><h1>Applications <b>by fit.</b></h1>
        <p className="lead">The score ranks CVs for reading; it never decides on its own. Open the CV before any reply.</p></div>
      <form style={{ display: "flex", gap: "12px", flexWrap: "wrap", gridTemplateColumns: "none" }}>
        <select name="role" defaultValue={q.role || ""} style={{ minHeight: 44 }}><option value="">All roles</option>{ROLES.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}<option value="other">Other</option></select>
        <select name="band" defaultValue={q.band || ""} style={{ minHeight: 44 }}><option value="">All bands</option><option>Shortlist</option><option>Review</option><option>Hold</option></select>
        <button className="btn" type="submit">Filter</button>
      </form>
      <div style={{ overflowX: "auto", background: "var(--paper)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead><tr>{["Score", "Band", "Applicant", "Role", "Exp.", "City", "Notice", "Missing must-haves", "Flags", "CV"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 12px", borderBottom: "1px solid var(--rule)", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
          <tbody>{rows.length ? rows.map(r => (
            <tr key={r.id} id={r.id} style={{ borderBottom: "1px solid var(--rule)", verticalAlign: "top" }}>
              <td style={{ padding: "10px 12px", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{r.score}</td>
              <td style={{ padding: "10px 12px", color: TONE[r.band], fontWeight: 500 }}>{r.band}</td>
              <td style={{ padding: "10px 12px" }}>{r.name}<br /><small>{r.email} · {r.phone}</small></td>
              <td style={{ padding: "10px 12px" }}>{r.result.role}</td>
              <td style={{ padding: "10px 12px" }}>{r.result.experience.years ?? "?"}</td>
              <td style={{ padding: "10px 12px" }}>{r.city}</td>
              <td style={{ padding: "10px 12px" }}>{r.notice}</td>
              <td style={{ padding: "10px 12px" }}>{r.result.missing.join(", ")}</td>
              <td style={{ padding: "10px 12px", color: "#9A5B00" }}>{r.result.flags.join(" ")}</td>
              <td style={{ padding: "10px 12px" }}><a href={`/api/admin/cv/${r.id}`} target="_blank" rel="noopener">Open</a></td>
            </tr>)) : <tr><td colSpan={10} style={{ padding: 24, color: "var(--sub)" }}>No applications yet. They appear here as soon as someone applies on the Careers page.</td></tr>}</tbody>
        </table>
      </div>
    </div></section>
  );
}
