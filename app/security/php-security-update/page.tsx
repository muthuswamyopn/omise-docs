'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';

const affectedProducts = [
  { name: 'Omise WooCommerce Plugin', repo: 'https://github.com/omise/omise-woocommerce' },
  { name: 'Omise Magento Plugin', repo: 'https://github.com/omise/omise-magento' },
  { name: 'Omise PrestaShop Plugin', repo: 'https://github.com/omise/omise-prestashop' },
  { name: 'Omise OpenCart Plugin', repo: 'https://github.com/omise/omise-opencart' },
  { name: 'Omise EC-CUBE Plugin', repo: 'https://github.com/omise/omise-eccube' },
  { name: 'Omise PHP Library', repo: 'https://github.com/omise/omise-php' },
];

const cveDetails = [
  {
    id: 'CVE-2026-109618',
    severity: 'Critical',
    description: 'Remote code execution vulnerability allowing attackers to execute arbitrary code on the server without authentication.',
  },
  {
    id: 'CVE-2026-109619',
    severity: 'Critical',
    description: 'Remote code execution vulnerability allowing attackers to execute arbitrary code on the server without authentication.',
  },
];

const phpVersions = [
  { branch: '8.5', safe: '8.5.12+', support: 'Not yet' },
  { branch: '8.4', safe: '8.4.27+', support: 'Yes' },
  { branch: '8.3', safe: '8.3.36+', support: 'Yes' },
  { branch: '8.2', safe: '8.2.35+', support: 'Yes' },
];

export default function PHPSecurityUpdatePage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Security & Risk', th: 'ความปลอดภัยและความเสี่ยง', ja: 'セキュリティとリスク' }, href: '/security' },
            { label: { en: 'PHP Security Update', th: 'อัปเดตความปลอดภัย PHP', ja: 'PHPセキュリティアップデート' } },
          ]}
        />

        {/* Critical Alert Banner */}
        <div style={{
          background: '#fef2f2',
          border: '2px solid #fecaca',
          borderLeft: '6px solid #dc2626',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#991b1b', margin: '0 0 8px' }}>
                PHP Security Update (October 2026)
              </h1>
              <p style={{ fontSize: '14px', color: '#991b1b', margin: '0 0 8px' }}>
                Published October 22, 2026 &middot; Updated October 26, 2026
              </p>
              <p style={{ fontSize: '15px', color: '#991b1b', margin: 0, lineHeight: 1.6 }}>
                Two critical vulnerabilities in PHP (CVE-2026-109618 and CVE-2026-109619) allow attackers to execute
                code remotely on your server <strong>without authentication</strong>. Active attacks have been documented.
              </p>
            </div>
          </div>
        </div>

        {/* Key Warning */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{
            padding: '24px',
            background: '#fffbeb',
            border: '2px solid #fde68a',
            borderRadius: '12px',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#92400e', margin: '0 0 12px' }}>
              Important Notice
            </h2>
            <p style={{ fontSize: '15px', color: '#92400e', margin: 0, lineHeight: 1.8 }}>
              <strong>The vulnerabilities are in PHP, not in the Omise libraries or plugins.</strong><br />
              Updating your store software or the Omise plugin does <strong>NOT</strong> fix them.
            </p>
          </div>
        </section>

        {/* Who Must Act */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
            Who Must Act
          </h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{
              padding: '16px 20px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
            }}>
              <div style={{ fontWeight: 600, color: '#991b1b', marginBottom: '4px' }}>Action Required</div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#991b1b', fontSize: '14px', lineHeight: 1.8 }}>
                <li>Self-hosted PHP store operators using Omise plugins (WooCommerce, Magento, PrestaShop, OpenCart, EC-CUBE)</li>
                <li>Applications using the Omise PHP library</li>
              </ul>
            </div>

            <div style={{
              padding: '16px 20px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
            }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '4px' }}>No Action Required</div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', fontSize: '14px', lineHeight: 1.8 }}>
                <li>Hosted checkout users</li>
                <li>Shopify merchants</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CVE Details */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
            Vulnerability Details
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {cveDetails.map((cve) => (
              <div key={cve.id} style={{
                padding: '20px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 700, color: '#1a1a1a', fontSize: '16px' }}>{cve.id}</span>
                  <span style={{
                    padding: '4px 10px',
                    background: '#dc2626',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '4px',
                  }}>
                    {cve.severity}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  {cve.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Safe Versions */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
            Patched PHP Versions
          </h2>

          <div style={{
            padding: '20px',
            background: '#f0fdf4',
            border: '2px solid #bbf7d0',
            borderRadius: '12px',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid #bbf7d0', color: '#166534', fontWeight: 600 }}>
                    Branch
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid #bbf7d0', color: '#166534', fontWeight: 600 }}>
                    Safe Version
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid #bbf7d0', color: '#166534', fontWeight: 600 }}>
                    Omise Support
                  </th>
                </tr>
              </thead>
              <tbody>
                {phpVersions.map((version) => (
                  <tr key={version.branch}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #bbf7d0', color: '#166534', fontWeight: 500 }}>
                      {version.branch}
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #bbf7d0', color: '#166534', fontWeight: 700 }}>
                      {version.safe}
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #bbf7d0', color: version.support === 'Yes' ? '#166534' : '#9ca3af' }}>
                      {version.support}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: '16px', fontSize: '14px', color: '#697386', lineHeight: 1.6 }}>
            No Omise library or plugin updates are currently required for PHP 8.2-8.4 users.
          </p>
        </section>

        {/* Required Actions */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
            Required Actions
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1A1F71',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0,
              }}>1</span>
              <div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
                  Update PHP
                </div>
                <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Update PHP to the latest patched version within your current branch (see table above).
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1A1F71',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0,
              }}>2</span>
              <div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
                  Restart PHP-FPM or Web Server
                </div>
                <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Restart your PHP-FPM service or web server to apply the update.
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1A1F71',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0,
              }}>3</span>
              <div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
                  Verify PHP Version
                </div>
                <div style={{
                  marginTop: '8px',
                  padding: '12px 16px',
                  background: '#1a2332',
                  borderRadius: '6px',
                }}>
                  <code style={{
                    fontSize: '14px',
                    color: '#e6ebf1',
                    fontFamily: "'SF Mono', Monaco, monospace",
                  }}>
                    php -v
                  </code>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1A1F71',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0,
              }}>4</span>
              <div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
                  Test Your Integration
                </div>
                <ul style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '14px', color: '#697386', lineHeight: 1.8 }}>
                  <li>Checkout flow</li>
                  <li>Order status updates</li>
                  <li>Refunds</li>
                  <li>Error logs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Affected Products */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
            Affected Omise Products
          </h2>

          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px', lineHeight: 1.6 }}>
            If you use any of the following, your server may be vulnerable:
          </p>

          <div style={{ display: 'grid', gap: '8px' }}>
            {affectedProducts.map((product) => (
              <div key={product.name} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
              }}>
                <span style={{ fontWeight: 500, color: '#1a1a1a' }}>{product.name}</span>
                <a
                  href={product.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    color: '#1A1F71',
                    textDecoration: 'none',
                  }}
                >
                  GitHub
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* References */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
            References
          </h2>

          <div style={{ display: 'grid', gap: '8px' }}>
            <a
              href="https://www.php.net/ChangeLog-8.php"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: '#1a1a1a', fontWeight: 500 }}>PHP Changelog</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1F71" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>

            <a
              href="https://nvd.nist.gov/vuln/detail/CVE-2026-109618"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: '#1a1a1a', fontWeight: 500 }}>NVD - CVE-2026-109618</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1F71" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>

            <a
              href="https://nvd.nist.gov/vuln/detail/CVE-2026-109619"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: '#1a1a1a', fontWeight: 500 }}>NVD - CVE-2026-109619</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1F71" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </section>

        {/* Need Help */}
        <section style={{ marginTop: '40px' }}>
          <div style={{
            padding: '24px',
            background: '#f6f9fc',
            borderRadius: '12px',
            border: '1px solid #e3e8ee',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', margin: '0 0 8px' }}>
              Need Help?
            </h3>
            <p style={{ fontSize: '14px', color: '#697386', margin: '0 0 16px', lineHeight: 1.6 }}>
              If you need assistance with updating PHP or have questions about this security advisory,
              please contact our support team.
            </p>
            <a
              href="mailto:support@omise.co"
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
              Contact Support
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
