import { getToken } from "next-auth/jwt"
import { NextResponse, NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req: request})
    if (token && (
        request.nextUrl.pathname.startsWith("/sign-in") ||
        request.nextUrl.pathname.startsWith("/sign-up") ||
        request.nextUrl.pathname.startsWith("/")
    )) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  
    if (!token && (
        request.nextUrl.pathname.startsWith("/dashboard")
    )) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/dashboard/:path*',
    '/verify/:path*',
  ]
}