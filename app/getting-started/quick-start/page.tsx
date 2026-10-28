'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import InfoCallout from '../../components/InfoCallout';

export default function QuickStartPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Getting Started', th: 'เริ่มต้นใช้งาน', ja: '始めに' }, href: '/getting-started' },
            { label: { en: 'Quick Start', th: 'เริ่มต้นอย่างรวดเร็ว', ja: 'クイックスタート' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Quick Start Guide
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '24px', lineHeight: 1.6 }}>
          Get up and running with Omise in minutes. Choose the integration path that fits your needs.
        </p>

        {/* Integration Path Selection */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {/* E-commerce Plugins */}
            <Link
              href="/integrations/ecommerce-plugins"
              style={{
                padding: '20px',
                background: '#f0fdf4',
                border: '2px solid #bbf7d0',
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>🛒</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '15px' }}>E-commerce Plugins</span>
                <span style={{ padding: '2px 8px', background: '#dcfce7', color: '#166534', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>NO CODE</span>
              </div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.5 }}>
                Using Shopify, WooCommerce, Magento, or other platforms? Install our plugin and start accepting payments.
              </p>
            </Link>

            {/* Payment Links */}
            <Link
              href="/integrations/payment-links"
              style={{
                padding: '20px',
                background: '#fffbeb',
                border: '2px solid #fde68a',
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>🔗</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '15px' }}>Payment Links</span>
                <span style={{ padding: '2px 8px', background: '#fef3c7', color: '#92400e', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>NO CODE</span>
              </div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.5 }}>
                Generate shareable payment links from your dashboard. Perfect for invoices and one-time payments.
              </p>
            </Link>

            {/* Custom API - Active */}
            <div
              style={{
                padding: '20px',
                background: '#f5f3ff',
                border: '2px solid #1A1F71',
                borderRadius: '12px',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: '-10px', right: '12px', background: '#1A1F71', color: '#fff', fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>
                THIS GUIDE
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>👨‍💻</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '15px' }}>Custom API</span>
                <span style={{ padding: '2px 8px', background: '#ede9fe', color: '#6d28d9', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>DEVELOPERS</span>
              </div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.5 }}>
                Build custom checkout flows with full control using our REST API and SDKs.
              </p>
            </div>
          </div>

          <InfoCallout type="info" title={{ en: 'Not a developer?', th: 'ไม่ใช่นักพัฒนา?', ja: '開発者ではありませんか？' }}>
            You do not need to write code to use Omise. Use our <Link href="/integrations/ecommerce-plugins" style={{ color: '#1A1F71', fontWeight: 500 }}>e-commerce plugins</Link> or generate <Link href="/integrations/payment-links" style={{ color: '#1A1F71', fontWeight: 500 }}>payment links</Link> directly from the <a href="https://dashboard.omise.co" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71', fontWeight: 500 }}>Omise Dashboard</a>.
          </InfoCallout>
        </section>

        {/* Developer Quick Start Header */}
        <div style={{ marginBottom: '32px', padding: '16px 20px', background: '#f5f3ff', borderRadius: '8px', borderLeft: '4px solid #1A1F71' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '16px' }}>API Integration Quick Start</span>
            <span style={{ padding: '2px 8px', background: '#ede9fe', color: '#6d28d9', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>DEVELOPERS</span>
          </div>
          <p style={{ fontSize: '14px', color: '#697386', margin: 0 }}>
            This guide walks you through obtaining API keys, installing server libraries, and making your first charge via code.
          </p>
        </div>

        {/* Step 1: Create Account */}
        <section id="create-account" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 1: Create Your Account
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Register for a free test account to get started. Test accounts allow you to build and test
            your integration without processing real payments.
          </p>

          <ol style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.8, marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Visit <a href="https://dashboard.omise.co/signup" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71', fontWeight: 500 }}>dashboard.omise.co/signup</a></li>
            <li>Enter your email address and create a password</li>
            <li>Verify your email address</li>
            <li>Complete your business profile</li>
          </ol>

          <InfoCallout type="info" title={{ en: 'Test Mode', th: 'โหมดทดสอบ', ja: 'テストモード' }}>
            All new accounts start in test mode. Test mode allows you to simulate payments without
            processing real transactions or incurring any fees.
          </InfoCallout>
        </section>

        {/* Step 2: Get API Keys */}
        <section id="api-keys" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 2: Get Your API Keys
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Omise uses two types of API keys for authentication. Find both in your dashboard under
            <strong> Keys</strong> in the <strong>API</strong> section.
          </p>

          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px', border: '1px solid #e3e8ee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <code style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>pkey_...</code>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>Public Key</span>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0 }}>
                Use for client-side tokenization with Omise.js, iOS SDK, or Android SDK. Safe to expose in frontend code.
              </p>
            </div>

            <div style={{ padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px', border: '1px solid #e3e8ee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <code style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>skey_...</code>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>Secret Key</span>
              </div>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0 }}>
                Use for server-side API calls (charges, refunds, customers). Keep this key confidential on your server.
              </p>
            </div>
          </div>

          <InfoCallout type="warning" title={{ en: 'Security Warning', th: 'คำเตือนด้านความปลอดภัย', ja: 'セキュリティ警告' }}>
            Never commit API keys to version control. Use environment variables instead. Never expose
            your secret key in client-side code or public repositories.
          </InfoCallout>
        </section>

        {/* Step 3: Install a Library */}
        <section id="install-library" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 3: Install a Server Library
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            Install the official Omise library for your programming language:
          </p>

          <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
            {[
              { lang: 'Ruby', cmd: 'gem install omise', color: '#CC342D' },
              { lang: 'Python', cmd: 'pip install omise', color: '#3776AB' },
              { lang: 'PHP', cmd: 'composer require omise/omise-php', color: '#777BB4' },
              { lang: 'Node.js', cmd: 'npm install omise', color: '#339933' },
              { lang: 'Go', cmd: 'go get github.com/omise/omise-go', color: '#00ADD8' },
              { lang: 'Java', cmd: 'Maven: co.omise:omise-java:4.+', color: '#ED8B00' },
              { lang: 'C#', cmd: 'dotnet add package Omise', color: '#512BD4' },
            ].map((lib) => (
              <div key={lib.lang} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#1a1a2e', borderRadius: '6px', border: '1px solid #2d2d44' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: lib.color, flexShrink: 0 }} />
                <span style={{ color: '#a0a0b0', fontSize: '13px', minWidth: '70px', fontWeight: 500 }}>{lib.lang}</span>
                <span style={{ color: '#ffffff', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", background: 'transparent' }}>{lib.cmd}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Step 4: Create a Token */}
        <section id="create-token" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 4: Create a Token (Client-Side)
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            Tokenize card details on the client side using Omise.js. This ensures sensitive card data
            never touches your server.
          </p>

          <InfoCallout type="danger" title={{ en: 'Critical Security Rule', th: 'กฎความปลอดภัยที่สำคัญ', ja: '重要なセキュリティルール' }}>
            Never send card details directly through your server. Always use Omise.js or mobile SDKs
            to create tokens client-side.
          </InfoCallout>

          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>Include Omise.js in your HTML:</div>
            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>HTML</div>
              <pre style={{ padding: '16px', margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`<script src="https://cdn.omise.co/omise.js"></script>`}
              </pre>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>Create a token from card details:</div>
            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>JavaScript</div>
              <pre style={{ padding: '16px', margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`Omise.setPublicKey("pkey_test_...");

Omise.createToken("card", {
  name: "JOHN DOE",
  number: "4242424242424242",
  expiration_month: 12,
  expiration_year: 2025,
  security_code: "123"
}, function(statusCode, response) {
  if (statusCode === 200) {
    // Send response.id (token) to your server
    console.log("Token:", response.id);
  } else {
    // Handle error
    console.error(response.message);
  }
});`}
              </pre>
            </div>
          </div>
        </section>

        {/* Step 5: Create a Charge */}
        <section id="create-charge" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 5: Create a Charge (Server-Side)
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            Use your secret key on your server to create a charge with the token:
          </p>

          <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>cURL</div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`curl https://api.omise.co/charges \\
  -u skey_test_...: \\
  -d "amount=10000" \\
  -d "currency=thb" \\
  -d "card=tokn_test_..." \\
  -d "description=Order #12345"`}
            </pre>
          </div>

          <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', marginBottom: '8px' }}>Example Response:</div>
          <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#3ecf8e' }}>200 OK</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', maxHeight: '300px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "amount": 10000,
  "currency": "thb",
  "status": "successful",
  "authorized": true,
  "captured": true,
  "paid": true,
  "description": "Order #12345",
  "card": {
    "brand": "Visa",
    "last_digits": "4242"
  },
  "created_at": "2024-01-15T10:30:00Z"
}`}
            </pre>
          </div>
        </section>

        {/* Test Cards */}
        <section id="test-cards" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Test Cards
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            Use these test card numbers to simulate different scenarios:
          </p>

          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Card Number</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Brand</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Result</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { number: '4242 4242 4242 4242', brand: 'Visa', result: 'Successful charge', resultColor: '#0e6245' },
                  { number: '4111 1111 1111 1111', brand: 'Visa', result: 'Successful charge', resultColor: '#0e6245' },
                  { number: '5555 5555 5555 4444', brand: 'Mastercard', result: 'Successful charge', resultColor: '#0e6245' },
                  { number: '4000 0000 0000 0002', brand: 'Visa', result: 'Declined (insufficient funds)', resultColor: '#cd3d64' },
                  { number: '4000 0000 0000 0069', brand: 'Visa', result: 'Declined (expired card)', resultColor: '#cd3d64' },
                ].map((card, i) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #e3e8ee' }}>
                      <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1a1a1a' }}>{card.number}</code>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>{card.brand}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #e3e8ee', fontSize: '14px', color: card.resultColor, fontWeight: 500 }}>{card.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '14px', color: '#697386', marginTop: '12px' }}>
            Use any future expiration date and any 3-digit CVV for test cards.
          </p>
        </section>

        {/* Next Steps */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Next Steps
          </h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { title: 'Core Concepts', desc: 'Understand the payment flow and key objects', href: '/getting-started/core-concepts' },
              { title: 'Accept Payments', desc: 'Explore 40+ payment methods', href: '/accept-payments' },
              { title: 'Go Live Checklist', desc: 'Prepare for production', href: '/getting-started/go-live-checklist' },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px', textDecoration: 'none' }}>
                <div>
                  <div style={{ fontWeight: 500, color: '#1A1F71' }}>{link.title}</div>
                  <div style={{ fontSize: '14px', color: '#697386' }}>{link.desc}</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1F71" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
