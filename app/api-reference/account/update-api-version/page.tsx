'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import {
  accountEndpoints,
  accountCodeExamples,
  accountResponseExamples,
  languages,
  methodColors
} from '../../../lib/accountData';

const endpoint = accountEndpoints['update-api-version'];

export default function UpdateApiVersionPage() {
  const [selectedLang, setSelectedLang] = useState('curl');

  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
          <Link href="/api-reference" style={{ color: '#697386', textDecoration: 'none' }}>API Reference</Link>
          <span style={{ color: '#697386' }}>/</span>
          <Link href="/api-reference/account" style={{ color: '#697386', textDecoration: 'none' }}>Account</Link>
          <span style={{ color: '#697386' }}>/</span>
          <span style={{ color: '#1a1a1a', fontWeight: 500 }}>Update API Version</span>
        </div>

        <h1>{endpoint.title}</h1>

        {/* Method + Path */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{
            fontWeight: 700,
            fontSize: '12px',
            padding: '6px 10px',
            borderRadius: '6px',
            background: methodColors[endpoint.method].bg,
            color: methodColors[endpoint.method].color,
            fontFamily: "'SF Mono', Monaco, monospace",
          }}>
            {endpoint.method}
          </span>
          <code style={{
            fontFamily: "'SF Mono', Monaco, monospace",
            fontSize: '14px',
            color: '#3c4257',
            background: '#f6f9fc',
            padding: '6px 12px',
            borderRadius: '6px',
          }}>
            {endpoint.path.replace('https://api.omise.co', '')}
          </code>
        </div>

        <p className="subtitle">{endpoint.description}</p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px' }}>
          {endpoint.longDescription}
        </p>

        {/* Warning Note */}
        <div style={{ padding: '16px 20px', background: '#fff', border: '1px solid #e3e8ee', borderLeft: '4px solid #f59e0b', borderRadius: '8px', marginBottom: '32px' }}>
          <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
            <strong>Warning:</strong> Updating your API version may introduce breaking changes. Test your integration thoroughly in test mode before updating in live mode.
          </p>
        </div>

        {/* Code Examples */}
        <h2>Request</h2>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: selectedLang === lang.id ? '#1A1F71' : '#f6f9fc',
                  color: selectedLang === lang.id ? '#fff' : '#697386',
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <pre style={{
            background: '#1a2332',
            borderRadius: '8px',
            padding: '16px 20px',
            overflow: 'auto',
            fontFamily: "'SF Mono', Monaco, monospace",
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#67e8f9',
          }}>
            {accountCodeExamples['update-api-version'][selectedLang]}
          </pre>
        </div>

        {/* Response */}
        <h2>Response</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Returns the updated Account object with the new API version.
        </p>
        <pre style={{
          background: '#1a2332',
          borderRadius: '8px',
          padding: '16px 20px',
          overflow: 'auto',
          fontFamily: "'SF Mono', Monaco, monospace",
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#a5d6ff',
        }}>
          {accountResponseExamples['update-api-version']}
        </pre>

        {/* Navigation */}
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <Link href="/api-reference/account/update" style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>
            ← Update Account
          </Link>
          <Link href="/api-reference/account/errors" style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>
            Error Codes →
          </Link>
        </div>
      </main>
    </div>
  );
}
