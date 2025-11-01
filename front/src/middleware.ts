import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TokenPayload } from './services/auth/decodeToken'
import { jwtDecode } from 'jwt-decode'
import { ESTUDANTE } from './consts'

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

      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < currentTime) {
        const response = NextResponse.redirect(new URL('/', request.url));

        response.cookies.set('token', '', {
          path: '/',
          expires: new Date(0),
        });

        return response;
      }

      const isStudent = payload.id_level === ESTUDANTE;
      const restrictedPathsStudent = ['/estudantes', '/relatorio', '/visualizar', '/configuracao', '/editar-anamnese', '/editar-pei', '/editar-triagem'];
      const tryingToAccessRestricted = restrictedPathsStudent.some(path =>
        pathname.startsWith(path)
      );

      if (isStudent && tryingToAccessRestricted) {
        return NextResponse.redirect(new URL('/home', request.url));
      }

    } catch (error) {
      console.error('Erro ao decodificar token no middleware:', error);
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.set('token', '', {
          path: '/',
          expires: new Date(0),
        });
        return response;
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|assets|public|register|.*\\..*).*)'],
}
