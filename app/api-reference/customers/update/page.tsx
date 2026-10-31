'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import Notice from './../..//../components/Notice';
import VersionSelector, { VersionDiff } from '../../../components/VersionSelector';
import { customerEndpoints, updateScenarios, languages, methodColors, customerResponseExample } from '../../../lib/customerData';

export default function UpdateCustomerPage() {
  const [activeLangs, setActiveLangs] = useState<Record<number, string>>({
    0: 'curl',
    1: 'curl',
    2: 'curl'
  });

  const config = customerEndpoints.update;
  const methodStyle = methodColors[config.method];

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
          <Link href="/api-reference/customers" style={{ color: '#1A1F71', textDecoration: 'none' }}>Customers</Link>
          {' / '}
          <span style={{ color: '#1a1a1a' }}>{config.title}</span>
        </div>

        <h1 style={{ margin: 0 }}>{config.title}</h1>
        <p className="subtitle">{config.description}</p>

        {/* Endpoint Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#f6f9fc', borderRadius: '6px', padding: '12px 16px', fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', border: '1px solid #e3e8ee', marginBottom: '24px' }}>
          <span style={{ fontWeight: 700, fontSize: '12px', padding: '4px 8px', borderRadius: '4px', background: methodStyle.bg, color: methodStyle.color }}>
            {config.method}
          </span>
          <span style={{ color: '#3c4257' }}>{config.path.replace('https://api.omise.co', '')}</span>
        </div>

        {/* Version Selector */}
        <VersionSelector />
        <VersionDiff />

        {/* Authentication Notice */}
        <div style={{ marginBottom: '24px' }}>
          <Notice type="warning" title="Authentication">
            This endpoint requires <strong>secret key</strong> authentication (skey_...).
            Public keys are not accepted.
          </Notice>
        </div>

        {/* Long Description */}
        {config.longDescription && (
          <div style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px', whiteSpace: 'pre-line' }}>
            {config.longDescription}
          </div>
        )}

        {/* Parameters */}
        <h2>Parameters</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          {config.params.length} parameters
        </p>
        <div className="params-section">
          {config.params.map((param) => (
            <div key={param.name} className="param-row">
              <div className="param-header">
                <span className="param-name">{param.name}</span>
                <span className="param-type">{param.type}</span>
                {param.required ? (
                  <span className="param-required">required</span>
                ) : (
                  <span className="param-optional">optional</span>
                )}
              </div>
              <div className="param-desc">{param.desc}</div>
            </div>
          ))}
        </div>

        {/* Three Scenarios */}
        <h2 style={{ marginTop: '48px' }}>Examples</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '24px' }}>
          The update endpoint supports several common use cases:
        </p>

        {updateScenarios.map((scenario, index) => (
          <div key={scenario.id} style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
              {scenario.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
              {scenario.description}
            </p>

            {/* Language Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setActiveLangs({ ...activeLangs, [index]: lang.id })}
                  style={{
                    padding: '6px 12px',
                    background: activeLangs[index] === lang.id ? '#1A1F71' : '#f6f9fc',
                    color: activeLangs[index] === lang.id ? '#fff' : '#3c4257',
                    border: '1px solid',
                    borderColor: activeLangs[index] === lang.id ? '#1A1F71' : '#e3e8ee',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: activeLangs[index] === lang.id ? 600 : 400,
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            {/* Code Example */}
            <div style={{ background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', color: '#b8c7d9' }}>
                {languages.find(l => l.id === activeLangs[index])?.name}
              </div>
              <pre style={{ padding: '16px', margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
                {scenario.examples[activeLangs[index]] || '// Example not available'}
              </pre>
            </div>
          </div>
        ))}

        {/* Error Handling Notice */}
        <div style={{ marginTop: '24px' }}>
          <Notice type="note" title="Error Handling">
            When a request fails, the API returns an error response with a specific error code.
            See <Link href="/api-reference/customers/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Customer API Error Codes</Link> for a complete reference.
          </Notice>
        </div>

        {/* Navigation to other endpoints */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '16px' }}>Related</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Link
              href="/api-reference/customers"
              style={{ padding: '8px 16px', background: '#f6f9fc', color: '#3c4257', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', border: '1px solid #e3e8ee' }}
            >
              Customer Overview
            </Link>
            {Object.entries(customerEndpoints).filter(([key]) => key !== 'update').map(([key, cfg]) => (
              <Link
                key={key}
                href={`/api-reference/customers/${key}`}
                style={{ padding: '8px 16px', background: '#f6f9fc', color: '#3c4257', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', border: '1px solid #e3e8ee' }}
              >
                {cfg.title}
              </Link>
            ))}
            <Link
              href="/api-reference/customers/errors"
              style={{ padding: '8px 16px', background: '#f6f9fc', color: '#3c4257', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', border: '1px solid #e3e8ee' }}
            >
              Error Codes
            </Link>
          </div>
        </div>
      </main>

      {/* Right Panel - Response Example */}
      <aside className="code-panel">
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            padding: '8px 12px',
            background: 'rgba(205, 61, 100, 0.3)',
            border: '1px solid rgba(205, 61, 100, 0.5)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#ff8fa3',
          }}>
            Requires <strong>secret</strong> key
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>Response</div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#3ecf8e' }}>200 OK</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', maxHeight: '500px', fontFamily: "'SF Mono', Monaco, monospace" }}>
              {customerResponseExample}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
