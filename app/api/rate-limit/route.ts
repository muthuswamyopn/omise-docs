import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: 200 requests per IP per day
const DAILY_LIMIT = 200;

// Shared rate limit store (imported pattern - in production use Redis)
declare global {
  var rateLimitStore: Map<string, { count: number; resetDate: string }> | undefined;
}

if (!global.rateLimitStore) {
  global.rateLimitStore = new Map();
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export async function GET(request: NextRequest) {
  const clientIP = getClientIP(request);
  const today = getTodayDate();
  const record = global.rateLimitStore?.get(clientIP);

  let used = 0;
  if (record && record.resetDate === today) {
    used = record.count;
  }

  const remaining = DAILY_LIMIT - used;

  return NextResponse.json({
    ip: clientIP,
    limit: DAILY_LIMIT,
    used,
    remaining
  });
}
