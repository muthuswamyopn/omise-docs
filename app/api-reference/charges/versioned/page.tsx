'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';
import VersionSelector, { VersionDiff } from '../../../components/VersionSelector';
import {
  API_VERSIONS,
  getFieldsForVersion,
  getPaymentMethodsForVersion,
  PAYMENT_FAILURE_CODES
} from '../../../lib/apiVersions';
import { methodColors } from '../../../lib/chargeData';
import { useVersion } from '../../../context/VersionContext';

// Endpoints available in each version
const ENDPOINTS_BY_VERSION: Record<string, { method: string; path: string; title: string; addedIn: string }[]> = {
  aegaeon: [
    { method: 'POST', path: '/charges', title: 'Create a charge', addedIn: 'aegaeon' },
    { method: 'GET', path: '/charges', title: 'List all charges', addedIn: 'aegaeon' },
    { method: 'GET', path: '/charges/{id}', title: 'Retrieve a charge', addedIn: 'aegaeon' },
    { method: 'PATCH', path: '/charges/{id}', title: 'Update a charge', addedIn: 'aegaeon' },
    { method: 'POST', path: '/charges/{id}/capture', title: 'Capture a charge', addedIn: 'aegaeon' },
    { method: 'POST', path: '/charges/{id}/reverse', title: 'Reverse a charge', addedIn: 'aegaeon' },
  ],
  bestla: [
    { method: 'POST', path: '/charges/{id}/refunds', title: 'Create a refund', addedIn: 'bestla' },
    { method: 'GET', path: '/charges/{id}/refunds', title: 'List refunds', addedIn: 'bestla' },
    { method: 'POST', path: '/charges/{id}/disputes', title: 'Create a dispute', addedIn: 'bestla' },
  ],
  cordelia: [
    { method: 'POST', path: '/charges/{id}/expire', title: 'Expire a charge', addedIn: 'cordelia' },
    { method: 'GET', path: '/charges/search', title: 'Search charges', addedIn: 'cordelia' },
    { method: 'GET', path: '/charges/{id}/events', title: 'List charge events', addedIn: 'cordelia' },
  ],
  deimos: [
    { method: 'POST', path: '/charges/{id}/mark_as_paid', title: 'Mark as paid (test)', addedIn: 'deimos' },
    { method: 'POST', path: '/charges/{id}/mark_as_failed', title: 'Mark as failed (test)', addedIn: 'deimos' },
  ],
};

function getEndpointsForVersion(codename: string) {
  const versionOrder = ['aegaeon', 'bestla', 'cordelia', 'deimos'];
  const versionIndex = versionOrder.indexOf(codename);

  const endpoints: { method: string; path: string; title: string; addedIn: string }[] = [];

  for (let i = 0; i <= versionIndex; i++) {
    const version = versionOrder[i];
    if (ENDPOINTS_BY_VERSION[version]) {
      endpoints.push(...ENDPOINTS_BY_VERSION[version]);
    }
  }

  return endpoints;
}

export default function VersionedChargesPage() {
  const { currentVersion } = useVersion();

  const fields = getFieldsForVersion(currentVersion);
  const endpoints = getEndpointsForVersion(currentVersion);
  const paymentMethods = getPaymentMethodsForVersion(currentVersion);
  const failureCodes = PAYMENT_FAILURE_CODES; // Error codes are NOT version-specific
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
          <span style={{ color: '#1a1a1a' }}>Charges (Versioned)</span>
        </div>

        <h1 style={{ margin: 0 }}>Charges API</h1>
        <p className="subtitle">
          The Charge object represents a payment transaction in the Omise API.
        </p>

        {/* Version Selector */}
        <VersionSelector />

        {/* Version Diff Warning */}
        <VersionDiff />

        {/* Version Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{endpoints.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Endpoints</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{fields.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Fields</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{paymentMethods.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Payment Methods</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{failureCodes.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Error Codes</div>
          </div>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          {endpoints.map((endpoint, index) => {
            const methodStyle = methodColors[endpoint.method as keyof typeof methodColors] || methodColors.GET;
            const isNew = endpoint.addedIn === currentVersion && currentVersion !== 'aegaeon';

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: isNew ? '#f0fdf4' : '#fff',
                  border: isNew ? '1px solid #86efac' : '1px solid #e3e8ee',
                  borderRadius: '8px',
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
                  {endpoint.method}
                </span>
                <span style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', color: '#3c4257' }}>
                  {endpoint.path}
                </span>
                <span style={{ marginLeft: 'auto', color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
                  {endpoint.title}
                </span>
                {isNew && (
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: '#cbf4c9',
                    color: '#0e6245',
                  }}>
                    NEW IN {endpoint.addedIn.toUpperCase()}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Payment Methods */}
        <h2>Supported Payment Methods</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '48px',
          padding: '20px',
          background: '#f6f9fc',
          borderRadius: '8px',
        }}>
          {paymentMethods.map((method) => (
            <span
              key={method}
              style={{
                padding: '6px 12px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: "'SF Mono', Monaco, monospace",
                color: '#3c4257',
              }}
            >
              {method}
            </span>
          ))}
        </div>

        {/* Charge Object Fields */}
        <h2>The Charge Object</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Fields available in API version <strong>{versionInfo?.date}</strong> ({currentVersion})
        </p>
        <div className="attributes-section">
          {fields.map(field => (
            <div key={field.name} className="attribute-row">
              <div>
                <div className="attribute-name">
                  {field.name}
                </div>
                <div className="attribute-meta">
                  {field.type}
                  {field.nullable && <span style={{ color: '#697386', marginLeft: '8px' }}>nullable</span>}
                </div>
              </div>
              <div className="attribute-desc">{field.description}</div>
            </div>
          ))}
        </div>

        {/* Failure Codes */}
        <h2 style={{ marginTop: '48px' }}>Failure Codes</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '48px',
        }}>
          {failureCodes.map((code) => (
            <div
              key={code}
              style={{
                padding: '12px 16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '6px',
              }}
            >
              <code style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#cd3d64',
                background: '#fde2dd',
                padding: '2px 6px',
                borderRadius: '4px',
              }}>
                {code}
              </code>
            </div>
          ))}
        </div>

        {/* Schema Link */}
        <div style={{ marginTop: '40px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Fetch schema for this version:
          <code style={{ marginLeft: '8px', background: '#fff', padding: '4px 8px', borderRadius: '4px' }}>
            GET https://api.omise.co/schema?version={versionInfo?.date}
          </code>
        </div>
      </main>

      {/* Right Panel - Example Charge Object */}
      <aside className="code-panel">
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
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Example Charge Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '11px', lineHeight: 1.5, color: '#67e8f9', overflow: 'auto', maxHeight: '500px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{JSON.stringify({
  object: "charge",
  id: "chrg_test_no1t4tnemucod0e51mo",
  livemode: false,
  location: "/charges/chrg_test_no1t4tnemucod0e51mo",
  amount: 100000,
  currency: "THB",
  status: "successful",
  authorized: true,
  captured: true,
  ...(currentVersion !== 'aegaeon' && currentVersion !== 'bestla' ? {
    source: {
      object: "source",
      type: "promptpay"
    },
    platform_fee: {
      fixed: 1000,
      percentage: "2.5"
    }
  } : {
    offsite: "internet_banking_scb"
  }),
  ...(currentVersion === 'deimos' ? {
    three_ds_info: {
      three_ds_version: "2.1.0",
      eci: "05"
    },
    multi_capture: false
  } : {}),
  card: null,
  customer: null,
  description: "Order #12345",
  metadata: { order_id: "12345" },
  created_at: "2024-01-15T10:30:00Z",
  paid_at: "2024-01-15T10:30:01Z"
}, null, 2)}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Request Header
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`Omise-Version: ${versionInfo?.date}
Authorization: Basic {base64(skey_test_...)}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
