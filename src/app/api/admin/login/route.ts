import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    
    const response = NextResponse.json({ ok: true })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 })
    }

    // Role check remains the same
    const { data: adminRow, error: adminError } = await supabase.from('admin_profiles').select('is_admin').eq('user_id', data.user.id).maybeSingle()
    
    if (adminError) {
      console.error('Admin profile query error:', adminError);
      return NextResponse.json({ ok: false, error: 'Database error' }, { status: 500 })
    }

    if (!adminRow?.is_admin) {
      return NextResponse.json({ ok: false, error: 'Not authorized' }, { status: 403 })
    }

    // Set the session cookie for the frontend check
    response.cookies.set('admin_session', '1', {
      httpOnly: false, // Frontend reads it via document.cookie
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return response
  } catch (e) {
    console.error('Login error:', e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
