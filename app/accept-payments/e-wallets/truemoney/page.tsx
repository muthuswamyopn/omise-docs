'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Breadcrumb from '../../../components/Breadcrumb';

export default function TrueMoneyPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />
      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation' }, href: '/' },
            { label: { en: 'Accept Payments' }, href: '/accept-payments' },
            { label: { en: 'E-Wallets' }, href: '/accept-payments/e-wallets' },
            { label: { en: 'TrueMoney' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px', color: '#1a1a1a' }}>TrueMoney</h1>

        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.7 }}>
          Accept payments from TrueMoney users in Thailand. TrueMoney offers two integration methods depending on your use case.
        </p>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '48px' }}>
          {/* TrueMoney App Redirection */}
          <Link href="/accept-payments/e-wallets/truemoney/jumpapp" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px', transition: 'border-color 0.15s, box-shadow 0.15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#f6f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  📱
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>TrueMoney App Redirection</h2>
                  <code style={{ fontSize: '12px', color: '#697386', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>truemoney_jumpapp</code>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.6, margin: 0 }}>
                Redirect customers to the TrueMoney app to authorize payments. On desktop, customers scan a QR code with their TrueMoney app.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '12px', padding: '4px 8px', background: '#D1FAE5', color: '#0D7A5F', borderRadius: '4px' }}>Mobile app redirect</span>
                <span style={{ fontSize: '12px', padding: '4px 8px', background: '#E8F4F8', color: '#1A1F71', borderRadius: '4px' }}>Desktop QR code</span>
              </div>
            </div>
          </Link>

          {/* TrueMoney QR */}
          <Link href="/accept-payments/e-wallets/truemoney/qr" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px', transition: 'border-color 0.15s, box-shadow 0.15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#f6f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  📷
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>TrueMoney QR</h2>
                  <code style={{ fontSize: '12px', color: '#697386', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>truemoney_qr</code>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.6, margin: 0 }}>
                Generate a QR code for customers to scan with their TrueMoney app. Supports TrueMoney Wallet, Pay Next, and Pay Next Extra.
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '12px', padding: '4px 8px', background: '#fef3c7', color: '#92400e', borderRadius: '4px' }}>Offline QR</span>
                <span style={{ fontSize: '12px', padding: '4px 8px', background: '#E8F4F8', color: '#1A1F71', borderRadius: '4px' }}>Pay Next supported</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Comparison Table */}
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Comparison</h2>
        <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden', marginBottom: '48px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f6f9fc' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Feature</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>App Redirection</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>QR</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Source type</td>
                <td style={{ padding: '12px 16px' }}><code style={{ fontSize: '13px' }}>truemoney_jumpapp</code></td>
                <td style={{ padding: '12px 16px' }}><code style={{ fontSize: '13px' }}>truemoney_qr</code></td>
              </tr>
              <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Flow type</td>
                <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Redirect</td>
                <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Offline QR</td>
              </tr>
              <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Maximum</td>
                <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿50,000</td>
                <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>฿50,000 (Wallet)</td>
              </tr>
              <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Pay Next</td>
                <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>—</td>
                <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>Supported</td>
              </tr>
              <tr style={{ borderTop: '1px solid #e3e8ee' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500, color: '#1a1a1a' }}>Refund window</td>
                <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>30 days</td>
                <td style={{ padding: '12px 16px', color: '#3c4257', fontSize: '14px' }}>30 days</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#3c4257' }}>
            <strong>Not sure which to use?</strong> For most online payment scenarios, <Link href="/accept-payments/e-wallets/truemoney/jumpapp" style={{ color: '#1A1F71' }}>TrueMoney App Redirection</Link> provides the best user experience with seamless app-to-app flow on mobile.
          </p>
        </div>
      </main>
    </div>
  );
}
