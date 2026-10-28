'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import { getPaymentMethodsByCategory, regionFlags, regionNames } from '../../lib/paymentMethods';

const methods = getPaymentMethodsByCategory('e-wallets');

export default function EWalletsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' }, href: '/accept-payments' },
            { label: { en: 'E-Wallets', th: 'กระเป๋าเงินดิจิทัล', ja: '電子ウォレット' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          E-Wallets
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept payments from popular digital wallets across Southeast Asia and Japan. E-wallets offer fast checkout with stored payment credentials.
        </p>

        {/* Available Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Available E-Wallets
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {methods.map(method => (
              <Link
                key={method.id}
                href={`/accept-payments/e-wallets/${method.id}`}
                style={{
                  display: 'block',
                  padding: '20px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '16px' }}>{method.name.en}</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {method.regions.map(r => (
                      <span key={r} title={regionNames[r].en} style={{ fontSize: '14px' }}>
                        {regionFlags[r]}
                      </span>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#697386', margin: '0 0 8px', lineHeight: 1.5 }}>
                  {method.shortDescription.en}
                </p>
                <div style={{ fontSize: '12px', color: '#3c4257' }}>
                  {method.currencies.join(', ')}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* By Region */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            E-Wallets by Region
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {(['TH', 'SG', 'MY', 'JP'] as const).map(region => {
              const regionMethods = methods.filter(m => m.regions.includes(region));
              if (regionMethods.length === 0) return null;
              return (
                <div key={region} style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{regionFlags[region]}</span>
                    <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{regionNames[region].en}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {regionMethods.map(m => (
                      <Link
                        key={m.id}
                        href={`/accept-payments/e-wallets/${m.id}`}
                        style={{
                          padding: '4px 10px',
                          background: '#fff',
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: '#1A1F71',
                          textDecoration: 'none',
                        }}
                      >
                        {m.name.en}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Common Features */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Integration Flow
          </h2>
          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            All e-wallets use a redirect flow. The customer is redirected to authorize payment in their wallet app, then returns to your site.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { step: '1', title: 'Create Source', desc: 'With wallet type' },
              { step: '2', title: 'Create Charge', desc: 'Get authorize_uri' },
              { step: '3', title: 'Redirect', desc: 'To wallet app' },
              { step: '4', title: 'Complete', desc: 'Handle webhook' },
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
