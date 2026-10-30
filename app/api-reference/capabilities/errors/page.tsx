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

const apiErrors: ErrorCode[] = [
  {
    code: 'authentication_failure',
    httpStatus: 401,
    description: 'The public key is invalid or missing.',
    whenOccurs: 'The Authorization header is missing, malformed, or contains an invalid key. The Capability API requires a public key (pkey_...). Secret keys are not accepted.',
    resolution: 'Verify your public key is correct and properly formatted. Use HTTP Basic Auth with your public key as the username and an empty password.',
  },
  {
    code: 'not_found',
    httpStatus: 404,
    description: 'The resource does not exist.',
    whenOccurs: 'You attempt to access an endpoint that does not exist.',
    resolution: 'Verify the endpoint path is correct. The capability endpoint is /capability (singular, not /capabilities).',
  },
];

const capabilityErrors: ErrorCode[] = [
  {
    code: 'invalid_account',
    httpStatus: 400,
    description: 'The account associated with this API key is in an invalid state.',
    whenOccurs: 'The account has been suspended, is pending verification, or has other restrictions preventing capability retrieval.',
    resolution: 'Contact Omise support to verify your account status and resolve any issues.',
  },
];

const httpStatusCodes = [
  { code: 200, name: 'OK', description: 'The request succeeded. Capabilities returned.' },
  { code: 400, name: 'Bad Request', description: 'The request is malformed or the account is in an invalid state.' },
  { code: 401, name: 'Unauthorized', description: 'Authentication failed. Check your API key.' },
  { code: 404, name: 'Not Found', description: 'The endpoint does not exist.' },
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

export default function CapabilityErrorsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        <div style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#1A1F71', textDecoration: 'none' }}>Documentation</Link>
          {' / '}
          <Link href="/api-reference" style={{ color: '#1A1F71', textDecoration: 'none' }}>API Reference</Link>
          {' / '}
          <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none' }}>Capability</Link>
          {' / '}
          <span style={{ color: '#1a1a1a' }}>Error Codes</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Capability API Error Codes
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '24px' }}>
          Reference for all error codes returned by the Capability API endpoint.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px' }}>
          When a Capability API request fails, Omise returns an error response with a specific error code and message.
          This page documents all possible error codes, when they occur, and how to resolve them.
        </p>

        {/* Authentication Notice */}
        <div style={{ background: '#cbf4c9', border: '1px solid #0e6245', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#0e6245', lineHeight: 1.6 }}>
            <strong>Note:</strong> The Capability API requires <strong>public key</strong> authentication.
            Secret keys are not accepted. This allows safe client-side usage.
          </div>
        </div>

        {/* Error Response Format */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Error Response Format</div>
          <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '16px', lineHeight: 1.6 }}>
            All error responses follow this structure. The <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>code</code> field
            contains the machine-readable error type, while <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>message</code> provides
            a human-readable description.
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
  "location": "https://api.omise.co/capability",
  "code": "authentication_failure",
  "message": "authentication failed"
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

        <ErrorSection title="Authentication Errors" errors={apiErrors} />
        <ErrorSection title="Capability Operation Errors" errors={capabilityErrors} />

        {/* Best Practices */}
        <div style={{ marginTop: '48px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0369a1', marginBottom: '16px' }}>
            Best Practices for Error Handling
          </h3>
          <ul style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
            <li>Always check the HTTP status code first to categorize the error type.</li>
            <li>Use the <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>code</code> field for programmatic error handling.</li>
            <li>Cache capability responses to reduce API calls and avoid rate limits.</li>
            <li>Implement retry logic with exponential backoff for 429 and 5xx errors.</li>
            <li>Use your public key for client-side capability checks.</li>
          </ul>
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
            background: 'rgba(14, 98, 69, 0.3)',
            border: '1px solid rgba(62, 207, 142, 0.3)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#3ecf8e',
          }}>
            Requires <strong>public key</strong> authentication
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
  "location": "https://api.omise.co/capability",
  "code": "authentication_failure",
  "message": "authentication failed"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Invalid Account
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>400 Bad Request</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://api.omise.co/capability",
  "code": "invalid_account",
  "message": "account is invalid"
}`}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Not Found
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>404 Not Found</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://api.omise.co/capabilities",
  "code": "not_found",
  "message": "not found"
}

// Note: The correct endpoint is
// /capability (singular), not
// /capabilities (plural)`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
