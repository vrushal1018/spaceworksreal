// HTTP basic auth for the admin pages and their API. Set ADMIN_USER and ADMIN_PASS; without them the admin stays closed.
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER, pass = process.env.ADMIN_PASS;
  if (!user || !pass) return new NextResponse("Admin is not set up. Add ADMIN_USER and ADMIN_PASS.", { status: 503 });
  const [scheme, value] = (req.headers.get("authorization") || "").split(" ");
  if (scheme === "Basic" && value) {
    const [u, p] = atob(value).split(":");
    if (u === user && p === pass) return NextResponse.next();
  }
  return new NextResponse("Sign in required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Ina SpaceWorks admin"' } });
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
