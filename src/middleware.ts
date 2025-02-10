import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // const token = req.cookies.get("token")?.value;
  // console.log(req,"req")
  const token = req.cookies.get("token")?.value;
  const authRoutes = ["/dashboard", "/expenses"];

  console.log(token,"token")
  if (!token && authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
