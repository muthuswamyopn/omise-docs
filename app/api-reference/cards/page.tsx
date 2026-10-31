'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import LinkifiedText from '../../components/LinkifiedText';
import VersionSelector, { VersionDiff } from '../../components/VersionSelector';
import Notice from '../../components/Notice';
import { API_VERSIONS } from '../../lib/apiVersions';
import {
  cardEndpoints,
  getCardFieldsForVersion,
  cardResponseExample,
  methodColors
} from '../../lib/cardData';
import { useVersion } from '../../context/VersionContext';

export default function CardsOverviewPage() {
  const { currentVersion } = useVersion();
  const fields = getCardFieldsForVersion(currentVersion);
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);
  const isDeimos = currentVersion === 'deimos';

  return (
    <div className="docs-layout">
      <SidebarNew />

      {/* Center Content */}
      <main className="content">
        <h1>Card</h1>
        <p className="subtitle">
          The Card object represents a payment card stored on a customer for future charges.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Cards are attached to customers and can be used to create charges without requiring
          the customer to re-enter their card details. Cards are created by attaching a token
          to a customer. Once attached, you can update billing information, retrieve card details,
          or remove the card.
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
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>4</div>
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
          The Card API requires <strong>secret key</strong> authentication (skey_...).
          Public keys are not accepted. Cards contain sensitive payment information.
        </Notice>

        {/* Related APIs */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px', marginTop: '24px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related APIs</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <Link href="/api-reference/charges" style={{ color: '#1A1F71', textDecoration: 'none' }}>Charges</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/accept-payments/cards" style={{ color: '#1A1F71', textDecoration: 'none' }}>Card Payments Guide</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none' }}>Capability</Link>
          </div>
        </div>

        {/* Nested Resource Notice */}
        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#0369a1', marginBottom: '8px' }}>Nested Resource</div>
          <p style={{ fontSize: '14px', color: '#0c4a6e', margin: 0, lineHeight: 1.6 }}>
            Cards are always accessed through a customer. All card endpoints are nested under
            <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', margin: '0 4px' }}>/customers/:customer_id/cards</code>
          </p>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          {Object.entries(cardEndpoints).map(([key, config]) => {
            const methodStyle = methodColors[config.method];
            return (
              <Link
                key={key}
                href={`/api-reference/cards/${key}`}
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

        {/* The Card Object */}
        <h2>The Card Object</h2>
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

        {/* Creating Cards */}
        <h2 style={{ marginTop: '48px' }}>Creating Cards</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Cards cannot be created directly. Instead, create a token using the Vault API, then attach it to a customer:
        </p>
        <div style={{ background: '#1a2332', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <pre style={{ margin: 0, fontSize: '13px', color: '#67e8f9', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>
{`# 1. Create a token (client-side, using public key)
curl https://vault.omise.co/tokens \\
  -u $OMISE_PUBLIC_KEY: \\
  -d "card[name]=John Doe" \\
  -d "card[number]=4242424242424242" \\
  -d "card[expiration_month]=12" \\
  -d "card[expiration_year]=2028" \\
  -d "card[security_code]=123"

# 2. Attach token to customer (server-side, using secret key)
curl https://api.omise.co/customers/cust_test_... \\
  -u $OMISE_SECRET_KEY: \\
  -X PATCH \\
  -d "card=tokn_test_..."`}
          </pre>
        </div>

        {/* Error Handling Reference */}
        <div style={{ marginBottom: '32px' }}>
          <Notice type="note" title="Error Handling">
            When a card operation fails, the API returns a specific error code.
            See <Link href="/api-reference/cards/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Card API Error Codes</Link> for a complete reference.
          </Notice>
        </div>

        <div style={{ marginTop: '48px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <Link href={`/openapi-${currentVersion}.yaml`} style={{ color: '#1A1F71' }}>openapi-{currentVersion}.yaml</Link>
        </div>
      </main>

      {/* Right Panel - Example Card Object */}
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
            Example Card Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '11px', lineHeight: 1.5, color: '#67e8f9', overflow: 'auto', maxHeight: '500px', fontFamily: "'SF Mono', Monaco, monospace" }}>
              {cardResponseExample}
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
