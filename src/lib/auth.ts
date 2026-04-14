import crypto from 'crypto'

const SECRET = process.env.ADMIN_JWT_SECRET || 'replace-me-please'

export function base64url(input: Buffer) {
  return input.toString('base64')
    .replace(/=/g, '')
    .replace(/
    .replace(/
    .replace(/
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

export function encodeHeader() {
  const header = { alg: 'HS256', typ: 'JWT' }
  const json = JSON.stringify(header)
  return Buffer.from(json).toString('base64url')
}

function toBase64Url(obj: any) {
  return Buffer.from(JSON.stringify(obj)).toString('base64url')
}

export function signToken(payload: any): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerB64 = toBase64Url(header)
  const payloadB64 = toBase64Url(payload)
  const toSign = `${headerB64}.${payloadB64}`
  const signature = crypto.createHmac('sha256', SECRET).update(toSign).digest('base64url')
  return `${headerB64}.${payloadB64}.${signature}`
}

export function verifyToken(token: string): any | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [headerB64, payloadB64, signature] = parts
    const toSign = `${headerB64}.${payloadB64}`
    const expected = crypto.createHmac('sha256', SECRET).update(toSign).digest('base64url')
    if (signature !== expected) return null
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'))
    // check expiry
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}
