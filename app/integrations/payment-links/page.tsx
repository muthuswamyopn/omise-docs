'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import InfoCallout from '../../components/InfoCallout';

export default function PaymentLinksPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' }, href: '/integrations' },
            { label: { en: 'Payment Links', th: 'ลิงก์ชำระเงิน', ja: '決済リンク' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            Payment Links+
          </h1>
          <span style={{ padding: '4px 10px', background: '#dcfce7', color: '#166534', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }}>NO CODE REQUIRED</span>
        </div>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Create and share payment links without requiring website integration. Perfect for invoices,
          social selling, and collecting payments anywhere.
        </p>

        {/* Key Benefits */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px' }}>Instant Setup</div>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.5 }}>
                Create payment links in seconds from your dashboard.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px' }}>Share Anywhere</div>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.5 }}>
                Send via email, SMS, WhatsApp, LINE, or social media.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌍</div>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px' }}>Multi-Currency</div>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.5 }}>
                Accept THB, JPY, USD, EUR, GBP, SGD, and AUD.
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Getting Started
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            After logging in to the Merchant Dashboard for the first time, you need to set up Payment Links+:
          </p>

          <ol style={{ fontSize: '15px', color: '#3c4257', lineHeight: 2, marginBottom: '24px', paddingLeft: '20px' }}>
            <li>Go to <strong>App Center</strong> in your dashboard</li>
            <li>Subscribe to <strong>Payment Links+</strong></li>
            <li>Submit your store details</li>
            <li>Upload your logo</li>
            <li>Add your refund policy</li>
            <li>Wait for approval (1-3 business days)</li>
          </ol>

          <InfoCallout type="info" title={{ en: 'Approval Required', th: 'ต้องได้รับการอนุมัติ', ja: '承認が必要' }}>
            The approval process takes 1-3 business days. You will receive an email once your account is approved.
          </InfoCallout>
        </section>

        {/* Link Creation Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Create Payment Links
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {/* Quick Links */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>⚡</span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Quick Links</h3>
                <span style={{ padding: '2px 8px', background: '#dbeafe', color: '#1e40af', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>FASTEST</span>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                One-time payment links generated instantly without templates. Perfect for quick payments.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  'Multi-currency support',
                  'QR code generation',
                  'Real-time tracking',
                  'Disable before payment',
                ].map(feature => (
                  <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: '13px', color: '#3c4257' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Links */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>📄</span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Template Links</h3>
                <span style={{ padding: '2px 8px', background: '#fef3c7', color: '#92400e', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>REUSABLE</span>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Create links from pre-defined templates. Set up once and generate consistent links every time.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  'Single or multiple use',
                  'Custom fields',
                  'Return URL configuration',
                  'Expiration dates',
                ].map(feature => (
                  <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: '13px', color: '#3c4257' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Links */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>📊</span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Bulk Links</h3>
                <span style={{ padding: '2px 8px', background: '#ede9fe', color: '#6d28d9', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>BATCH</span>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Upload a spreadsheet (.xlsx) to generate multiple links at once. Ideal for invoicing.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  'Excel file upload',
                  'Batch generation',
                  'Custom amounts per link',
                  'Bulk export',
                ].map(feature => (
                  <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: '13px', color: '#3c4257' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Template Types */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Template Types
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                Payment Templates
              </h3>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Collect payments with customizable fields. Set fixed or variable amounts, add product details,
                and configure payment methods.
              </p>
              <div style={{ fontSize: '13px', color: '#3c4257' }}>
                <strong>Use for:</strong> Invoices, products, services, donations
              </div>
            </div>

            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                Save Card (NPA) Templates
              </h3>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
                Store card details via 0-amount authentication for future recurring charges.
                No payment is collected initially.
              </p>
              <div style={{ fontSize: '13px', color: '#3c4257' }}>
                <strong>Use for:</strong> Subscriptions, recurring billing, stored cards
              </div>
            </div>
          </div>
        </section>

        {/* Template Customization */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Template Customization
          </h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { title: 'Custom Product Fields', desc: 'Add internal-only or customer-visible fields for additional information' },
              { title: 'Return URL', desc: 'Configure where customers are redirected after payment completion' },
              { title: 'Payment Methods', desc: 'Select which payment methods to accept (cards, PromptPay, e-wallets, etc.)' },
              { title: 'Manual Capture', desc: 'Option to authorize card charges without immediate capture' },
              { title: 'Expiration Settings', desc: 'Set links to expire after a specific date or number of uses' },
              { title: 'Link-Level Overrides', desc: 'Override template settings on individual links when needed' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1F71" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M12 2v6.5l3-1.5M12 2l3 6.5M12 2v6.5l-3-1.5M12 2l-3 6.5" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <div>
                  <div style={{ fontWeight: 500, color: '#1a1a1a', marginBottom: '2px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: '#697386' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Payment Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Supported Payment Methods
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Payment Links+ supports all payment methods available on your Omise account:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { category: 'Cards', methods: ['Credit Cards', 'Debit Cards'] },
              { category: 'Bank Transfers', methods: ['PromptPay', 'Mobile Banking'] },
              { category: 'E-Wallets', methods: ['TrueMoney', 'LINE Pay', 'ShopeePay', 'GrabPay'] },
              { category: 'Chinese Wallets', methods: ['Alipay CN', 'Alipay HK', 'Alipay Online'] },
              { category: 'Installments', methods: ['Card Installments'] },
              { category: 'Regional', methods: ['PayNow', 'FPX', 'DuitNow'] },
            ].map(group => (
              <div key={group.category} style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontSize: '13px' }}>{group.category}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {group.methods.map(method => (
                    <span key={method} style={{ fontSize: '13px', color: '#697386' }}>{method}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Branding & Settings */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Branding & Settings
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                Customize Appearance
              </h3>
              <ul style={{ fontSize: '13px', color: '#697386', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                <li>Custom brand colors</li>
                <li>Logo upload</li>
                <li>Custom text and messages</li>
                <li>Default language selection</li>
                <li>Live preview before publishing</li>
              </ul>
            </div>

            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                Team Management
              </h3>
              <ul style={{ fontSize: '13px', color: '#697386', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                <li>Store Manager</li>
                <li>Company Manager</li>
                <li>Template Creator</li>
                <li>Link Generator</li>
                <li>Viewer (read-only)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tracking */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Tracking & Analytics
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Monitor all your payment links from the dashboard:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#fef3c7', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
              <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>Pending</div>
              <p style={{ fontSize: '12px', color: '#92400e', margin: 0 }}>
                Links awaiting payment
              </p>
            </div>
            <div style={{ padding: '20px', background: '#dcfce7', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px' }}>Successful</div>
              <p style={{ fontSize: '12px', color: '#166534', margin: 0 }}>
                Completed payments
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Overview</div>
              <p style={{ fontSize: '12px', color: '#697386', margin: 0 }}>
                Charges older than 24 hours
              </p>
            </div>
          </div>
        </section>

        {/* API Access */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            API Access
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Payment Links+ also provides API access for programmatic link creation:
          </p>

          <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ padding: '2px 8px', background: '#ede9fe', color: '#6d28d9', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>DEVELOPERS</span>
            </div>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '12px', lineHeight: 1.6 }}>
              Use the Payment Links+ API to create links and retrieve data programmatically.
              API keys are managed separately in the Keys Management section.
            </p>
            <InfoCallout type="warning" title={{ en: 'Security', th: 'ความปลอดภัย', ja: 'セキュリティ' }}>
              Keep your secret key confidential at all times. Roll your key to generate new credentials if compromised.
            </InfoCallout>
          </div>
        </section>

        {/* Get Started */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ padding: '24px', background: 'linear-gradient(135deg, #1A1F71 0%, #7c3aed 100%)', borderRadius: '12px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
              Ready to create payment links?
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
              Subscribe to Payment Links+ in your dashboard and start accepting payments today.
            </p>
            <a
              href="https://dashboard.omise.co"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#fff',
                color: '#1A1F71',
                fontWeight: 600,
                fontSize: '14px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Go to Dashboard →
            </a>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Related
          </h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/integrations/ecommerce-plugins" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>E-commerce Plugins →</Link>
            <Link href="/getting-started/dashboard-overview" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Dashboard Overview →</Link>
            <Link href="/accept-payments" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Payment Methods →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
