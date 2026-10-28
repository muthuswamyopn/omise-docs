'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import InfoCallout from '../../components/InfoCallout';

const plugins = [
  {
    name: 'Shopify',
    logo: '🛍️',
    description: 'Install the Omise app from the Shopify App Store. Configure your API keys and start accepting payments.',
    popularity: 'Most Popular',
    features: ['One-click install', 'Auto-sync orders', 'All payment methods'],
    href: '/integrations/ecommerce-plugins/shopify',
    installUrl: 'https://apps.shopify.com/omise',
  },
  {
    name: 'WooCommerce',
    logo: '🔮',
    description: 'Download the Omise plugin for WordPress/WooCommerce. Seamlessly integrates with your existing store.',
    popularity: 'Popular',
    features: ['WordPress plugin', 'Easy setup wizard', 'Shortcodes support'],
    href: '/integrations/ecommerce-plugins/woocommerce',
    installUrl: 'https://wordpress.org/plugins/omise/',
  },
  {
    name: 'Magento',
    logo: '🧡',
    description: 'Extension for Magento 2. Enterprise-grade payment solution for large online stores.',
    features: ['Magento 2 support', 'Multi-store', 'Saved cards'],
    href: '/integrations/ecommerce-plugins/magento',
  },
  {
    name: 'OpenCart',
    logo: '🛒',
    description: 'Free extension for OpenCart stores. Quick installation with comprehensive documentation.',
    features: ['Free extension', 'Multi-language', 'Custom checkout'],
    href: '/integrations/ecommerce-plugins/opencart',
  },
  {
    name: 'PrestaShop',
    logo: '🎯',
    description: 'Module for PrestaShop 1.7+. Modern checkout experience with all Omise payment methods.',
    features: ['PrestaShop 1.7+', 'Modern UI', 'Webhook support'],
    href: '/integrations/ecommerce-plugins/prestashop',
  },
  {
    name: 'EC-CUBE',
    logo: '🇯🇵',
    description: 'Plugin for EC-CUBE, popular in Japan. Supports Konbini, Pay-easy, and Japanese card brands.',
    features: ['Japan-focused', 'JCB support', 'Konbini payments'],
    href: '/integrations/ecommerce-plugins/ec-cube',
  },
];

export default function EcommercePluginsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Integrations', th: 'การเชื่อมต่อ', ja: '連携' }, href: '/integrations' },
            { label: { en: 'E-commerce Plugins', th: 'ปลั๊กอินอีคอมเมิร์ซ', ja: 'ECプラグイン' } },
          ]}
        />

        {/* Critical PHP Security Notice */}
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderLeft: '4px solid #dc2626',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <div style={{ fontWeight: 600, color: '#991b1b', marginBottom: '6px', fontSize: '15px' }}>
                PHP Security Update (October 2026)
              </div>
              <p style={{ fontSize: '14px', color: '#991b1b', lineHeight: 1.6, margin: '0 0 8px' }}>
                Two critical PHP vulnerabilities allow remote code execution. If you self-host any Omise plugin below, <strong>update PHP to the newest patched version immediately</strong>. Updating plugins alone does not fix the vulnerabilities.
              </p>
              <a href="/security/php-security-update" style={{ fontSize: '13px', color: '#dc2626', fontWeight: 600 }}>Learn more →</a>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            E-commerce Plugins
          </h1>
          <span style={{ padding: '4px 10px', background: '#fef3c7', color: '#92400e', fontSize: '12px', fontWeight: 600, borderRadius: '6px' }}>NO CODE REQUIRED</span>
        </div>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Ready-to-use plugins for popular e-commerce platforms. Install, configure your API keys, and
          start accepting payments on your existing store without writing any code.
        </p>

        {/* Quick Start */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#166534', marginBottom: '12px', margin: 0 }}>
              Getting Started is Easy
            </h2>
            <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
              {[
                { step: '1', text: 'Choose your platform below' },
                { step: '2', text: 'Install the plugin/extension' },
                { step: '3', text: 'Enter your Omise API keys' },
                { step: '4', text: 'Start accepting payments' },
              ].map(s => (
                <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#166534', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                    {s.step}
                  </span>
                  <span style={{ fontSize: '13px', color: '#166534' }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available Plugins */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Available Plugins
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {plugins.map(plugin => (
              <div
                key={plugin.name}
                style={{
                  padding: '24px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <span style={{ fontSize: '36px' }}>{plugin.logo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '18px' }}>{plugin.name}</span>
                      {plugin.popularity && (
                        <span style={{ padding: '2px 8px', background: '#dbeafe', color: '#1e40af', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>
                          {plugin.popularity.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '14px', color: '#697386', margin: '0 0 12px', lineHeight: 1.6 }}>
                      {plugin.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {plugin.features.map(feature => (
                        <span key={feature} style={{ padding: '4px 10px', background: '#f6f9fc', borderRadius: '4px', fontSize: '12px', color: '#3c4257' }}>
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Link
                        href={plugin.href}
                        style={{
                          padding: '8px 16px',
                          background: '#1A1F71',
                          color: '#fff',
                          fontSize: '13px',
                          fontWeight: 500,
                          borderRadius: '6px',
                          textDecoration: 'none',
                        }}
                      >
                        View Documentation
                      </Link>
                      {plugin.installUrl && (
                        <a
                          href={plugin.installUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '8px 16px',
                            background: '#fff',
                            color: '#1A1F71',
                            fontSize: '13px',
                            fontWeight: 500,
                            borderRadius: '6px',
                            textDecoration: 'none',
                            border: '1px solid #1A1F71',
                          }}
                        >
                          Install Now →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What You Need */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Before You Start
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                1. Create an Omise Account
              </h3>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '12px', lineHeight: 1.6 }}>
                Sign up for a free Omise account to get your API keys.
              </p>
              <a href="https://dashboard.omise.co/signup" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#1A1F71', textDecoration: 'none', fontWeight: 500 }}>
                Create Account →
              </a>
            </div>

            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                2. Get Your API Keys
              </h3>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '12px', lineHeight: 1.6 }}>
                Find your Public Key and Secret Key in the dashboard under API Keys.
              </p>
              <Link href="/getting-started/quick-start#api-keys" style={{ fontSize: '13px', color: '#1A1F71', textDecoration: 'none', fontWeight: 500 }}>
                Learn about API Keys →
              </Link>
            </div>
          </div>

          <InfoCallout type="info" title={{ en: 'Test Mode', th: 'โหมดทดสอบ', ja: 'テストモード' }}>
            Start with test API keys to verify your integration works correctly before going live.
            Test mode allows you to simulate payments without processing real transactions.
          </InfoCallout>
        </section>

        {/* Features */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            What All Plugins Include
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { title: 'All Payment Methods', desc: 'Cards, bank transfers, e-wallets, and local methods' },
              { title: 'Automatic Order Updates', desc: 'Order status syncs when payment completes' },
              { title: 'Refund from Admin', desc: 'Process refunds directly in your store admin' },
              { title: 'Test & Live Modes', desc: 'Switch between test and live with API keys' },
              { title: 'Webhook Integration', desc: 'Real-time payment notifications' },
              { title: 'Multi-currency Support', desc: 'Accept THB, SGD, MYR, JPY, USD' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <div style={{ fontWeight: 500, color: '#1a1a1a', marginBottom: '2px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: '#697386' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Platform Comparison
          </h2>

          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Platform</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Cards</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>QR/Bank</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>E-Wallets</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Installments</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#697386', borderBottom: '1px solid #e3e8ee' }}>Saved Cards</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { platform: 'Shopify', cards: true, qr: true, wallets: true, installments: true, saved: true },
                  { platform: 'WooCommerce', cards: true, qr: true, wallets: true, installments: true, saved: true },
                  { platform: 'Magento', cards: true, qr: true, wallets: true, installments: true, saved: true },
                  { platform: 'OpenCart', cards: true, qr: true, wallets: true, installments: false, saved: false },
                  { platform: 'PrestaShop', cards: true, qr: true, wallets: true, installments: true, saved: false },
                  { platform: 'EC-CUBE', cards: true, qr: false, wallets: false, installments: false, saved: true },
                ].map((row, i) => (
                  <tr key={row.platform}>
                    <td style={{ padding: '12px 16px', borderBottom: i < 5 ? '1px solid #e3e8ee' : 'none', fontWeight: 500, color: '#1a1a1a' }}>{row.platform}</td>
                    <td style={{ padding: '12px 16px', borderBottom: i < 5 ? '1px solid #e3e8ee' : 'none', textAlign: 'center' }}>{row.cards ? '✓' : '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: i < 5 ? '1px solid #e3e8ee' : 'none', textAlign: 'center' }}>{row.qr ? '✓' : '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: i < 5 ? '1px solid #e3e8ee' : 'none', textAlign: 'center' }}>{row.wallets ? '✓' : '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: i < 5 ? '1px solid #e3e8ee' : 'none', textAlign: 'center' }}>{row.installments ? '✓' : '—'}</td>
                    <td style={{ padding: '12px 16px', borderBottom: i < 5 ? '1px solid #e3e8ee' : 'none', textAlign: 'center' }}>{row.saved ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Need Help? */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Need Help?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                Installation Support
              </h3>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '12px', lineHeight: 1.6 }}>
                Having trouble installing? Our support team can help you set up your plugin.
              </p>
              <a href="https://www.omise.co/contact" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#1A1F71', textDecoration: 'none', fontWeight: 500 }}>
                Contact Support →
              </a>
            </div>

            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                Custom Integration
              </h3>
              <p style={{ fontSize: '13px', color: '#697386', marginBottom: '12px', lineHeight: 1.6 }}>
                Need a custom checkout experience? Check out our API documentation.
              </p>
              <Link href="/getting-started/quick-start" style={{ fontSize: '13px', color: '#1A1F71', textDecoration: 'none', fontWeight: 500 }}>
                Developer Quick Start →
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Related
          </h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/integrations/payment-links" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Payment Links →</Link>
            <Link href="/accept-payments" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Payment Methods →</Link>
            <Link href="/getting-started/go-live-checklist" style={{ fontSize: '14px', color: '#1A1F71', textDecoration: 'none' }}>Go Live Checklist →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
