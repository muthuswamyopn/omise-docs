'use client';

import Link from 'next/link';
import SidebarNew from './components/SidebarNew';

const sections = [
  {
    title: 'Getting Started',
    description: 'Set up your account, learn core concepts, and make your first API call.',
    href: '/getting-started',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      </svg>
    ),
    color: '#10b981',
  },
  {
    title: 'Accept Payments',
    description: 'Integrate 40+ payment methods including cards, e-wallets, bank transfers, and more.',
    href: '/accept-payments',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="14" x="2" y="5" rx="2"/>
        <line x1="2" x2="22" y1="10" y2="10"/>
      </svg>
    ),
    color: '#1A1F71',
  },
  {
    title: 'Manage Money',
    description: 'Handle refunds, transfers, payouts, and reconciliation.',
    href: '/manage-money',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
      </svg>
    ),
    color: '#f59e0b',
  },
  {
    title: 'Security & Risk',
    description: 'Fraud protection, disputes, chargebacks, and compliance.',
    href: '/security',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: '#ef4444',
  },
  {
    title: 'Integrations',
    description: 'SDKs, server libraries, e-commerce plugins, and webhooks.',
    href: '/integrations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="8" height="8" x="2" y="2" rx="2"/>
        <rect width="8" height="8" x="14" y="2" rx="2"/>
        <rect width="8" height="8" x="2" y="14" rx="2"/>
        <rect width="8" height="8" x="14" y="14" rx="2"/>
      </svg>
    ),
    color: '#1A1F71',
  },
  {
    title: 'API Reference',
    description: 'Complete technical documentation for all API endpoints.',
    href: '/api-reference',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: '#06b6d4',
  },
];

const quickLinks = [
  { label: 'Quick Start Guide', href: '/getting-started/quick-start' },
  { label: 'Accept Card Payments', href: '/accept-payments/cards/credit-debit' },
  { label: 'PromptPay (Thailand)', href: '/accept-payments/bank-transfers/promptpay' },
  { label: 'Webhooks', href: '/integrations/advanced/webhooks' },
  { label: 'Charges API', href: '/api-reference/charges' },
  { label: 'Error Codes', href: '/api-reference/charges/errors' },
];

const regions = [
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
];

export default function HomePage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <SidebarNew />

      <main style={{ background: '#fff', padding: '48px 56px', maxWidth: '1100px' }}>
        {/* Critical PHP Security Notice */}
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderLeft: '4px solid #dc2626',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '32px',
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
                Two critical vulnerabilities in PHP can allow an attacker to run code on a server remotely without logging in. If you run an Omise plugin (WooCommerce, Magento, PrestaShop, OpenCart, or EC-CUBE) or the Omise PHP library, <strong>update PHP immediately</strong>.
              </p>
              <p style={{ fontSize: '13px', color: '#b91c1c', margin: 0 }}>
                Updating plugins alone does not fix the vulnerabilities.{' '}
                <a href="/security/php-security-update" style={{ color: '#dc2626', fontWeight: 600 }}>Learn more →</a>
              </p>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 12px', color: '#1a1a1a' }}>
            Omise Documentation
          </h1>
          <p style={{ fontSize: '18px', color: '#697386', lineHeight: 1.6, maxWidth: '600px' }}>
            Everything you need to integrate Omise payments into your application.
            Accept payments across Southeast Asia and Japan.
          </p>
        </div>

        {/* Region Quick Access */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}>
          {regions.map((region) => (
            <Link
              key={region.code}
              href={`/accept-payments?region=${region.code}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: '#f6f9fc',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#3c4257',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '20px' }}>{region.flag}</span>
              {region.name}
            </Link>
          ))}
        </div>

        {/* Section Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              style={{
                display: 'block',
                padding: '24px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: `${section.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: section.color,
              }}>
                {section.icon}
              </div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1a1a1a',
                margin: '0 0 8px',
              }}>
                {section.title}
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#697386',
                margin: 0,
                lineHeight: 1.5,
              }}>
                {section.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div style={{
          padding: '24px',
          background: '#f6f9fc',
          borderRadius: '12px',
          marginBottom: '48px',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#697386',
            margin: '0 0 16px',
          }}>
            Popular Pages
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 16px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#1A1F71',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Base URL & API Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          <div style={{
            padding: '20px',
            background: '#1a2332',
            borderRadius: '8px',
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#9ca3af',
              marginBottom: '8px',
            }}>
              Base URL
            </div>
            <code style={{
              fontSize: '14px',
              color: '#ffffff',
              fontFamily: "'SF Mono', Monaco, monospace",
              background: 'transparent',
            }}>
              https://api.omise.co
            </code>
          </div>
          <div style={{
            padding: '20px',
            background: '#1a2332',
            borderRadius: '8px',
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#9ca3af',
              marginBottom: '8px',
            }}>
              API Version
            </div>
            <code style={{
              fontSize: '14px',
              color: '#ffffff',
              fontFamily: "'SF Mono', Monaco, monospace",
              background: 'transparent',
            }}>
              2019-05-29
            </code>
          </div>
        </div>

        {/* OpenAPI Schema */}
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: '#f6f9fc',
          borderRadius: '8px',
        }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontSize: '14px' }}>
            OpenAPI Schema
          </div>
          <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
            Download the complete API specification:{' '}
            <a href="/schema.json" style={{ color: '#1A1F71', fontWeight: 500 }}>
              schema.json
            </a>{' '}
            (OpenAPI 3.0)
          </p>
        </div>
      </main>
    </div>
  );
}
