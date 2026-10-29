'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import {
  accountEndpoints,
  accountAttributes,
  accountCodeExamples,
  accountResponseExamples,
  languages,
  methodColors
} from '../../lib/accountData';

export default function AccountOverviewPage() {
  const [selectedLang, setSelectedLang] = useState('curl');

  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        <h1>Account</h1>
        <p className="subtitle">
          The Account object contains information about your Omise account configuration.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Use the Account API to retrieve your account details, update webhook settings, configure chain integration,
          and manage other account-level settings. Both test and live keys return the same account information.
        </p>

        {/* Error Handling Reference */}
        <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
            <strong style={{ color: '#92400e' }}>Error Handling:</strong> When an account operation fails, the API returns a specific error code.
            See <Link href="/api-reference/account/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Account API Error Codes</Link> for a complete reference of all error codes, their meanings, and resolution steps.
          </div>
        </div>

        {/* Related APIs */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related APIs</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <Link href="/api-reference/balance" style={{ color: '#1A1F71', textDecoration: 'none' }}>Balance</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none' }}>Capabilities</Link>
          </div>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          {Object.entries(accountEndpoints).map(([key, config]) => {
            const methodStyle = methodColors[config.method];
            return (
              <Link
                key={key}
                href={`/api-reference/account/${key}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: '#fff',
                  border: '1px solid #e3e8ee',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
              >
                <span style={{
                  fontWeight: 700,
                  fontSize: '11px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: methodStyle.bg,
                  color: methodStyle.color,
                  fontFamily: "'SF Mono', Monaco, monospace",
                  minWidth: '52px',
                  textAlign: 'center'
                }}>
                  {config.method}
                </span>
                <span style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', color: '#3c4257' }}>
                  {config.path.replace('https://api.omise.co', '')}
                </span>
                <span style={{ marginLeft: 'auto', color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
                  {config.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* The Account Object */}
        <h2>The Account Object</h2>
        <div className="attributes-section">
          {accountAttributes.map(attr => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">{attr.name}</div>
                <div className="attribute-meta">{attr.type}</div>
              </div>
              <div className="attribute-desc">{attr.desc}</div>
            </div>
          ))}
        </div>

        {/* Example Response */}
        <h2 style={{ marginTop: '48px' }}>Example Response</h2>
        <div style={{ marginBottom: '16px' }}>
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
            {accountCodeExamples.retrieve[selectedLang]}
          </pre>
        </div>

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
          {accountResponseExamples.retrieve}
        </pre>

        <div style={{ marginTop: '48px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <Link href="/openapi.yaml" style={{ color: '#1A1F71' }}>openapi.yaml</Link>
        </div>
      </main>
    </div>
  );
}
