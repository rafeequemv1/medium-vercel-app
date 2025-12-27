import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Get hostname of request (e.g. demo.vercel.pub, test.com)
    const hostname = req.headers.get('host')!;

    // Define your main app domain here (e.g. platform.com)
    // For local development, this might be 'localhost:3000'
    const searchParams = url.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

    // If it's the root domain or localhost, serve the dashboard/landing page
    if (
        hostname === 'localhost:3000' ||
        hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
        hostname.endsWith('.vercel.app') // Support Vercel previews
    ) {
        return NextResponse.next();
    }

    // Otherwise, it's a custom domain or subdomain
    // Rewrite to the dynamic route [domain]
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
