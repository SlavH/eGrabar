import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect admin routes but allow access to the login page
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const isAdminPath = path.startsWith('/admin');
  const isLoginPath = path.startsWith('/admin/login');

  if (isAdminPath && !isLoginPath) {
    const token = req.cookies.get('egrabar-auth')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
