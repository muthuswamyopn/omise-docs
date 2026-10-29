'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import VersionSelector, { VersionBadge, VersionDiff } from '../../components/VersionSelector';
import { endpoints, methodColors } from '../../lib/chargeData';
import {
  API_VERSIONS,
  DEFAULT_VERSION,
  getFieldsForVersion,
  getPaymentMethodsForVersion,
} from '../../lib/apiVersions';

const endpointOrder = ['create', 'retrieve', 'list', 'update', 'capture', 'reverse', 'expire', 'mark-as-paid', 'mark-as-failed'];

// Endpoints with version info
const VERSIONED_ENDPOINTS = [
  { key: 'create', addedIn: 'aegaeon' },
  { key: 'retrieve', addedIn: 'aegaeon' },
  { key: 'list', addedIn: 'aegaeon' },
  { key: 'update', addedIn: 'aegaeon' },
  { key: 'capture', addedIn: 'aegaeon' },
  { key: 'reverse', addedIn: 'aegaeon' },
  { key: 'expire', addedIn: 'cordelia' },
  { key: 'mark-as-paid', addedIn: 'deimos' },
  { key: 'mark-as-failed', addedIn: 'deimos' },
];

function isEndpointAvailable(endpointKey: string, version: string): boolean {
  const versionOrder = ['aegaeon', 'bestla', 'cordelia', 'deimos'];
  const currentIndex = versionOrder.indexOf(version);
  const endpoint = VERSIONED_ENDPOINTS.find(e => e.key === endpointKey);
  if (!endpoint) return false;
  const endpointIndex = versionOrder.indexOf(endpoint.addedIn);
  return currentIndex >= endpointIndex;
}

export default function ChargesOverviewPage() {
  const [currentVersion, setCurrentVersion] = useState(DEFAULT_VERSION);

  const fields = getFieldsForVersion(currentVersion);
  const paymentMethods = getPaymentMethodsForVersion(currentVersion);
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);
  const availableEndpoints = endpointOrder.filter(key => isEndpointAvailable(key, currentVersion));

  return (
    <div className="docs-layout">
      <SidebarNew />

      {/* Center Content */}
      <main className="content">
        <h1>Charges</h1>
        <p className="subtitle">
          The Charge object represents a payment transaction in the Omise API.
        </p>

        {/* Version Selector */}
        <VersionSelector
          currentVersion={currentVersion}
          onVersionChange={setCurrentVersion}
        />

        {/* Version Diff Warning */}
        <VersionDiff currentVersion={currentVersion} />

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Use charges to collect payments from customers via credit cards, debit cards, or alternative payment methods
          like PromptPay, TrueMoney, and mobile banking. Charges support both immediate capture and pre-authorization
          workflows.
        </p>

        {/* Version Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{availableEndpoints.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Endpoints</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{fields.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Object Fields</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{paymentMethods.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Payment Methods</div>
          </div>
        </div>

        {/* Related APIs */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related APIs</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <Link href="/api-reference/account" style={{ color: '#1A1F71', textDecoration: 'none' }}>Account</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/balance" style={{ color: '#1A1F71', textDecoration: 'none' }}>Balance</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none' }}>Capabilities</Link>
          </div>
        </div>

        {/* Charge Lifecycle */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Charge Lifecycle</div>
          <div style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.8, fontFamily: "'SF Mono', Monaco, monospace" }}>
            <div>pending → authorized → captured → <span style={{ color: '#0e6245' }}>successful</span></div>
            <div>pending → <span style={{ color: '#cd3d64' }}>failed</span></div>
            <div>pending → <span style={{ color: '#697386' }}>expired</span></div>
            <div>authorized → <span style={{ color: '#9c6f19' }}>reversed</span></div>
          </div>
        </div>

        {/* Error Handling Reference */}
        <div style={{ background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '16px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6 }}>
            <strong style={{ color: '#92400e' }}>Error Handling:</strong> When a charge operation fails, the API returns a specific error code.
            See <Link href="/api-reference/charges/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Charges API Error Codes</Link> for a complete reference of all error codes, their meanings, and resolution steps.
          </div>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints <span style={{ fontSize: '14px', fontWeight: 400, color: '#697386' }}>({availableEndpoints.length} available in {currentVersion})</span></h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          {availableEndpoints.map((key) => {
            const config = endpoints[key];
            const methodStyle = methodColors[config.method];
            const endpointInfo = VERSIONED_ENDPOINTS.find(e => e.key === key);
            const isNew = endpointInfo?.addedIn === currentVersion && currentVersion !== 'aegaeon';

            return (
              <Link
                key={key}
                href={`/api-reference/charges/${key}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  background: isNew ? '#f0fdf4' : '#fff',
                  border: isNew ? '1px solid #86efac' : '1px solid #e3e8ee',
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
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isNew && (
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 6px',
                      borderRadius: '4px',
                      background: '#cbf4c9',
                      color: '#0e6245',
                    }}>
                      NEW
                    </span>
                  )}
                  {config.testModeOnly && (
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 6px',
                      borderRadius: '4px',
                      background: '#fef3c7',
                      color: '#92400e',
                      border: '1px solid #f59e0b',
                    }}>
                      TEST ONLY
                    </span>
                  )}
                  <span style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
                    {config.title}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* The Charge Object */}
        <h2>The Charge Object <span style={{ fontSize: '14px', fontWeight: 400, color: '#697386' }}>({fields.length} fields)</span></h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Fields available in API version <strong>{versionInfo?.date}</strong> ({currentVersion}).
          Fields added in later versions are marked with version badges.
        </p>
        <div className="attributes-section">
          {fields.map(field => (
            <div key={field.name} className="attribute-row">
              <div>
                <div className="attribute-name">
                  {field.name}
                  {field.addedIn !== 'aegaeon' && (
                    <VersionBadge addedIn={field.addedIn} small />
                  )}
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

        {/* Payment Methods */}
        <h2 style={{ marginTop: '48px' }}>Supported Payment Methods <span style={{ fontSize: '14px', fontWeight: 400, color: '#697386' }}>({paymentMethods.length})</span></h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '32px',
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

        <div style={{ marginTop: '48px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <Link href="/openapi.yaml" style={{ color: '#1A1F71' }}>openapi.yaml</Link>
          <br />
          <span style={{ marginTop: '8px', display: 'inline-block' }}>
            Fetch versioned schema: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>GET https://api.omise.co/schema?version={versionInfo?.date}</code>
          </span>
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
            {versionInfo?.isLatest && (
              <span style={{
                marginLeft: '8px',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '9px',
                fontWeight: 700,
                background: '#1A1F71',
                color: '#fff',
              }}>
                LATEST
              </span>
            )}
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
  ...(currentVersion === 'cordelia' || currentVersion === 'deimos' ? {
    net: 96350,
    fee: 3650,
    fee_vat: 256,
    source: {
      object: "source",
      type: "promptpay"
    },
    platform_fee: {
      fixed: 1000,
      percentage: "2.5"
    },
    zero_interest_installments: false
  } : {
    offsite: "internet_banking_scb"
  }),
  ...(currentVersion === 'deimos' ? {
    three_ds_info: {
      three_ds_version: "2.1.0",
      eci: "05"
    },
    multi_capture: false,
    merchant_advice: null
  } : {}),
  card: {
    object: "card",
    id: "card_test_no1t4tnemucod0e51mo",
    brand: "Visa",
    last_digits: "4242"
  },
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
            Version Header
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -H "Omise-Version: ${versionInfo?.date}"`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
