'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Notice from '../../../components/Notice';
import {
  balanceCodeExamples,
  balanceResponseExample,
  languages,
  methodColors
} from '../../../lib/accountData';

export default function RetrieveBalancePage() {
  const [activeLang, setActiveLang] = useState('curl');

  const methodStyle = methodColors.GET;

  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#1A1F71', textDecoration: 'none' }}>Documentation</Link>
          {' / '}
          <Link href="/api-reference" style={{ color: '#1A1F71', textDecoration: 'none' }}>API Reference</Link>
          {' / '}
          <Link href="/api-reference/balance" style={{ color: '#1A1F71', textDecoration: 'none' }}>Balance</Link>
          {' / '}
          <span style={{ color: '#1a1a1a' }}>Retrieve balance</span>
        </div>

        <h1 style={{ margin: 0 }}>Retrieve balance</h1>
        <p className="subtitle">Retrieves the current balance of your Omise account.</p>

        {/* Endpoint Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#f6f9fc', borderRadius: '6px', padding: '12px 16px', fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', border: '1px solid #e3e8ee', marginBottom: '24px' }}>
          <span style={{ fontWeight: 700, fontSize: '12px', padding: '4px 8px', borderRadius: '4px', background: methodStyle.bg, color: methodStyle.color }}>
            GET
          </span>
          <span style={{ color: '#3c4257' }}>https://api.omise.co/balance</span>
        </div>

        {/* Long Description */}
        <div style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px' }}>
          <p style={{ marginBottom: '16px' }}>
            Returns the current balance for your account. The balance includes several components:
          </p>
          <ul style={{ margin: 0, paddingLeft: '24px', lineHeight: 1.8 }}>
            <li><strong>total</strong> - Total balance after fees have been deducted</li>
            <li><strong>transferable</strong> - Amount available for immediate transfer to your bank account</li>
            <li><strong>reserve</strong> - Funds held in reserve as a security buffer</li>
            <li><strong>on_hold</strong> - Funds temporarily held due to pending disputes or reviews</li>
          </ul>
        </div>

        {/* Note about test/live mode */}
        <Notice type="note">
          The balance returned depends on the API key used. Test mode keys return test balances, while live mode keys return actual balances.
        </Notice>

        {/* Parameters */}
        <h2>Parameters</h2>
        <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#697386', margin: 0 }}>
            No parameters required. This endpoint only requires authentication with your secret key.
          </p>
        </div>

        {/* Error Handling Notice */}
        <div style={{ marginTop: '24px' }}>
          <Notice type="warning" title="Error Handling">
            When a request fails, the API returns an error response with a specific error code.
            See <Link href="/api-reference/balance/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Balance API Error Codes</Link> for a complete reference.
          </Notice>
        </div>

        {/* Navigation to other endpoints */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '16px' }}>Related APIs</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Link
              href="/api-reference/account"
              style={{ padding: '8px 16px', background: '#f6f9fc', color: '#3c4257', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', border: '1px solid #e3e8ee' }}
            >
              Account
            </Link>
            <Link
              href="/api-reference/capabilities"
              style={{ padding: '8px 16px', background: '#f6f9fc', color: '#3c4257', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', border: '1px solid #e3e8ee' }}
            >
              Capabilities
            </Link>
          </div>
        </div>
      </main>

      {/* Right Panel - Code Examples */}
      <aside className="code-panel">
        <div style={{ marginBottom: '24px' }}>
          <select
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#fff', fontSize: '14px', cursor: 'pointer' }}
          >
            {languages.map(lang => <option key={lang.id} value={lang.id} style={{ background: '#1a2332' }}>{lang.name}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Request
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              {languages.find(l => l.id === activeLang)?.name}
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
              {balanceCodeExamples.retrieve[activeLang] || '// Example not available'}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>Response</div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#3ecf8e' }}>200 OK</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', maxHeight: '500px', fontFamily: "'SF Mono', Monaco, monospace" }}>
              {balanceResponseExample}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
