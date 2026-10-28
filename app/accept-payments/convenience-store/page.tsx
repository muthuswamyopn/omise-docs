'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import { getPaymentMethodsByCategory, regionFlags, regionNames } from '../../lib/paymentMethods';

const methods = getPaymentMethodsByCategory('convenience-store');

export default function ConvenienceStorePage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' }, href: '/accept-payments' },
            { label: { en: 'Convenience Store', th: 'ร้านสะดวกซื้อ', ja: 'コンビニ' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Convenience Store Payments
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept cash payments at convenience stores in Japan. Popular with customers who prefer offline payment methods.
        </p>

        {/* Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Available Methods
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {methods.map(method => (
              <Link
                key={method.id}
                href={`/accept-payments/convenience-store/${method.id}`}
                style={{
                  display: 'block',
                  padding: '20px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '16px' }}>{method.name.en}</span>
                      <span style={{ fontSize: '16px' }}>{regionFlags['JP']}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                      {method.description.en}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            How Konbini Payments Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { step: '1', title: 'Checkout', desc: 'Customer selects Konbini' },
              { step: '2', title: 'Reference', desc: 'Receive payment code' },
              { step: '3', title: 'Pay', desc: 'Visit store, pay cash' },
              { step: '4', title: 'Confirm', desc: 'Webhook notification' },
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

        {/* Supported Stores */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Supported Convenience Stores
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              '7-Eleven',
              'FamilyMart',
              'Lawson',
              'Ministop',
              'Daily Yamazaki',
              'Seicomart',
            ].map(store => (
              <span
                key={store}
                style={{
                  padding: '12px 20px',
                  background: '#f6f9fc',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#1a1a1a',
                }}
              >
                {store}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
