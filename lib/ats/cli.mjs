#!/usr/bin/env node
// Screen CV files from the command line:  npm run screen-cv -- <role> <cv.pdf|cv.docx> [more CVs...]
// Prints a ranked table, highest first. Roles: interior-designer, 3d-artist, project-coordinator, site-supervisor, quantity-surveyor, other
import { readFile } from "node:fs/promises";
import { extractText, screen } from "./screen.mjs";
const [role, ...files] = process.argv.slice(2);
if (!role || !files.length) { console.error("usage: npm run screen-cv -- <role> <cv files...>"); process.exit(1); }
const rows = [];
for (const f of files) rows.push({ file: f, ...screen(await extractText(await readFile(f), f), { role }) });
rows.sort((a, b) => b.score - a.score);
for (const r of rows) {
  console.log(`\n${r.score.toString().padStart(3)}  ${r.band.padEnd(9)} ${r.file}`);
  console.log(`     experience: ${r.experience.years ?? "?"} yrs (${r.experience.source})`);
  console.log(`     matched: ${r.matched.join(", ") || "none"}`);
  if (r.missing.length) console.log(`     missing must-haves: ${r.missing.join(", ")}`);
  for (const fl of r.flags) console.log(`     flag: ${fl}`);
  console.log(`     breakdown: ${Object.entries(r.breakdown).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
}
