'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import VersionSelector, { VersionDiff } from '../../components/VersionSelector';
import Notice from '../../components/Notice';
import { API_VERSIONS } from '../../lib/apiVersions';
import {
  capabilityEndpoints,
  getCapabilityFieldsForVersion,
  capabilityResponseExample,
  methodColors
} from '../../lib/accountData';
import { useVersion } from '../../context/VersionContext';

export default function CapabilitiesPage() {
  const { currentVersion } = useVersion();
  const versionInfo = API_VERSIONS.find(v => v.codename === currentVersion);
  const capabilityFields = getCapabilityFieldsForVersion(currentVersion);

  return (
    <div className="docs-layout">
      <SidebarNew />

      {/* Center Content */}
      <main className="content">
        <h1>Capability</h1>
        <p className="subtitle">
          The Capability object describes what payment methods and features are available for your account.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Use the Capability API to check which payment methods are enabled, supported banks,
          transaction limits, and available tokenization methods like Apple Pay and Google Pay.
          This is useful for dynamically showing payment options to customers.
        </p>

        {/* Version Selector */}
        <VersionSelector />

        {/* Version Diff Warning */}
        <VersionDiff />

        {/* Version Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>1</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Endpoint</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#1A1F71' }}>{capabilityFields.length}</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Fields</div>
          </div>
          <div style={{ background: '#f6f9fc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0055bc' }}>BOTH</div>
            <div style={{ fontSize: '13px', color: '#697386' }}>Key Types</div>
          </div>
        </div>

        {/* Authentication Notice */}
        <Notice type="note" title="Authentication">
          The Capability API accepts both <strong>public keys</strong> and <strong>secret keys</strong>.
          Public key is recommended for client-side code since it can be safely exposed.
        </Notice>

        {/* Related APIs */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px', marginTop: '24px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Related APIs</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <Link href="/api-reference/account" style={{ color: '#1A1F71', textDecoration: 'none' }}>Account</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/balance" style={{ color: '#1A1F71', textDecoration: 'none' }}>Balance</Link>
            <span style={{ color: '#e3e8ee' }}>|</span>
            <Link href="/api-reference/charges" style={{ color: '#1A1F71', textDecoration: 'none' }}>Charges</Link>
          </div>
        </div>

        {/* Common Use Cases */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Common Use Cases</div>
          <ul style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>Display only enabled payment methods in your checkout</li>
            <li>Check supported currencies for each payment method</li>
            <li>Validate transaction amounts against limits</li>
            <li>Show available installment terms for card payments</li>
          </ul>
        </div>

        {/* Error Handling Reference */}
        <div style={{ marginBottom: '32px' }}>
          <Notice type="warning" title="Error Handling">
            When a capability operation fails, the API returns a specific error code.
            See <Link href="/api-reference/capabilities/errors" style={{ color: '#1A1F71', fontWeight: 600 }}>Capability API Error Codes</Link> for a complete reference.
          </Notice>
        </div>

        {/* Endpoints List */}
        <h2>Endpoints</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          {Object.entries(capabilityEndpoints).map(([key, config]) => {
            const methodStyle = methodColors[config.method];
            return (
              <Link
                key={key}
                href={`/api-reference/capabilities/${key}`}
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

        {/* The Capability Object */}
        <h2>The Capability Object</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          {capabilityFields.length} fields in {currentVersion}
          {currentVersion !== 'deimos' && (
            <span style={{ marginLeft: '8px', color: '#9c6f19' }}>
              (uses <code style={{ background: '#fcefc7', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>payment_backends</code> instead of <code style={{ background: '#fcefc7', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>payment_methods</code>)
            </span>
          )}
        </p>
        <div className="attributes-section">
          {capabilityFields.map(attr => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">{attr.name}</div>
                <div className="attribute-meta">{attr.type}</div>
              </div>
              <div className="attribute-desc">{attr.description}</div>
            </div>
          ))}
        </div>

        {/* Payment Method Object */}
        <h2 style={{ marginTop: '48px' }}>Payment Method Object</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Each item in the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>payment_methods</code> array contains:
        </p>
        <div className="attributes-section">
          <div className="attribute-row">
            <div>
              <div className="attribute-name">object</div>
              <div className="attribute-meta">string</div>
            </div>
            <div className="attribute-desc">Always "payment_method"</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">name</div>
              <div className="attribute-meta">string</div>
            </div>
            <div className="attribute-desc">Payment method identifier (e.g., "card", "promptpay", "truemoney")</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">currencies</div>
              <div className="attribute-meta">array</div>
            </div>
            <div className="attribute-desc">List of supported ISO 4217 currency codes</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">card_brands</div>
              <div className="attribute-meta">array | null</div>
            </div>
            <div className="attribute-desc">For card payments: "Visa", "MasterCard", "JCB", "AMEX"</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">installment_terms</div>
              <div className="attribute-meta">array | null</div>
            </div>
            <div className="attribute-desc">Available term lengths in months (e.g., [3, 4, 5, 6, 7, 8, 9, 10])</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">loan_installment_terms</div>
              <div className="attribute-meta">array | null</div>
            </div>
            <div className="attribute-desc">Available loan installment term lengths if applicable</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">banks</div>
              <div className="attribute-meta">array</div>
            </div>
            <div className="attribute-desc">Supported bank codes for bank-specific methods</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">provider</div>
              <div className="attribute-meta">string | null</div>
            </div>
            <div className="attribute-desc">Provider identifier if applicable</div>
          </div>
        </div>

        {/* Limits Object */}
        <h2 style={{ marginTop: '48px' }}>Limits Object</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Transaction limits in smallest currency unit (e.g., satang for THB):
        </p>
        <div className="attributes-section">
          <div className="attribute-row">
            <div>
              <div className="attribute-name">charge_amount.min</div>
              <div className="attribute-meta">integer</div>
            </div>
            <div className="attribute-desc">Minimum charge amount (e.g., 100 = 1 THB)</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">charge_amount.max</div>
              <div className="attribute-meta">integer</div>
            </div>
            <div className="attribute-desc">Maximum charge amount (e.g., 15000000 = 150,000 THB)</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">transfer_amount.min</div>
              <div className="attribute-meta">integer</div>
            </div>
            <div className="attribute-desc">Minimum transfer amount</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">transfer_amount.max</div>
              <div className="attribute-meta">integer</div>
            </div>
            <div className="attribute-desc">Maximum transfer amount</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">installment_amount.min</div>
              <div className="attribute-meta">integer</div>
            </div>
            <div className="attribute-desc">Minimum amount for installment payments</div>
          </div>
        </div>

        <div style={{ marginTop: '48px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <Link href={`/openapi-${currentVersion}.yaml`} style={{ color: '#1A1F71' }}>openapi-{currentVersion}.yaml</Link>
        </div>
      </main>

      {/* Right Panel - Example Capability Object */}
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

        <div style={{ marginBottom: '16px' }}>
          <div style={{
            padding: '8px 12px',
            background: 'rgba(0, 85, 188, 0.2)',
            border: '1px solid rgba(103, 232, 249, 0.3)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#67e8f9',
          }}>
            Accepts <strong>public</strong> or <strong>secret</strong> key
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Example Capability Object
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#b8c7d9' }}>
              JSON
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '11px', lineHeight: 1.5, color: '#67e8f9', overflow: 'auto', maxHeight: '500px', fontFamily: "'SF Mono', Monaco, monospace" }}>
              {capabilityResponseExample}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Request Header
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`# Using public key (recommended)
Authorization: Basic {base64(pkey_test_...)}

# Or using secret key
Authorization: Basic {base64(skey_test_...)}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
