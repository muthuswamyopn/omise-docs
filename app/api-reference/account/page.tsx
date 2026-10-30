'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import {
  accountEndpoints,
  accountAttributes,
  methodColors
} from '../../lib/accountData';

export default function AccountOverviewPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      {/* Center Content */}
      <main className="content">
        <h1>Account</h1>
        <p className="subtitle">
          The Account object contains information about your Omise account configuration.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Use the Account API to retrieve your account details, update webhook settings, configure chain integration,
          and manage other account-level settings. Both test and live keys return the same account information.
        </p>

        {/* Related APIs */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related APIs</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <Link href="/api-reference/balance" style={{ color: '#1A1F71', textDecoration: 'none' }}>Balance</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none' }}>Capabilities</Link>
          </div>
        </div>

        {/* Version Note */}
        <div style={{ background: '#eff6ff', border: '1px solid #3b82f6', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.6 }}>
            <strong>Note:</strong> This shows all 22 fields from Deimos (2019-05-29). Older versions have fewer fields.
          </div>
        </div>

        {/* Version Differences */}
        <div style={{ background: '#faf5ff', border: '1px solid #a855f7', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#6b21a8', marginBottom: '12px' }}>API Version Differences</div>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e9d5ff' }}>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6b21a8' }}>Deimos (2019-05-29)</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6b21a8' }}>Older Versions</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6b21a8' }}>Notes</th>
              </tr>
            </thead>
            <tbody style={{ color: '#581c87' }}>
              <tr style={{ borderBottom: '1px solid #f3e8ff' }}>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>account_test_...</code></td>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>acct_...</code></td>
                <td style={{ padding: '8px 12px' }}>ID format changed</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3e8ff' }}>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>created_at</code></td>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>created</code></td>
                <td style={{ padding: '8px 12px' }}>Timestamp field renamed</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3e8ff' }}>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>team</code></td>
                <td style={{ padding: '8px 12px', color: '#9ca3af', fontStyle: 'italic' }}>not available</td>
                <td style={{ padding: '8px 12px' }}>Team identifier added in Deimos</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3e8ff' }}>
                <td style={{ padding: '8px 12px' }}>THB, USD (uppercase)</td>
                <td style={{ padding: '8px 12px' }}>thb, usd (lowercase)</td>
                <td style={{ padding: '8px 12px' }}>Currency codes case changed</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>paas_enabled</code></td>
                <td style={{ padding: '8px 12px', color: '#9ca3af', fontStyle: 'italic' }}>not available</td>
                <td style={{ padding: '8px 12px' }}>Platform-as-a-Service flag (Deimos only)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Error Handling Reference */}
        <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
            <strong style={{ color: '#92400e' }}>Error Handling:</strong> When an account operation fails, the API returns a specific error code.
            See <Link href="/api-reference/account/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Account API Error Codes</Link> for a complete reference of all error codes, their meanings, and resolution steps.
          </div>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          {Object.entries(accountEndpoints).map(([key, config]) => {
            const methodStyle = methodColors[config.method];
            return (
              <Link
                key={key}
                href={`/api-reference/account/${key}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
              >
                <span style={{
                  fontWeight: 700,
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: methodStyle.bg,
                  color: methodStyle.color,
                  fontFamily: "'SF Mono', Monaco, monospace",
                  minWidth: '52px',
                  textAlign: 'center'
                }}>
                  {config.method}
                </span>
                <span style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', color: '#3c4257' }}>
                  {config.path.replace('https://api.omise.co', '')}
                </span>
                <span style={{ marginLeft: 'auto', color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
                  {config.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* The Account Object */}
        <h2>The Account Object</h2>
        <div className="attributes-section">
          {accountAttributes.map((attr: { name: string; type: string; desc: string; io?: string }) => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">{attr.name}</div>
                <div className="attribute-meta">{attr.type}</div>
              </div>
              <div className="attribute-desc">{attr.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <Link href="/openapi.yaml" style={{ color: '#1A1F71' }}>openapi.yaml</Link>
        </div>
      </main>

      {/* Right Panel - Example Account Object */}
      <aside className="code-panel">
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Example Account Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', maxHeight: '600px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "account",
  "id": "account_test_no1t4tnemucod0e51mo",
  "team": "acct_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/account",
  "country": "TH",
  "currency": "THB",
  "email": "merchant@example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "supported_currencies": [
    "THB", "JPY", "USD", "EUR",
    "GBP", "SGD", "AUD", "CHF",
    "CNY", "DKK", "HKD", "NOK", "SEK"
  ],
  "api_version": "2019-05-29",
  "auto_activate_recipients": false,
  "chain_enabled": true,
  "chaining_allowed": true,
  "zero_interest_installments": false,
  "chain_return_uri": "https://example.com/chain",
  "webhook_uri": "https://example.com/webhooks",
  "metadata_export_keys": {
    "charge": ["order_id"],
    "transfer": [],
    "refund": [],
    "dispute": []
  },
  "last_updated_api_version": "2024-01-15",
  "transfer_config": {
    "min_transfer_amount": "30.00",
    "max_transfer_amount": "2000000000.00",
    "fee": "30.00",
    "is_payout_enabled": false
  },
  "restricted_recipient_management": false,
  "paas_enabled": false
}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
