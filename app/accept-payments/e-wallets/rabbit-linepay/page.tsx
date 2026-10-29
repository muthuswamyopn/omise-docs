'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Breadcrumb from '../../../components/Breadcrumb';
import MermaidDiagram from '../../../components/MermaidDiagram';

export default function RabbitLINEPayPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />
      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation' }, href: '/' },
            { label: { en: 'Accept Payments' }, href: '/accept-payments' },
            { label: { en: 'E-Wallets' }, href: '/accept-payments/e-wallets' },
            { label: { en: 'Rabbit LINE Pay' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px', color: '#1a1a1a' }}>Rabbit LINE Pay</h1>

        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.7 }}>
          Accept online payments from Rabbit LINE Pay users in Thailand. Rabbit LINE Pay combines the popular LINE messaging app with Rabbit card functionality for seamless mobile payments.
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Supported Country</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>🇹🇭 Thailand</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Minimum API Version</div>
              <code style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', fontFamily: "'SF Mono', Monaco, monospace" }}>2017-11-02</code>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            To enable Rabbit LINE Pay for your Omise account:
          </p>
          <ol style={{ margin: 0, paddingLeft: '20px', color: '#3c4257', lineHeight: 2, fontSize: '15px' }}>
            <li>Contact <a href="mailto:support@omise.co" style={{ color: '#1A1F71', fontWeight: 500 }}>support@omise.co</a> requesting activation of this feature</li>
            <li>Review and accept the additional terms and conditions</li>
            <li>Receive confirmation that Rabbit LINE Pay is enabled for your account</li>
          </ol>
        </section>

        {/* ============================================ */}
        {/* PAYMENT FLOW */}
        {/* ============================================ */}
        <section id="flow" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Payment flow</h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
            Rabbit LINE Pay supports two authorization flows depending on how the customer accesses your checkout:
          </p>

          {/* Flow 1: QR Code Scanning */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>QR code scanning</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              When your customer is checking out on a desktop browser or on a device without the LINE app installed, the customer will be shown a QR code to scan.
            </p>

            {/* QR Scanning Flow Image */}
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '24px', marginBottom: '16px', overflowX: 'auto' }}>
              <img
                src="https://cdn.omise.co/assets/rabbit-linepay/payment_flow_qr_scan.png"
                alt="QR code scanning payment flow showing: 1) Customer opens LINE app, 2) Scans QR code, 3) Selects payment method, 4) Reviews purchase details, 5) Completes payment"
                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Customer opens LINE app on their mobile phone',
                'Customer scans the QR code displayed on the merchant website',
                'Customer selects their preferred payment method',
                'Customer reviews the purchase details',
                'Customer completes payment and is redirected back to the merchant site',
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

          {/* Flow 2: Account Login */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>LINE account login</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              When your customer is checking out on a mobile device with the LINE app installed, or prefers to log in directly, they will be redirected to the LINE login page.
            </p>

            {/* Login Flow Images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '16px' }}>
              <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '24px' }}>
                <img
                  src="https://cdn.omise.co/assets/rabbit-linepay/payment_flow_login1.jpg"
                  alt="LINE account login flow part 1: Customer logs into LINE account and lands on payment page"
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
                />
              </div>
              <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '24px' }}>
                <img
                  src="https://cdn.omise.co/assets/rabbit-linepay/payment_flow_login2.jpg"
                  alt="LINE account login flow part 2: Customer enters passcode and confirms payment"
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Customer logs into their LINE account and lands on the payment page',
                'Customer opens the LINE app to complete payment (must complete within 20 minutes)',
                'Customer enters their passcode to review purchase details',
                'Customer confirms payment by pressing the Pay button',
                'Customer is redirected back to the merchant website',
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

          {/* Complete Payment Flow Sequence Diagram - Mermaid */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Complete payment flow</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              The following diagram shows the complete payment flow from source creation to charge completion:
            </p>

            <MermaidDiagram
              chart={`sequenceDiagram
    participant Customer
    participant omise.js
    participant Merchant
    participant api.omise.co

    Customer->>omise.js: Send payment details
    omise.js->>api.omise.co: Request source
    api.omise.co-->>omise.js: Return source
    omise.js-->>Merchant: Return source

    Merchant->>api.omise.co: Request charge using source
    api.omise.co--)Merchant: Send charge.create webhook
    api.omise.co-->>Merchant: Return charge

    Merchant->>Customer: Redirect to authorize_uri
    Customer->>api.omise.co: Provide authorization
    api.omise.co->>Customer: Redirect to return_uri

    api.omise.co--)Merchant: Send charge.complete webhook
    Merchant->>Customer: Send charge result`}
            />

            {/* Step-by-step explanation */}
            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Step-by-step explanation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  {
                    title: 'Customer initiates payment',
                    desc: 'The customer selects Rabbit LINE Pay as their payment method and submits the payment form. The payment details are sent to omise.js on the client side.'
                  },
                  {
                    title: 'Create source',
                    desc: 'omise.js sends a request to api.omise.co to create a source using your public key. The API returns a source object containing a unique source ID.'
                  },
                  {
                    title: 'Send source to merchant',
                    desc: 'omise.js returns the source to your frontend, which then sends the source ID to your merchant server for charge creation.'
                  },
                  {
                    title: 'Create charge',
                    desc: 'Your merchant server creates a charge by sending a request to api.omise.co with the source ID, amount, currency, and return_uri using your secret key.'
                  },
                  {
                    title: 'Receive charge.create webhook',
                    desc: 'Omise sends a charge.create webhook to your server indicating the charge has been created and is awaiting customer authorization.'
                  },
                  {
                    title: 'Redirect to authorize_uri',
                    desc: 'Your server redirects the customer to the authorize_uri returned in the charge response. This takes them to the Rabbit LINE Pay authorization page.'
                  },
                  {
                    title: 'Customer authorizes payment',
                    desc: 'The customer logs into LINE Pay, reviews the payment details, and confirms the transaction using their LINE Pay passcode.'
                  },
                  {
                    title: 'Redirect to return_uri',
                    desc: 'After authorization, the customer is automatically redirected back to your return_uri that you specified when creating the charge.'
                  },
                  {
                    title: 'Receive charge.complete webhook',
                    desc: 'Omise sends a charge.complete webhook to your server with the final charge status (successful or failed).'
                  },
                  {
                    title: 'Display result to customer',
                    desc: 'Your server verifies the charge status and displays the appropriate confirmation or error message to the customer.'
                  },
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

            {/* Legend */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '2px', background: '#1A1F71' }}></div>
                <span style={{ fontSize: '12px', color: '#697386' }}>Request</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '2px', background: '#1A1F71', backgroundImage: 'repeating-linear-gradient(90deg, #1A1F71 0, #1A1F71 4px, transparent 4px, transparent 7px)' }}></div>
                <span style={{ fontSize: '12px', color: '#697386' }}>Response</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '2px', background: '#1A1F71', backgroundImage: 'repeating-linear-gradient(90deg, #1A1F71 0, #1A1F71 2px, transparent 2px, transparent 5px)' }}></div>
                <span style={{ fontSize: '12px', color: '#697386' }}>Async (Webhook)</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
              <strong>Important:</strong> Customers must complete authorization within <strong>20 minutes</strong>. After this window, the charge will expire.
            </p>
          </div>
        </section>

        {/* ============================================ */}
        {/* IMPLEMENTATION */}
        {/* ============================================ */}
        <section id="implementation" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>Implementation</h2>

          {/* Step 1: Create Source */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700 }}>1</span>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Create a source</h3>
            </div>

            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Create a source using your <strong>public key</strong>. You can use <Link href="/integrations/omise-js" style={{ color: '#1A1F71' }}>Omise.js</Link> on the client side, or our mobile SDKs for <Link href="https://github.com/omise/omise-ios" style={{ color: '#1A1F71' }}>iOS</Link> and <Link href="https://github.com/omise/omise-android" style={{ color: '#1A1F71' }}>Android</Link>.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>REQUIRED PARAMETERS</div>
              <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a', width: '120px' }}><code style={{ fontSize: '13px' }}>type</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}><code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>rabbit_linepay</code></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}><code style={{ fontSize: '13px' }}>amount</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Amount in smallest currency unit (satang for THB)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}><code style={{ fontSize: '13px' }}>currency</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}><code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>THB</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Omise.js Example */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#697386' }}>OMISE.JS</span>
                <span style={{ padding: '2px 6px', background: '#dcfce7', color: '#166534', fontSize: '10px', fontWeight: 600, borderRadius: '3px' }}>RECOMMENDED</span>
              </div>
              <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#8da4bf', fontSize: '12px' }}>JavaScript</span>
                </div>
                <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`Omise.setPublicKey("pkey_test_...");

Omise.createSource('rabbit_linepay', {
  "amount": 400000,
  "currency": "THB"
}, function(statusCode, response) {
  // Send response.id to your server to create a charge
  console.log(response);
});`}</pre>
              </div>
            </div>

            {/* cURL Example */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>CURL</div>
              <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c' }}>
                  <span style={{ color: '#8da4bf', fontSize: '12px' }}>Bash</span>
                </div>
                <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/sources \\
  -u $OMISE_PUBLIC_KEY: \\
  -d "amount=400000" \\
  -d "currency=THB" \\
  -d "type=rabbit_linepay"`}</pre>
              </div>
            </div>

            {/* Response */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>RESPONSE</div>
              <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c' }}>
                  <span style={{ color: '#8da4bf', fontSize: '12px' }}>JSON</span>
                </div>
                <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`{
  "object": "source",
  "id": "src_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/sources/src_test_no1t4tnemucod0e51mo",
  "amount": 400000,
  "currency": "THB",
  "type": "rabbit_linepay",
  "flow": "redirect",
  "charge_status": "unknown",
  "created_at": "2024-01-15T10:30:00Z"
}`}</pre>
              </div>
            </div>
          </div>

          {/* Step 2: Create Charge */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700 }}>2</span>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Create a charge</h3>
            </div>

            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Using the source <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>id</code> from the previous step, create a charge on your server using your <strong>secret key</strong>.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>REQUIRED PARAMETERS</div>
              <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a', width: '120px' }}><code style={{ fontSize: '13px' }}>amount</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Must match the source amount</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}><code style={{ fontSize: '13px' }}>currency</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}><code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>THB</code></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}><code style={{ fontSize: '13px' }}>source</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Source identifier from Step 1</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}><code style={{ fontSize: '13px' }}>return_uri</code></td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>URL to redirect customer after authorization</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* cURL Example */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>CURL</div>
              <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c' }}>
                  <span style={{ color: '#8da4bf', fontSize: '12px' }}>Bash</span>
                </div>
                <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=400000" \\
  -d "currency=THB" \\
  -d "return_uri=https://example.com/orders/345678/complete" \\
  -d "source=src_test_no1t4tnemucod0e51mo"`}</pre>
              </div>
            </div>

            {/* Response */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>RESPONSE</div>
              <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c' }}>
                  <span style={{ color: '#8da4bf', fontSize: '12px' }}>JSON</span>
                </div>
                <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "amount": 400000,
  "currency": "THB",
  "status": "pending",
  "capture": true,
  "authorize_uri": "https://pay.line.me/...",
  "return_uri": "https://example.com/orders/345678/complete",
  "expires_at": "2024-01-15T10:50:00Z",
  "source": {
    "object": "source",
    "id": "src_test_no1t4tnemucod0e51mo",
    "type": "rabbit_linepay",
    "flow": "redirect"
  },
  "created_at": "2024-01-15T10:30:05Z"
}`}</pre>
              </div>
            </div>
          </div>

          {/* Step 3: Alternative - Combined Request */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#697386', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>Alt</span>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Combined source and charge</h3>
            </div>

            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              For server-side only integrations, you can create both the source and charge in a single API request:
            </p>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Bash</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=400000" \\
  -d "currency=THB" \\
  -d "return_uri=https://example.com/orders/345678/complete" \\
  -d "source[type]=rabbit_linepay"`}</pre>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* COMPLETING THE CHARGE */}
        {/* ============================================ */}
        <section id="completion" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>Completing the charge</h2>

          {/* Authorizing the charge */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Authorizing the charge</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Redirect the customer to the location specified in <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>authorize_uri</code> so they can authorize the charge.
            </p>

            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              You can simulate this authorization phase in test mode by visiting the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>authorize_uri</code> to manually mark the charge as <em>Successful</em> or <em>Failed</em>. After the customer has completed the authorization phase, they will be redirected to the location you specified in <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>return_uri</code>.
            </p>
          </div>

          {/* Webhooks */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Webhook notification</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Set up a webhook endpoint on your <Link href="https://dashboard.omise.co" style={{ color: '#1A1F71' }}>Dashboard</Link> to receive POST requests when the charge is completed.
            </p>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Webhook Event</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`{
  "object": "event",
  "key": "charge.complete",
  "data": {
    "object": "charge",
    "id": "chrg_test_no1t4tnemucod0e51mo",
    "status": "successful",
    ...
  }
}`}</pre>
            </div>
          </div>

          {/* Status Verification */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Verify charge status</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Always verify the final charge status by retrieving the charge using its <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>id</code>:
            </p>

            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c' }}>
                <span style={{ color: '#8da4bf', fontSize: '12px' }}>Bash</span>
              </div>
              <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY:`}</pre>
            </div>
          </div>

          {/* Charge Statuses */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Possible charge statuses</h3>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f6f9fc' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                    <td style={{ padding: '12px 16px' }}><code style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>successful</code></td>
                    <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Payment completed successfully. Fulfill the order.</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                    <td style={{ padding: '12px 16px' }}><code style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>failed</code></td>
                    <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Payment failed. Check <code style={{ fontSize: '12px' }}>failure_code</code> and <code style={{ fontSize: '12px' }}>failure_message</code> for details.</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                    <td style={{ padding: '12px 16px' }}><code style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>pending</code></td>
                    <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Awaiting customer authorization.</td>
                  </tr>
                  <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                    <td style={{ padding: '12px 16px' }}><code style={{ background: '#f3f4f6', color: '#6b7280', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>expired</code></td>
                    <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Charge expired before customer completed authorization (20-minute window).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Failure Codes */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Failure codes</h3>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              When a charge fails, check the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>failure_code</code> to understand the reason:
            </p>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f6f9fc' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Code</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: 'failed_processing', desc: 'General payment processing failure' },
                    { code: 'insufficient_balance', desc: 'Insufficient funds or payment method limit reached' },
                    { code: 'payment_cancelled', desc: 'Customer cancelled the payment' },
                    { code: 'timeout', desc: 'Customer did not complete authorization before charge expiration' },
                  ].map((item, i) => (
                    <tr key={item.code} style={{ borderTop: '1px solid #e3e8ee' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <code style={{ fontSize: '13px', color: '#dc2626', fontFamily: "'SF Mono', Monaco, monospace" }}>{item.code}</code>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* VOIDS AND REFUNDS */}
        {/* ============================================ */}
        <section id="voids-refunds" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Voids and refunds</h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            Rabbit LINE Pay supports both full and partial refunds within a 60-day window from the original transaction date.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '20px', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Full Refunds</div>
              <div style={{ fontSize: '14px', color: '#15803d' }}>Supported within 60 days</div>
            </div>
            <div style={{ padding: '20px', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Partial Refunds</div>
              <div style={{ fontSize: '14px', color: '#15803d' }}>Supported within 60 days</div>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Create a refund using the <Link href="/api-reference/charges" style={{ color: '#1A1F71' }}>Refund API</Link> or directly from the charge page on your Dashboard:
          </p>

          <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #1a3a5c' }}>
              <span style={{ color: '#8da4bf', fontSize: '12px' }}>Bash</span>
            </div>
            <pre style={{ margin: 0, padding: '20px', color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", overflow: 'auto' }}>{`curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo/refunds \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=200000"`}</pre>
          </div>
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
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿150,000.00</td>
                  <td style={{ padding: '12px 16px' }}><code style={{ fontSize: '13px' }}>15000000</code></td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Authorization window</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }} colSpan={2}>20 minutes</td>
                </tr>
                <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Refund window</td>
                  <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }} colSpan={2}>60 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================ */}
        {/* RELATED CONTENT */}
        {/* ============================================ */}
        <section id="related" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Related content</h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { href: '/api-reference/charges', title: 'Charges API', desc: 'Full reference for the Charges API' },
              { href: '/api-reference/sources', title: 'Sources API', desc: 'Learn about source creation and management' },
              { href: '/integrations/webhooks', title: 'Webhooks', desc: 'Set up webhooks to receive charge notifications' },
              { href: '/integrations/omise-js', title: 'Omise.js', desc: 'Client-side integration for source creation' },
              { href: '/accept-payments/e-wallets/truemoney', title: 'TrueMoney Wallet', desc: 'Another popular Thai e-wallet' },
              { href: '/accept-payments/bank-transfers/promptpay', title: 'PromptPay', desc: 'Thailand\'s national QR payment system' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', padding: '16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', transition: 'border-color 0.15s' }}>
                <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>{link.title}</div>
                <div style={{ fontSize: '14px', color: '#697386' }}>{link.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* FAQ */}
        {/* ============================================ */}
        <section id="faq" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Frequently asked questions</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'How do I enable Rabbit LINE Pay for my account?', a: 'Contact support@omise.co requesting activation. You will need to review and accept additional terms and conditions before the feature is enabled.' },
              { q: 'What happens if the customer doesn\'t complete authorization within 20 minutes?', a: 'The charge will expire with status "expired". You will receive a webhook notification and should prompt the customer to try again.' },
              { q: 'Can I test Rabbit LINE Pay without going live?', a: 'Yes, use your test mode API keys. Visit the authorize_uri and manually mark the charge as Successful or Failed to simulate the customer flow.' },
              { q: 'Do customers need the LINE app installed?', a: 'Yes, customers need the LINE app with Rabbit LINE Pay activated and either sufficient wallet balance or a linked payment method.' },
              { q: 'How long do refunds take to process?', a: 'Refunds are typically processed within 5-14 business days and credited back to the customer\'s LINE Pay balance.' },
              { q: 'Is currency conversion supported?', a: 'No, Rabbit LINE Pay only supports THB (Thai Baht). All transactions must be in THB.' },
            ].map((faq, i) => (
              <details key={i} style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                <summary style={{ padding: '16px', cursor: 'pointer', fontWeight: 600, color: '#1a1a1a', fontSize: '15px' }}>{faq.q}</summary>
                <div style={{ padding: '0 16px 16px', color: '#3c4257', fontSize: '14px', lineHeight: 1.7 }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
