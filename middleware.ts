import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
	// This matches everything except /sign-in, /sign-up, and /api/uploadthing
	/^((?!\/sign-in|\/sign-up|\/api\/uploadthing).)*$/,
]);

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) auth().protect();
});

export const config = {
	matcher: [
		"/((?!.*\\..*|_next).*)", // Match all routes except static files and _next (Next.js internals)
		"/",
		"/(api|trpc)(.*)", // Match all api and trpc routes
	],
};
