'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';

const errorCodes = [
  {
    code: 'authentication_failure',
    httpStatus: 401,
    message: 'authentication failed',
    description: 'The API key is invalid, missing, or does not have permission to access this resource. The Account API requires a secret key (skey_...), not a public key.',
    resolution: 'Verify you are using your secret API key. Check that the key is correctly formatted and has not been revoked.',
  },
  {
    code: 'bad_request',
    httpStatus: 400,
    message: 'webhook endpoint is invalid',
    description: 'The webhook_uri parameter contains an invalid URL. The URL must be a valid HTTPS endpoint.',
    resolution: 'Ensure the webhook_uri is a properly formatted HTTPS URL (e.g., https://example.com/webhooks). HTTP URLs are not allowed for security reasons.',
  },
  {
    code: 'invalid_account',
    httpStatus: 400,
    message: 'account is invalid',
    description: 'The account associated with this API key is in an invalid state or has been suspended.',
    resolution: 'Contact Omise support to verify your account status and resolve any issues.',
  },
];

export default function AccountErrorsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
          <Link href="/api-reference" style={{ color: '#697386', textDecoration: 'none' }}>API Reference</Link>
          <span style={{ color: '#697386' }}>/</span>
          <Link href="/api-reference/account" style={{ color: '#697386', textDecoration: 'none' }}>Account</Link>
          <span style={{ color: '#697386' }}>/</span>
          <span style={{ color: '#1a1a1a', fontWeight: 500 }}>Error Codes</span>
        </div>

        <h1>Account API Error Codes</h1>
        <p className="subtitle">
          Error codes returned by the Account API endpoints.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px' }}>
          When an Account API request fails, the response includes an error object with a <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>code</code> field
          identifying the specific error. Use this reference to understand and resolve errors.
        </p>

        {/* Error Response Format */}
        <h2>Error Response Format</h2>
        <pre style={{
          background: '#1a2332',
          borderRadius: '8px',
          padding: '16px 20px',
          overflow: 'auto',
          fontFamily: "'SF Mono', Monaco, monospace",
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#a5d6ff',
          marginBottom: '32px',
        }}>
{`{
  "object": "error",
  "location": "https://www.omise.co/api-errors#authentication-failure",
  "code": "authentication_failure",
  "message": "authentication failed"
}`}
        </pre>

        {/* Error Codes Table */}
        <h2>Error Codes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {errorCodes.map((error) => (
            <div
              key={error.code}
              style={{
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                background: '#f6f9fc',
                borderBottom: '1px solid #e3e8ee',
              }}>
                <code style={{
                  fontFamily: "'SF Mono', Monaco, monospace",
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#cd3d64',
                }}>
                  {error.code}
                </code>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: '#fde2dd',
                  color: '#cd3d64',
                }}>
                  HTTP {error.httpStatus}
                </span>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Message
                  </div>
                  <code style={{
                    fontFamily: "'SF Mono', Monaco, monospace",
                    fontSize: '13px',
                    color: '#3c4257',
                  }}>
                    {error.message}
                  </code>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Description
                  </div>
                  <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
                    {error.description}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Resolution
                  </div>
                  <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
                    {error.resolution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentication Note */}
        <div style={{ marginTop: '32px', padding: '16px 20px', background: '#fff', border: '1px solid #e3e8ee', borderLeft: '4px solid #1A1F71', borderRadius: '8px' }}>
          <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
            <strong>Important:</strong> The Account API requires authentication with your <strong>secret key</strong> (skey_...).
            Using a public key (pkey_...) will result in an <code style={{ background: '#f6f9fc', padding: '1px 4px', borderRadius: '3px', fontSize: '12px' }}>authentication_failure</code> error.
          </p>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <Link href="/api-reference/account/update" style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>
            ← Update Account
          </Link>
          <Link href="/api-reference/account" style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>
            Account Overview →
          </Link>
        </div>
      </main>
    </div>
  );
}
