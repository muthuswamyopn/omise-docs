'use client';

import Link from 'next/link';
import SidebarNew from '../components/SidebarNew';
import Breadcrumb from '../components/Breadcrumb';
import {
  paymentMethods,
  categoryNames,
  regionNames,
  regionFlags,
  PaymentCategory,
  Region,
} from '../lib/paymentMethods';

const categories: { id: PaymentCategory; icon: string }[] = [
  { id: 'cards', icon: '💳' },
  { id: 'bank-transfers', icon: '🏦' },
  { id: 'e-wallets', icon: '📱' },
  { id: 'alipay-wechat', icon: '🌏' },
  { id: 'installments', icon: '📊' },
  { id: 'convenience-store', icon: '🏪' },
  { id: 'mobile-banking', icon: '📲' },
];

const regions: Region[] = ['TH', 'SG', 'MY', 'JP'];

export default function AcceptPaymentsPage() {
  const getMethodsByCategory = (category: PaymentCategory) => {
    return paymentMethods.filter(pm => pm.category === category);
  };

  const getMethodsByRegion = (region: Region) => {
    return paymentMethods.filter(pm => pm.regions.includes(region));
  };

  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Accept Payments
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Omise supports over 40 payment methods across Thailand, Singapore, Malaysia, and Japan.
          Choose the right payment methods for your customers.
        </p>

        {/* Regional Overview */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Payment Methods by Region
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {regions.map(region => {
              const methods = getMethodsByRegion(region);
              return (
                <div key={region} style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{regionFlags[region]}</span>
                    <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{regionNames[region].en}</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#1A1F71', marginBottom: '4px' }}>
                    {methods.length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#697386' }}>payment methods</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Categories */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Browse by Category
          </h2>

          <div style={{ display: 'grid', gap: '24px' }}>
            {categories.map(({ id, icon }) => {
              const methods = getMethodsByCategory(id);
              return (
                <div key={id} style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', background: '#f6f9fc', borderBottom: '1px solid #e3e8ee', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{icon}</span>
                    <Link
                      href={`/accept-payments/${id}`}
                      style={{ fontWeight: 600, color: '#1a1a1a', textDecoration: 'none', fontSize: '16px' }}
                    >
                      {categoryNames[id].en}
                    </Link>
                    <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#697386' }}>
                      {methods.length} methods
                    </span>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {methods.map(method => (
                        <Link
                          key={method.id}
                          href={`/accept-payments/${id}/${method.id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            background: '#f6f9fc',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '13px',
                            color: '#3c4257',
                            border: '1px solid transparent',
                          }}
                        >
                          <span>{method.name.en}</span>
                          <span style={{ display: 'flex', gap: '2px' }}>
                            {method.regions.map(r => (
                              <span key={r} style={{ fontSize: '10px' }}>{regionFlags[r]}</span>
                            ))}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Integration Overview */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Integration Overview
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>1. Create Source</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Create a payment source using your public key. Specify the payment type, amount, and currency.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>2. Create Charge</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Create a charge on your server using the source ID and your secret key.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>3. Handle Webhook</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Receive the charge.complete event and verify the payment status before fulfilling the order.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Popular Payment Methods
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { id: 'promptpay', category: 'bank-transfers', name: 'PromptPay', desc: 'Thai QR payments', flag: '🇹🇭' },
              { id: 'credit-debit', category: 'cards', name: 'Credit & Debit Cards', desc: 'Visa, Mastercard, JCB', flag: '🌐' },
              { id: 'truemoney', category: 'e-wallets', name: 'TrueMoney Wallet', desc: 'Thai digital wallet', flag: '🇹🇭' },
              { id: 'grabpay', category: 'e-wallets', name: 'GrabPay', desc: 'Southeast Asia super app', flag: '🇸🇬🇲🇾' },
              { id: 'fpx', category: 'bank-transfers', name: 'FPX', desc: 'Malaysia online banking', flag: '🇲🇾' },
              { id: 'paynow', category: 'bank-transfers', name: 'PayNow', desc: 'Singapore QR payments', flag: '🇸🇬' },
            ].map(item => (
              <Link
                key={item.id}
                href={`/accept-payments/${item.category}/${item.id}`}
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
                <span style={{ fontSize: '24px' }}>{item.flag}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '2px' }}>{item.name}</div>
                  <div style={{ fontSize: '13px', color: '#697386' }}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
