'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarNew from './SidebarNew';
import Notice from './Notice';
import LinkifiedText from './LinkifiedText';
import VersionSelector, { VersionDiff } from './VersionSelector';
import { customerEndpoints, customerCodeExamples, customerResponseExample, customerListResponseExample, customerDestroyResponseExample, languages, methodColors, CustomerEndpointConfig } from '../lib/customerData';
import { API_VERSIONS } from '../lib/apiVersions';
import { useVersion } from '../context/VersionContext';

interface TryItFormProps {
  endpoint: string;
  config: CustomerEndpointConfig;
}

function TryItForm({ endpoint, config }: TryItFormProps) {
  const [secretKey, setSecretKey] = useState('skey_test_');
  const [customerId, setCustomerId] = useState('cust_test_');
  const [values, setValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<{ ip: string; used: number; remaining: number } | null>(null);

  useEffect(() => {
    fetch('/api/rate-limit')
      .then(res => res.json())
      .then(data => setRateLimit(data))
      .catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!secretKey.includes('_test_')) {
      setResponse(JSON.stringify({
        error: 'Live keys not allowed',
        message: 'For security, this documentation site only accepts test keys (skey_test_...). Do not enter live keys here.'
      }, null, 2));
      return;
    }

    setIsLoading(true);
    setResponse(null);

    try {
      let url = config.path.replace(':id', customerId);

      const bodyParams: Record<string, string> = {};

      // Add form values
      Object.entries(values).forEach(([key, value]) => {
        if (value) bodyParams[key] = value;
      });

      // For GET requests, append query parameters to URL
      if (config.method === 'GET' && Object.keys(bodyParams).length > 0) {
        const queryString = new URLSearchParams(bodyParams).toString();
        url = `${url}?${queryString}`;
      }

      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          method: config.method,
          secretKey,
          params: config.method === 'GET' ? {} : bodyParams,
        }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));

      const remaining = res.headers.get('X-RateLimit-Remaining');
      if (remaining && rateLimit) {
        setRateLimit({ ...rateLimit, used: 200 - parseInt(remaining), remaining: parseInt(remaining) });
      }
    } catch (error) {
      setResponse(JSON.stringify({ error: 'Request failed. Check your API key and parameters.' }, null, 2));
    }
    setIsLoading(false);
  };

  const editableParams = config.params.filter(p => p.name !== 'id');
  const needsCustomerId = ['retrieve', 'update', 'destroy'].includes(endpoint);

  return (
    <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '24px', marginTop: '24px', border: '1px solid #e3e8ee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#1A1F71' }}>
          Try It Out
        </div>
        {rateLimit && (
          <div style={{ fontSize: '12px', color: '#697386', fontFamily: "'SF Mono', Monaco, monospace" }}>
            <span style={{ color: '#8792a2' }}>Remaining:</span> <span style={{ color: rateLimit.remaining < 20 ? '#cd3d64' : '#0e6245', fontWeight: 600 }}>{rateLimit.remaining}</span>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
          Secret Key <span style={{ fontWeight: 400, color: '#697386', fontSize: '13px' }}>required</span>
        </label>
        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="skey_test_..."
          style={{ width: '100%', padding: '12px 14px', background: '#fff', border: '2px solid #e3e8ee', borderRadius: '6px', fontSize: '14px', fontFamily: "'SF Mono', Monaco, monospace" }}
        />
      </div>

      {needsCustomerId && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
            Customer ID <span style={{ fontWeight: 400, color: '#697386', fontSize: '13px' }}>required</span>
          </label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="cust_test_..."
            style={{ width: '100%', padding: '12px 14px', background: '#fff', border: '2px solid #e3e8ee', borderRadius: '6px', fontSize: '14px', fontFamily: "'SF Mono', Monaco, monospace" }}
          />
        </div>
      )}

      {editableParams.length > 0 && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e3e8ee' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#697386', marginBottom: '12px' }}>
            {endpoint === 'create' || endpoint === 'update' ? 'Parameters' : 'Optional Parameters'}
          </div>
          {editableParams.map(param => (
            <div key={param.name} style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1a1a1a', marginBottom: '4px' }}>
                {param.name}
                <span style={{ fontWeight: 400, color: '#697386', marginLeft: '8px', fontSize: '12px' }}>{param.type}</span>
              </label>
              {param.options ? (
                <select
                  value={values[param.name] || ''}
                  onChange={(e) => setValues({ ...values, [param.name]: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
                >
                  <option value="">Select...</option>
                  {param.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  type="text"
                  value={values[param.name] || ''}
                  onChange={(e) => setValues({ ...values, [param.name]: e.target.value })}
                  placeholder={param.desc}
                  style={{ width: '100%', padding: '10px 12px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '6px', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}
                />
              )}
              <div style={{ fontSize: '12px', color: '#697386', marginTop: '4px' }}>{param.desc}</div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '14px',
          background: config.method === 'DELETE' ? '#cd3d64' : '#1A1F71',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: 600,
          opacity: isLoading ? 0.7 : 1,
          marginTop: '16px'
        }}
      >
        {isLoading ? 'Sending...' : `Send ${config.method} Request`}
      </button>

      {response && (
        <div style={{ marginTop: '20px', background: '#1a2332', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: response.includes('"error"') || response.includes('"code"') ? '#ff6b6b' : '#3ecf8e' }}>
              {response.includes('"error"') || response.includes('"code"') ? 'Error' : '200 OK'}
            </span>
          </div>
          <pre className="scrollbar-visible" style={{ padding: '16px', margin: 0, fontSize: '13px', color: '#67e8f9', overflow: 'auto', maxHeight: '350px', fontFamily: "'SF Mono', Monaco, monospace" }}>
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}

interface CustomerEndpointPageProps {
  endpointKey: string;
}

export default function CustomerEndpointPage({ endpointKey }: CustomerEndpointPageProps) {
  const [activeLang, setActiveLang] = useState('curl');
  const [showTryIt, setShowTryIt] = useState(false);
  const { currentVersion } = useVersion();

  const config = customerEndpoints[endpointKey];
  const methodStyle = methodColors[config.method];
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);

  // Select appropriate response example
  const getResponseExample = () => {
    if (endpointKey === 'list') return customerListResponseExample;
    if (endpointKey === 'destroy') return customerDestroyResponseExample;
    return customerResponseExample;
  };

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
        {config.params.length > 0 && (
          <>
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
                  <div className="param-desc"><LinkifiedText>{param.desc}</LinkifiedText></div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Try It Button */}
        <button
          onClick={() => setShowTryIt(!showTryIt)}
          style={{
            padding: '14px 28px',
            background: showTryIt ? '#1A1F71' : '#fff',
            color: showTryIt ? '#fff' : '#1A1F71',
            border: '2px solid #1A1F71',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 600,
            marginTop: '24px'
          }}
        >
          {showTryIt ? 'Hide API Tester' : 'Try it out'}
        </button>

        {showTryIt && <TryItForm endpoint={endpointKey} config={config} />}

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
            {Object.entries(customerEndpoints).filter(([key]) => key !== endpointKey).map(([key, cfg]) => (
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

      {/* Right Panel - Code Examples */}
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
              {customerCodeExamples[endpointKey]?.[activeLang] || '// Example not available'}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>Response</div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#3ecf8e' }}>200 OK</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', maxHeight: '400px', fontFamily: "'SF Mono', Monaco, monospace" }}>
              {getResponseExample()}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
