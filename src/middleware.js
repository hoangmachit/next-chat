import { NextResponse } from 'next/server'

export function middleware(request) {
    const cookies = request.cookies;
    if (request.nextUrl.pathname.startsWith('/channel')) {
        const user = cookies.get('user')?.value;
        if (!user) {
            return NextResponse.redirect(new URL('/',request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/channel'
    ],
}