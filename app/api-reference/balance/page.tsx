'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import VersionSelector, { VersionDiff } from '../../components/VersionSelector';
import { API_VERSIONS } from '../../lib/apiVersions';
import {
  getBalanceFieldsForVersion,
  methodColors
} from '../../lib/accountData';
import { useVersion } from '../../context/VersionContext';

export default function BalanceOverviewPage() {
  const { currentVersion } = useVersion();
  const fields = getBalanceFieldsForVersion(currentVersion);
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);
  const isDeimos = currentVersion === 'deimos';

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

        {/* Version Selector */}
        <VersionSelector />

        {/* Version Diff Warning */}
        <VersionDiff />

        {/* Version Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>1</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Endpoint</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{fields.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Fields</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>GET</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Read-only</div>
          </div>
        </div>

        {/* Related APIs */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related APIs</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <Link href="/api-reference/account" style={{ color: '#1A1F71', textDecoration: 'none' }}>Account</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none' }}>Capabilities</Link>
          </div>
        </div>

        {/* Version-specific notes */}
        {!isDeimos && (
          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
              <strong>Version Differences ({versionInfo?.label}):</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li><code>available</code> instead of <code>transferable</code></li>
                <li><code>reserve_amount</code> instead of <code>reserve</code></li>
                <li>No <code>created_at</code> field</li>
              </ul>
            </div>
          </div>
        )}

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
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          {fields.length} fields in {versionInfo?.label}
        </p>
        <div className="attributes-section">
          {fields.map(attr => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">{attr.name}</div>
                <div className="attribute-meta">{attr.type}</div>
              </div>
              <div className="attribute-desc">{attr.description}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <Link href={`/openapi-${currentVersion}.yaml`} style={{ color: '#1A1F71' }}>openapi-{currentVersion}.yaml</Link>
        </div>
      </main>

      {/* Right Panel - Example Balance Object */}
      <aside className="code-panel">
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#b8c7d9',
            marginBottom: '8px'
          }}>
            API Version
          </div>
          <div style={{
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#fff',
          }}>
            <span style={{ color: '#3ecf8e', fontWeight: 600 }}>{currentVersion}</span>
            <span style={{ color: '#8792a2', marginLeft: '8px' }}>{versionInfo?.date}</span>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Example Balance Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', maxHeight: '400px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{isDeimos ? `{
  "object": "balance",
  "livemode": false,
  "location": "/balance",
  "currency": "THB",
  "total": 1656795,
  "transferable": 1656795,
  "reserve": 0,
  "on_hold": 0,
  "created_at": "2024-01-15T10:30:00Z"
}` : `{
  "object": "balance",
  "livemode": false,
  "location": "/balance",
  "currency": "thb",
  "total": 1656795,
  "available": 1656795,
  "reserve_amount": 0,
  "on_hold": 0
}`}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Request Header
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`Omise-Version: ${versionInfo?.date}
Authorization: Basic {base64(skey_test_...)}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
