import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/' || path === '/login' || path === '/signup';

    const token = request.cookies.get("token")?.value || "";

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.url));
    }
    else if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile',
  ]
}