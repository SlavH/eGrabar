import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) { response.cookies.set({ name, value, ...options }); },
        remove(name: string, options: CookieOptions) { response.cookies.set({ name, value: '', ...options }); },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const path = req.nextUrl.pathname;
  
  // LOGGING to verify in Vercel logs
  console.log("Middleware auth check for path:", path, "Has session:", !!session);
  
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    if (!session) {
      console.log("No session found, redirecting to login");
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
