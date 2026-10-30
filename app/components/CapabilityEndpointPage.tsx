'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from './SidebarNew';
import Notice from './Notice';
import VersionSelector, { VersionDiff } from './VersionSelector';
import { capabilityEndpoints, capabilityCodeExamples, capabilityResponseExample, languages, methodColors, EndpointConfig } from '../lib/accountData';
import { API_VERSIONS } from '../lib/apiVersions';
import { useVersion } from '../context/VersionContext';

interface CapabilityEndpointPageProps {
  endpointKey: string;
}

export default function CapabilityEndpointPage({ endpointKey }: CapabilityEndpointPageProps) {
  const [activeLang, setActiveLang] = useState('curl');
  const { currentVersion } = useVersion();

  const config = capabilityEndpoints[endpointKey];
  const methodStyle = methodColors[config.method];
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);

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
          <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none' }}>Capability</Link>
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
          <span style={{ color: '#3c4257' }}>{config.path}</span>
        </div>

        {/* Version Selector */}
        <VersionSelector />
        <VersionDiff />

        {/* Public Key Notice */}
        <div style={{ marginBottom: '24px' }}>
          <Notice type="note" title="Authentication">
            This endpoint uses your <strong>public key</strong> (pkey_test_...) for authentication, not your secret key.
            This allows you to safely call it from client-side code.
          </Notice>
        </div>

        {/* Long Description */}
        {config.longDescription && (
          <div style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px', whiteSpace: 'pre-line' }}>
            {config.longDescription}
          </div>
        )}

        {/* Parameters */}
        {config.params.length > 0 && (
          <>
            <h2>Parameters</h2>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
              {config.params.length} parameters available
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
          </>
        )}

        {config.params.length === 0 && (
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px', fontSize: '14px', color: '#697386' }}>
            This endpoint has no parameters.
          </div>
        )}

        {/* Error Handling Notice */}
        <div style={{ marginTop: '24px' }}>
          <Notice type="warning" title="Error Handling">
            When a request fails, the API returns an error response with a specific error code.
            See <Link href="/api-reference/capabilities/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Capability API Error Codes</Link> for a complete reference.
          </Notice>
        </div>

        {/* Navigation to other endpoints */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '16px' }}>Related</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Link
              href="/api-reference/capabilities"
              style={{ padding: '8px 16px', background: '#f6f9fc', color: '#3c4257', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', border: '1px solid #e3e8ee' }}
            >
              Capability Overview
            </Link>
            <Link
              href="/api-reference/capabilities/errors"
              style={{ padding: '8px 16px', background: '#f6f9fc', color: '#3c4257', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', border: '1px solid #e3e8ee' }}
            >
              Error Codes
            </Link>
          </div>
        </div>
      </main>

      {/* Right Panel - Code Examples */}
      <aside className="code-panel">
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            padding: '8px 12px',
            background: 'rgba(14, 98, 69, 0.3)',
            border: '1px solid rgba(62, 207, 142, 0.3)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#3ecf8e',
          }}>
            Uses <strong>public key</strong> authentication
          </div>
        </div>

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
              {capabilityCodeExamples[endpointKey]?.[activeLang] || '// Example not available'}
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
              {capabilityResponseExample}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
