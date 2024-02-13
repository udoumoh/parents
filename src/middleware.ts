import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  const isPublicRoute = path === "/signin" || 
    path === "/signup" ||
    path === "/verifyotp"

  const token = request.cookies.get('userToken')?.value
  // console.log(token)
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if(!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/accounts/signin', request.nextUrl))
  }
}
 
export const config = {
  matcher: [
    '/',
    '/dashboard/greycases',
    '/dashboard/overview',
    '/dashboard/results',
    '/inbox',
    '/settings',
    '/link-child',
    '/verifyotp',
    '/signup',
    '/signin',
  ],
}