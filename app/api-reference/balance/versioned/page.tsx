'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import VersionSelector, { VersionDiff } from '../../../components/VersionSelector';
import { API_VERSIONS } from '../../../lib/apiVersions';
import { getBalanceFieldsForVersion, methodColors } from '../../../lib/accountData';
import { useVersion } from '../../../context/VersionContext';

export default function VersionedBalancePage() {
  const { currentVersion } = useVersion();

  const fields = getBalanceFieldsForVersion(currentVersion);
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);
  const isDeimos = currentVersion === 'deimos';

  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#1A1F71', textDecoration: 'none' }}>Documentation</Link>
          {' / '}
          <Link href="/api-reference" style={{ color: '#1A1F71', textDecoration: 'none' }}>API Reference</Link>
          {' / '}
          <span style={{ color: '#1a1a1a' }}>Balance (Versioned)</span>
        </div>

        <h1 style={{ margin: 0 }}>Balance API</h1>
        <p className="subtitle">
          The Balance object represents the current balance of your Omise account.
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

        {/* Read-only API Note */}
        <div style={{ background: '#eff6ff', border: '1px solid #3b82f6', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.6 }}>
            <strong>Read-Only API:</strong> The Balance API only supports retrieval (GET). All fields are OUTPUT only.
          </div>
        </div>

        {/* Version-specific notes */}
        {!isDeimos && (
          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
              <strong>Version Note:</strong> In {versionInfo?.label}, the Balance API uses different field names:
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li><code>available</code> instead of <code>transferable</code></li>
                <li><code>reserve_amount</code> instead of <code>reserve</code></li>
                <li>No <code>created_at</code> field</li>
              </ul>
            </div>
          </div>
        )}

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
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
          </div>
        </div>

        {/* Balance Object Fields */}
        <h2>The Balance Object</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Fields available in API version <strong>{versionInfo?.date}</strong> ({currentVersion}) - {fields.length} fields
        </p>
        <div className="attributes-section">
          {fields.map(field => (
            <div key={field.name} className="attribute-row">
              <div>
                <div className="attribute-name">
                  {field.name}
                  <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#f3f4f6', color: '#4b5563', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>OUTPUT</span>
                </div>
                <div className="attribute-meta">{field.type}</div>
              </div>
              <div className="attribute-desc">{field.description}</div>
            </div>
          ))}
        </div>

        {/* Schema Link */}
        <div style={{ marginTop: '40px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
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
