'use client';

import Link from 'next/link';
import SidebarNew from './SidebarNew';
import Breadcrumb from './Breadcrumb';
import InfoCallout from './InfoCallout';
import {
  PaymentMethod,
  categoryNames,
  regionNames,
  regionFlags,
  PaymentCategory,
  FailureCode,
  commonFailureCodes,
  FAQ,
} from '../lib/paymentMethods';

interface PaymentMethodPageProps {
  method: PaymentMethod;
  codeExamples?: {
    createSource?: string;
    createCharge?: string;
  };
  additionalSections?: React.ReactNode;
}

// Default failure codes based on flow type
const getDefaultFailureCodes = (flow: string): FailureCode[] => {
  if (flow === 'redirect') {
    return commonFailureCodes.redirect;
  } else if (flow === 'qr') {
    return commonFailureCodes.qr;
  }
  return commonFailureCodes.redirect;
};

export default function PaymentMethodPage({
  method,
  codeExamples,
  additionalSections,
}: PaymentMethodPageProps) {
  const formatAmount = (amount: number, currency: string) => {
    const divisor = ['JPY'].includes(currency) ? 1 : 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: ['JPY'].includes(currency) ? 0 : 2,
    }).format(amount / divisor);
  };

  const failureCodes = method.failureCodes || getDefaultFailureCodes(method.flow);

  // Generate source example based on method
  const generateSourceExample = () => {
    const params = [`"type=${method.sourceType}"`, `"amount=100000"`, `"currency=${method.currencies[0]}"`];
    if (method.sourceParams?.includes('phone_number')) {
      params.push('"phone_number=0812345678"');
    }
    return `curl https://api.omise.co/sources \\
  -u $OMISE_PUBLIC_KEY: \\
  -d ${params.join(' \\\n  -d ')}`;
  };

  const generateChargeExample = () => {
    return `curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=100000" \\
  -d "currency=${method.currencies[0]}" \\
  -d "source=src_test_..." \\
  -d "return_uri=https://example.com/complete"`;
  };

  const generateCombinedExample = () => {
    const params = [`"amount=100000"`, `"currency=${method.currencies[0]}"`, `"return_uri=https://example.com/complete"`, `"source[type]=${method.sourceType}"`];
    if (method.sourceParams?.includes('phone_number')) {
      params.push('"source[phone_number]=0812345678"');
    }
    return `curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d ${params.join(' \\\n  -d ')}`;
  };

  return (
    <div className="docs-layout">
      <SidebarNew />

      <main className="content" style={{ maxWidth: '900px' }}>
        <Breadcrumb
          items={[
            { label: { en: 'Documentation', th: 'เอกสาร', ja: 'ドキュメント' }, href: '/' },
            { label: { en: 'Accept Payments', th: 'รับชำระเงิน', ja: '決済を受け付ける' }, href: '/accept-payments' },
            { label: categoryNames[method.category], href: `/accept-payments/${method.category}` },
            { label: method.name },
          ]}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
                {method.name.en}
              </h1>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  background: method.status === 'available' ? '#dcfce7' : method.status === 'coming_soon' ? '#fef3c7' : '#fee2e2',
                  color: method.status === 'available' ? '#166534' : method.status === 'coming_soon' ? '#92400e' : '#991b1b',
                }}
              >
                {method.status === 'available' ? 'Available' : method.status === 'coming_soon' ? 'Coming Soon' : 'Deprecated'}
              </span>
            </div>
            <p style={{ fontSize: '16px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
              {method.description.en}
            </p>
          </div>
        </div>

        {/* Enable Note */}
        {method.requiresEnablement && (
          <div style={{ padding: '16px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '16px' }}>ℹ️</span>
              <div>
                <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#1e40af', lineHeight: 1.6 }}>
                  Contact <a href="mailto:support@omise.co" style={{ color: '#1e40af', fontWeight: 600 }}>support@omise.co</a> to enable {method.name.en} for your account.
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: '#3b82f6' }}>
                  Minimum API version: <code style={{ background: '#dbeafe', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{method.minimumApiVersion}</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Regions */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {method.regions.map(region => (
            <span
              key={region}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#f6f9fc',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#3c4257',
              }}
            >
              <span>{regionFlags[region]}</span>
              <span>{regionNames[region].en}</span>
            </span>
          ))}
        </div>

        {/* Quick Info Grid */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '4px' }}>
                Source Type
              </div>
              <code style={{ fontSize: '14px', color: '#1a1a1a', fontFamily: "'SF Mono', Monaco, monospace" }}>
                {method.sourceType}
              </code>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '4px' }}>
                Payment Flow
              </div>
              <div style={{ fontSize: '14px', color: '#1a1a1a', textTransform: 'capitalize' }}>
                {method.flow}
              </div>
            </div>
            <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '4px' }}>
                Currencies
              </div>
              <div style={{ fontSize: '14px', color: '#1a1a1a' }}>
                {method.currencies.join(', ')}
              </div>
            </div>
            {method.authorizationWindow && (
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '4px' }}>
                  Authorization Window
                </div>
                <div style={{ fontSize: '14px', color: '#1a1a1a' }}>
                  {method.authorizationWindow}
                </div>
              </div>
            )}
            {method.refundSupport && (
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '4px' }}>
                  Refund Window
                </div>
                <div style={{ fontSize: '14px', color: '#1a1a1a' }}>
                  {method.refundSupport.window}
                </div>
              </div>
            )}
            {!method.requiresEnablement && (
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: '#697386', marginBottom: '4px' }}>
                  Min API Version
                </div>
                <div style={{ fontSize: '14px', color: '#1a1a1a' }}>
                  {method.minimumApiVersion}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Amount Limits */}
        <section id="limits" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Transaction Limits
          </h2>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Currency</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Minimum</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Maximum</th>
                </tr>
              </thead>
              <tbody>
                {method.amountLimits.map((limit, i) => (
                  <tr key={i}>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>{limit.currency}</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>
                      {formatAmount(limit.min, limit.currency)} ({limit.min.toLocaleString()})
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>
                      {formatAmount(limit.max, limit.currency)} ({limit.max.toLocaleString()})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment Flow Overview */}
        <section id="flow" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Payment Flow Overview
          </h2>

          {/* Flow Diagram */}
          <div style={{ padding: '24px', background: '#f6f9fc', borderRadius: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              {[
                { step: '1', label: 'Create Source', icon: '📝' },
                { step: '2', label: 'Create Charge', icon: '💳' },
                { step: '3', label: method.flow === 'qr' ? 'Show QR' : method.flow === 'redirect' ? 'Redirect' : 'Process', icon: method.flow === 'qr' ? '📱' : '↗️' },
                { step: '4', label: 'Authorize', icon: '✅' },
                { step: '5', label: 'Webhook', icon: '🔔' },
              ].map((item, index) => (
                <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#1A1F71',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}>
                    {item.step}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '14px' }}>{item.icon}</div>
                    <div style={{ fontSize: '11px', color: '#697386', fontWeight: 500 }}>{item.label}</div>
                  </div>
                  {index < 4 && (
                    <div style={{ color: '#c1c9d2', fontSize: '16px', marginLeft: '4px' }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step 1: Create Source */}
        <section id="create-source" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 1: Create a Source
          </h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
            Create a source using your <strong>public key</strong> on the client side, or your <strong>secret key</strong> on the server side.
          </p>

          {/* Using Omise.js */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase' }}>Using Omise.js</span>
              <span style={{ padding: '2px 6px', background: '#dbeafe', color: '#1e40af', fontSize: '10px', fontWeight: 600, borderRadius: '3px' }}>RECOMMENDED</span>
            </div>
            <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
              <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{codeExamples?.createSource || `Omise.setPublicKey("pkey_test_...");

Omise.createSource("${method.sourceType}", {
  "amount": 100000,
  "currency": "${method.currencies[0]}"${method.sourceParams?.includes('phone_number') ? ',\n  "phone_number": "0812345678"' : ''}
}, function(statusCode, response) {
  // Send response.id to your server
  console.log(response);
});`}</pre>
            </div>
          </div>

          {/* Using cURL */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase', marginBottom: '8px' }}>Using cURL</div>
            <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
              <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{generateSourceExample()}</pre>
            </div>
          </div>

          {/* Source Response */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase', marginBottom: '8px' }}>Response</div>
            <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
              <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`{
  "object": "source",
  "id": "src_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "amount": 100000,
  "currency": "${method.currencies[0]}",
  "type": "${method.sourceType}",
  "flow": "${method.flow}",
  "charge_status": "unknown",
  "created_at": "2024-01-15T10:30:00Z"
}`}</pre>
            </div>
          </div>
        </section>

        {/* Step 2: Create Charge */}
        <section id="create-charge" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 2: Create a Charge
          </h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
            Create a charge on your server using your <strong>secret key</strong>. The <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>return_uri</code> is required for redirect-based payments.
          </p>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase', marginBottom: '8px' }}>Using cURL</div>
            <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
              <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{codeExamples?.createCharge || generateChargeExample()}</pre>
            </div>
          </div>

          {/* Charge Response */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase', marginBottom: '8px' }}>Response</div>
            <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
              <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "amount": 100000,
  "currency": "${method.currencies[0]}",
  "status": "pending",${method.flow === 'redirect' ? '\n  "authorize_uri": "https://pay.omise.co/...",' : ''}
  "return_uri": "https://example.com/complete",
  "source": {
    "object": "source",
    "id": "src_test_no1t4tnemucod0e51mo",
    "type": "${method.sourceType}",
    "flow": "${method.flow}"
  },
  "created_at": "2024-01-15T10:30:05Z"
}`}</pre>
            </div>
          </div>

          {method.flow === 'redirect' && method.authorizationWindow && (
            <div style={{ padding: '12px 16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', marginTop: '16px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#92400e' }}>
                <strong>Important:</strong> Redirect the customer to the <code style={{ background: '#fef3c7', padding: '2px 4px', borderRadius: '3px' }}>authorize_uri</code> immediately. Authorization must be completed within <strong>{method.authorizationWindow}</strong>.
              </p>
            </div>
          )}
        </section>

        {/* Alternative: Combined Source + Charge */}
        <section id="combined" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Alternative: Create Source and Charge Together
          </h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
            For server-side only integrations, you can create the source and charge in a single API request.
          </p>

          <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
            <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{generateCombinedExample()}</pre>
          </div>
        </section>

        {/* Step 3: Customer Authorization */}
        {method.flow !== 'direct' && (
          <section id="authorization" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Step 3: Customer Authorization
            </h2>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
              {method.flow === 'redirect'
                ? `Redirect the customer to the authorize_uri from the charge response. After authorization, they will be redirected to your return_uri.`
                : method.flow === 'qr'
                ? `Display the QR code from the charge response to the customer. They scan it with their banking or wallet app to complete payment.`
                : `Provide the payment reference to the customer for offline payment.`}
            </p>

            <div style={{ padding: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#166534' }}>
                <strong>Test Mode:</strong> In test mode, you can manually mark the charge as <em>Successful</em> or <em>Failed</em> in the Omise Dashboard to simulate customer authorization.
              </p>
            </div>
          </section>
        )}

        {/* Charge Status Lifecycle */}
        <section id="lifecycle" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Charge Status Lifecycle
          </h2>

          <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Pending */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <code style={{
                  padding: '6px 12px',
                  background: '#fef3c7',
                  color: '#92400e',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  minWidth: '100px',
                  textAlign: 'center'
                }}>pending</code>
                <span style={{ color: '#697386', fontSize: '14px' }}>Initial status after charge creation. Awaiting customer authorization.</span>
              </div>

              {/* Arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '45px' }}>
                <span style={{ color: '#c1c9d2' }}>↓</span>
                <span style={{ fontSize: '12px', color: '#697386', fontStyle: 'italic' }}>Customer authorizes or fails to authorize</span>
              </div>

              {/* Successful */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <code style={{
                  padding: '6px 12px',
                  background: '#dcfce7',
                  color: '#166534',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  minWidth: '100px',
                  textAlign: 'center'
                }}>successful</code>
                <span style={{ color: '#697386', fontSize: '14px' }}>Payment authorized and completed successfully.</span>
              </div>

              {/* Failed */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <code style={{
                  padding: '6px 12px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  minWidth: '100px',
                  textAlign: 'center'
                }}>failed</code>
                <span style={{ color: '#697386', fontSize: '14px' }}>Authorization failed. Check <code style={{ background: '#f6f9fc', padding: '2px 4px', borderRadius: '3px', fontSize: '12px' }}>failure_code</code> for details.</span>
              </div>

              {/* Expired */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <code style={{
                  padding: '6px 12px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  minWidth: '100px',
                  textAlign: 'center'
                }}>expired</code>
                <span style={{ color: '#697386', fontSize: '14px' }}>Customer did not authorize within the time window{method.authorizationWindow ? ` (${method.authorizationWindow})` : ''}.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Webhook Events */}
        <section id="webhooks" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 4: Handle Webhook Events
          </h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
            Omise sends webhook events to notify your server about payment status changes. Configure your webhook endpoint in the Dashboard.
          </p>

          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Event</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {method.webhookEvents.map(event => (
                  <tr key={event}>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                      <code style={{ fontSize: '13px', color: '#1A1F71', fontFamily: "'SF Mono', Monaco, monospace" }}>{event}</code>
                    </td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>
                      {event === 'charge.create' ? 'Sent when the charge is created' :
                       event === 'charge.complete' ? 'Sent when authorization completes (success or failure)' :
                       event === 'refund.create' ? 'Sent when a refund is created' :
                       'Webhook event'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InfoCallout type="tip" title={{ en: 'Best Practice', th: 'แนวปฏิบัติที่ดี', ja: 'ベストプラクティス' }}>
            Always verify the charge status via the API after receiving a webhook, as webhooks can be replayed.
          </InfoCallout>
        </section>

        {/* Step 5: Verify Charge */}
        <section id="verify" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Step 5: Verify Charge Status
          </h2>
          <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
            Retrieve the charge to verify its final status before fulfilling the order.
          </p>

          <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
            <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY:`}</pre>
          </div>
        </section>

        {/* Failure Codes */}
        {failureCodes.length > 0 && (
          <section id="failure-codes" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Failure Codes
            </h2>
            <p style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
              When a charge fails, the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>failure_code</code> field indicates the reason.
            </p>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f6f9fc' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Code</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {failureCodes.map(item => (
                    <tr key={item.code}>
                      <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                        <code style={{ fontSize: '13px', color: '#dc2626', fontFamily: "'SF Mono', Monaco, monospace" }}>{item.code}</code>
                      </td>
                      <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Refund & Void Support */}
        <section id="refunds" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Refunds & Voids
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div style={{ padding: '16px', background: method.refundSupport?.full ? '#dcfce7' : '#fee2e2', borderRadius: '8px', border: `1px solid ${method.refundSupport?.full ? '#bbf7d0' : '#fecaca'}` }}>
              <div style={{ fontWeight: 600, color: method.refundSupport?.full ? '#166534' : '#991b1b', marginBottom: '4px' }}>
                Full Refunds
              </div>
              <div style={{ fontSize: '13px', color: method.refundSupport?.full ? '#166534' : '#991b1b' }}>
                {method.refundSupport?.full ? `Supported (${method.refundSupport.window})` : 'Not supported'}
              </div>
            </div>
            <div style={{ padding: '16px', background: method.refundSupport?.partial ? '#dcfce7' : '#fee2e2', borderRadius: '8px', border: `1px solid ${method.refundSupport?.partial ? '#bbf7d0' : '#fecaca'}` }}>
              <div style={{ fontWeight: 600, color: method.refundSupport?.partial ? '#166534' : '#991b1b', marginBottom: '4px' }}>
                Partial Refunds
              </div>
              <div style={{ fontSize: '13px', color: method.refundSupport?.partial ? '#166534' : '#991b1b' }}>
                {method.refundSupport?.partial ? 'Supported' : 'Not supported'}
              </div>
            </div>
          </div>

          {method.voidSupport && (
            <div style={{ padding: '16px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>Void Support</div>
              <p style={{ margin: 0, fontSize: '13px', color: '#b45309' }}>
                Charges can be voided{method.voidWindow ? ` within ${method.voidWindow}` : ''} before capture.
              </p>
            </div>
          )}

          {method.refundSupport && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase', marginBottom: '8px' }}>Create a Refund</div>
              <div style={{ background: '#1a2332', borderRadius: '8px', padding: '20px', overflow: 'auto' }}>
                <pre style={{ margin: 0, color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>{`curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo/refunds \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=50000"`}</pre>
              </div>
            </div>
          )}
        </section>

        {/* API Authentication */}
        <section id="authentication" style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            API Authentication
          </h2>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Operation</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Key Type</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Environment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>Create Source (Omise.js)</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                    <code style={{ fontSize: '13px', color: '#166534', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>Public Key</code>
                  </td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>Client-side</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>Create Charge</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                    <code style={{ fontSize: '13px', color: '#dc2626', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>Secret Key</code>
                  </td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>Server-side</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>Retrieve/Refund Charge</td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                    <code style={{ fontSize: '13px', color: '#dc2626', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>Secret Key</code>
                  </td>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>Server-side</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Test Credentials */}
        {method.testCredentials && (
          <section id="testing" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Testing
            </h2>
            <div style={{ padding: '20px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px' }}>
              {method.testCredentials.phoneNumber && (
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#92400e' }}>Test Phone Number: </span>
                  <code style={{ background: '#fff', padding: '4px 8px', borderRadius: '4px', color: '#92400e' }}>
                    {method.testCredentials.phoneNumber}
                  </code>
                </div>
              )}
              {method.testCredentials.cardNumber && (
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, color: '#92400e' }}>Test Card: </span>
                  <code style={{ background: '#fff', padding: '4px 8px', borderRadius: '4px', color: '#92400e' }}>
                    {method.testCredentials.cardNumber}
                  </code>
                </div>
              )}
              {method.testCredentials.notes && (
                <p style={{ fontSize: '13px', color: '#92400e', margin: 0, lineHeight: 1.6 }}>
                  {method.testCredentials.notes}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Additional sections */}
        {additionalSections}

        {/* FAQ */}
        {method.faqs && method.faqs.length > 0 && (
          <section id="faq" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {method.faqs.map((faq, index) => (
                <div key={index} style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #e3e8ee', background: '#f6f9fc' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }}>
                      {faq.question.en}
                    </h3>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#3c4257', lineHeight: 1.7 }}>
                      {faq.answer.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Related
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/api-reference/sources" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>Sources API</Link>
            <Link href="/api-reference/charges" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>Charges API</Link>
            <Link href={`/accept-payments/${method.category}`} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', textDecoration: 'none', color: '#1A1F71', fontSize: '14px', fontWeight: 500 }}>
              All {categoryNames[method.category].en}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
