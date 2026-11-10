// GET /api/admin/cv/:id: streams a stored CV to a signed-in admin (middleware.ts guards /api/admin).
import { getApplication, readStoredFile } from "@/lib/ats/store";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await getApplication(id);
  if (!a) return new Response("Not found", { status: 404 });
  const buf = await readStoredFile(a.fileKey);
  const type = a.fileKey.endsWith(".pdf") ? "application/pdf" : a.fileKey.endsWith(".docx")
    ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/msword";
  return new Response(new Uint8Array(buf), { headers: { "content-type": type, "content-disposition": `inline; filename="${a.fileName.replace(/[^\w.\- ]/g, "")}"`, "cache-control": "private, no-store" } });
}
