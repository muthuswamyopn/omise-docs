'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import { getPaymentMethodsByCategory, regionFlags, regionNames } from '../../lib/paymentMethods';

const methods = getPaymentMethodsByCategory('installments');

export default function InstallmentsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' }, href: '/accept-payments' },
            { label: { en: 'Installments', th: 'ผ่อนชำระ', ja: '分割払い' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Installment Payments
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Offer flexible payment plans to increase conversion and average order value with card installments and buy-now-pay-later options.
        </p>

        {/* Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Available Options
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {methods.map(method => (
              <Link
                key={method.id}
                href={`/accept-payments/installments/${method.id}`}
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
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {method.regions.map(r => (
                          <span key={r} style={{ fontSize: '14px' }}>{regionFlags[r]}</span>
                        ))}
                      </div>
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

        {/* Benefits */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Benefits of Installments
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Higher Conversion</div>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.6 }}>
                Customers are more likely to complete purchases when they can spread payments.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Larger Orders</div>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.6 }}>
                Average order values increase when flexible payment options are available.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Full Payment Upfront</div>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: 1.6 }}>
                You receive the full amount immediately while the customer pays over time.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Types Comparison
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Card Installments</div>
              <ul style={{ fontSize: '13px', color: '#697386', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                <li>Uses customer's existing credit card</li>
                <li>Bank-specific plans (3, 6, 10 months)</li>
                <li>Interest-free or with interest</li>
                <li>Minimum amount requirements</li>
              </ul>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Buy Now Pay Later (Atome)</div>
              <ul style={{ fontSize: '13px', color: '#697386', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                <li>No credit card required</li>
                <li>Fixed 3 payments</li>
                <li>Always interest-free</li>
                <li>Customer approval via app</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
