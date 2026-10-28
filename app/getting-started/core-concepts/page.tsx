'use client';

import Link from 'next/link';
import SidebarNew from '../../components/SidebarNew';
import Breadcrumb from '../../components/Breadcrumb';
import InfoCallout from '../../components/InfoCallout';

export default function CoreConceptsPage() {
  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Getting Started', th: 'เริ่มต้นใช้งาน', ja: '始めに' }, href: '/getting-started' },
            { label: { en: 'Core Concepts', th: 'แนวคิดหลัก', ja: '基本コンセプト' } },
          ]}
        />

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Core Concepts
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '32px', lineHeight: 1.6 }}>
          Understand the fundamental building blocks of Omise payments: tokens, sources, charges,
          and how they work together.
        </p>

        {/* Payment Flow Overview */}
        <section id="payment-flow" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Payment Flow Overview
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '20px' }}>
            Every payment follows a consistent flow: collect payment details, tokenize them securely,
            and create a charge. This design ensures sensitive data never touches your servers.
          </p>

          {/* Mermaid-style diagram rendered as HTML/CSS */}
          <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              {/* Step 1 */}
              <div style={{ textAlign: 'center', flex: '1', minWidth: '120px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '14px', marginBottom: '4px' }}>1. Customer</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Enters card details</div>
              </div>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e3e8ee" strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>

              {/* Step 2 */}
              <div style={{ textAlign: 'center', flex: '1', minWidth: '120px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '14px', marginBottom: '4px' }}>2. Omise.js</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Creates secure token</div>
              </div>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e3e8ee" strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>

              {/* Step 3 */}
              <div style={{ textAlign: 'center', flex: '1', minWidth: '120px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '14px', marginBottom: '4px' }}>3. Your Server</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Creates charge</div>
              </div>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e3e8ee" strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>

              {/* Step 4 */}
              <div style={{ textAlign: 'center', flex: '1', minWidth: '120px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '14px', marginBottom: '4px' }}>4. Payment</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Processed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tokens */}
        <section id="tokens" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Tokens
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Tokens represent card details in a secure, single-use format. Create tokens client-side
            using Omise.js or mobile SDKs to keep sensitive data off your servers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px 20px', background: '#dcfce7', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Key Properties</div>
              <ul style={{ fontSize: '14px', color: '#166534', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                <li>Single-use only</li>
                <li>Expire after a short period</li>
                <li>Created with public key</li>
                <li>Never contain raw card data</li>
              </ul>
            </div>
            <div style={{ padding: '16px 20px', background: '#fee2e2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <div style={{ fontWeight: 600, color: '#991b1b', marginBottom: '8px' }}>Common Errors</div>
              <ul style={{ fontSize: '14px', color: '#991b1b', margin: 0, paddingLeft: '16px', lineHeight: 1.8 }}>
                <li><code>used_token</code> - Already consumed</li>
                <li><code>invalid_card_token</code> - Expired or invalid</li>
                <li><code>invalid_card</code> - Bad card details</li>
              </ul>
            </div>
          </div>

          <InfoCallout type="tip" title={{ en: 'Best Practice', th: 'แนวทางปฏิบัติที่ดี', ja: 'ベストプラクティス' }}>
            Generate a fresh token for every charge. Tokens are designed for single use to maximize
            security and prevent replay attacks.
          </InfoCallout>
        </section>

        {/* Sources */}
        <section id="sources" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Sources
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Sources represent alternative payment methods like PromptPay, TrueMoney, mobile banking,
            and e-wallets. Each source type has its own flow and requirements.
          </p>

          <div style={{ background: '#f6f9fc', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#e3e8ee' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Source Type</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Flow</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Countries</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'promptpay', flow: 'Offline (QR)', countries: 'TH' },
                  { type: 'truemoney', flow: 'Redirect (OTP)', countries: 'TH' },
                  { type: 'rabbit_linepay', flow: 'Redirect', countries: 'TH' },
                  { type: 'mobile_banking_*', flow: 'App Redirect', countries: 'TH, SG' },
                  { type: 'paynow', flow: 'Offline (QR)', countries: 'SG' },
                  { type: 'grabpay', flow: 'Redirect', countries: 'SG, MY' },
                  { type: 'fpx', flow: 'Redirect', countries: 'MY' },
                  { type: 'konbini', flow: 'Offline', countries: 'JP' },
                ].map((source, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f6f9fc' }}>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                      <code style={{ background: '#e0e7ff', color: '#4338ca', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{source.type}</code>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#3c4257' }}>{source.flow}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#697386' }}>{source.countries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link href="/accept-payments" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>
            View all 40+ payment methods
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Charges */}
        <section id="charges" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Charges
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            A charge represents a payment transaction. Create charges using a token (for cards) or
            a source (for alternative payment methods).
          </p>

          {/* Charge Lifecycle Diagram */}
          <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Charge Lifecycle</div>
            <div style={{ fontFamily: "'SF Mono', Monaco, monospace", fontSize: '14px', lineHeight: 2, color: '#3c4257' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 12px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontWeight: 600 }}>pending</span>
                <span style={{ color: '#697386' }}>→</span>
                <span style={{ padding: '4px 12px', background: '#e0e7ff', color: '#4338ca', borderRadius: '4px', fontWeight: 600 }}>authorized</span>
                <span style={{ color: '#697386' }}>→</span>
                <span style={{ padding: '4px 12px', background: '#dbeafe', color: '#1e40af', borderRadius: '4px', fontWeight: 600 }}>captured</span>
                <span style={{ color: '#697386' }}>→</span>
                <span style={{ padding: '4px 12px', background: '#dcfce7', color: '#166534', borderRadius: '4px', fontWeight: 600 }}>successful</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <span style={{ padding: '4px 12px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontWeight: 600 }}>pending</span>
                <span style={{ color: '#697386' }}>→</span>
                <span style={{ padding: '4px 12px', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontWeight: 600 }}>failed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <span style={{ padding: '4px 12px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontWeight: 600 }}>pending</span>
                <span style={{ color: '#697386' }}>→</span>
                <span style={{ padding: '4px 12px', background: '#f3f4f6', color: '#6b7280', borderRadius: '4px', fontWeight: 600 }}>expired</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <span style={{ padding: '4px 12px', background: '#e0e7ff', color: '#4338ca', borderRadius: '4px', fontWeight: 600 }}>authorized</span>
                <span style={{ color: '#697386' }}>→</span>
                <span style={{ padding: '4px 12px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontWeight: 600 }}>reversed</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px 20px', background: '#fff', borderRadius: '8px', border: '1px solid #e3e8ee' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Auto Capture</div>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Default behavior. Charge is authorized and captured immediately in one step.
              </p>
            </div>
            <div style={{ padding: '16px 20px', background: '#fff', borderRadius: '8px', border: '1px solid #e3e8ee' }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Manual Capture</div>
              <p style={{ fontSize: '14px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                Set <code style={{ background: '#f6f9fc', padding: '2px 4px', borderRadius: '3px' }}>capture=false</code> to authorize first, then capture later (within 7 days).
              </p>
            </div>
          </div>
        </section>

        {/* Currencies */}
        <section id="currencies" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Currencies & Amounts
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Amounts are specified in the smallest currency unit (subunit). Use ISO 4217 three-letter
            currency codes.
          </p>

          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Currency</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Subunit</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Example</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Min - Max</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { currency: 'THB', subunit: 'satang (1/100)', example: '10000 = ฿100', limits: '฿20 - ฿150,000' },
                  { currency: 'SGD', subunit: 'cents (1/100)', example: '10000 = S$100', limits: 'S$1 - S$20,000' },
                  { currency: 'MYR', subunit: 'sen (1/100)', example: '10000 = RM100', limits: 'RM1 - RM100,000' },
                  { currency: 'JPY', subunit: 'yen (no subunit)', example: '100 = ¥100', limits: '¥100 - ¥6,000,000' },
                ].map((c, i) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                      <code style={{ fontWeight: 600, color: '#1a1a1a' }}>{c.currency}</code>
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>{c.subunit}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386', fontFamily: "'SF Mono', Monaco, monospace" }}>{c.example}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>{c.limits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InfoCallout type="warning" title={{ en: 'Zero-Decimal Currency', th: 'สกุลเงินไม่มีทศนิยม', ja: 'ゼロ小数通貨' }}>
            JPY is a zero-decimal currency. The yen itself is the smallest unit, so <code>100</code> means ¥100,
            not ¥1.00.
          </InfoCallout>
        </section>

        {/* Webhooks */}
        <section id="webhooks" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Webhooks
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Webhooks notify your server when events occur (charge completed, refund created, etc.).
            Configure webhook endpoints in your dashboard.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {['charge.complete', 'refund.create', 'dispute.create', 'transfer.pay'].map((event) => (
              <code key={event} style={{ padding: '6px 12px', background: '#f6f9fc', borderRadius: '4px', fontSize: '13px', color: '#3c4257', fontFamily: "'SF Mono', Monaco, monospace" }}>
                {event}
              </code>
            ))}
          </div>

          <Link href="/integrations/advanced/webhooks" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>
            Learn more about webhooks
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </main>
    </div>
  );
}
