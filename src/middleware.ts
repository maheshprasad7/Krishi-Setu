import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware — Protects /dashboard routes.
 * When Supabase is configured, checks for a real session cookie.
 * Falls back to allowing access (demo mode) if Supabase is not yet set up.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const isConfigured = !!(supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project-ref"));

  // If Supabase is not configured, allow through (demo mode)
  if (!isConfigured) {
    return NextResponse.next();
  }

  // Check for Supabase session cookies (sb-*-auth-token)
  const hasCookie = Array.from(req.cookies.getAll()).some(
    (c) => c.name.includes("auth-token") || c.name.startsWith("sb-")
  );

  if (!hasCookie) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("redirected", "1");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
