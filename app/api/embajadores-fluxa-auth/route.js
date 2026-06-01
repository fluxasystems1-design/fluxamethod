import { NextResponse } from 'next/server';

const COOKIE_NAME = 'embajadores-fluxa-auth';
const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request) {
  const expected = process.env.VENDEDORES_ACCESS_PASSWORD;

  if (!expected) {
    return NextResponse.json({ ok: true, open: true });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  const { password } = body;
  if (password !== expected) {
    return NextResponse.json({ ok: false, error: 'invalid_password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
  return response;
}
