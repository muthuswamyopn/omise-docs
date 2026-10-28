'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import InfoCallout from '../../components/InfoCallout';

const dashboardSections = [
  {
    name: 'Home',
    description: 'Overview of account activity, recent transactions, and key metrics.',
    features: ['Transaction volume charts', 'Recent charges and refunds', 'Account balance summary'],
  },
  {
    name: 'Transactions',
    description: 'View and manage all payment transactions.',
    features: ['Charges list with filters', 'Refund management', 'Export to CSV', 'Search by ID or customer'],
  },
  {
    name: 'Customers',
    description: 'Manage saved customer records and their payment methods.',
    features: ['Customer list and details', 'Saved cards management', 'Transaction history per customer'],
  },
  {
    name: 'Transfers',
    description: 'Manage payouts to bank accounts and recipients.',
    features: ['Transfer list and status', 'Recipient management', 'Schedule configuration', 'Bank verification'],
  },
  {
    name: 'Disputes',
    description: 'Handle chargebacks and dispute evidence submission.',
    features: ['Open disputes list', 'Evidence upload', 'Response deadlines', 'Resolution tracking'],
  },
  {
    name: 'Reports',
    description: 'Generate financial reports and settlement summaries.',
    features: ['Daily settlement reports', 'Monthly summaries', 'Fee breakdowns', 'Export options'],
  },
];

const apiSections = [
  {
    name: 'Keys',
    description: 'Manage your public and secret API keys for test and live modes.',
    path: '/api-reference',
  },
  {
    name: 'Webhooks',
    description: 'Configure webhook endpoints to receive event notifications.',
    path: '/integrations/advanced/webhooks',
  },
  {
    name: 'Events',
    description: 'View webhook delivery history and event logs.',
    path: '/api-reference/events',
  },
  {
    name: 'Logs',
    description: 'Debug API requests with detailed request/response logs.',
    path: '/api-reference',
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Getting Started', th: 'เริ่มต้นใช้งาน', ja: '始めに' }, href: '/getting-started' },
            { label: { en: 'Dashboard Overview', th: 'ภาพรวม Dashboard', ja: 'ダッシュボード概要' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Dashboard Overview
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          The Omise dashboard provides a complete interface for managing your payments,
          customers, transfers, and account settings.
        </p>

        {/* Access */}
        <section id="access" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Accessing the Dashboard
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Access your dashboard at <a href="https://dashboard.omise.co" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71', fontWeight: 500 }}>dashboard.omise.co</a>.
            Log in with your registered email and password.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px 20px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', background: '#fde68a', color: '#92400e', borderRadius: '4px' }}>TEST</span>
                <span style={{ fontWeight: 600, color: '#92400e' }}>Test Mode</span>
              </div>
              <p style={{ fontSize: '13px', color: '#78350f', margin: 0 }}>
                Simulate payments without real transactions. Toggle from the dashboard header.
              </p>
            </div>
            <div style={{ padding: '16px 20px', background: '#dcfce7', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', background: '#bbf7d0', color: '#166534', borderRadius: '4px' }}>LIVE</span>
                <span style={{ fontWeight: 600, color: '#166534' }}>Live Mode</span>
              </div>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0 }}>
                Process real payments after KYC verification. All transactions are real.
              </p>
            </div>
          </div>

          <InfoCallout type="tip" title={{ en: 'Security', th: 'ความปลอดภัย', ja: 'セキュリティ' }}>
            Enable two-factor authentication (2FA) for enhanced security. Find this option under
            Account Settings → Security.
          </InfoCallout>
        </section>

        {/* Main Sections */}
        <section id="sections" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Dashboard Sections
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {dashboardSections.map((section) => (
              <div key={section.name} style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>{section.name}</div>
                <p style={{ fontSize: '14px', color: '#697386', marginBottom: '12px' }}>{section.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {section.features.map((feature, i) => (
                    <span key={i} style={{ padding: '4px 10px', background: '#f6f9fc', borderRadius: '4px', fontSize: '12px', color: '#3c4257' }}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Section */}
        <section id="api" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            API & Developer Tools
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            The API section contains all developer-related settings and tools:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {apiSections.map((section) => (
              <Link
                key={section.name}
                href={section.path}
                style={{
                  display: 'block',
                  padding: '16px 20px',
                  background: '#f6f9fc',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1px solid transparent',
                }}
              >
                <div style={{ fontWeight: 600, color: '#1A1F71', marginBottom: '4px' }}>{section.name}</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>{section.description}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Team Management */}
        <section id="team" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Team Management
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Invite team members with different permission levels to access your dashboard:
          </p>

          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Role</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Permissions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { role: 'Owner', permissions: 'Full access including billing, team management, and API keys' },
                  { role: 'Admin', permissions: 'Manage transactions, customers, transfers, and view reports' },
                  { role: 'Analyst', permissions: 'View transactions and reports (read-only)' },
                  { role: 'Support', permissions: 'View and refund transactions, manage disputes' },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>{r.role}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>{r.permissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Account Settings */}
        <section id="settings" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Account Settings
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { title: 'Profile', desc: 'Business name, contact info, logo' },
              { title: 'Security', desc: '2FA, password, sessions' },
              { title: 'Notifications', desc: 'Email alerts for events' },
              { title: 'Billing', desc: 'Invoices, fee structure' },
              { title: 'Bank Accounts', desc: 'Payout destinations' },
              { title: 'Capabilities', desc: 'Enabled payment methods' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px', fontSize: '14px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
