// Default storage for applications: a private folder on the server (DATA_DIR, default ./data).
// Fine for launch volumes. To move to a database or S3 later, keep these function signatures and swap the bodies.
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

const DIR = () => path.resolve(process.env.DATA_DIR || "./data");
const DB = () => path.join(DIR(), "applications.json");

export type Application = {
  id: string; role: string; name: string; email: string; phone: string;
  city?: string; experience?: string; notice?: string; link?: string;
  fileKey: string; fileName: string;
  score: number; band: "Shortlist" | "Review" | "Hold";
  result: { role: string; score: number; band: string; next: string; breakdown: Record<string, number>;
            experience: { years: number | null; source: string }; matched: string[]; missing: string[]; flags: string[] };
  status: "new" | "called" | "interview" | "offer" | "not-now";
  createdAt: string; deleteAfter: string;
};

async function all(): Promise<Application[]> {
  try { return JSON.parse(await readFile(DB(), "utf8")); } catch { return []; }
}
async function save(rows: Application[]) {
  await mkdir(DIR(), { recursive: true });
  const tmp = DB() + ".tmp";
  await writeFile(tmp, JSON.stringify(rows, null, 1));
  await rename(tmp, DB());
}

export async function storeFile(buf: Buffer, name: string): Promise<string> {
  const key = `${randomUUID()}${path.extname(name).toLowerCase()}`;
  await mkdir(path.join(DIR(), "cvs"), { recursive: true });
  await writeFile(path.join(DIR(), "cvs", key), buf);
  return key;
}
export async function readStoredFile(key: string) {
  if (!/^[\w-]+\.(pdf|docx?)$/.test(key)) throw new Error("bad key");
  return readFile(path.join(DIR(), "cvs", key));
}
export async function recentApplication(email: string, role: string, hours: number) {
  const since = Date.now() - hours * 3600_000;
  return (await all()).some(a => a.email.toLowerCase() === email.toLowerCase() && a.role === role && Date.parse(a.createdAt) > since);
}
export async function insertApplication(row: Omit<Application, "id">) {
  const rows = (await all()).filter(a => Date.parse(a.deleteAfter) > Date.now());   // retention: drop expired rows on every write
  const id = randomUUID();
  rows.push({ id, ...row });
  await save(rows);
  return id;
}
export async function listApplications(q: { role?: string; band?: string } = {}) {
  return (await all())
    .filter(a => (!q.role || a.role === q.role) && (!q.band || a.band === q.band))
    .sort((a, b) => b.score - a.score || Date.parse(b.createdAt) - Date.parse(a.createdAt));
}
export async function getApplication(id: string) {
  return (await all()).find(a => a.id === id);
}
