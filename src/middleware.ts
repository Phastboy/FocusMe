// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/(pages)(.*)"]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  },
  { debug: true },
);
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
