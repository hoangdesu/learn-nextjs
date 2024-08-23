import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
  // before the regex was "/((?!api|_next/static|_next/image|.*\\.png$).*)"
  // -> this EXCLUDES the /api route to be protected => remove to run auth on this route
};
