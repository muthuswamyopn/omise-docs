'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import { getPaymentMethodsByCategory, regionFlags, regionNames } from '../../lib/paymentMethods';

const methods = getPaymentMethodsByCategory('mobile-banking');

export default function MobileBankingPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' }, href: '/accept-payments' },
            { label: { en: 'Mobile Banking', th: 'โมบายแบงค์กิ้ง', ja: 'モバイルバンキング' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Mobile Banking
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept direct payments from bank mobile apps. Customers authorize payment within their trusted banking app.
        </p>

        {/* Thai Banks */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Thailand Banks
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {methods.filter(m => m.regions.includes('TH')).map(method => (
              <Link
                key={method.id}
                href={`/accept-payments/mobile-banking/${method.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '20px' }}>{regionFlags['TH']}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '2px' }}>{method.name.en}</div>
                  <div style={{ fontSize: '12px', color: '#697386' }}>{method.shortDescription.en}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Singapore Banks */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Singapore Banks
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {methods.filter(m => m.regions.includes('SG')).map(method => (
              <Link
                key={method.id}
                href={`/accept-payments/mobile-banking/${method.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '20px' }}>{regionFlags['SG']}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '2px' }}>{method.name.en}</div>
                  <div style={{ fontSize: '12px', color: '#697386' }}>{method.shortDescription.en}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            How Mobile Banking Payments Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { step: '1', title: 'Select Bank', desc: 'Customer chooses their bank' },
              { step: '2', title: 'Redirect', desc: 'Open banking app' },
              { step: '3', title: 'Authorize', desc: 'Approve in bank app' },
              { step: '4', title: 'Return', desc: 'Back to your site' },
            ].map(s => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 700, fontSize: '14px' }}>
                  {s.step}
                </div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '13px', marginBottom: '2px' }}>{s.title}</div>
                <div style={{ fontSize: '11px', color: '#697386' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
