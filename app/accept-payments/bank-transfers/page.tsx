'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import { getPaymentMethodsByCategory, regionFlags, regionNames } from '../../lib/paymentMethods';

const methods = getPaymentMethodsByCategory('bank-transfers');

export default function BankTransfersPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' }, href: '/accept-payments' },
            { label: { en: 'Bank Transfers', th: 'โอนเงินผ่านธนาคาร', ja: '銀行振込' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Bank Transfers
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept payments directly from customer bank accounts using regional instant payment systems and online banking.
        </p>

        {/* Overview */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Available Methods
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {methods.map(method => (
              <Link
                key={method.id}
                href={`/accept-payments/bank-transfers/${method.id}`}
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
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          background: method.status === 'available' ? '#dcfce7' : '#fef3c7',
                          color: method.status === 'available' ? '#166534' : '#92400e',
                        }}
                      >
                        {method.status === 'available' ? 'Available' : 'Coming Soon'}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#697386', margin: '0 0 12px', lineHeight: 1.6 }}>
                      {method.description.en}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#3c4257' }}>
                      <span>
                        <strong>Currencies:</strong> {method.currencies.join(', ')}
                      </span>
                      <span>
                        <strong>Flow:</strong> {method.flow}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {method.regions.map(r => (
                      <span key={r} title={regionNames[r].en} style={{ fontSize: '20px' }}>
                        {regionFlags[r]}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Comparison
          </h2>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Method</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Country</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Flow</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Refunds</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Settlement</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((m, i) => (
                  <tr key={m.id}>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>
                      <Link href={`/accept-payments/bank-transfers/${m.id}`} style={{ color: '#1A1F71', textDecoration: 'none' }}>
                        {m.name.en}
                      </Link>
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px' }}>
                      {m.regions.map(r => regionFlags[r]).join(' ')}
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257', textTransform: 'capitalize' }}>
                      {m.flow}
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px' }}>
                      {m.refundSupport ? (
                        <span style={{ color: '#166534' }}>{m.refundSupport.window}</span>
                      ) : (
                        <span style={{ color: '#991b1b' }}>Not supported</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>
                      Instant
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Integration Overview */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Integration Overview
          </h2>
          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Bank transfer methods use either QR code display or redirect flows:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>QR Code (PromptPay, PayNow)</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Display a QR code that customers scan with their banking app. Payment confirms via webhook.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Redirect (FPX, DuitNow QR)</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Redirect customers to their bank's secure login page. They authenticate and return to your site.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
