'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import { endpoints, methodColors } from '../lib/chargeData';

// Fields marked as 'input' can be set when creating a charge
// Fields marked as 'editable' can be updated after creation
// Fields marked as 'output' are read-only (set by API)
const chargeAttributes = [
  { name: 'id', type: 'string', desc: 'Charge identifier matching /chrg(_test)?_[0-9a-z]+/', io: 'output' },
  { name: 'object', type: 'string', desc: 'Object type, always "charge"', io: 'output' },
  { name: 'amount', type: 'integer', desc: 'Charge amount in smallest unit of currency', io: 'input' },
  { name: 'currency', type: 'string', desc: 'Three-letter ISO 4217 currency code', io: 'input' },
  { name: 'status', type: 'string', desc: 'Charge status: pending, successful, failed, expired, reversed', io: 'output' },
  { name: 'authorized', type: 'boolean', desc: 'Whether charge has been authorized', io: 'output' },
  { name: 'captured_amount', type: 'integer', desc: 'Amount captured (use this to check if captured: captured_amount > 0)', io: 'output' },
  { name: 'capturable', type: 'boolean', desc: 'Whether charge can still be captured', io: 'output' },
  { name: 'reversed', type: 'boolean', desc: 'Whether authorization has been reversed', io: 'output' },
  { name: 'reversible', type: 'boolean', desc: 'Whether authorization can be reversed', io: 'output' },
  { name: 'refundable', type: 'boolean', desc: 'Whether charge can be refunded', io: 'output' },
  { name: 'refunded_amount', type: 'integer', desc: 'Total amount refunded', io: 'output' },
  { name: 'expired', type: 'boolean', desc: 'Whether charge has expired', io: 'output' },
  { name: 'net', type: 'integer', desc: 'Funding amount after fees, interest, and VAT deducted', io: 'output' },
  { name: 'fee', type: 'integer', desc: 'Omise processing fee amount', io: 'output' },
  { name: 'fee_vat', type: 'integer', desc: 'VAT applied to fee', io: 'output' },
  { name: 'card', type: 'object', desc: 'Card that was charged (set via card token at creation)', io: 'output' },
  { name: 'source', type: 'object', desc: 'Source that was charged (set via source at creation)', io: 'output' },
  { name: 'customer', type: 'string', desc: 'Customer associated with charge', io: 'input' },
  { name: 'description', type: 'string', desc: 'Charge description (can be updated after creation)', io: 'editable' },
  { name: 'metadata', type: 'object', desc: 'Custom metadata key-value pairs (can be updated after creation)', io: 'editable' },
  { name: 'return_uri', type: 'string', desc: 'URI customer is redirected to after authorization', io: 'input' },
  { name: 'authorize_uri', type: 'string', desc: 'URI for payment authorization (3DS, redirects)', io: 'output' },
  { name: 'created_at', type: 'datetime', desc: 'UTC datetime of charge creation (ISO 8601)', io: 'output' },
  { name: 'paid_at', type: 'datetime', desc: 'UTC datetime of payment (ISO 8601)', io: 'output' },
  { name: 'expires_at', type: 'datetime', desc: 'UTC datetime of expected expiration (ISO 8601)', io: 'input' },
];

const endpointOrder = ['create', 'retrieve', 'list', 'update', 'capture', 'reverse', 'expire', 'mark-as-paid', 'mark-as-failed'];

export default function ChargesOverviewPage() {
  return (
    <div className="docs-layout">
      <Sidebar currentPage="charges" />

      {/* Center Content */}
      <main className="content">
        <h1>Charges</h1>
        <p className="subtitle">
          The Charge object represents a payment transaction in the Omise API.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Use charges to collect payments from customers via credit cards, debit cards, or alternative payment methods
          like PromptPay, TrueMoney, and mobile banking. Charges support both immediate capture and pre-authorization
          workflows.
        </p>

        {/* Charge Lifecycle */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Charge Lifecycle</div>
          <div style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.8, fontFamily: "'SF Mono', Monaco, monospace" }}>
            <div>pending → authorized → captured → <span style={{ color: '#0e6245' }}>successful</span></div>
            <div>pending → <span style={{ color: '#cd3d64' }}>failed</span></div>
            <div>pending → <span style={{ color: '#697386' }}>expired</span></div>
            <div>authorized → <span style={{ color: '#9c6f19' }}>reversed</span></div>
          </div>
        </div>

        {/* Error Handling Reference */}
        <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
            <strong style={{ color: '#92400e' }}>Error Handling:</strong> When a charge operation fails, the API returns a specific error code.
            See <Link href="/charges/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Charges API Error Codes</Link> for a complete reference of all error codes, their meanings, and resolution steps.
          </div>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          {endpointOrder.map((key) => {
            const config = endpoints[key];
            const methodStyle = methodColors[config.method];
            return (
              <Link
                key={key}
                href={`/charges/${key}`}
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
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {config.testModeOnly && (
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 6px',
                      borderRadius: '4px',
                      background: '#fef3c7',
                      color: '#92400e',
                      border: '1px solid #f59e0b',
                    }}>
                      TEST ONLY
                    </span>
                  )}
                  <span style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
                    {config.title}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Input vs Output Info */}
        <div style={{ background: '#eff6ff', border: '1px solid #3b82f6', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.6 }}>
            <strong>Input vs Output Fields:</strong><br/>
            <span style={{ display: 'inline-block', padding: '2px 6px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '11px', fontWeight: 600, marginRight: '8px' }}>INPUT</span> Can be set when creating a charge<br/>
            <span style={{ display: 'inline-block', padding: '2px 6px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontSize: '11px', fontWeight: 600, marginRight: '8px' }}>EDITABLE</span> Can be updated after creation (via PATCH)<br/>
            <span style={{ display: 'inline-block', padding: '2px 6px', background: '#f3f4f6', color: '#4b5563', borderRadius: '4px', fontSize: '11px', fontWeight: 600, marginRight: '8px' }}>OUTPUT</span> Read-only, set by API<br/><br/>
            <strong>Checking capture status:</strong> Use <code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>captured_amount &gt; 0</code> (the <code>captured</code> boolean only exists in API version Aegaeon)
          </div>
        </div>

        {/* The Charge Object */}
        <h2>The Charge Object</h2>
        <div className="attributes-section">
          {chargeAttributes.map(attr => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">
                  {attr.name}
                  {attr.io === 'input' && (
                    <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>INPUT</span>
                  )}
                  {attr.io === 'editable' && (
                    <span style={{ marginLeft: '8px', padding: '2px 6px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>EDITABLE</span>
                  )}
                </div>
                <div className="attribute-meta">{attr.type}</div>
              </div>
              <div className="attribute-desc">{attr.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <a href="https://api.omise.co/schema" style={{ color: '#1A1F71' }}>api.omise.co/schema</a>
        </div>
      </main>

      {/* Right Panel - Example Charge Object */}
      <aside className="code-panel">
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Example Charge Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', maxHeight: '600px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "location": "/charges/chrg_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "amount": 100000,
  "captured_amount": 100000,
  "authorized_amount": 100000,
  "net": 96350,
  "fee": 3650,
  "fee_vat": 256,
  "interest": 0,
  "interest_vat": 0,
  "funding_amount": 100000,
  "funding_currency": "thb",
  "refunded_amount": 0,
  "currency": "thb",
  "description": "Order #12345",
  "metadata": {
    "order_id": "12345"
  },
  "status": "successful",
  "authorized": true,
  "capturable": false,
  "reversed": false,
  "reversible": false,
  "refundable": true,
  "expired": false,
  "voided": false,
  "paid": true,
  "disputable": true,
  "created_at": "2024-01-22T10:00:00Z",
  "paid_at": "2024-01-22T10:00:05Z",
  "expires_at": "2024-01-29T10:00:00Z",
  "transaction": "trxn_test_no1t4tnemucod0e51mo",
  "card": {
    "object": "card",
    "id": "card_test_no1t4tnemucod0e51mo",
    "livemode": false,
    "brand": "Visa",
    "financing": "credit",
    "last_digits": "4242",
    "name": "JOHN DOE",
    "expiration_month": 12,
    "expiration_year": 2025
  },
  "source": null,
  "customer": null,
  "ip": "xxx.xxx.xxx.xxx",
  "created_at": "2024-01-15T10:30:00Z",
  "paid_at": "2024-01-15T10:30:01Z"
}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
