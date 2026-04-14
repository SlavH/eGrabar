import crypto from 'crypto'

const SECRET = process.env.ADMIN_JWT_SECRET || 'replace-me-please'

function toBase64Url(input: string) {
  return Buffer.from(input, 'utf8')
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export function signToken(payload: any): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerB64 = toBase64Url(JSON.stringify(header))
  const payloadB64 = toBase64Url(JSON.stringify(payload))
  const unsigned = `${headerB64}.${payloadB64}`
  const signature = crypto.createHmac('sha256', SECRET).update(unsigned).digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  return `${unsigned}.${signature}`
}

export function verifyToken(token: string): any | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [headerB64, payloadB64, signature] = parts
    const unsigned = `${headerB64}.${payloadB64}`
    const expected = crypto.createHmac('sha256', SECRET).update(unsigned).digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
    if (signature !== expected) return null
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}
