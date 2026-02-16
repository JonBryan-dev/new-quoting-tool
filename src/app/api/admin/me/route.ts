import { NextResponse } from "next/server";
import { getAuthCookie, verifyToken } from "@/lib/auth";

export async function GET() {
  const token = await getAuthCookie();
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    username: payload.username,
  });
}
