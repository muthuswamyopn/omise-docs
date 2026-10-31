'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import LinkifiedText from '../../components/LinkifiedText';
import VersionSelector, { VersionDiff } from '../../components/VersionSelector';
import Notice from '../../components/Notice';
import { API_VERSIONS } from '../../lib/apiVersions';
import {
  customerEndpoints,
  getCustomerFieldsForVersion,
  customerResponseExample,
  methodColors
} from '../../lib/customerData';
import { useVersion } from '../../context/VersionContext';

export default function CustomersOverviewPage() {
  const { currentVersion } = useVersion();
  const fields = getCustomerFieldsForVersion(currentVersion);
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);
  const isDeimos = currentVersion === 'deimos';

  return (
    <div className="docs-layout">
      <SidebarNew />

      {/* Center Content */}
      <main className="content">
        <h1>Customer</h1>
        <p className="subtitle">
          The Customer object stores payment methods for repeated charges.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Customers allow you to save cards and other payment methods for future use.
          When you create a charge, you can specify a customer instead of a card token,
          and the charge will be made using the customer's default card. Customers can
          have multiple cards attached and you can set any of them as the default.
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
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>5</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Endpoints</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{fields.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Fields</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#cd3d64' }}>SECRET</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Key Type</div>
          </div>
        </div>

        {/* Authentication Notice */}
        <Notice type="warning" title="Authentication">
          The Customer API requires <strong>secret key</strong> authentication (skey_...).
          Public keys are not accepted. Customers contain sensitive payment information.
        </Notice>

        {/* Related APIs */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px', marginTop: '24px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related APIs</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <Link href="/api-reference/cards" style={{ color: '#1A1F71', textDecoration: 'none' }}>Cards</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/charges" style={{ color: '#1A1F71', textDecoration: 'none' }}>Charges</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/tokens" style={{ color: '#1A1F71', textDecoration: 'none' }}>Tokens</Link>
          </div>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          {Object.entries(customerEndpoints).map(([key, config]) => {
            const methodStyle = methodColors[config.method];
            return (
              <Link
                key={key}
                href={`/api-reference/customers/${key}`}
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
                  minWidth: '60px',
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

        {/* The Customer Object */}
        <h2>The Customer Object</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          {fields.length} fields in {currentVersion}
          {!isDeimos && (
            <span style={{ marginLeft: '8px', color: '#9c6f19' }}>
              (uses <code style={{ background: '#fcefc7', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>created</code> instead of <code style={{ background: '#fcefc7', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>created_at</code>, no <code style={{ background: '#fcefc7', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>deleted</code> field)
            </span>
          )}
        </p>
        <div className="attributes-section">
          {fields.map(attr => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">
                  {attr.name}
                  {attr.io === 'editable' && (
                    <span style={{ marginLeft: '8px', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: '#fcefc7', color: '#9c6f19', fontWeight: 600 }}>EDITABLE</span>
                  )}
                </div>
                <div className="attribute-meta">{attr.type}</div>
              </div>
              <div className="attribute-desc"><LinkifiedText>{attr.description}</LinkifiedText></div>
            </div>
          ))}
        </div>

        {/* Error Handling Reference */}
        <div style={{ marginBottom: '32px', marginTop: '32px' }}>
          <Notice type="note" title="Error Handling">
            When a customer operation fails, the API returns a specific error code.
            See <Link href="/api-reference/customers/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Customer API Error Codes</Link> for a complete reference.
          </Notice>
        </div>

        <div style={{ marginTop: '48px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <Link href={`/openapi-${currentVersion}.yaml`} style={{ color: '#1A1F71' }}>openapi-{currentVersion}.yaml</Link>
        </div>
      </main>

      {/* Right Panel - Example Customer Object */}
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
            Example Customer Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '11px', lineHeight: 1.5, color: '#67e8f9', overflow: 'auto', maxHeight: '500px', fontFamily: "'SF Mono', Monaco, monospace" }}>
              {customerResponseExample}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Request Header
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`Authorization: Basic {base64(skey_...)}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
