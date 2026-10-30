'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import { endpoints, methodColors } from '../lib/chargeData';

// Charge attributes - All 62 fields from Deimos (2019-05-29)
// INPUT = can be set when creating, OUTPUT = read-only
const chargeAttributes = [
  { name: 'id', type: 'string', desc: 'Charge identifier (chrg_test_...)', io: 'output' },
  { name: 'object', type: 'string', desc: 'Always "charge"', io: 'output' },
  { name: 'livemode', type: 'boolean', desc: 'Whether live mode', io: 'output' },
  { name: 'location', type: 'string', desc: 'API path to this charge', io: 'output' },
  { name: 'amount', type: 'integer', desc: 'Charge amount in smallest currency unit', io: 'input' },
  { name: 'currency', type: 'string', desc: 'Three-letter ISO 4217 currency code', io: 'input' },
  { name: 'funding_amount', type: 'integer', desc: 'Amount in funding currency', io: 'output' },
  { name: 'funding_currency', type: 'string', desc: 'Funding currency code', io: 'output' },
  { name: 'fee', type: 'integer', desc: 'Omise processing fee (Deimos only)', io: 'output' },
  { name: 'fee_vat', type: 'integer', desc: 'VAT on fee (Deimos only)', io: 'output' },
  { name: 'interest', type: 'integer', desc: 'Interest amount (Deimos only)', io: 'output' },
  { name: 'interest_vat', type: 'integer', desc: 'VAT on interest (Deimos only)', io: 'output' },
  { name: 'net', type: 'integer', desc: 'Net amount after fees (Deimos only)', io: 'output' },
  { name: 'status', type: 'string', desc: 'pending, successful, failed, expired, reversed', io: 'output' },
  { name: 'authorized', type: 'boolean', desc: 'Whether authorized', io: 'output' },
  { name: 'authorized_amount', type: 'integer', desc: 'Amount authorized', io: 'output' },
  { name: 'authorized_at', type: 'datetime', desc: 'Authorization timestamp (Deimos only)', io: 'output' },
  { name: 'authorization_type', type: 'string', desc: 'pre_auth or final_auth', io: 'input' },
  { name: 'capture', type: 'boolean', desc: 'Whether to auto-capture', io: 'input' },
  { name: 'capturable', type: 'boolean', desc: 'Whether can be captured', io: 'output' },
  { name: 'captured_amount', type: 'integer', desc: 'Amount captured', io: 'output' },
  { name: 'multi_capture', type: 'boolean', desc: 'Multi-capture enabled (Deimos only)', io: 'output' },
  { name: 'reversed', type: 'boolean', desc: 'Whether reversed', io: 'output' },
  { name: 'reversed_at', type: 'datetime', desc: 'Reversal timestamp', io: 'output' },
  { name: 'reversible', type: 'boolean', desc: 'Whether can be reversed', io: 'output' },
  { name: 'refundable', type: 'boolean', desc: 'Whether can be refunded', io: 'output' },
  { name: 'refunded_amount', type: 'integer', desc: 'Amount refunded (Deimos: refunded_amount, older: refunded)', io: 'output' },
  { name: 'refunds', type: 'object', desc: 'List of refunds', io: 'output' },
  { name: 'partially_refundable', type: 'boolean', desc: 'Whether partial refund allowed', io: 'output' },
  { name: 'paid', type: 'boolean', desc: 'Whether paid', io: 'output' },
  { name: 'paid_at', type: 'datetime', desc: 'Payment timestamp', io: 'output' },
  { name: 'expired', type: 'boolean', desc: 'Whether expired', io: 'output' },
  { name: 'expired_at', type: 'datetime', desc: 'Expiration timestamp', io: 'output' },
  { name: 'expires_at', type: 'datetime', desc: 'Expected expiration time', io: 'input' },
  { name: 'voided', type: 'boolean', desc: 'Whether voided', io: 'output' },
  { name: 'can_perform_void', type: 'boolean', desc: 'Whether void is possible', io: 'output' },
  { name: 'disputable', type: 'boolean', desc: 'Whether disputable', io: 'output' },
  { name: 'dispute', type: 'object', desc: 'Dispute object if disputed', io: 'output' },
  { name: 'card', type: 'object', desc: 'Card object (if card payment)', io: 'output' },
  { name: 'source', type: 'object', desc: 'Source object (Cordelia+, replaces offsite)', io: 'output' },
  { name: 'customer', type: 'string', desc: 'Customer ID', io: 'input' },
  { name: 'description', type: 'string', desc: 'Charge description', io: 'input' },
  { name: 'metadata', type: 'object', desc: 'Custom key-value pairs', io: 'input' },
  { name: 'ip', type: 'string', desc: 'Customer IP address', io: 'input' },
  { name: 'return_uri', type: 'string', desc: 'Redirect URI after authorization', io: 'input' },
  { name: 'authorize_uri', type: 'string', desc: 'URI for payment authorization', io: 'output' },
  { name: 'failure_code', type: 'string', desc: 'Error code if failed', io: 'output' },
  { name: 'failure_message', type: 'string', desc: 'Error message if failed', io: 'output' },
  { name: 'merchant_advice', type: 'string', desc: 'Merchant advice code (Deimos only)', io: 'output' },
  { name: 'approval_code', type: 'string', desc: 'Authorization approval code', io: 'output' },
  { name: 'acquirer_reference_number', type: 'string', desc: 'ARN from acquirer', io: 'output' },
  { name: 'transaction', type: 'string', desc: 'Transaction ID', io: 'output' },
  { name: 'transaction_fees', type: 'object', desc: 'Fee breakdown', io: 'output' },
  { name: 'platform_fee', type: 'object', desc: 'Platform fee config (Cordelia+)', io: 'input' },
  { name: 'zero_interest_installments', type: 'boolean', desc: 'Merchant absorbs interest (Cordelia+)', io: 'input' },
  { name: 'linked_account', type: 'string', desc: 'Linked account ID', io: 'output' },
  { name: 'link', type: 'string', desc: 'Payment link ID', io: 'output' },
  { name: 'schedule', type: 'string', desc: 'Schedule ID if scheduled', io: 'output' },
  { name: 'branch', type: 'string', desc: 'Branch identifier', io: 'output' },
  { name: 'terminal', type: 'string', desc: 'Terminal identifier', io: 'output' },
  { name: 'device', type: 'string', desc: 'Device identifier', io: 'output' },
  { name: 'created_at', type: 'datetime', desc: 'Creation timestamp (Deimos: created_at, older: created)', io: 'output' },
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

        {/* Version Note */}
        <div style={{ background: '#eff6ff', border: '1px solid #3b82f6', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#1e40af', lineHeight: 1.6 }}>
            <strong>Note:</strong> This shows all 62 fields from Deimos (2019-05-29). Older versions have fewer fields.
          </div>
        </div>

        {/* The Charge Object */}
        <h2>The Charge Object</h2>
        <div className="attributes-section">
          {chargeAttributes.map(attr => (
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
