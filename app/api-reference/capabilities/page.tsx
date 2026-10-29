'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import {
  capabilityAttributes,
  capabilityCodeExamples,
  capabilityResponseExample,
  languages,
  methodColors
} from '../../lib/accountData';

export default function CapabilitiesPage() {
  const [selectedLang, setSelectedLang] = useState('curl');

  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
          <Link href="/api-reference" style={{ color: '#697386', textDecoration: 'none' }}>API Reference</Link>
          <span style={{ color: '#697386' }}>/</span>
          <span style={{ color: '#1a1a1a', fontWeight: 500 }}>Capabilities</span>
        </div>

        <h1>Capabilities</h1>
        <p className="subtitle">
          The Capability object describes what payment methods and features are available for your account.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Use the Capability API to check which payment methods are enabled for your account, supported banks,
          transaction limits, and available tokenization methods like Apple Pay and Google Pay. This is useful
          for dynamically showing payment options to customers based on what's actually available.
        </p>

        {/* Use Cases */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Common Use Cases</div>
          <ul style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>Display only enabled payment methods in your checkout</li>
            <li>Check supported currencies for each payment method</li>
            <li>Validate transaction amounts against limits</li>
            <li>Show available installment terms for card payments</li>
          </ul>
        </div>

        {/* Endpoint */}
        <h2>Endpoint</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '48px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              background: '#fff',
              border: '1px solid #e3e8ee',
              borderRadius: '8px',
            }}
          >
            <span style={{
              fontWeight: 700,
              fontSize: '11px',
              padding: '4px 8px',
              borderRadius: '4px',
              background: methodColors.GET.bg,
              color: methodColors.GET.color,
              fontFamily: "'SF Mono', Monaco, monospace",
              minWidth: '52px',
              textAlign: 'center'
            }}>
              GET
            </span>
            <span style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', color: '#3c4257' }}>
              /capability
            </span>
            <span style={{ marginLeft: 'auto', color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
              Retrieve capabilities
            </span>
          </div>
        </div>

        {/* The Capability Object */}
        <h2>The Capability Object</h2>
        <div className="attributes-section">
          {capabilityAttributes.map(attr => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">{attr.name}</div>
                <div className="attribute-meta">{attr.type}</div>
              </div>
              <div className="attribute-desc">{attr.desc}</div>
            </div>
          ))}
        </div>

        {/* Payment Method Object */}
        <h2 style={{ marginTop: '48px' }}>Payment Method Object</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Each payment method in the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>payment_methods</code> array contains:
        </p>
        <div className="attributes-section">
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
            <div className="attribute-desc">List of supported currencies for this payment method</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">card_brands</div>
              <div className="attribute-meta">array | null</div>
            </div>
            <div className="attribute-desc">For card payments, the supported card brands (Visa, MasterCard, etc.)</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">installment_terms</div>
              <div className="attribute-meta">array | null</div>
            </div>
            <div className="attribute-desc">For installment payments, available term lengths in months</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">banks</div>
              <div className="attribute-meta">array</div>
            </div>
            <div className="attribute-desc">For bank-related methods, the supported bank codes</div>
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
            <div className="attribute-desc">Minimum charge amount allowed</div>
          </div>
          <div className="attribute-row">
            <div>
              <div className="attribute-name">charge_amount.max</div>
              <div className="attribute-meta">integer</div>
            </div>
            <div className="attribute-desc">Maximum charge amount allowed</div>
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

        {/* Code Examples */}
        <h2 style={{ marginTop: '48px' }}>Request</h2>
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
            {capabilityCodeExamples.retrieve[selectedLang]}
          </pre>
        </div>

        {/* Response */}
        <h2>Response</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Returns the Capability object with all available payment methods and limits.
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
          maxHeight: '500px',
        }}>
          {capabilityResponseExample}
        </pre>

        {/* Navigation */}
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <Link href="/api-reference/balance" style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>
            ← Balance
          </Link>
          <Link href="/api-reference/charges" style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>
            Charges →
          </Link>
        </div>
      </main>
    </div>
  );
}
