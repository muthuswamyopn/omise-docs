'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';

interface ErrorCode {
  code: string;
  httpStatus: number;
  description: string;
  whenOccurs: string;
  resolution?: string;
}

// Verified 2026-10-31 via direct API calls
const apiErrors: ErrorCode[] = [
  {
    code: 'authentication_failure',
    httpStatus: 401,
    description: 'The API key is invalid or missing.',
    whenOccurs: 'The Authorization header is missing, malformed, or contains an invalid key. The Card API requires a secret key (skey_...), not a public key.',
    resolution: 'Verify your secret key is correct. Use HTTP Basic Auth with your secret key as the username and an empty password.',
  },
  {
    code: 'not_found',
    httpStatus: 404,
    description: 'The customer or card does not exist.',
    whenOccurs: 'The customer_id or card_id in the URL is invalid or does not exist.',
    resolution: 'Verify the customer ID and card ID are correct. Use the list endpoints to find valid IDs.',
  },
];

// Verified 2026-10-31 via direct API calls across all 4 versions
const cardErrors: ErrorCode[] = [
  {
    code: 'invalid_card',
    httpStatus: 400,
    description: 'The card information is invalid.',
    whenOccurs: 'When creating a token with invalid card details, or when updating a card with invalid values such as expiration_month > 12 or expiration date in the past.',
    resolution: 'Verify the card number, expiration date, and CVV are correct. Use test card numbers in test mode.',
  },
  {
    code: 'invalid_card_token',
    httpStatus: 400,
    description: 'The card token is invalid or has already been used.',
    whenOccurs: 'The token provided when attaching a card to a customer is invalid, expired, or has already been used.',
    resolution: 'Create a new token and try again. Tokens can only be used once.',
  },
];

const httpStatusCodes = [
  { code: 200, name: 'OK', description: 'The request succeeded.' },
  { code: 400, name: 'Bad Request', description: 'The request is malformed or contains invalid parameters.' },
  { code: 401, name: 'Unauthorized', description: 'Authentication failed. Check your API key.' },
  { code: 404, name: 'Not Found', description: 'The customer or card does not exist.' },
  { code: 429, name: 'Too Many Requests', description: 'You exceeded the rate limit. Slow down your requests.' },
  { code: 500, name: 'Internal Server Error', description: 'An error occurred on Omise\'s servers.' },
];

function ErrorSection({ title, errors }: { title: string; errors: ErrorCode[] }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
        {title}
      </h2>
      <div style={{ display: 'grid', gap: '16px' }}>
        {errors.map((error) => (
          <div key={error.code} style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <code style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#cd3d64',
                background: '#fde2dd',
                padding: '4px 10px',
                borderRadius: '4px',
                fontFamily: "'SF Mono', Monaco, monospace"
              }}>
                {error.code}
              </code>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#697386',
                background: '#f6f9fc',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                HTTP {error.httpStatus}
              </span>
            </div>
            <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, marginBottom: '8px' }}>
              {error.description}
            </p>
            <div style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.6, marginBottom: '12px' }}>
              <strong style={{ color: '#697386' }}>When it occurs:</strong> {error.whenOccurs}
            </div>
            {error.resolution && (
              <div style={{ fontSize: '14px', color: '#0e6245', background: '#cbf4c9', padding: '12px 16px', borderRadius: '6px', lineHeight: 1.6 }}>
                <strong>Resolution:</strong> {error.resolution}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CardErrorsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        <div style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#1A1F71', textDecoration: 'none' }}>Documentation</Link>
          {' / '}
          <Link href="/api-reference" style={{ color: '#1A1F71', textDecoration: 'none' }}>API Reference</Link>
          {' / '}
          <Link href="/api-reference/cards" style={{ color: '#1A1F71', textDecoration: 'none' }}>Cards</Link>
          {' / '}
          <span style={{ color: '#1a1a1a' }}>Error Codes</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Card API Error Codes
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '24px' }}>
          Reference for all error codes returned by the Card API endpoints.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px' }}>
          When a Card API request fails, Omise returns an error response with a specific error code and message.
          This page documents all possible error codes, when they occur, and how to resolve them.
        </p>

        {/* Authentication Notice */}
        <div style={{ background: '#fde2dd', border: '1px solid #cd3d64', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#9c2a3e', lineHeight: 1.6 }}>
            <strong>Note:</strong> The Card API requires <strong>secret key</strong> authentication.
            Public keys will receive an <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>authentication_failure</code> error.
          </div>
        </div>

        {/* Error Response Format */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Error Response Format</div>
          <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '16px', lineHeight: 1.6 }}>
            All error responses follow this structure:
          </p>
          <pre style={{
            background: '#1a2332',
            borderRadius: '8px',
            padding: '16px',
            margin: 0,
            fontSize: '13px',
            color: '#67e8f9',
            fontFamily: "'SF Mono', Monaco, monospace",
            overflow: 'auto'
          }}>
{`{
  "object": "error",
  "location": "https://www.omise.co/api-errors#not-found",
  "code": "not_found",
  "message": "card card_test_invalid was not found"
}`}
          </pre>
        </div>

        {/* HTTP Status Codes */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>
          HTTP Status Codes
        </h2>
        <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden', marginBottom: '48px' }}>
          {httpStatusCodes.map((status, index) => (
            <div
              key={status.code}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 20px',
                borderBottom: index < httpStatusCodes.length - 1 ? '1px solid #e3e8ee' : 'none',
                gap: '16px'
              }}
            >
              <span style={{
                fontSize: '14px',
                fontWeight: 700,
                minWidth: '45px',
                color: status.code < 300 ? '#0e6245' : status.code < 500 ? '#cd3d64' : '#9c6f19',
                fontFamily: "'SF Mono', Monaco, monospace"
              }}>
                {status.code}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a', minWidth: '180px' }}>
                {status.name}
              </span>
              <span style={{ fontSize: '14px', color: '#697386' }}>
                {status.description}
              </span>
            </div>
          ))}
        </div>

        <ErrorSection title="Authentication & Resource Errors" errors={apiErrors} />
        <ErrorSection title="Card Validation Errors" errors={cardErrors} />

        {/* Test Card Numbers */}
        <div style={{ marginTop: '48px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0369a1', marginBottom: '16px' }}>
            Test Card Numbers
          </h3>
          <p style={{ fontSize: '14px', color: '#0c4a6e', marginBottom: '16px', lineHeight: 1.6 }}>
            Use these card numbers in test mode to simulate different scenarios:
          </p>
          <div style={{ display: 'grid', gap: '8px', fontFamily: "'SF Mono', Monaco, monospace", fontSize: '13px' }}>
            <div><code style={{ background: '#e0f2fe', padding: '4px 8px', borderRadius: '4px' }}>4242424242424242</code> - Successful charge (Visa)</div>
            <div><code style={{ background: '#e0f2fe', padding: '4px 8px', borderRadius: '4px' }}>5555555555554444</code> - Successful charge (MasterCard)</div>
            <div><code style={{ background: '#e0f2fe', padding: '4px 8px', borderRadius: '4px' }}>4000000000000002</code> - Card declined</div>
            <div><code style={{ background: '#e0f2fe', padding: '4px 8px', borderRadius: '4px' }}>4000000000000069</code> - Expired card</div>
            <div><code style={{ background: '#e0f2fe', padding: '4px 8px', borderRadius: '4px' }}>4000000000000127</code> - Incorrect CVV</div>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <Link href="/openapi.yaml" style={{ color: '#1A1F71' }}>openapi.yaml</Link>
        </div>
      </main>

      {/* Right Panel - Example Error Responses */}
      <aside className="code-panel">
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            padding: '8px 12px',
            background: 'rgba(205, 61, 100, 0.3)',
            border: '1px solid rgba(205, 61, 100, 0.5)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#ff8fa3',
          }}>
            Requires <strong>secret key</strong> authentication
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Authentication Error
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>401 Unauthorized</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://...",
  "code": "authentication_failure",
  "message": "authentication failed"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Not Found Error
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>404 Not Found</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://...",
  "code": "not_found",
  "message": "card card_test_invalid was not found"
}`}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Invalid Card
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>400 Bad Request</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://...",
  "code": "invalid_card",
  "message": "expiration date cannot be in the past"
}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
