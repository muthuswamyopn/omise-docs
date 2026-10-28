'use client';

import Link from 'next/link';
import SidebarNew from '../../../../components/SidebarNew';
import Breadcrumb from '../../../../components/Breadcrumb';
import MermaidDiagram from '../../../../components/MermaidDiagram';

export default function TrueMoneyJumpAppPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />
      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation' }, href: '/' },
            { label: { en: 'Accept Payments' }, href: '/accept-payments' },
            { label: { en: 'E-Wallets' }, href: '/accept-payments/e-wallets' },
            { label: { en: 'TrueMoney' }, href: '/accept-payments/e-wallets/truemoney' },
            { label: { en: 'App Redirection' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px', color: '#1a1a1a' }}>TrueMoney App Redirection</h1>

        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.7 }}>
          Accept payments by redirecting customers to the TrueMoney app. On mobile devices, customers are redirected directly to the app. On desktop, customers scan a QR code with their TrueMoney app.
        </p>

        {/* Table of Contents */}
        <nav style={{ marginBottom: '40px', padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase', marginBottom: '12px' }}>On this page</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'enable', label: 'How to enable' },
              { id: 'flow', label: 'Payment flow' },
              { id: 'implementation', label: 'Implementation' },
              { id: 'completion', label: 'Completing the charge' },
              { id: 'voids-refunds', label: 'Voids and refunds' },
              { id: 'limits', label: 'Limits' },
              { id: 'faq', label: 'FAQ' },
              { id: 'related', label: 'Related content' },
            ].map(item => (
              <li key={item.id}>
                <a href={`#${item.id}`} style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ============================================ */}
        {/* HOW TO ENABLE */}
        {/* ============================================ */}
        <section id="enable" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>How to enable</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Supported Country</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>🇹🇭 Thailand</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Currency</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>THB</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Flow Type</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>App Redirect</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Source Type</div>
              <code style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', fontFamily: "'SF Mono', Monaco, monospace" }}>truemoney_jumpapp</code>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Minimum API Version</div>
              <code style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', fontFamily: "'SF Mono', Monaco, monospace" }}>2017-11-02</code>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Contact <a href="mailto:support@omise.co" style={{ color: '#1A1F71' }}>support@omise.co</a> to enable TrueMoney App Redirection for your account.
          </p>
        </section>

        {/* ============================================ */}
        {/* PAYMENT FLOW */}
        {/* ============================================ */}
        <section id="flow" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Payment flow</h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
            TrueMoney App Redirection supports two flows depending on the customer's device:
          </p>

          {/* Mobile Flow */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Using a mobile</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              On mobile devices, customers are redirected directly to the TrueMoney app to authorize the payment.
            </p>

            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
              <img
                src="https://cdn.omise.co/assets/screenshots/articles/2017-11-02/truemoney-jumpapp/truemoney-jumpapp-mobile.png"
                alt="TrueMoney App Redirection mobile payment flow"
                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Customer selects TrueMoney as payment method',
                'Customer is redirected to the TrueMoney app',
                'Customer authorizes the payment in the app',
                'Customer is redirected back to your site',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#1A1F71',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Flow */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Using a desktop browser</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              On desktop, customers scan a QR code with their TrueMoney app to authorize the payment.
            </p>

            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
              <img
                src="https://cdn.omise.co/assets/screenshots/articles/2017-11-02/truemoney-jumpapp/truemoney-jumpapp-desktop.png"
                alt="TrueMoney App Redirection desktop QR code flow"
                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Customer selects TrueMoney as payment method',
                'QR code is displayed on the desktop screen',
                'Customer scans the QR code with their TrueMoney app',
                'Customer authorizes the payment in the app',
                'Desktop page updates to show payment complete',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#1A1F71',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Payment Flow Sequence Diagram */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Complete payment flow</h3>

            <MermaidDiagram
              chart={`sequenceDiagram
    participant Customer
    participant omise.js
    participant Merchant
    participant api.omise.co

    Customer->>omise.js: Select TrueMoney
    omise.js->>api.omise.co: Request source
    api.omise.co-->>omise.js: Return source
    omise.js-->>Merchant: Return source

    Merchant->>api.omise.co: Request charge using source
    api.omise.co--)Merchant: Send charge.create webhook
    api.omise.co-->>Merchant: Return charge with authorize_uri

    Merchant->>Customer: Redirect to authorize_uri
    Customer->>api.omise.co: Authorize in TrueMoney app
    api.omise.co->>Customer: Redirect to return_uri

    api.omise.co--)Merchant: Send charge.complete webhook
    Merchant->>Customer: Display result`}
            />

            {/* Step-by-step explanation */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Step-by-step explanation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Customer selects TrueMoney', desc: 'Customer chooses TrueMoney App Redirection as their payment method.' },
                  { title: 'Create source', desc: 'Create a source with type truemoney_jumpapp using your public key.' },
                  { title: 'Create charge', desc: 'Your server creates a charge with the source ID and return_uri using your secret key.' },
                  { title: 'Receive charge.create webhook', desc: 'Omise sends a webhook indicating the charge is awaiting authorization.' },
                  { title: 'Redirect to authorize_uri', desc: 'Redirect the customer to authorize_uri. On mobile, this opens the TrueMoney app. On desktop, a QR code is shown.' },
                  { title: 'Customer authorizes', desc: 'Customer authorizes the payment in their TrueMoney app.' },
                  { title: 'Redirect to return_uri', desc: 'Customer is redirected back to your return_uri.' },
                  { title: 'Receive charge.complete webhook', desc: 'Omise sends the final charge status via webhook.' },
                  { title: 'Display result', desc: 'Show the payment result to the customer.' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#1A1F71',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: 600,
                      flexShrink: 0
                    }}>
                      {i + 1}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px', fontSize: '15px' }}>{step.title}</div>
                      <div style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.6 }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* IMPLEMENTATION */}
        {/* ============================================ */}
        <section id="implementation" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>Implementation</h2>

          {/* Creating a source */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Creating a source</h3>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>REQUIRED PARAMETERS</div>
              <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a', width: '120px' }}><code style={{ fontSize: '13px' }}>type</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}><code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>truemoney_jumpapp</code></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}><code style={{ fontSize: '13px' }}>amount</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Amount in satang (smallest currency unit)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}><code style={{ fontSize: '13px' }}>currency</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}><code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>THB</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1A2A3A' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>JavaScript</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`Omise.setPublicKey("pkey_test_...");

Omise.createSource('truemoney_jumpapp', {
  amount: 500000,
  currency: 'THB'
}, function(statusCode, response) {
  console.log(response.id); // src_test_...
});`}</pre>
            </div>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1A2A3A' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Response</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`{
  "object": "source",
  "id": "src_test_5ywrhgr7pplufw6apja",
  "livemode": false,
  "location": "/sources/src_test_5ywrhgr7pplufw6apja",
  "amount": 500000,
  "currency": "THB",
  "created_at": "2024-02-27T10:25:45Z",
  "flow": "app_redirect",
  "type": "truemoney_jumpapp",
  "charge_status": "unknown"
}`}</pre>
            </div>
          </div>

          {/* Creating a charge */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Creating a charge</h3>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1A2A3A' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Request</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=500000" \\
  -d "currency=THB" \\
  -d "source=src_test_..." \\
  -d "return_uri=https://example.com/complete"`}</pre>
            </div>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1A2A3A' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Response</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`{
  "object": "charge",
  "id": "chrg_test_5ywrhgu0ourwvoe4m5b",
  "location": "/charges/chrg_test_5ywrhgu0ourwvoe4m5b",
  "amount": 500000,
  "currency": "THB",
  "status": "pending",
  "authorize_uri": "https://pay.omise.co/payments/pay2_test_.../authorize",
  "return_uri": "https://example.com/complete",
  "created_at": "2024-02-27T10:25:45Z",
  "expires_at": "2024-03-05T10:25:45Z",
  "paid": false,
  "source": {
    "object": "source",
    "id": "src_test_5ywrhghsjgs1xx3fihf",
    "type": "truemoney_jumpapp"
  }
}`}</pre>
            </div>

            <p style={{ fontSize: '14px', color: '#697386', marginTop: '12px' }}>
              Use the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>authorize_uri</code> to redirect the customer to authorize the payment.
            </p>
          </div>

          {/* Combined */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Creating a source and charge</h3>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1A2A3A' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Bash</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=500000" \\
  -d "currency=THB" \\
  -d "return_uri=https://example.com/complete" \\
  -d "source[type]=truemoney_jumpapp"`}</pre>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* COMPLETING THE CHARGE */}
        {/* ============================================ */}
        <section id="completion" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>Completing the charge</h2>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Authorizing the charge</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Redirect the customer to the location specified in <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>authorize_uri</code> so they can authorize the charge.
            </p>
            <div style={{ padding: '12px 16px', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', marginBottom: '16px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                <strong>Note:</strong> The payment will expire if the customer does not proceed to the TrueMoney application within 3 minutes.
              </p>
            </div>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7 }}>
              You can simulate this authorization phase in test mode by visiting the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>authorize_uri</code> and manually marking the charge as <em>Successful</em> or <em>Failed</em>. After the customer has completed the authorization phase, they will be redirected to the location you specified in <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>return_uri</code>.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Receiving the charge completion event</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Set up a webhook endpoint to receive the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>charge.complete</code> event.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Checking the charge status</h3>
            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1A2A3A' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Bash</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/charges/chrg_test_... \\
  -u $OMISE_SECRET_KEY:`}</pre>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* VOIDS AND REFUNDS */}
        {/* ============================================ */}
        <section id="voids-refunds" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Voids and refunds</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Voids</div>
              <div style={{ fontSize: '14px', color: '#3c4257' }}>Same day as transaction authorization</div>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Refunds</div>
              <div style={{ fontSize: '14px', color: '#3c4257' }}>Within 30 days after charge creation</div>
            </div>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Support by payment method</h3>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Payment Method</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#697386' }} colSpan={2}>Same-Day Void</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#697386' }} colSpan={2}>Refund (30 days)</th>
                </tr>
                <tr style={{ background: '#f6f9fc', borderTop: '1px solid #e3e8ee' }}>
                  <th style={{ padding: '8px 16px' }}></th>
                  <th style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#697386' }}>Full</th>
                  <th style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#697386' }}>Partial</th>
                  <th style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#697386' }}>Full</th>
                  <th style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#697386' }}>Partial</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>TrueMoney Wallet</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Bank Account</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Credit/Debit Card</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Pay Next</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Pay Next Extra</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '14px', color: '#697386', marginTop: '16px' }}>
            <strong>Note:</strong> All payment methods support both full and partial voids on the same day. Refunds are limited to full amounts only (no partial refunds).
          </p>
        </section>

        {/* ============================================ */}
        {/* LIMITS */}
        {/* ============================================ */}
        <section id="limits" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Limits</h2>

          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Limit</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Amount</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>API Value (satang)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Minimum</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿20.00</td>
                  <td style={{ padding: '12px 16px' }}><code style={{ fontSize: '13px' }}>2000</code></td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Maximum</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿50,000.00</td>
                  <td style={{ padding: '12px 16px' }}><code style={{ fontSize: '13px' }}>5000000</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================ */}
        {/* FAQ */}
        {/* ============================================ */}
        <section id="faq" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>FAQ</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'What API version do I need?', a: 'The minimum required API version is 2017-11-02.' },
              { q: 'How long does a payment authorization last?', a: 'The payment will expire if a customer does not proceed to the application within 3 minutes.' },
              { q: 'What payment methods can customers use?', a: 'Users can pay via TrueMoney Wallet, Bank Account, Credit/Debit Card, Pay Next, or Pay Next Extra.' },
              { q: 'What are the transaction limits?', a: 'Minimum is ฿20.00 and maximum is ฿50,000.00.' },
              { q: 'Can I refund TrueMoney payments?', a: 'Yes, but refunds can only be made within 30 days after the charge is created. Voids are limited to same-day transactions.' },
              { q: 'Do I need to create a source before charging?', a: 'You can either create a source first then charge it, or create both in a single API request using your secret key server-side.' },
              { q: 'How do I know when payment completes?', a: 'Use webhook events (charge.complete) for notifications, then retrieve the charge to verify its status.' },
              { q: 'What happens on desktop vs mobile?', a: 'On mobile, the customer is redirected to the TrueMoney app. On desktop, a QR code is displayed for the customer to scan with their TrueMoney app.' },
            ].map((faq, i) => (
              <details key={i} style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                <summary style={{ padding: '16px', cursor: 'pointer', fontWeight: 600, color: '#1a1a1a', fontSize: '15px' }}>{faq.q}</summary>
                <div style={{ padding: '0 16px 16px', color: '#3c4257', fontSize: '14px', lineHeight: 1.7 }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* RELATED CONTENT */}
        {/* ============================================ */}
        <section id="related" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Related content</h2>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related API documentation</h3>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
            {[
              { href: '/api-reference/charges', title: 'Charges API', desc: 'Full reference for the Charges API' },
              { href: '/api-reference/sources', title: 'Sources API', desc: 'Learn about source creation' },
              { href: '/integrations/advanced/webhooks', title: 'Webhooks', desc: 'Set up webhook notifications' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', padding: '16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>{link.title}</div>
                <div style={{ fontSize: '14px', color: '#697386' }}>{link.desc}</div>
              </Link>
            ))}
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related payment methods</h3>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
            {[
              { href: '/accept-payments/e-wallets/truemoney/qr', title: 'TrueMoney QR', desc: 'Offline QR code payment with Pay Next support' },
              { href: '/accept-payments/e-wallets/rabbit-linepay', title: 'Rabbit LINE Pay', desc: 'Another popular Thai e-wallet' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', padding: '16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>{link.title}</div>
                <div style={{ fontSize: '14px', color: '#697386' }}>{link.desc}</div>
              </Link>
            ))}
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>How to check the public key and secret key</h3>
          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7 }}>
            To access your API keys, refer to the <a href="https://www.omise.co/how-to-access-omise-api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71' }}>Omise API keys documentation</a>.
          </p>
        </section>

      </main>
    </div>
  );
}
