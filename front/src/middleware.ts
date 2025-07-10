import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TokenPayload } from './services/auth/decodeToken'
import { jwtDecode } from 'jwt-decode'
import { ESTUDANTE, PROFESSOR } from './consts'

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

  if (token) {
    try {
      const payload = jwtDecode<TokenPayload>(token);
      const isStudent = payload.id_level === ESTUDANTE;
      const isProfessor = payload.id_level === PROFESSOR;

      if (pathname.startsWith('/pei') && !isStudent && !isProfessor) {
        return NextResponse.redirect(new URL('/home', request.url));
      }
      
      const restrictedPathsStudent = ['/estudantes', '/relatorio'];
      const tryingToAccessRestricted = restrictedPathsStudent.some(path =>
        pathname.startsWith(path)
      );

      if (isStudent && tryingToAccessRestricted) {
        return NextResponse.redirect(new URL('/home', request.url));
      }

    } catch (error) {
      console.error('Erro ao decodificar token no middleware:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|assets|public|register|.*\\..*).*)'],
}
