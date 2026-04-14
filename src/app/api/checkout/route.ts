import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new (Stripe as any)(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  const { amount, donorName, email } = await req.json();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Donation' },
          unit_amount: Math.round(Number(amount) * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: { donorName, email, amount },
    success_url: (req.nextUrl.origin || 'http://localhost:3000') + '/donate/success',
    cancel_url: (req.nextUrl.origin || 'http://localhost:3000') + '/donate',
  });

  return NextResponse.json({ url: session.url });
}
