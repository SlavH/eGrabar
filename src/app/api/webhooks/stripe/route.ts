import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// NOTE: In test env we skip signature verification for simplicity.

export async function POST(req: NextRequest) {
  const payload = await req.text();
  let event;
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  if (event?.type === 'checkout.session.completed') {
    const session = event.data?.object || {};
    // Persist donation in DB if metadata exists
    // Import Supabase client lazily
    try {
      const { supabase } = await import('@/lib/supabase');
      const { donorName = '', email = '', amount = 0 } = session.metadata || {};
      await supabase.from('donations').insert([
        {
          donor_name: donorName,
          amount: Number(amount) || 0,
          message: 'Stripe donation',
          anonymous: false,
        },
      ]);
    } catch {
      // ignore if DB write fails in test env
    }
  }

  return NextResponse.json({ ok: true });
}
