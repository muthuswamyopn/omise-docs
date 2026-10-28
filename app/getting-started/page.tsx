'use client';

import Link from 'next/link';
import SidebarNew from '../components/SidebarNew';
import Breadcrumb from '../components/Breadcrumb';

export default function GettingStartedPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Getting Started', th: 'เริ่มต้นใช้งาน', ja: '始めに' } },
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
                Two critical vulnerabilities in PHP can allow an attacker to run code on a server remotely without logging in, and attacks have been reported. If you run an Omise plugin (such as WooCommerce, Magento, PrestaShop, OpenCart, or EC-CUBE) or the Omise PHP library on your own server, <strong>update PHP to the newest patched version</strong> within your current PHP branch as soon as possible.
              </p>
              <p style={{ fontSize: '13px', color: '#b91c1c', margin: 0 }}>
                Updating your store software or the Omise plugin does not fix the vulnerabilities.{' '}
                <a href="/security/php-security-update" style={{ color: '#dc2626', fontWeight: 600 }}>Learn more →</a>
              </p>
            </div>
          </div>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Getting Started with Omise
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Omise provides payment solutions for businesses of all sizes. Choose the path that fits your needs.
        </p>

        {/* Non-developer notice */}
        <div
          style={{
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '32px',
          }}
        >
          <div style={{ fontWeight: 600, color: '#0c4a6e', marginBottom: '8px' }}>
            Not a developer?
          </div>
          <p style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: 1.6, margin: 0 }}>
            This documentation is developer-oriented. For non-technical help, visit our{' '}
            <a href="https://www.omise.co/support" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', fontWeight: 500 }}>
              support center
            </a>{' '}
            or manage payments directly from your{' '}
            <a href="https://dashboard.omise.co" target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', fontWeight: 500 }}>
              dashboard
            </a>.
          </p>
        </div>

        {/* Choose Your Path */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>
            Choose Your Integration Path
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {/* Path 1: E-commerce Plugins */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '16px' }}>E-commerce Plugins</span>
                    <span style={{ padding: '2px 8px', background: '#dcfce7', color: '#166534', fontSize: '11px', fontWeight: 600, borderRadius: '4px' }}>NO CODE</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#697386', margin: '0 0 12px', lineHeight: 1.6 }}>
                    Already using Shopify, WooCommerce, Magento, or another e-commerce platform? Install our plugin and start accepting payments immediately.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Shopify', 'WooCommerce', 'Magento', 'OpenCart', 'PrestaShop', 'EC-CUBE'].map(platform => (
                      <span key={platform} style={{ padding: '4px 10px', background: '#f6f9fc', borderRadius: '4px', fontSize: '12px', color: '#3c4257' }}>
                        {platform}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/integrations/ecommerce-plugins"
                    style={{ display: 'inline-block', marginTop: '16px', color: '#1A1F71', fontWeight: 500, fontSize: '14px', textDecoration: 'none' }}
                  >
                    View plugins →
                  </Link>
                </div>
              </div>
            </div>

            {/* Path 2: Payment Links */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '16px' }}>Payment Links</span>
                    <span style={{ padding: '2px 8px', background: '#fef3c7', color: '#92400e', fontSize: '11px', fontWeight: 600, borderRadius: '4px' }}>NO CODE</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#697386', margin: '0 0 12px', lineHeight: 1.6 }}>
                    Create shareable payment links directly from your dashboard. Send via email, SMS, or social media. No website or coding required.
                  </p>
                  <Link
                    href="/integrations/advanced/payment-links"
                    style={{ display: 'inline-block', color: '#1A1F71', fontWeight: 500, fontSize: '14px', textDecoration: 'none' }}
                  >
                    Learn about payment links →
                  </Link>
                </div>
              </div>
            </div>

            {/* Path 3: Custom API Integration */}
            <div style={{ padding: '24px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '16px' }}>Custom API Integration</span>
                    <span style={{ padding: '2px 8px', background: '#ede9fe', color: '#6d28d9', fontSize: '11px', fontWeight: 600, borderRadius: '4px' }}>DEVELOPERS</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#697386', margin: '0 0 12px', lineHeight: 1.6 }}>
                    Build a custom checkout experience with full control. Use our client-side libraries to securely tokenize card data, and server-side libraries to process payments.
                  </p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Link
                      href="/getting-started/quick-start"
                      style={{ color: '#1A1F71', fontWeight: 500, fontSize: '14px', textDecoration: 'none' }}
                    >
                      Quick start guide →
                    </Link>
                    <Link
                      href="/api-reference"
                      style={{ color: '#1A1F71', fontWeight: 500, fontSize: '14px', textDecoration: 'none' }}
                    >
                      API reference →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account Setup */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Setting Up Your Account
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>1</div>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Create Account</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Register at <a href="https://dashboard.omise.co" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71' }}>dashboard.omise.co</a>. You'll get test mode access immediately.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>2</div>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Test Mode</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Build and test your integration without processing real transactions. No verification needed.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>3</div>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Go Live</div>
              <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Complete KYC verification to activate live mode and start processing real payments.
              </p>
            </div>
          </div>

          <Link
            href="/getting-started/go-live-checklist"
            style={{ display: 'inline-block', marginTop: '16px', color: '#1A1F71', fontWeight: 500, fontSize: '14px', textDecoration: 'none' }}
          >
            View go-live checklist →
          </Link>
        </section>

        {/* Explore */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Explore This Section
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {[
              { href: '/getting-started/quick-start', title: 'Quick Start', desc: 'Make your first API call' },
              { href: '/getting-started/core-concepts', title: 'Core Concepts', desc: 'Tokens, sources, and charges' },
              { href: '/getting-started/go-live-checklist', title: 'Go Live Checklist', desc: 'KYC and production readiness' },
              { href: '/getting-started/dashboard-overview', title: 'Dashboard Overview', desc: 'Manage transactions and settings' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  padding: '16px 20px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>{link.title}</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>{link.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Supported Regions */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Supported Regions
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { flag: '🇹🇭', name: 'Thailand', currency: 'THB' },
              { flag: '🇸🇬', name: 'Singapore', currency: 'SGD' },
              { flag: '🇲🇾', name: 'Malaysia', currency: 'MYR' },
              { flag: '🇯🇵', name: 'Japan', currency: 'JPY' },
            ].map(region => (
              <div key={region.name} style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{region.flag}</div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '2px' }}>{region.name}</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>{region.currency}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Help */}
        <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '20px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Need Help?</div>
          <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
            Contact us at{' '}
            <a href="mailto:support@omise.co" style={{ color: '#1A1F71' }}>support@omise.co</a>
            {' '}or check{' '}
            <a href="https://status.omise.co" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71' }}>status.omise.co</a>
            {' '}for service availability.
          </p>
        </div>
      </main>
    </div>
  );
}
