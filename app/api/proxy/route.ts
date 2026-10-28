import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: 200 requests per IP per day
const DAILY_LIMIT = 200;

// Shared rate limit store across routes
declare global {
  var rateLimitStore: Map<string, { count: number; resetDate: string }> | undefined;
}

if (!global.rateLimitStore) {
  global.rateLimitStore = new Map();
}

const rateLimitStore = global.rateLimitStore;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const today = getTodayDate();
  const record = rateLimitStore.get(ip);

  // Reset if new day or no record
  if (!record || record.resetDate !== today) {
    rateLimitStore.set(ip, { count: 1, resetDate: today });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  // Check limit
  if (record.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  // Increment count
  record.count++;
  return { allowed: true, remaining: DAILY_LIMIT - record.count };
}

export async function POST(request: NextRequest) {
  // Rate limit check
  const clientIP = getClientIP(request);
  const { allowed, remaining } = checkRateLimit(clientIP);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', message: `Daily limit of ${DAILY_LIMIT} API requests reached. Try again tomorrow.` },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(DAILY_LIMIT),
          'X-RateLimit-Remaining': '0',
          'Retry-After': '86400'
        }
      }
    );
  }
  try {
    const body = await request.json();
    const { url, method, secretKey, params } = body;

    if (!url || !secretKey) {
      return NextResponse.json(
        { error: 'Missing url or secretKey' },
        { status: 400 }
      );
    }

    // Reject live keys - only allow test keys for security
    if (!secretKey.includes('_test_')) {
      return NextResponse.json(
        { error: 'Live keys not allowed', message: 'This API proxy only accepts test keys for security.' },
        { status: 403 }
      );
    }

    const options: RequestInit = {
      method: method || 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    let finalUrl = url;

    if (method === 'GET' && params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams(params);
      finalUrl = `${url}?${searchParams.toString()}`;
    } else if (method !== 'GET' && params && Object.keys(params).length > 0) {
      options.body = new URLSearchParams(params).toString();
    }

    const response = await fetch(finalUrl, options);
    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'X-RateLimit-Limit': String(DAILY_LIMIT),
        'X-RateLimit-Remaining': String(remaining)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy request failed', message: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Rate limit check
  const clientIP = getClientIP(request);
  const { allowed, remaining } = checkRateLimit(clientIP);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', message: `Daily limit of ${DAILY_LIMIT} API requests reached. Try again tomorrow.` },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(DAILY_LIMIT),
          'X-RateLimit-Remaining': '0',
          'Retry-After': '86400'
        }
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const secretKey = searchParams.get('secretKey');

  if (!url || !secretKey) {
    return NextResponse.json(
      { error: 'Missing url or secretKey' },
      { status: 400 }
    );
  }

  // Reject live keys - only allow test keys for security
  if (!secretKey.includes('_test_')) {
    return NextResponse.json(
      { error: 'Live keys not allowed', message: 'This API proxy only accepts test keys for security.' },
      { status: 403 }
    );
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
      },
    });
    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'X-RateLimit-Limit': String(DAILY_LIMIT),
        'X-RateLimit-Remaining': String(remaining)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy request failed', message: String(error) },
      { status: 500 }
    );
  }
}
