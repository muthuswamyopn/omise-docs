'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import {
  balanceAttributes,
  methodColors
} from '../../lib/accountData';

export default function BalanceOverviewPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      {/* Center Content */}
      <main className="content">
        <h1>Balance</h1>
        <p className="subtitle">
          The Balance object represents the current balance of your Omise account.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Use the Balance API to check your current account balance, including the total amount, transferable amount,
          and any funds held in reserve. All monetary values are returned in the smallest currency unit (e.g., satang for THB).
        </p>

        {/* Related APIs */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related APIs</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <Link href="/api-reference/account" style={{ color: '#1A1F71', textDecoration: 'none' }}>Account</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none' }}>Capabilities</Link>
          </div>
        </div>

        {/* Read-only API Note */}
        <div style={{ background: '#eff6ff', border: '1px solid #3b82f6', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.6 }}>
            <strong>Read-Only API:</strong> The Balance API only supports retrieval (GET). All fields are <span style={{ display: 'inline-block', padding: '2px 6px', background: '#f3f4f6', color: '#4b5563', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>OUTPUT</span> only.
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
                <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6b21a8' }}>What it represents</th>
              </tr>
            </thead>
            <tbody style={{ color: '#581c87' }}>
              <tr style={{ borderBottom: '1px solid #f3e8ff' }}>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>transferable</code></td>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>available</code></td>
                <td style={{ padding: '8px 12px' }}>Amount you can transfer to your bank account right now</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3e8ff' }}>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>reserve</code></td>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>reserve_amount</code></td>
                <td style={{ padding: '8px 12px' }}>Funds held back by Omise as a security buffer (not transferable)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px' }}><code style={{ background: '#f3e8ff', padding: '2px 6px', borderRadius: '4px' }}>created_at</code></td>
                <td style={{ padding: '8px 12px', color: '#9ca3af', fontStyle: 'italic' }}>not available</td>
                <td style={{ padding: '8px 12px' }}>Timestamp when the balance record was created</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Error Handling Reference */}
        <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
            <strong style={{ color: '#92400e' }}>Error Handling:</strong> When a balance operation fails, the API returns a specific error code.
            See <Link href="/api-reference/balance/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Balance API Error Codes</Link> for a complete reference of all error codes, their meanings, and resolution steps.
          </div>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          <Link
            href="/api-reference/balance/retrieve"
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
              background: methodColors.GET.bg,
              color: methodColors.GET.color,
              fontFamily: "'SF Mono', Monaco, monospace",
              minWidth: '52px',
              textAlign: 'center'
            }}>
              GET
            </span>
            <span style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', color: '#3c4257' }}>
              /balance
            </span>
            <span style={{ marginLeft: 'auto', color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
              Retrieve balance
            </span>
          </Link>
        </div>

        {/* The Balance Object */}
        <h2>The Balance Object</h2>
        <div className="attributes-section">
          {balanceAttributes.map((attr: { name: string; type: string; desc: string; io?: string }) => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">
                  {attr.name}
                  {attr.io === 'output' && (
                    <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#f3f4f6', color: '#4b5563', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>OUTPUT</span>
                  )}
                </div>
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

      {/* Right Panel - Example Balance Object */}
      <aside className="code-panel">
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Example Balance Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', maxHeight: '600px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "balance",
  "livemode": false,
  "location": "/balance",
  "currency": "THB",
  "total": 1656795,
  "transferable": 1656795,
  "reserve": 0,
  "on_hold": 0,
  "created_at": "2024-01-15T10:30:00Z"
}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
