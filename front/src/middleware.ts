import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  const isLoginPage = pathname === '/'

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|assets|public|.*\\..*).*)'],
}
