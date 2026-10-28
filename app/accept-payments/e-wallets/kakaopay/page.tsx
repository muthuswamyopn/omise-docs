'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Breadcrumb from '../../../components/Breadcrumb';

export default function KakaoPayPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />
      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation' }, href: '/' },
            { label: { en: 'Accept Payments' }, href: '/accept-payments' },
            { label: { en: 'E-Wallets' }, href: '/accept-payments/e-wallets' },
            { label: { en: 'KakaoPay' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>KakaoPay</h1>
          <span style={{ padding: '4px 10px', background: '#dcfce7', color: '#166534', fontSize: '12px', fontWeight: 600, borderRadius: '4px' }}>Available</span>
        </div>

        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept payments from KakaoPay users. KakaoPay is South Korea's leading mobile payment platform, integrated with Kakao messaging app.
        </p>

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

        {/* Payment Flow */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Payment Flow</h2>
          <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', color: '#697386', lineHeight: 2 }}>
              <li>Customer selects KakaoPay at checkout</li>
              <li>Create a source with <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>type: kakaopay</code></li>
              <li>Redirect customer to KakaoPay to authorize payment</li>
              <li>Customer confirms payment in KakaoPay/Kakao app</li>
              <li>Customer redirected back to your site</li>
              <li>Receive webhook confirming payment status</li>
            </ol>
          </div>
        </section>

        {/* Create Source */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Create a Source</h2>
          <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
            <pre style={{ margin: 0, color: '#e6ebf1', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`curl https://api.omise.co/sources \\
  -u $OMISE_SECRET_KEY: \\
  -d "type=kakaopay" \\
  -d "amount=100000" \\
  -d "currency=THB"`}</pre>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Related</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/accept-payments/alipay-wechat" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>Alipay+</Link>
            <Link href="/accept-payments/e-wallets" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>All E-Wallets</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
