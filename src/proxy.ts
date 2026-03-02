import createMiddleware from "next-intl/middleware";

const LOCALES = ["en", "de", "es"] as const;

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
