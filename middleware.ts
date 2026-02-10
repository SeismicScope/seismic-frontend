import { type NextRequest, NextResponse } from "next/server";

import { me } from "@/features/auth/api";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const access_token = request.cookies.get("access_token")?.value ?? "";

  const user = access_token ? await me() : null;

  if (pathname === "/admin" && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }
};
