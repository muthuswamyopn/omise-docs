'use client';

import Link from 'next/link';
import SidebarNew from '../components/SidebarNew';
import Breadcrumb from '../components/Breadcrumb';

const securityTopics = [
  {
    title: 'PHP Security Update',
    description: 'Critical vulnerabilities affecting PHP installations. Update immediately if you run Omise plugins or the PHP library.',
    href: '/security/php-security-update',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    color: '#dc2626',
    urgent: true,
  },
  {
    title: 'Security at Omise',
    description: 'PCI DSS Level 1 compliance, encryption standards, and infrastructure security.',
    href: '/security/security-at-omise',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: '#10b981',
  },
  {
    title: 'Fraud Protection',
    description: 'IP geolocation, behavior analysis, Dynamic 3D Secure, and risk scoring.',
    href: '/security/fraud-protection',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="m4.93 4.93 14.14 14.14"/>
      </svg>
    ),
    color: '#f59e0b',
  },
  {
    title: 'Disputes & Chargebacks',
    description: 'Dispute types, lifecycle management, and evidence submission process.',
    href: '/security/disputes-chargebacks',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
    color: '#1A1F71',
  },
  {
    title: 'Compliance',
    description: 'PDPA, GDPR, regional regulations, and data handling requirements.',
    href: '/security/compliance',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    color: '#06b6d4',
  },
];

export default function SecurityPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Security & Risk', th: 'ความปลอดภัยและความเสี่ยง', ja: 'セキュリティとリスク' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Security & Risk
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Omise is committed to protecting your business and customers. Learn about our security
          infrastructure, fraud prevention tools, and compliance standards.
        </p>

        {/* Compliance Badges */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              padding: '16px 24px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <div>
                <div style={{ fontWeight: 600, color: '#166534', fontSize: '14px' }}>PCI DSS Level 1</div>
                <div style={{ fontSize: '12px', color: '#15803d' }}>Highest security standard</div>
              </div>
            </div>

            <div style={{
              padding: '16px 24px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <div>
                <div style={{ fontWeight: 600, color: '#1e40af', fontSize: '14px' }}>256-bit Encryption</div>
                <div style={{ fontSize: '12px', color: '#1d4ed8' }}>TLS 1.2+ required</div>
              </div>
            </div>

            <div style={{
              padding: '16px 24px',
              background: '#faf5ff',
              border: '1px solid #e9d5ff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <div>
                <div style={{ fontWeight: 600, color: '#6b21a8', fontSize: '14px' }}>GDPR & PDPA</div>
                <div style={{ fontSize: '12px', color: '#7e22ce' }}>Data privacy compliant</div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Topics */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>
            Security Topics
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {securityTopics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                style={{
                  display: 'block',
                  padding: '24px',
                  background: topic.urgent ? '#fef2f2' : '#fff',
                  border: topic.urgent ? '2px solid #fecaca' : '1px solid #e3e8ee',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: `${topic.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: topic.color,
                    flexShrink: 0,
                  }}>
                    {topic.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                        {topic.title}
                      </h3>
                      {topic.urgent && (
                        <span style={{
                          padding: '2px 8px',
                          background: '#dc2626',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 600,
                          borderRadius: '4px',
                        }}>
                          URGENT
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.5 }}>
                      {topic.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact Security */}
        <section style={{ marginTop: '48px' }}>
          <div style={{
            padding: '24px',
            background: '#1a2332',
            borderRadius: '12px',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>
              Report a Security Vulnerability
            </h3>
            <p style={{ fontSize: '14px', color: '#a3acb9', margin: '0 0 16px', lineHeight: 1.6 }}>
              If you discover a security issue, please report it to our security team.
              We take all reports seriously and will respond promptly.
            </p>
            <a
              href="mailto:security@omise.co"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: '#1A1F71',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              security@omise.co
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
