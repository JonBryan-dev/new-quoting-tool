import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_token";

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and login API through without authentication
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    // If already authenticated and visiting the login page, redirect to admin
    if (pathname === "/admin/login") {
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (token) {
        try {
          await jwtVerify(token, getSecret());
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch {
          // Token invalid — let them stay on login page
        }
      }
    }
    return NextResponse.next();
  }

  // For all other /admin and /api/admin routes, require valid token
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return handleUnauthorized(request);
  }

  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    return handleUnauthorized(request);
  }
}

function handleUnauthorized(request: NextRequest) {
  // API routes get a 401 JSON response
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Page routes redirect to login
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
