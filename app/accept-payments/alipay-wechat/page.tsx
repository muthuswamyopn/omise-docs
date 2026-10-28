'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import { getPaymentMethodsByCategory, regionFlags, regionNames } from '../../lib/paymentMethods';

const methods = getPaymentMethodsByCategory('alipay-wechat');

export default function AlipayWeChatPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' }, href: '/accept-payments' },
            { label: { en: 'Alipay & WeChat', th: 'Alipay & WeChat', ja: 'Alipay & WeChat' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Alipay & WeChat Pay
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept payments from Chinese tourists and cross-border shoppers using Alipay, Alipay+, and WeChat Pay.
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
                href={`/accept-payments/alipay-wechat/${method.id}`}
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
                    <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '16px', marginBottom: '8px' }}>{method.name.en}</div>
                    <p style={{ fontSize: '14px', color: '#697386', margin: '0 0 12px', lineHeight: 1.6 }}>
                      {method.description.en}
                    </p>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {method.regions.map(r => (
                        <span key={r} title={regionNames[r].en} style={{ fontSize: '16px' }}>
                          {regionFlags[r]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Target Customers */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Target Customers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Chinese Tourists</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Visitors from mainland China who prefer using familiar payment apps.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Cross-border Shoppers</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Online customers purchasing from Chinese e-commerce or overseas.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Chinese Expats</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Chinese nationals living abroad who maintain their wallet accounts.
              </p>
            </div>
          </div>
        </section>

        {/* Alipay+ Network */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Alipay+ Partner Wallets
          </h2>
          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            With a single Alipay+ integration, accept payments from multiple Asian wallets:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { name: 'Alipay', region: 'China' },
              { name: 'AlipayHK', region: 'Hong Kong' },
              { name: 'DANA', region: 'Indonesia' },
              { name: 'GCash', region: 'Philippines' },
              { name: 'KakaoPay', region: 'South Korea' },
              { name: 'TrueMoney', region: 'Thailand' },
              { name: 'Touch\'n Go', region: 'Malaysia' },
            ].map(wallet => (
              <span
                key={wallet.name}
                style={{
                  padding: '8px 14px',
                  background: '#f6f9fc',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#3c4257',
                }}
              >
                <strong>{wallet.name}</strong> ({wallet.region})
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
