import { NextResponse } from 'next/server';

const COOKIE_NAME = 'embajadores-fluxa-auth';
const LOGIN_PATH = '/embajadores-fluxa/acceso';
const CANONICAL_PREFIX = '/embajadores-fluxa';
const LEGACY_PREFIX = '/vendedores-fluxa';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(LEGACY_PREFIX)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(LEGACY_PREFIX, CANONICAL_PREFIX);
    return NextResponse.redirect(url);
  }

  if (!pathname.startsWith(CANONICAL_PREFIX)) {
    return NextResponse.next();
  }

  const password = process.env.VENDEDORES_ACCESS_PASSWORD;
  if (!password) {
    return NextResponse.next();
  }

  if (pathname === LOGIN_PATH || pathname.startsWith('/api/embajadores-fluxa-auth')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token === '1') {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = LOGIN_PATH;
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/embajadores-fluxa/:path*', '/vendedores-fluxa/:path*'],
};
