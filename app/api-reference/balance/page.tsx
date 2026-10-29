'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Notice from '../../components/Notice';
import {
  balanceAttributes,
  balanceCodeExamples,
  balanceResponseExample,
  languages,
  methodColors
} from '../../lib/accountData';

export default function BalancePage() {
  const [selectedLang, setSelectedLang] = useState('curl');

  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
          <Link href="/api-reference" style={{ color: '#697386', textDecoration: 'none' }}>API Reference</Link>
          <span style={{ color: '#697386' }}>/</span>
          <span style={{ color: '#1a1a1a', fontWeight: 500 }}>Balance</span>
        </div>

        <h1>Balance</h1>
        <p className="subtitle">
          The Balance object represents the current balance of your Omise account.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Use the Balance API to check your current account balance, including the total amount, transferable amount,
          and any funds held in reserve. All monetary values are returned in the smallest currency unit (e.g., satang for THB).
        </p>

        {/* Important Note */}
        <div style={{ marginBottom: '32px' }}>
          <Notice type="note">
            The balance returned depends on the API key used. Test mode keys return test balances, while live mode keys return actual balances.
          </Notice>
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
              /balance
            </span>
            <span style={{ marginLeft: 'auto', color: '#1a1a1a', fontSize: '14px', fontWeight: 500 }}>
              Retrieve balance
            </span>
          </div>
        </div>

        {/* The Balance Object */}
        <h2>The Balance Object</h2>
        <div className="attributes-section">
          {balanceAttributes.map(attr => (
            <div key={attr.name} className="attribute-row">
              <div>
                <div className="attribute-name">{attr.name}</div>
                <div className="attribute-meta">{attr.type}</div>
              </div>
              <div className="attribute-desc">{attr.desc}</div>
            </div>
          ))}
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
            {balanceCodeExamples.retrieve[selectedLang]}
          </pre>
        </div>

        {/* Response */}
        <h2>Response</h2>
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          Returns the Balance object.
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
          {balanceResponseExample}
        </pre>

        {/* Balance Fields Explained */}
        <h2 style={{ marginTop: '48px' }}>Understanding Balance Fields</h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>total</div>
            <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
              The total balance after fees have been deducted. This includes funds that may be on hold or in reserve.
            </p>
          </div>
          <div style={{ padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>transferable</div>
            <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
              The amount available for immediate transfer to your bank account. This is the total minus any reserve and on-hold amounts.
            </p>
          </div>
          <div style={{ padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>reserve</div>
            <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
              Funds held in reserve as a security buffer. This amount may be required by Omise based on your account history and risk profile.
            </p>
          </div>
          <div style={{ padding: '16px 20px', background: '#f6f9fc', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>on_hold</div>
            <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
              Funds temporarily held, typically due to pending disputes or other account reviews.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
          <Link href="/api-reference/account" style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>
            ← Account
          </Link>
          <Link href="/api-reference/capabilities" style={{ color: '#1A1F71', textDecoration: 'none', fontSize: '14px' }}>
            Capabilities →
          </Link>
        </div>
      </main>
    </div>
  );
}
