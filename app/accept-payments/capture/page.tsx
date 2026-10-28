'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import MermaidDiagram from '../../components/MermaidDiagram';

const captureTypes = [
  {
    type: 'Automatic Capture',
    authType: '—',
    useCase: 'Default; full amount captured immediately or after delay',
    availability: 'All merchants',
  },
  {
    type: 'Full Manual Capture',
    authType: 'final_auth (default)',
    useCase: 'Manual trigger for single full-amount capture',
    availability: 'All merchants',
  },
  {
    type: 'Single Partial Capture',
    authType: 'pre_auth',
    useCase: 'Capture less than authorized amount',
    availability: 'Omise Thailand merchants only',
  },
  {
    type: 'Multiple Partial Capture',
    authType: '—',
    useCase: 'Capture same charge multiple times',
    availability: 'Not currently supported',
  },
];

const faqItems = [
  {
    question: 'Is Single Partial Capture enabled by default?',
    answer: 'No, Single Partial Capture is only available for Omise Thailand merchants and requires using authorization_type=pre_auth when creating the charge.',
  },
  {
    question: 'Can I perform multiple captures on a single charge?',
    answer: 'No, multiple partial captures are not currently supported. Each charge can only be captured once, whether fully or partially.',
  },
  {
    question: 'What happens to the uncaptured amount in partial capture?',
    answer: 'The uncaptured amount is automatically released back to the customer\'s available credit. This happens immediately after a partial capture.',
  },
  {
    question: 'How long is the authorization period?',
    answer: 'The authorization period is typically 7 days, but can be up to 29 days for Japan merchants. After this period, uncaptured charges automatically expire and funds are released.',
  },
  {
    question: 'What\'s the difference between final_auth and pre_auth?',
    answer: 'final_auth (default) indicates the authorized amount is final and must be captured in full. pre_auth indicates the amount is an estimate and allows partial capture of a lesser amount.',
  },
  {
    question: 'What happens if I send capture_amount=0?',
    answer: 'WARNING: Sending capture_amount=0 captures the full authorized amount instead of nothing. If you want to release funds without capturing, allow the charge to expire naturally.',
  },
];

// Reusable code block styling
const codeBlockStyle: React.CSSProperties = {
  background: '#1a2332',
  borderRadius: '8px',
  padding: '16px 20px',
  overflow: 'auto',
  fontFamily: "'SF Mono', Monaco, monospace",
  fontSize: '13px',
  lineHeight: 1.6,
  color: '#67e8f9',
};

export default function CapturePage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <SidebarNew />

      <main style={{ background: '#fff', padding: '48px 56px', maxWidth: '900px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
          <Link href="/accept-payments" style={{ color: '#697386', textDecoration: 'none' }}>Accept Payments</Link>
          <span style={{ color: '#697386' }}>/</span>
          <span style={{ color: '#1a1a1a', fontWeight: 500 }}>Capture</span>
        </div>

        {/* Hero */}
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 16px', color: '#1a1a1a' }}>
          Capture
        </h1>
        <p style={{ fontSize: '17px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px', maxWidth: '700px' }}>
          Learn how authorization and capture work together to give you control over when funds are transferred from your customers.
        </p>

        {/* Quick Reference */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
            Quick reference
          </h2>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase' }}>Capture Type</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase' }}>authorization_type</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase' }}>Use Case</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase' }}>Availability</th>
                </tr>
              </thead>
              <tbody>
                {captureTypes.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '14px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>{row.type}</td>
                    <td style={{ padding: '14px 16px', borderTop: '1px solid #e3e8ee' }}>
                      {row.authType === '—' ? (
                        <span style={{ color: '#697386' }}>—</span>
                      ) : (
                        <code style={{ fontSize: '12px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>{row.authType}</code>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>{row.useCase}</td>
                    <td style={{ padding: '14px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>{row.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Understanding Authorization and Capture */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Understanding authorization and capture
          </h2>
          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Payment processing consists of two distinct steps:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', borderLeft: '4px solid #1A1F71' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>1</span>
                Authorization
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
                Verifies that the customer has sufficient funds and the card is in good standing. Creates a temporary hold on the funds without transferring them.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>2</span>
                Capture
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
                Completes the transaction by withdrawing the authorized funds from the customer's account and transferring them to your account.
              </p>
            </div>
          </div>

          <div style={{ padding: '16px 20px', background: '#fef9c3', border: '1px solid #fde047', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <div>
                <div style={{ fontWeight: 600, color: '#854d0e', marginBottom: '4px', fontSize: '14px' }}>Authorization Period</div>
                <p style={{ fontSize: '13px', color: '#854d0e', margin: 0, lineHeight: 1.6 }}>
                  Authorizations have a limited validity period (typically 7 days, up to 29 days for Japan merchants). After this period, uncaptured charges automatically expire and the held funds are released back to the customer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Capture */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Types of capture
          </h2>

          {/* Automatic Capture */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              Automatic Capture
            </h3>
            <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              The default behavior. When you create a charge with <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>capture=true</code> (or omit the capture parameter), funds are captured immediately after authorization.
            </p>
            <pre style={codeBlockStyle}>
{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=10000" \\
  -d "currency=THB" \\
  -d "card=$TOKEN_ID" \\
  -d "capture=true"`}
            </pre>
          </div>

          {/* Full Manual Capture */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
              Full Manual Capture
            </h3>
            <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Create a charge with <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>capture=false</code> to authorize without capturing. You must then explicitly capture the full amount before the authorization expires.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>Authorize a Full Manual Capture charge</div>
              <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.7, marginBottom: '12px' }}>
                The following example authorizes a THB 70 charge using a card token. Since Full Manual Capture always captures the full amount, this example explicitly sets <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>authorization_type=final_auth</code> (the default):
              </p>
              <pre style={codeBlockStyle}>
{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=7000" \\
  -d "currency=THB" \\
  -d "capture=false" \\
  -d "card=$TOKEN_ID" \\
  -d "authorization_type=final_auth"`}
              </pre>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>Capture a Full Manual Capture charge</div>
              <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.7, marginBottom: '12px' }}>
                The following example demonstrates a full capture of THB 70.
              </p>
              <pre style={codeBlockStyle}>
{`curl https://api.omise.co/charges/$FULL_UNCAPTURED_CHARGE_ID/capture \\
  -u $OMISE_SECRET_KEY: \\
  -d "capture_amount=7000"`}
              </pre>
            </div>

            <MermaidDiagram
              title="Full Manual Capture Flow"
              chart={`graph TD
    A["Merchant initiates card authorization"] --> B{"Is authorization successful?"}
    B -->|"No"| D["Stop"]
    B -->|"Yes"| C["Deliver Goods"]
    C --> E["Capture complete authorized amount"]`}
            />
          </div>

          {/* Single Partial Capture */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Single Partial Capture
              <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: '#dbeafe', color: '#1e40af' }}>Thailand Only</span>
            </h3>
            <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Capture less than the authorized amount. Requires <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>authorization_type=pre_auth</code> when creating the charge. The uncaptured amount is automatically released.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>Authorize a Single Partial Capture charge</div>
              <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.7, marginBottom: '12px' }}>
                The following example authorizes a THB 70 charge using a card token. Because the merchant expects to capture only part of this amount, the example sets <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>authorization_type=pre_auth</code>:
              </p>
              <pre style={codeBlockStyle}>
{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=7000" \\
  -d "currency=THB" \\
  -d "capture=false" \\
  -d "card=$TOKEN_ID" \\
  -d "authorization_type=pre_auth"`}
              </pre>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>Capture a Single Partial Capture charge</div>
              <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.7, marginBottom: '12px' }}>
                The following example demonstrates a Single Partial Capture of THB 40.
              </p>
              <pre style={codeBlockStyle}>
{`curl https://api.omise.co/charges/$PARTIAL_UNCAPTURED_CHARGE_ID/capture \\
  -u $OMISE_SECRET_KEY: \\
  -d "capture_amount=4000"`}
              </pre>
            </div>

            <MermaidDiagram
              title="Single Partial Capture Flow"
              chart={`graph TD
    A["Merchant initiates card authorization"] --> B{"Is authorization successful?"}
    B -->|"No"| D["Stop"]
    B -->|"Yes"| C["Deliver some goods"]
    C --> E["Charge card partially"]
    E --> F["System releases remainder of authorized amount"]`}
            />
          </div>
        </section>

        {/* Authorization Type Parameters */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Authorization type parameters
          </h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '4px 8px', borderRadius: '4px' }}>authorization_type=final_auth</code>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: '#f0fdf4', color: '#166534' }}>DEFAULT</span>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
                The authorized amount is final. When capturing, you must capture the full amount. Use this when you know the exact amount to charge at checkout time.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '4px 8px', borderRadius: '4px', marginBottom: '8px', display: 'inline-block' }}>authorization_type=pre_auth</code>
              <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
                The authorized amount is an estimate. You can capture a lesser amount, and the remainder is automatically released. Use this for scenarios like hotel bookings where the final amount may change.
              </p>
            </div>
          </div>
        </section>

        {/* Warning Box */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ padding: '16px 20px', background: '#fff', border: '1px solid #e3e8ee', borderLeft: '4px solid #dc2626', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px', fontSize: '14px' }}>Warning: capture_amount=0 captures the full amount</div>
                <p style={{ fontSize: '13px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
                  Sending <code style={{ fontFamily: "'SF Mono', Monaco, monospace", background: '#f6f9fc', padding: '1px 4px', borderRadius: '3px' }}>capture_amount=0</code> captures the full authorized amount instead of nothing. If you want to release funds without capturing, allow the charge to expire naturally rather than attempting a zero-amount capture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqItems.map((item, i) => (
              <div key={i} style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontSize: '15px' }}>
                  {item.question}
                </div>
                <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.7 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Content */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Related content
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <Link
              href="/api-reference/charges/capture"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 6px',
                borderRadius: '3px',
                backgroundColor: '#dcfce7',
                color: '#166534',
              }}>
                POST
              </span>
              <div>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>Capture API Reference</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>POST /charges/:id/capture</div>
              </div>
            </Link>
            <Link
              href="/api-reference/charges/create"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 6px',
                borderRadius: '3px',
                backgroundColor: '#dcfce7',
                color: '#166534',
              }}>
                POST
              </span>
              <div>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>Create Charge API</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>POST /charges</div>
              </div>
            </Link>
            <Link
              href="/accept-payments/cards/credit-debit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#697386" strokeWidth="2">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
              <div>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>Credit & Debit Cards</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Accept card payments</div>
              </div>
            </Link>
            <Link
              href="/manage-money/refunds"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#697386" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              <div>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>Refunds</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Return funds to customers</div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
