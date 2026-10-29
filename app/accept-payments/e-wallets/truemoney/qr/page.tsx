'use client';

import Link from 'next/link';
import SidebarNew from '../../../../components/SidebarNew';
import Breadcrumb from '../../../../components/Breadcrumb';
import MermaidDiagram from '../../../../components/MermaidDiagram';

export default function TrueMoneyQRPage() {
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
            { label: { en: 'QR' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px', color: '#1a1a1a' }}>TrueMoney QR</h1>

        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.7 }}>
          Accept offline payments by generating a QR code for customers to scan with their TrueMoney app. Supports TrueMoney Wallet, Pay Next, and Pay Next Extra payment methods.
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
              { id: 'testing', label: 'Testing' },
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
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>Offline</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Source Type</div>
              <code style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', fontFamily: "'SF Mono', Monaco, monospace" }}>truemoney_qr</code>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Minimum API Version</div>
              <code style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', fontFamily: "'SF Mono', Monaco, monospace" }}>2017-11-02</code>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7 }}>
            Contact <a href="mailto:support@omise.co" style={{ color: '#1A1F71' }}>support@omise.co</a> to enable TrueMoney QR for your account.
          </p>
        </section>

        {/* ============================================ */}
        {/* PAYMENT FLOW */}
        {/* ============================================ */}
        <section id="flow" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Payment flow</h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
            TrueMoney QR is an offline payment method where you generate a QR code for customers to scan.
          </p>

          {/* Payment Flow Image */}
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <img
              src="https://cdn.omise.co/assets/screenshots/articles/2017-11-02/truemoney-qr/truemoney-qr.png"
              alt="TrueMoney QR payment flow"
              style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {[
              'Customer selects TrueMoney QR as payment method',
              'Your system creates a charge and receives a QR code',
              'Display the QR code to the customer',
              'Customer scans the QR code with their TrueMoney app',
              'Customer authorizes the payment in the app',
              'You receive a webhook notification when payment completes',
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

          {/* Sequence Diagram */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Complete payment flow</h3>

            <MermaidDiagram
              chart={`sequenceDiagram
    participant Customer
    participant Merchant
    participant api.omise.co
    participant TrueMoney

    Merchant->>api.omise.co: Create source (truemoney_qr)
    api.omise.co-->>Merchant: Return source

    Merchant->>api.omise.co: Create charge
    api.omise.co--)Merchant: Send charge.create webhook
    api.omise.co-->>Merchant: Return charge with QR code

    Merchant->>Customer: Display QR code
    Customer->>TrueMoney: Scan QR and authorize
    TrueMoney->>api.omise.co: Payment confirmed

    api.omise.co--)Merchant: Send charge.complete webhook
    Merchant->>Customer: Display result`}
            />

            <div style={{ marginTop: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Step-by-step explanation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Create source', desc: 'Create a source with type truemoney_qr. No phone number is required for QR payments.' },
                  { title: 'Create charge', desc: 'Create a charge using the source. The response includes a QR code image.' },
                  { title: 'Receive charge.create webhook', desc: 'You receive a webhook indicating the charge is pending.' },
                  { title: 'Present the QR code', desc: 'Display the QR code from the charge response to the customer.' },
                  { title: 'Customer scans and authorizes', desc: 'Customer scans the QR code with their TrueMoney app and authorizes payment.' },
                  { title: 'Receive charge.complete webhook', desc: 'You receive a webhook with the final charge status.' },
                  { title: 'Verify and display result', desc: 'Retrieve the charge to verify status and show the result to the customer.' },
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
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}><code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>truemoney_qr</code></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}><code style={{ fontSize: '13px' }}>amount</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Amount in satang</td>
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
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Request</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/sources \\
  -u $OMISE_PUBLIC_KEY: \\
  -d "amount=500000" \\
  -d "currency=THB" \\
  -d "type=truemoney_qr"`}</pre>
            </div>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1A2A3A' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Response</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`{
  "object": "source",
  "id": "src_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/sources/src_test_no1t4tnemucod0e51mo",
  "amount": 500000,
  "currency": "THB",
  "created_at": "2024-09-23T03:18:39Z",
  "flow": "offline",
  "type": "truemoney_qr",
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
  -d "source=src_test_..."`}</pre>
            </div>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1A2A3A' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Response</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "amount": 500000,
  "currency": "THB",
  "status": "pending",
  "created_at": "2024-09-23T03:18:40Z",
  "expires_at": "2024-09-24T03:18:40Z",
  "source": {
    "scannable_code": {
      "object": "barcode",
      "type": "qr",
      "image": {
        "object": "document",
        "id": "docu_test_616e6qjb5979wb1nopf",
        "download_uri": "https://api.omise.co/charges/chrg_test_.../documents/docu_test_.../downloads/...",
        "kind": "qr"
      }
    }
  }
}`}</pre>
            </div>

            <p style={{ fontSize: '14px', color: '#697386', marginTop: '12px' }}>
              The <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>source.scannable_code.image.download_uri</code> contains the QR code image URL to display to your customer.
            </p>
          </div>
        </section>

        {/* ============================================ */}
        {/* COMPLETING THE CHARGE */}
        {/* ============================================ */}
        <section id="completion" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>Completing the charge</h2>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Presenting the QR code</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              The charge response includes a <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>source.scannable_code.image.download_uri</code> field containing the QR code image URL. Display this QR code to your customer.
            </p>
            <div style={{ padding: '12px 16px', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                <strong>Note:</strong> The QR code is valid for 24 hours from charge creation. After this time, the charge status changes to <code style={{ background: '#fef9c3', padding: '2px 4px', borderRadius: '3px' }}>expired</code> and you must create a new charge.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Authorizing the charge</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7 }}>
              The customer scans the QR code using the TrueMoney app on their phone. This authorizes the charge with TrueMoney's offline provider.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Receiving the charge completion event</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7 }}>
              Set up a webhook endpoint to receive the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>charge.complete</code> event when the payment is finalized.
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
        {/* TESTING */}
        {/* ============================================ */}
        <section id="testing" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Testing</h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            To test TrueMoney QR payments in test mode, follow these steps:
          </p>

          <ol style={{ paddingLeft: '24px', marginBottom: '24px' }}>
            <li style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.8, marginBottom: '8px' }}>
              Create a source and charge using your test public and secret keys (prefixed with <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>pkey_test_</code> and <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>skey_test_</code>).
            </li>
            <li style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.8, marginBottom: '8px' }}>
              Open the Omise dashboard and navigate to the charge.
            </li>
            <li style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.8, marginBottom: '8px' }}>
              Click <strong>Actions</strong> and select <strong>Mark as Successful</strong> or <strong>Mark as Failed</strong> to simulate the customer scanning the QR code.
            </li>
            <li style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.8, marginBottom: '8px' }}>
              Verify that your webhook endpoint receives the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>charge.complete</code> event and your order status updates correctly.
            </li>
          </ol>

          <div style={{ padding: '16px', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
              <strong>Note:</strong> Test mode keys use the prefixes <code style={{ background: '#fef9c3', padding: '2px 4px', borderRadius: '3px' }}>pkey_test_</code> (public) and <code style={{ background: '#fef9c3', padding: '2px 4px', borderRadius: '3px' }}>skey_test_</code> (secret). Production keys use <code style={{ background: '#fef9c3', padding: '2px 4px', borderRadius: '3px' }}>pkey_</code> and <code style={{ background: '#fef9c3', padding: '2px 4px', borderRadius: '3px' }}>skey_</code>.
            </p>
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
              <div style={{ fontSize: '14px', color: '#3c4257' }}>Same day as authorization only</div>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Refunds</div>
              <div style={{ fontSize: '14px', color: '#3c4257' }}>Up to 30 days after charge creation</div>
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
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Bank Account</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Credit/Debit Card</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Pay Next</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Pay Next Extra</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#0D7A5F' }}>✓</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#dc2626' }}>✗</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '14px', color: '#697386', marginTop: '16px' }}>
            <strong>Note:</strong> No payment method supports partial voids. Partial refunds are only available for TrueMoney Wallet and Bank Account.
          </p>
        </section>

        {/* ============================================ */}
        {/* LIMITS */}
        {/* ============================================ */}
        <section id="limits" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Limits</h2>

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>TrueMoney Wallet</h3>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a', width: '120px' }}>Minimum</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿20.00 (2,000 satang)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Maximum</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿50,000.00 (5,000,000 satang)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Pay Next</h3>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a', width: '120px' }}>Minimum</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿300.00 (30,000 satang)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Maximum</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Depends on business agreement</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Pay Next Extra</h3>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a', width: '120px' }}>Minimum</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿1,000.00 (100,000 satang)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Maximum</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Depends on business agreement</td>
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
              { q: 'What happens if the customer does not scan the QR code in time?', a: 'The charge expires after 24 hours, as shown in the expires_at field of the charge object. When this happens, the charge status changes to expired. You must create a new charge to accept payment again.' },
              { q: 'Can I create a new charge if the previous one expired?', a: 'Yes. You can create a fresh source and charge using the identical process. The expired charge won\'t affect the new transaction.' },
              { q: 'Can I partially void a TrueMoney charge?', a: 'No. Voids on TrueMoney charges are full only. Partial cancellations are not supported within the same day.' },
              { q: 'Which payment methods support partial refunds?', a: 'Only TrueMoney Wallet and Bank Account support partial refunds. Credit/Debit Card, Pay Next, and Pay Next Extra support full refunds only.' },
              { q: 'What should I do if I receive a failed_processing failure code?', a: 'This indicates a general processing failure on TrueMoney\'s side. Ask the customer to retry the payment or select an alternative payment method. Contact support@omise.co if failures continue in live mode.' },
              { q: 'How do I know whether to void or refund a charge?', a: 'Use a void for same-day cancellations. For subsequent days (up to 30 days after creation), use a refund.' },
              { q: 'Is TrueMoney QR available outside Thailand?', a: 'No. TrueMoney QR is currently supported in Thailand only and processes payments in THB.' },
              { q: 'What are the minimum and maximum payment amounts?', a: 'Amounts depend on the payment method. TrueMoney Wallet: ฿20–฿50,000. Pay Next: ฿300 minimum. Pay Next Extra: ฿1,000 minimum.' },
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
              { href: '/api-reference/refunds', title: 'Refunds API', desc: 'Process refunds for charges' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', padding: '16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>{link.title}</div>
                <div style={{ fontSize: '14px', color: '#697386' }}>{link.desc}</div>
              </Link>
            ))}
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related payment methods</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { href: '/accept-payments/e-wallets/truemoney/jumpapp', title: 'TrueMoney App Redirection', desc: 'Redirect customers to the TrueMoney app' },
              { href: '/accept-payments/bank-transfers/promptpay', title: 'PromptPay', desc: 'Another QR-based payment method' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', padding: '16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>{link.title}</div>
                <div style={{ fontSize: '14px', color: '#697386' }}>{link.desc}</div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
