import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'

export function adminGuard(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || !payload.is_admin) return null;
  return payload;
}
