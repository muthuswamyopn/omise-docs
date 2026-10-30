'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import VersionSelector, { VersionDiff } from '../../../components/VersionSelector';
import { API_VERSIONS } from '../../../lib/apiVersions';
import { getAccountFieldsForVersion, methodColors } from '../../../lib/accountData';
import { useVersion } from '../../../context/VersionContext';

export default function VersionedAccountPage() {
  const { currentVersion } = useVersion();

  const fields = getAccountFieldsForVersion(currentVersion);
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);
  const isDeimos = currentVersion === 'deimos';

  const inputFields = fields.filter(f => f.io === 'input');
  const outputFields = fields.filter(f => f.io === 'output');

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
          <span style={{ color: '#1a1a1a' }}>Account (Versioned)</span>
        </div>

        <h1 style={{ margin: 0 }}>Account API</h1>
        <p className="subtitle">
          The Account object contains information about your Omise account configuration.
        </p>

        {/* Version Selector */}
        <VersionSelector />

        {/* Version Diff Warning */}
        <VersionDiff />

        {/* Version Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>2</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Endpoints</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{fields.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Total Fields</div>
          </div>
          <div style={{ background: '#dcfce7', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#166534' }}>{inputFields.length}</div>
            <div style={{ fontSize: '13px', color: '#166534' }}>Editable</div>
          </div>
          <div style={{ background: '#f3f4f6', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#4b5563' }}>{outputFields.length}</div>
            <div style={{ fontSize: '13px', color: '#4b5563' }}>Read-only</div>
          </div>
        </div>

        {/* Field Types Info */}
        <div style={{ background: '#eff6ff', border: '1px solid #3b82f6', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.6 }}>
            <strong>Field Types:</strong><br/>
            <span style={{ display: 'inline-block', padding: '2px 6px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '11px', fontWeight: 600, marginRight: '8px' }}>INPUT</span> Can be updated via PATCH /account<br/>
            <span style={{ display: 'inline-block', padding: '2px 6px', background: '#f3f4f6', color: '#4b5563', borderRadius: '4px', fontSize: '11px', fontWeight: 600, marginRight: '8px' }}>OUTPUT</span> Read-only, returned by API
          </div>
        </div>

        {/* Version-specific notes */}
        {!isDeimos && (
          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
              <strong>Version Differences ({versionInfo?.label}):</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>ID format: <code>acct_...</code> (Deimos uses <code>account_test_...</code>)</li>
                <li>Currencies are lowercase (Deimos uses UPPERCASE)</li>
                <li>Uses <code>created</code> instead of <code>created_at</code></li>
                <li>No <code>team</code> field</li>
                <li>No <code>paas_enabled</code> field</li>
                <li>No <code>restricted_recipient_management</code> field</li>
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
              /account
            </span>
            <span style={{ marginLeft: 'auto', color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
              Retrieve account
            </span>
          </div>
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
              background: methodColors.PATCH.bg,
              color: methodColors.PATCH.color,
              fontFamily: "'SF Mono', Monaco, monospace",
              minWidth: '52px',
              textAlign: 'center'
            }}>
              PATCH
            </span>
            <span style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', color: '#3c4257' }}>
              /account
            </span>
            <span style={{ marginLeft: 'auto', color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
              Update account
            </span>
          </div>
        </div>

        {/* Account Object Fields */}
        <h2>The Account Object</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Fields available in API version <strong>{versionInfo?.date}</strong> ({currentVersion}) - {fields.length} fields
        </p>
        <div className="attributes-section">
          {fields.map(field => (
            <div key={field.name} className="attribute-row">
              <div>
                <div className="attribute-name">
                  {field.name}
                  {field.io === 'input' ? (
                    <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>INPUT</span>
                  ) : (
                    <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#f3f4f6', color: '#4b5563', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>OUTPUT</span>
                  )}
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

      {/* Right Panel - Example Account Object */}
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
            Example Account Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '11px', lineHeight: 1.5, color: '#67e8f9', overflow: 'auto', maxHeight: '500px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{isDeimos ? `{
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
    "THB", "JPY", "USD", "EUR", "GBP"
  ],
  "api_version": "2019-05-29",
  "auto_activate_recipients": false,
  "chain_enabled": true,
  "chaining_allowed": true,
  "zero_interest_installments": false,
  "chain_return_uri": "https://example.com/chain",
  "webhook_uri": "https://example.com/webhooks",
  "metadata_export_keys": {},
  "last_updated_api_version": "2024-01-15",
  "transfer_config": {
    "min_transfer_amount": "30.00",
    "max_transfer_amount": "2000000000.00"
  },
  "restricted_recipient_management": false,
  "paas_enabled": false
}` : `{
  "object": "account",
  "id": "acct_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/account",
  "country": "TH",
  "currency": "thb",
  "email": "merchant@example.com",
  "created": "2024-01-15T10:30:00Z",
  "supported_currencies": [
    "thb", "jpy", "usd", "eur", "gbp"
  ],
  "api_version": "${versionInfo?.date}",
  "auto_activate_recipients": false,
  "chain_enabled": true,
  "chaining_allowed": true,
  "zero_interest_installments": false,
  "chain_return_uri": "https://example.com/chain",
  "webhook_uri": "https://example.com/webhooks",
  "metadata_export_keys": {},
  "last_updated_api_version": "2024-01-15",
  "transfer_config": {
    "min_transfer_amount": "30.00",
    "max_transfer_amount": "2000000000.00"
  }
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
