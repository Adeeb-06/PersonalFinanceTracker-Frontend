import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privateRoutes = [
    "/dashboard"
]
 
export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
  
    const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  
    if (isPrivate) {
      const authCookie = req.cookies.get("firebase-auth");
  
      if (!authCookie?.value) {
        const loginUrl = new URL("/auth/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  
    return NextResponse.next()
}
 
export const config = {
  matcher: '/dashboard/:path*',
}
