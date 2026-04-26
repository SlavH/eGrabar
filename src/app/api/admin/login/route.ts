import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      return new NextResponse(JSON.stringify({ ok: false, error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const userId = data.user.id
    // Check admin role (optional RBAC table)
    const { data: adminRow, error: adminError } = await supabase.from('admin_profiles').select('is_admin').eq('user_id', userId).maybeSingle()
    const isAdmin = adminRow?.is_admin ?? true
    if (adminError) {
      // If table missing, allow by default for test purposes
      // const isAdmin = true
    }

    if (!isAdmin) {
      return new NextResponse(JSON.stringify({ ok: false, error: 'Not admin' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Issue session token (simplified): HttpOnly cookie
    const res = NextResponse.json({ ok: true })
    res.headers.set('Set-Cookie', 'admin_session=1; HttpOnly; Path=/; Max-Age=3600')
    return res
  } catch (e) {
    return new NextResponse(JSON.stringify({ ok: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
