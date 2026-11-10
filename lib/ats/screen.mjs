// Ina SpaceWorks careers: CV text extraction and role-based screening.
// Server-side only (Node 18+). Used by the /api/careers route; can also be run from the CLI (npm run screen-cv).
//
// Fair screening: the score uses skills, experience, domain, location and notice period only.
// Name, gender, age, photo, marital status, religion and similar are never read or scored.
// The score ranks CVs for a human to read; it never rejects anyone on its own.

import path from "node:path";
import mammoth from "mammoth";
import RUBRICS_DATA from "./rubrics.mjs";

export const RUBRICS = RUBRICS_DATA;

export const BANDS = [
  { band: "Shortlist", min: 70, note: "Call within 2 working days" },
  { band: "Review", min: 50, note: "A person reads it this week" },
  { band: "Hold", min: 0, note: "Kept on file; a person confirms before any reply" },
];

// ---------- extraction ----------
export async function extractText(buffer, filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".pdf") {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer), isEvalSupported: false, useSystemFonts: true }).promise;
    let out = "";
    for (let i = 1; i <= Math.min(doc.numPages, 10); i++) {
      const page = await doc.getPage(i);
      const tc = await page.getTextContent();
      let lastY = null;
      for (const it of tc.items) {
        const y = it.transform?.[5];
        out += (lastY !== null && Math.abs(y - lastY) > 2 ? "\n" : " ") + it.str;
        lastY = y;
      }
      out += "\n";
    }
    return out;
  }
  if (ext === ".docx") return (await mammoth.extractRawText({ buffer })).value;
  if (ext === ".doc") return "";   // legacy Word: flagged for a person to read (see "flags")
  throw new Error("unsupported file type");
}

// ---------- helpers ----------
const norm = t => t.replace(/ /g, " ").replace(/[‐-―]/g, "-").replace(/[ \t]+/g, " ").toLowerCase();
const rx = p => new RegExp(p, "i");
const hits = (text, patterns) => patterns.filter(p => rx(p).test(text));

const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11 };
// Years of experience: an explicit "8 years" / "8+ yrs" statement, else the span of dated job ranges in the CV.
export function experienceYears(text, now = new Date()) {
  const stated = [...text.matchAll(/(\d{1,2}(?:\.\d)?)\s*\+?\s*(?:years?|yrs?)\b(?:[^.\n]{0,25})(?:experience|exp\b)/gi)].map(m => parseFloat(m[1]));
  const ranges = [];
  const re = /(?:(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\.?\s*[''’]?)?((?:19|20)\d{2})\s*(?:-|–|to)\s*(?:(present|current|till date|now|date)|(?:(jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec)[a-z]*\.?\s*)?((?:19|20)\d{2}))/gi;
  for (const m of text.matchAll(re)) {
    const s = new Date(+m[2], m[1] ? MONTHS[m[1].toLowerCase().slice(0, 3)] ?? 0 : 0);
    const e = m[3] ? now : new Date(+m[5], m[4] ? MONTHS[m[4].toLowerCase().slice(0, 3)] ?? 11 : 11);
    if (e > s && s.getFullYear() > 1970) ranges.push([s.getTime(), e.getTime()]);
  }
  // merge overlapping jobs so parallel roles are not double-counted
  ranges.sort((a, b) => a[0] - b[0]);
  let total = 0, cur = null;
  for (const r of ranges) {
    if (!cur || r[0] > cur[1]) { if (cur) total += cur[1] - cur[0]; cur = [...r]; } else cur[1] = Math.max(cur[1], r[1]);
  }
  if (cur) total += cur[1] - cur[0];
  const fromDates = total / (365.25 * 24 * 3600 * 1000);
  const fromStatement = stated.length ? Math.max(...stated.filter(n => n < 50)) : null;
  return { years: Math.round((fromStatement ?? fromDates) * 10) / 10, source: fromStatement !== null ? "stated in CV" : ranges.length ? "job dates in CV" : "not found" };
}

function experienceFit(years, { min, ideal }) {
  if (years == null) return 0.4;
  if (years < min) return Math.max(0, years / min) * 0.6;
  if (years <= ideal[1]) return years >= ideal[0] ? 1 : 0.85;
  return 0.8;   // more senior than the role: still a good read, a person decides
}

// ---------- screening ----------
/**
 * @param {string} rawText   text from extractText
 * @param {object} form      { role, experience?, city?, notice? } as submitted on the careers form
 */
export function screen(rawText, form) {
  const role = RUBRICS.roles[form.role] ?? RUBRICS.roles.other;
  const text = norm(rawText || "");
  const flags = [];
  if (text.trim().length < 300) flags.push("Little or no readable text (scanned image or legacy .doc): a person should read the original.");

  const must = role.must.map(s => ({ label: s.label, weight: s.weight, found: hits(text, s.patterns).length > 0 }));
  const nice = role.nice.map(s => ({ label: s.label, found: hits(text, s.patterns).length > 0 }));
  const mustW = must.reduce((a, s) => a + s.weight, 0);
  const mustScore = mustW ? must.filter(s => s.found).reduce((a, s) => a + s.weight, 0) / mustW : 0.5;
  const niceScore = nice.length ? nice.filter(s => s.found).length / nice.length : 0.5;

  const exp = experienceYears(text);
  const formYears = form.experience !== undefined && form.experience !== "" ? Number(form.experience) : null;
  if (formYears != null && exp.years && Math.abs(formYears - exp.years) > 3) flags.push(`Form says ${formYears} years, CV suggests about ${exp.years}: worth checking.`);
  const years = formYears ?? (exp.source === "not found" ? null : exp.years);

  const domainHits = hits(text, RUBRICS.domain.patterns).length;
  const domainScore = Math.min(1, domainHits / 3);

  const city = norm(form.city || "");
  const locScore = !city ? 0.5 : RUBRICS.preferredLocations.some(c => city.includes(c)) ? 1 : 0.4;

  const notice = (form.notice || "").toLowerCase();
  const noticeScore = !notice ? 0.5 : /immediate|15/.test(notice) ? 1 : /30/.test(notice) ? 0.85 : /60/.test(notice) && !/more/.test(notice) ? 0.6 : 0.4;

  const parts = {
    "Must-have skills": [mustScore, 45],
    "Good-to-have skills": [niceScore, 15],
    "Experience fit": [experienceFit(years, role.experience), 20],
    "Commercial interiors": [domainScore, 10],
    "Location": [locScore, 5],
    "Notice period": [noticeScore, 5],
  };
  let score = Math.round(Object.values(parts).reduce((a, [v, w]) => a + v * w, 0));
  if (flags.length && text.trim().length < 300) score = Math.min(score, 49);   // never auto-shortlist an unread CV
  const band = BANDS.find(b => score >= b.min);

  return {
    role: role.title, score, band: band.band, next: band.note,
    breakdown: Object.fromEntries(Object.entries(parts).map(([k, [v, w]]) => [k, Math.round(v * w)])),
    experience: { years, source: formYears != null ? "form" : exp.source },
    matched: [...must, ...nice].filter(s => s.found).map(s => s.label),
    missing: must.filter(s => !s.found).map(s => s.label),
    flags,
  };
}
