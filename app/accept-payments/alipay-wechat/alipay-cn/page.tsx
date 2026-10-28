'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Breadcrumb from '../../../components/Breadcrumb';

export default function AlipayCNPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />
      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation' }, href: '/' },
            { label: { en: 'Accept Payments' }, href: '/accept-payments' },
            { label: { en: 'Alipay & WeChat' }, href: '/accept-payments/alipay-wechat' },
            { label: { en: 'Alipay CN' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>Alipay CN</h1>
          <span style={{ padding: '4px 10px', background: '#dcfce7', color: '#166534', fontSize: '12px', fontWeight: 600, borderRadius: '4px' }}>Available</span>
        </div>

        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept payments from Alipay users in mainland China. One of the world's largest digital payment platforms with over 1 billion users.
        </p>

        {/* Key Details */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Source Type</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', fontFamily: "'SF Mono', Monaco, monospace" }}>alipay_cn</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Flow</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>App Redirect</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Min API Version</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>2017-11-02</div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#697386', marginBottom: '4px' }}>Void Window</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>15 min (GMT+8)</div>
            </div>
          </div>
        </section>

        {/* Availability */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Availability</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Thailand', 'Singapore'].map(country => (
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
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment Flow */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Payment Flow</h2>
          <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', color: '#697386', lineHeight: 2 }}>
              <li>Create source via Omise.js or mobile SDK with <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>type: alipay_cn</code></li>
              <li>Create charge on server with <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>return_uri</code> (HTTPS required)</li>
              <li>Redirect customer to <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>authorize_uri</code></li>
              <li>Customer authorizes at Alipay checkout (app or QR scan on desktop)</li>
              <li>Customer redirected back to <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>return_uri</code></li>
              <li>Receive <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>charge.complete</code> webhook</li>
              <li>Verify charge status via API</li>
            </ol>
          </div>
        </section>

        {/* Create Source */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Create a Source</h2>
          <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
            <pre style={{ margin: 0, color: '#e6ebf1', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`curl https://api.omise.co/sources \\
  -u $OMISE_SECRET_KEY: \\
  -d "type=alipay_cn" \\
  -d "amount=100000" \\
  -d "currency=THB" \\
  -d "platform_type=WEB"`}</pre>
          </div>
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#697386' }}>
            Optional <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>platform_type</code>: IOS, ANDROID, or WEB
          </p>
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

        {/* Refunds */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Refunds & Voids</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px' }}>Refunds</div>
              <p style={{ margin: 0, fontSize: '14px', color: '#15803d' }}>Full and partial refunds supported. Both manual and automatic capture modes available.</p>
            </div>
            <div style={{ padding: '16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>Void Window</div>
              <p style={{ margin: 0, fontSize: '14px', color: '#b45309' }}>15 minutes (GMT+8) after charge creation.</p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Related</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/accept-payments/alipay-wechat/alipay-hk" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>Alipay HK</Link>
            <Link href="/accept-payments/alipay-wechat" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>All Alipay+ Methods</Link>
            <Link href="/api-reference/charges/create" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>Charges API</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
