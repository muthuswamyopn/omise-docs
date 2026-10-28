'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Breadcrumb from '../../../components/Breadcrumb';

export default function GooglePayPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />
      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation' }, href: '/' },
            { label: { en: 'Accept Payments' }, href: '/accept-payments' },
            { label: { en: 'E-Wallets' }, href: '/accept-payments/e-wallets' },
            { label: { en: 'Google Pay' } },
          ]}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>Google Pay</h1>
          <span style={{ padding: '4px 10px', background: '#dcfce7', color: '#166534', fontSize: '12px', fontWeight: 600, borderRadius: '4px' }}>Available</span>
        </div>

        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Accept payments via Google Pay. Allow customers to pay using cards saved in their Google account for fast, secure checkout.
        </p>

        {/* Enable Note */}
        <div style={{ padding: '16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '16px' }}>ℹ️</span>
            <p style={{ margin: 0, fontSize: '14px', color: '#1e40af', lineHeight: 1.6 }}>
              Contact <a href="mailto:support@omise.co" style={{ color: '#1e40af', fontWeight: 600 }}>support@omise.co</a> to enable Google Pay for your account.
            </p>
          </div>
        </div>

        {/* Availability */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Availability</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Thailand', 'Singapore', 'Malaysia', 'Japan'].map(country => (
              <span key={country} style={{ padding: '8px 16px', background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', fontSize: '14px', color: '#3c4257' }}>
                {country}
              </span>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>How It Works</h2>
          <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
            <ol style={{ margin: 0, paddingLeft: '20px', color: '#697386', lineHeight: 2 }}>
              <li>Display Google Pay button on your checkout page</li>
              <li>Customer taps/clicks Google Pay button</li>
              <li>Google Pay sheet appears with saved cards</li>
              <li>Customer selects card and authenticates</li>
              <li>Google Pay returns encrypted payment data</li>
              <li>Create a token using the Google Pay data</li>
              <li>Create a charge using the token</li>
            </ol>
          </div>
        </section>

        {/* Important Requirements */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Important Requirements</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>PAN_ONLY Authentication Required</div>
              <p style={{ margin: 0, fontSize: '14px', color: '#b45309', lineHeight: 1.6 }}>
                Your Google Pay integration must set <code style={{ background: '#fef3c7', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>allowedAuthMethods</code> to contain <strong>only "PAN_ONLY"</strong>. Do not include "CRYPTOGRAM_3DS".
              </p>
            </div>
            <div style={{ padding: '16px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#991b1b', marginBottom: '4px' }}>Cannot Use with Customers API</div>
              <p style={{ margin: 0, fontSize: '14px', color: '#b91c1c', lineHeight: 1.6 }}>
                Google Pay tokens <strong>cannot be used with the Customers API</strong>. You cannot attach Google Pay tokens to customers or save them for future use.
              </p>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Integration</h2>
          <div style={{ padding: '20px', background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
            <p style={{ margin: '0 0 12px', color: '#697386', fontSize: '14px', lineHeight: 1.6 }}>
              Google Pay integration requires implementing the Google Pay API on your frontend and connecting it with Omise on your backend.
            </p>
            <p style={{ margin: 0, color: '#697386', fontSize: '14px', lineHeight: 1.6 }}>
              Supported on web browsers and native Android apps.
            </p>
          </div>
        </section>

        {/* Google Pay Configuration */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Google Pay Configuration</h2>
          <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
            <pre style={{ margin: 0, color: '#e6ebf1', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'omise',
    'gatewayMerchantId': 'YOUR_OMISE_PUBLIC_KEY'
  }
};

const cardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: ['PAN_ONLY'],  // REQUIRED: Only PAN_ONLY
    allowedCardNetworks: ['MASTERCARD', 'VISA', 'JCB']
  },
  tokenizationSpecification: tokenizationSpecification
};`}</pre>
          </div>
        </section>

        {/* Create Token from Google Pay */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Create Token from Google Pay</h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
            After receiving the payment data from Google Pay, create an Omise token:
          </p>
          <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
            <pre style={{ margin: 0, color: '#e6ebf1', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`curl https://vault.omise.co/tokens \\
  -u $OMISE_PUBLIC_KEY: \\
  -d "card[method]=googlepay" \\
  -d "card[data]=GOOGLE_PAY_PAYMENT_DATA"`}</pre>
          </div>
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#697386' }}>
            The <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>card[data]</code> should contain the Base64-encoded <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>paymentMethodData.tokenizationData.token</code> from Google Pay.
          </p>
        </section>

        {/* Create Charge */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Create a Charge</h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
            Use the token to create a charge on your server:
          </p>
          <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
            <pre style={{ margin: 0, color: '#e6ebf1', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=100000" \\
  -d "currency=THB" \\
  -d "card=tokn_test_..."`}</pre>
          </div>
        </section>

        {/* Failure Codes */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Failure Codes</h2>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Code</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: 'invalid_card', desc: 'Invalid card information from Google Pay' },
                  { code: 'insufficient_fund', desc: 'Card has insufficient funds or credit limit' },
                  { code: 'payment_rejected', desc: 'Payment rejected by card issuer' },
                  { code: 'failed_processing', desc: 'General processing error' },
                  { code: 'stolen_or_lost_card', desc: 'Card reported as stolen or lost' },
                ].map(item => (
                  <tr key={item.code}>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                      <code style={{ fontSize: '13px', color: '#dc2626', fontFamily: "'SF Mono', Monaco, monospace" }}>{item.code}</code>
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Related</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/accept-payments/cards/credit-debit" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>Credit & Debit Cards</Link>
            <Link href="/accept-payments/e-wallets" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>All E-Wallets</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
