'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Breadcrumb from '../../../components/Breadcrumb';

export default function ShopeePayPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />
      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation' }, href: '/' },
            { label: { en: 'Accept Payments' }, href: '/accept-payments' },
            { label: { en: 'E-Wallets' }, href: '/accept-payments/e-wallets' },
            { label: { en: 'ShopeePay' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>ShopeePay</h1>
          <span style={{ padding: '4px 10px', background: '#dcfce7', color: '#166534', fontSize: '12px', fontWeight: 600, borderRadius: '4px' }}>Available</span>
        </div>

        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept payments from ShopeePay users. ShopeePay is integrated with the Shopee e-commerce platform, popular across Southeast Asia.
        </p>

        {/* Key Details */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Source Type</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', fontFamily: "'SF Mono', Monaco, monospace" }}>shopeepay_jumpapp</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Flow</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>App Redirect / QR Code</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Payment Expiry</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>20-60 minutes</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Refund Window</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>180 days</div>
            </div>
          </div>
        </section>

        {/* Availability */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Availability</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Thailand', 'Singapore', 'Malaysia'].map(country => (
              <span key={country} style={{ padding: '8px 16px', background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', fontSize: '14px', color: '#3c4257' }}>
                {country}
              </span>
            ))}
          </div>
        </section>

        {/* Amount Limits */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Amount Limits</h2>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Currency</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Minimum</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Maximum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>THB</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>฿20 (2,000)</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>฿150,000 (15,000,000)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>SGD</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>$1 (100)</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>$20,000 (2,000,000)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>MYR</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>RM1 (100)</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>RM9,999 (999,900)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Integration Options */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Integration Options</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 8px' }}>App Redirection (Jump App)</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#697386', lineHeight: 1.6 }}>
                Redirect customers to the Shopee app to complete payment. Best for mobile users.
              </p>
              <code style={{ display: 'block', marginTop: '12px', background: '#f6f9fc', padding: '8px 12px', borderRadius: '4px', fontSize: '13px' }}>type: shopeepay_jumpapp</code>
            </div>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 8px' }}>QR Code</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#697386', lineHeight: 1.6 }}>
                Display a QR code for customers to scan with the Shopee app. Best for desktop/in-store.
              </p>
              <code style={{ display: 'block', marginTop: '12px', background: '#f6f9fc', padding: '8px 12px', borderRadius: '4px', fontSize: '13px' }}>type: shopeepay</code>
            </div>
          </div>
        </section>

        {/* Payment Methods by Country */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Payment Methods by Country</h2>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Country</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Jump App</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>QR Code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>Thailand</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#166534' }}>✓</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#166534' }}>✓</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>Singapore</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#166534' }}>✓</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>—</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>Malaysia</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#166534' }}>✓</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Create Source */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Create a Source</h2>
          <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
            <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`curl https://api.omise.co/sources \\
  -u $OMISE_SECRET_KEY: \\
  -d "type=shopeepay_jumpapp" \\
  -d "amount=100000" \\
  -d "currency=THB"`}</pre>
          </div>
        </section>

        {/* Failure Codes */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Failure Codes</h2>
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
                  { code: 'payment_expired', desc: 'Authorization window closed' },
                  { code: 'payment_rejected', desc: 'Issuer declined payment' },
                  { code: 'failed_processing', desc: 'General processing error' },
                  { code: 'invalid_account', desc: 'No valid payment account found' },
                  { code: 'insufficient_fund', desc: 'Account limit or balance exceeded' },
                ].map(item => (
                  <tr key={item.code}>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                      <code style={{ fontSize: '13px', color: '#dc2626', fontFamily: "'SF Mono', Monaco, monospace" }}>{item.code}</code>
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Refunds & Voids */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Refunds & Voids</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px' }}>Refunds</div>
              <p style={{ margin: 0, fontSize: '14px', color: '#15803d' }}>Full and partial refunds supported. Refund window is <strong>180 days</strong> from the original charge.</p>
            </div>
            <div style={{ padding: '16px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>Off-Us Transactions Warning</div>
              <p style={{ margin: 0, fontSize: '14px', color: '#b45309' }}>
                <strong>Refunds and voids are not available for off-us transactions.</strong> Off-us transactions occur when the payment is processed through a different acquiring network.
              </p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Related</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/accept-payments/e-wallets/grabpay" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>GrabPay</Link>
            <Link href="/accept-payments/e-wallets" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>All E-Wallets</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
