'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarNew from './SidebarNew';
import VersionSelector from './VersionSelector';
import { endpoints, codeExamples, responseExamples, languages, methodColors, EndpointConfig } from '../lib/chargeData';
import { API_VERSIONS, ApiVersion } from '../lib/apiVersions';
import { useVersion } from '../context/VersionContext';

interface TryItFormProps {
  endpoint: string;
  config: EndpointConfig;
  version: string;
  versionDate: string;
}

function TryItForm({ endpoint, config, version, versionDate }: TryItFormProps) {
  const [secretKey, setSecretKey] = useState('skey_test_');
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(config.params.map(p => [p.name, p.default || '']))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [rateLimit, setRateLimit] = useState<{ ip: string; used: number; remaining: number } | null>(null);

  // Fetch rate limit status on mount
  useEffect(() => {
    fetch('/api/rate-limit')
      .then(res => res.json())
      .then(data => setRateLimit(data))
      .catch(() => {});
  }, []);

  const handleSubmit = async () => {
    // Reject live keys - only allow test keys
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
      let url = config.path;
      const bodyParams: Record<string, string> = {};

      config.params.forEach(param => {
        const value = values[param.name];
        if (value) {
          if (param.inPath) {
            url = url.replace(':id', value);
          } else {
            bodyParams[param.name] = value;
          }
        }
      });

      // Use proxy API route to avoid CORS issues
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          method: config.method,
          secretKey,
          params: bodyParams,
          version: versionDate, // Pass version to proxy
        }),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));

      // Update rate limit from response headers
      const remaining = res.headers.get('X-RateLimit-Remaining');
      if (remaining && rateLimit) {
        setRateLimit({ ...rateLimit, used: 200 - parseInt(remaining), remaining: parseInt(remaining) });
      }
    } catch (error) {
      setResponse(JSON.stringify({ error: 'Request failed. Check your secret key and parameters.' }, null, 2));
    }
    setIsLoading(false);
  };

  return (
    <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '24px', marginTop: '24px', border: '1px solid #e3e8ee' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#1A1F71' }}>
          Try It Out
        </div>
        {rateLimit && (
          <div style={{ fontSize: '12px', color: '#697386', fontFamily: "'SF Mono', Monaco, monospace" }}>
            <span style={{ color: '#8792a2' }}>IP:</span> {rateLimit.ip}
            <span style={{ margin: '0 12px', color: '#e3e8ee' }}>|</span>
            <span style={{ color: '#8792a2' }}>Used:</span> <span style={{ color: '#1a1a1a', fontWeight: 600 }}>{rateLimit.used}</span>
            <span style={{ margin: '0 12px', color: '#e3e8ee' }}>|</span>
            <span style={{ color: '#8792a2' }}>Remaining:</span> <span style={{ color: rateLimit.remaining < 20 ? '#cd3d64' : '#0e6245', fontWeight: 600 }}>{rateLimit.remaining}</span>
          </div>
        )}
      </div>

      {/* Version Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        background: '#e0f2fe',
        borderRadius: '6px',
        marginBottom: '16px',
        fontSize: '13px',
        color: '#0369a1'
      }}>
        <strong>API Version:</strong>
        <code style={{ background: '#fff', padding: '2px 8px', borderRadius: '4px' }}>{versionDate}</code>
        <span style={{ color: '#0ea5e9' }}>({version})</span>
      </div>

      {/* Test Key Warning */}
      <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#92400e' }}>
        <strong>Use test keys only.</strong> Do not enter live keys. This is a public documentation site.
      </div>

      {/* Secret Key Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
          Secret Key
          <span style={{ fontWeight: 400, color: '#697386', marginLeft: '8px', fontSize: '13px' }}>required</span>
        </label>
        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="skey_test_..."
          style={{ width: '100%', padding: '12px 14px', background: '#fff', border: '2px solid #e3e8ee', borderRadius: '6px', fontSize: '14px', fontFamily: "'SF Mono', Monaco, monospace" }}
        />
      </div>

      {config.params.map((param) => (
        <div key={param.name} style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
            {param.name}
            {param.required === true && <span style={{ color: '#cd3d64', marginLeft: '6px' }}>*</span>}
            {param.required === 'conditional' && <span style={{ color: '#9c6f19', marginLeft: '6px', fontSize: '11px' }}>conditional</span>}
            <span style={{ fontWeight: 400, color: '#697386', marginLeft: '8px', fontSize: '13px' }}>{param.type}</span>
          </label>
          {param.options ? (
            <select
              value={values[param.name]}
              onChange={(e) => setValues({ ...values, [param.name]: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', background: '#fff', border: '2px solid #e3e8ee', borderRadius: '6px', fontSize: '14px' }}
            >
              {param.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <input
              type="text"
              value={values[param.name]}
              onChange={(e) => setValues({ ...values, [param.name]: e.target.value })}
              placeholder={param.desc}
              style={{ width: '100%', padding: '12px 14px', background: '#fff', border: '2px solid #e3e8ee', borderRadius: '6px', fontSize: '14px', fontFamily: "'SF Mono', Monaco, monospace" }}
            />
          )}
          <div style={{ fontSize: '13px', color: '#697386', marginTop: '6px' }}>{param.desc}</div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{ width: '100%', padding: '14px', background: '#1A1F71', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 600, opacity: isLoading ? 0.7 : 1 }}
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

// Parameter availability by version
const PARAM_VERSIONS: Record<string, string> = {
  // Params available from aegaeon (all versions)
  'amount': 'aegaeon',
  'currency': 'aegaeon',
  'card': 'aegaeon',
  'customer': 'aegaeon',
  'description': 'aegaeon',
  'metadata': 'aegaeon',
  'capture': 'aegaeon',
  'return_uri': 'aegaeon',
  'ip': 'aegaeon',
  'id': 'aegaeon',
  'limit': 'aegaeon',
  'offset': 'aegaeon',
  'from': 'aegaeon',
  'to': 'aegaeon',
  'order': 'aegaeon',
  // Params added in bestla
  'offsite': 'bestla',
  // Params added in cordelia
  'source': 'cordelia',
  'platform_fee': 'cordelia',
  'zero_interest_installments': 'cordelia',
  'authorization_type': 'cordelia',
  'capture_amount': 'cordelia',
  'expires_at': 'cordelia',
  'webhook_endpoints': 'cordelia',
  // Params added in deimos
  'idempotency_key': 'deimos',
  'first_charge': 'deimos',
  'transaction_indicator': 'deimos',
  'recurring_reason': 'deimos',
  'ref_id': 'deimos',
  'statement_descriptor': 'deimos',
};

function isParamAvailable(paramName: string, version: string): boolean {
  const versionOrder = ['aegaeon', 'bestla', 'cordelia', 'deimos'];
  const currentIndex = versionOrder.indexOf(version);
  const paramVersion = PARAM_VERSIONS[paramName] || 'aegaeon';
  const paramIndex = versionOrder.indexOf(paramVersion);
  return currentIndex >= paramIndex;
}

// Endpoint availability by version
const ENDPOINT_VERSIONS: Record<string, string> = {
  'create': 'aegaeon',
  'retrieve': 'aegaeon',
  'list': 'aegaeon',
  'update': 'aegaeon',
  'capture': 'aegaeon',
  'reverse': 'aegaeon',
  'expire': 'cordelia',
  'mark-as-paid': 'deimos',
  'mark-as-failed': 'deimos',
};

function isEndpointAvailable(endpointKey: string, version: string): boolean {
  const versionOrder = ['aegaeon', 'bestla', 'cordelia', 'deimos'];
  const currentIndex = versionOrder.indexOf(version);
  const endpointVersion = ENDPOINT_VERSIONS[endpointKey] || 'aegaeon';
  const endpointIndex = versionOrder.indexOf(endpointVersion);
  return currentIndex >= endpointIndex;
}

interface EndpointPageProps {
  endpointKey: string;
  currentPage: string;
}

export default function EndpointPage({ endpointKey, currentPage }: EndpointPageProps) {
  const [activeLang, setActiveLang] = useState('curl');
  const [showTryIt, setShowTryIt] = useState(false);
  const { currentVersion, setCurrentVersion } = useVersion();

  const config = endpoints[endpointKey];
  const methodStyle = methodColors[config.method];
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);

  // Filter params based on version
  const availableParams = config.params.filter(p => isParamAvailable(p.name, currentVersion));

  // Navigation links for related endpoints (filtered by version)
  const allEndpoints = ['create', 'retrieve', 'list', 'update', 'capture', 'reverse', 'expire', 'mark-as-paid', 'mark-as-failed'];
  const availableEndpoints = allEndpoints.filter(e => isEndpointAvailable(e, currentVersion));

  // Check if current endpoint is available in selected version
  const endpointAvailable = isEndpointAvailable(endpointKey, currentVersion);

  return (
    <div className="docs-layout">
      <SidebarNew />

      {/* Center Content */}
      <main className="content">
        {/* Breadcrumb */}
        <div style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#1A1F71', textDecoration: 'none' }}>Documentation</Link>
          {' / '}
          <Link href="/api-reference" style={{ color: '#1A1F71', textDecoration: 'none' }}>API Reference</Link>
          {' / '}
          <Link href="/api-reference/charges" style={{ color: '#1A1F71', textDecoration: 'none' }}>Charges</Link>
          {' / '}
          <span style={{ color: '#1a1a1a' }}>{config.title}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0 }}>{config.title}</h1>
          {config.testModeOnly && (
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '4px',
              background: '#fef3c7',
              color: '#92400e',
              border: '1px solid #f59e0b',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Test Mode Only
            </span>
          )}
        </div>
        <p className="subtitle">{config.description}</p>

        {/* Version Selector */}
        <VersionSelector />

        {/* Endpoint Not Available Warning */}
        {!endpointAvailable && (
          <div style={{ background: '#fde2dd', border: '1px solid #cd3d64', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ fontWeight: 600, color: '#cd3d64', marginBottom: '4px' }}>Endpoint Not Available</div>
            <div style={{ fontSize: '14px', color: '#9f1239', lineHeight: 1.6 }}>
              This endpoint was added in <strong>{ENDPOINT_VERSIONS[endpointKey]}</strong> and is not available in <strong>{currentVersion}</strong>.
              Select a newer API version to use this endpoint.
            </div>
          </div>
        )}

        {/* Test Mode Warning */}
        {config.testModeOnly && endpointAvailable && (
          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>Test Mode Only</div>
            <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
              This endpoint only works with test mode API keys (<code style={{ background: '#fde68a', padding: '2px 6px', borderRadius: '4px' }}>skey_test_...</code>).
              Calling this endpoint with a live mode key will return a <code style={{ background: '#fde68a', padding: '2px 6px', borderRadius: '4px' }}>400 Bad Request</code> error.
            </div>
          </div>
        )}

        {/* Endpoint Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#f6f9fc', borderRadius: '6px', padding: '12px 16px', fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', border: '1px solid #e3e8ee', marginBottom: '24px', opacity: endpointAvailable ? 1 : 0.5 }}>
          <span style={{ fontWeight: 700, fontSize: '12px', padding: '4px 8px', borderRadius: '4px', background: methodStyle.bg, color: methodStyle.color }}>
            {config.method}
          </span>
          <span style={{ color: '#3c4257' }}>{config.path}</span>
        </div>

        {/* Long Description */}
        {config.longDescription && endpointAvailable && (
          <div style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px', whiteSpace: 'pre-line' }}>
            {config.longDescription}
          </div>
        )}

        {/* Conditional Requirements for Create */}
        {endpointKey === 'create' && endpointAvailable && (
          <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
            <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>Conditional Requirements</div>
            <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
              {currentVersion === 'aegaeon' || currentVersion === 'bestla' ? (
                <>Provide exactly one payment method: <code style={{ background: '#fde68a', padding: '2px 6px', borderRadius: '4px' }}>card</code>, <code style={{ background: '#fde68a', padding: '2px 6px', borderRadius: '4px' }}>offsite</code>, or <code style={{ background: '#fde68a', padding: '2px 6px', borderRadius: '4px' }}>customer</code>.</>
              ) : (
                <>Provide exactly one payment method: <code style={{ background: '#fde68a', padding: '2px 6px', borderRadius: '4px' }}>card</code>, <code style={{ background: '#fde68a', padding: '2px 6px', borderRadius: '4px' }}>source</code>, or <code style={{ background: '#fde68a', padding: '2px 6px', borderRadius: '4px' }}>customer</code>.</>
              )}
            </div>
          </div>
        )}

        {/* Parameters */}
        {endpointAvailable && (
          <>
            <h2>Parameters <span style={{ fontSize: '14px', fontWeight: 400, color: '#697386' }}>({availableParams.length} in {currentVersion})</span></h2>
            <div className="params-section">
              {availableParams.map((param) => (
                <div key={param.name} className="param-row">
                  <div className="param-header">
                    <span className="param-name">{param.name}</span>
                    <span className="param-type">{param.type}</span>
                    {param.required === true && <span className="param-required">required</span>}
                    {param.required === 'conditional' && <span style={{ fontSize: '11px', fontWeight: 600, color: '#9c6f19', textTransform: 'uppercase' }}>conditional</span>}
                    {param.required === false && <span className="param-optional">optional</span>}
                  </div>
                  <div className="param-desc">{param.desc}</div>
                  {param.options && (
                    <div className="enum-values">
                      {param.options.map(opt => <span key={opt} className="enum-value">{opt}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Error Handling Notice */}
            <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginTop: '24px' }}>
              <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
                <strong style={{ color: '#92400e' }}>Error Handling:</strong> When a request fails, the API returns an error response with a specific error code.
                See <Link href="/api-reference/charges/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Charges API Error Codes</Link> for a complete reference.
              </div>
            </div>

            {/* Try It Button */}
            <button
              onClick={() => setShowTryIt(!showTryIt)}
              style={{ padding: '14px 28px', background: showTryIt ? '#1A1F71' : '#fff', color: showTryIt ? '#fff' : '#1A1F71', border: '2px solid #1A1F71', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 600, marginTop: '24px' }}
            >
              {showTryIt ? 'Hide API Tester' : 'Try it out'}
            </button>

            {showTryIt && (
              <TryItForm
                endpoint={endpointKey}
                config={{ ...config, params: availableParams }}
                version={currentVersion}
                versionDate={versionInfo?.date || '2019-05-29'}
              />
            )}
          </>
        )}

        {/* Navigation to other endpoints */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '16px' }}>
            Other Charge Endpoints <span style={{ fontWeight: 400 }}>({availableEndpoints.length - 1} in {currentVersion})</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {availableEndpoints.filter(e => e !== endpointKey).map(e => (
              <Link
                key={e}
                href={`/api-reference/charges/${e}`}
                style={{ padding: '8px 16px', background: '#f6f9fc', color: '#3c4257', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', border: '1px solid #e3e8ee' }}
              >
                {endpoints[e].title}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Right Panel - Code Examples */}
      <aside className="code-panel">
        {/* Version Badge */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#b8c7d9',
            marginBottom: '8px'
          }}>
            API Version
          </div>
          <div style={{
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#fff',
          }}>
            <span style={{ color: '#3ecf8e', fontWeight: 600 }}>{currentVersion}</span>
            <span style={{ color: '#8792a2', marginLeft: '8px' }}>{versionInfo?.date}</span>
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
              {activeLang === 'curl'
                ? `${codeExamples[endpointKey]?.curl || '# Example not available'}\n  -H "Omise-Version: ${versionInfo?.date}"`
                : codeExamples[endpointKey]?.[activeLang] || '// Example not available'
              }
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>Response</div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: endpointAvailable ? '#3ecf8e' : '#ff6b6b' }}>
                {endpointAvailable ? '200 OK' : 'Not Available'}
              </span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', maxHeight: '500px', fontFamily: "'SF Mono', Monaco, monospace" }}>
              {endpointAvailable ? (responseExamples[endpointKey] || '{}') : `// This endpoint is not available in ${currentVersion}\n// Upgrade to ${ENDPOINT_VERSIONS[endpointKey]} or later`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
