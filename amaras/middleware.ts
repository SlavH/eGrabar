import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Production admin protection: require a simple admin_session cookie
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const isAdminPath = path.startsWith('/admin');
  const isLoginPath = path.startsWith('/admin/login');

  // Protect admin routes
  if (isAdminPath && !isLoginPath) {
    const token = req.cookies.get('admin_session')?.value;
    if (!token || token !== '1') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
