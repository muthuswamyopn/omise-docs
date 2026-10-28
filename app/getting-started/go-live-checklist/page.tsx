'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import InfoCallout from '../../components/InfoCallout';

const checklist = [
  {
    category: 'Account Setup',
    items: [
      { task: 'Complete business profile in dashboard', done: false },
      { task: 'Submit merchant application form', done: false },
      { task: 'Provide required verification documents', done: false },
      { task: 'Pass KYC verification (approx. 30 business days)', done: false },
      { task: 'Receive live API keys', done: false },
    ],
  },
  {
    category: 'Integration Testing',
    items: [
      { task: 'Test all payment flows with test keys', done: false },
      { task: 'Test successful payment scenarios', done: false },
      { task: 'Test failed payment scenarios (declined cards)', done: false },
      { task: 'Test 3D Secure flows if enabled', done: false },
      { task: 'Test refund and void workflows', done: false },
      { task: 'Verify webhook endpoint receives events', done: false },
    ],
  },
  {
    category: 'Security',
    items: [
      { task: 'Implement HTTPS on all checkout pages', done: false },
      { task: 'Configure TLS 1.2 minimum with supported ciphers', done: false },
      { task: 'Never log or store card details on your servers', done: false },
      { task: 'Store API keys in environment variables, not code', done: false },
      { task: 'Enable two-factor authentication on dashboard', done: false },
      { task: 'Review team member dashboard access permissions', done: false },
    ],
  },
  {
    category: 'Production Readiness',
    items: [
      { task: 'Switch from test keys to live keys', done: false },
      { task: 'Configure live webhook endpoint', done: false },
      { task: 'Verify live webhook signature validation', done: false },
      { task: 'Set up error monitoring and alerting', done: false },
      { task: 'Test one small live transaction', done: false },
    ],
  },
];

const documents = {
  thailand: {
    individual: [
      'National ID card (front and back)',
      'Bank passbook or statement',
      'Website or app screenshots',
    ],
    company: [
      'Company registration certificate (DBD)',
      'VAT registration (PP.20)',
      'Director ID card',
      'Company bank account details',
      'Website or app screenshots',
    ],
  },
  singapore: {
    individual: [
      'NRIC or Passport',
      'Bank statement (last 3 months)',
      'Proof of business registration (if applicable)',
    ],
    company: [
      'ACRA Bizfile',
      'Director/Shareholder identification',
      'Company bank account statement',
      'Certificate of Incumbency (if foreign company)',
    ],
  },
  malaysia: {
    individual: [
      'MyKad (front and back)',
      'Bank statement',
      'Business registration (SSM)',
    ],
    company: [
      'SSM Company Profile (Form 9 & 49)',
      'Director IC/Passport',
      'Company bank statement',
      'Board resolution (if applicable)',
    ],
  },
  japan: {
    individual: [
      'Government-issued ID',
      'Bank account information',
      'Business registration documents',
    ],
    company: [
      'Certificate of Registration (登記簿謄本)',
      'Articles of Incorporation',
      'Representative Director ID',
      'Company bank account details',
    ],
  },
};

export default function GoLiveChecklistPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Getting Started', th: 'เริ่มต้นใช้งาน', ja: '始めに' }, href: '/getting-started' },
            { label: { en: 'Go Live Checklist', th: 'รายการตรวจสอบก่อนใช้งานจริง', ja: '本番開始チェックリスト' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Go Live Checklist
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Complete these steps to activate your live account and start processing real payments.
        </p>

        {/* Process Overview */}
        <section id="process" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Activation Process
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[
              { step: '1', title: 'Apply', desc: 'Submit merchant application' },
              { step: '2', title: 'Documents', desc: 'Upload verification docs' },
              { step: '3', title: 'Review', desc: 'KYC team reviews (~30 days)' },
              { step: '4', title: 'Approval', desc: 'Receive live keys' },
              { step: '5', title: 'Launch', desc: 'Switch to live mode' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 700, fontSize: '14px' }}>
                  {s.step}
                </div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '13px', marginBottom: '4px' }}>{s.title}</div>
                <div style={{ fontSize: '11px', color: '#697386' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section id="checklist" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Complete Checklist
          </h2>

          {checklist.map((category) => (
            <div key={category.category} style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
                {category.category}
              </h3>
              <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                {category.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderBottom: i < category.items.length - 1 ? '1px solid #e3e8ee' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: '2px solid #e3e8ee',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: '14px', color: '#3c4257' }}>{item.task}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Documents by Country */}
        <section id="documents" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Required Documents by Country
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {Object.entries(documents).map(([country, types]) => (
              <div key={country} style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', background: '#f6f9fc', borderBottom: '1px solid #e3e8ee' }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>
                    {country === 'thailand' ? '🇹🇭' : country === 'singapore' ? '🇸🇬' : country === 'malaysia' ? '🇲🇾' : '🇯🇵'}
                  </span>
                  <span style={{ fontWeight: 600, color: '#1a1a1a', textTransform: 'capitalize' }}>{country}</span>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase', marginBottom: '8px' }}>Individual</div>
                    <ul style={{ fontSize: '13px', color: '#3c4257', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                      {types.individual.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase', marginBottom: '8px' }}>Company</div>
                    <ul style={{ fontSize: '13px', color: '#3c4257', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                      {types.company.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Keys Transition */}
        <section id="keys" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Switching to Live Keys
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            After approval, you receive live API keys that are distinct from your test keys:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px 20px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '8px' }}>Test Mode</div>
              <code style={{ display: 'block', fontSize: '13px', color: '#78350f', fontFamily: "'SF Mono', Monaco, monospace", marginBottom: '4px' }}>pkey_test_...</code>
              <code style={{ display: 'block', fontSize: '13px', color: '#78350f', fontFamily: "'SF Mono', Monaco, monospace" }}>skey_test_...</code>
            </div>
            <div style={{ padding: '16px 20px', background: '#dcfce7', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Live Mode</div>
              <code style={{ display: 'block', fontSize: '13px', color: '#166534', fontFamily: "'SF Mono', Monaco, monospace", marginBottom: '4px' }}>pkey_...</code>
              <code style={{ display: 'block', fontSize: '13px', color: '#166534', fontFamily: "'SF Mono', Monaco, monospace" }}>skey_...</code>
            </div>
          </div>

          <InfoCallout type="warning" title={{ en: 'Important', th: 'สำคัญ', ja: '重要' }}>
            Update both public and secret keys in your application. Use environment variables to
            manage keys for different environments (development, staging, production).
          </InfoCallout>
        </section>

        {/* Support */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Need Help?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Support Team</div>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Email <a href="mailto:support@omise.co" style={{ color: '#1A1F71' }}>support@omise.co</a> for
                account activation questions or document requirements.
              </p>
            </div>
            <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Service Status</div>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Check <a href="https://status.omise.co" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71' }}>status.omise.co</a> for
                real-time API and dashboard availability.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
