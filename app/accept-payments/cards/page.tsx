'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import { getPaymentMethodsByCategory, regionFlags, regionNames } from '../../lib/paymentMethods';

const methods = getPaymentMethodsByCategory('cards');

export default function CardsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' }, href: '/accept-payments' },
            { label: { en: 'Cards', th: 'บัตร', ja: 'カード' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Card Payments
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept credit and debit cards from Visa, Mastercard, JCB, and American Express with secure tokenization and 3D Secure support.
        </p>

        {/* Card Methods */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Card Payment Methods
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {methods.map(method => (
              <Link
                key={method.id}
                href={`/accept-payments/cards/${method.id}`}
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
                    </div>
                    <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                      {method.description.en}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {method.regions.map(r => (
                      <span key={r} title={regionNames[r].en} style={{ fontSize: '16px' }}>
                        {regionFlags[r]}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Supported Networks */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Supported Card Networks
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { name: 'Visa', types: 'Credit & Debit' },
              { name: 'Mastercard', types: 'Credit & Debit' },
              { name: 'JCB', types: 'Credit & Debit' },
              { name: 'American Express', types: 'Credit' },
            ].map(card => (
              <div key={card.name} style={{ padding: '24px', background: '#f6f9fc', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px', fontSize: '16px' }}>{card.name}</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>{card.types}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Security Features */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Security Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Tokenization</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Card data never touches your servers. Omise.js securely transmits card details and returns a token.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>3D Secure</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Additional authentication layer shifts fraud liability to the card issuer and reduces chargebacks.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>PCI DSS Level 1</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Omise is PCI DSS Level 1 certified, the highest security standard for payment processing.
              </p>
            </div>
          </div>
        </section>

        {/* Integration Steps */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Quick Integration
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { step: '1', title: 'Include Omise.js', desc: 'Add script to page' },
              { step: '2', title: 'Collect Card', desc: 'Securely tokenize' },
              { step: '3', title: 'Create Charge', desc: 'Server-side API call' },
              { step: '4', title: 'Handle Result', desc: 'Webhook or response' },
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
