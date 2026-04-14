import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { signToken, verifyToken } from '@/lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      return new NextResponse(JSON.stringify({ ok: false, error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }
    const userId = data.user!.id
    // Check admin role in admin_profiles table
    const { data: admin, error: adminError } = await supabase.from('admin_profiles').select('is_admin').eq('user_id', userId).single()
    if (adminError || !admin?.is_admin) {
      return new NextResponse(JSON.stringify({ ok: false, error: 'Not an admin' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }
    // Sign a token
    const payload = { user_id: userId, is_admin: true, exp: Math.floor(Date.now() / 1000) + 60 * 60 }
    const token = signToken(payload)
    return new NextResponse(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `admin_session=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}`
      }
    })
  } catch (e) {
    return new NextResponse(JSON.stringify({ ok: false, error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
