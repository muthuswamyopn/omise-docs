'use client';

import PaymentMethodPage from '../../../components/PaymentMethodPage';
import { getPaymentMethodById } from '../../../lib/paymentMethods';

const method = getPaymentMethodById('promptpay')!;

const codeExamples = {
  createSource: `// Create source using Omise.js (client-side)
Omise.createSource('promptpay', {
  amount: 400000,  // 4,000.00 THB
  currency: 'THB'
}, function(statusCode, response) {
  // Send response.id to your server
  console.log(response);
});`,
  createCharge: `# Create charge (server-side)
curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=400000" \\
  -d "currency=THB" \\
  -d "source=src_test_5jb3h6zcadqsuyxpz47"`,
};

export default function PromptPayPage() {
  return (
    <PaymentMethodPage
      method={method}
      codeExamples={codeExamples}
      additionalSections={
        <>
          {/* QR Code Display */}
          <section id="qr-display" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Displaying the QR Code
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              After creating a charge, use the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>source.scannable_code.image.download_uri</code> to display the QR code to your customer.
            </p>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <pre style={{ background: '#1a2332', padding: '16px', borderRadius: '6px', overflow: 'auto', margin: 0 }}>
                <code style={{ color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`// Response contains QR code URL
{
  "object": "charge",
  "id": "chrg_test_5jb3h77oldf7xmcsqex",
  "source": {
    "scannable_code": {
      "type": "promptpay",
      "image": {
        "download_uri": "https://api.omise.co/charges/.../documents/.../downloads/..."
      }
    }
  }
}`}
                </code>
              </pre>
            </div>
          </section>

          {/* Expiration */}
          <section id="expiration" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              QR Code Expiration
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              PromptPay QR codes expire 24 hours after creation by default. You can set a custom expiration using the <code style={{ background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>expires_at</code> parameter (maximum 24 hours from creation).
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Default Expiration</div>
                <div style={{ fontSize: '14px', color: '#697386' }}>24 hours after creation</div>
              </div>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Maximum Expiration</div>
                <div style={{ fontSize: '14px', color: '#697386' }}>24 hours from creation</div>
              </div>
            </div>
          </section>

          {/* Charge States */}
          <section id="states" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Charge Status Flow
            </h2>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fef3c7', border: '2px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <span style={{ fontWeight: 600, color: '#92400e', fontSize: '12px' }}>pending</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#697386' }}>QR displayed</div>
                </div>
                <div style={{ width: '40px', height: '2px', background: '#e3e8ee' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '2px', background: '#e3e8ee' }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        <span style={{ fontWeight: 600, color: '#166534', fontSize: '11px' }}>successful</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#697386' }}>Payment complete</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '2px', background: '#e3e8ee' }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fee2e2', border: '2px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        <span style={{ fontWeight: 600, color: '#991b1b', fontSize: '12px' }}>failed</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#697386' }}>Payment rejected</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '2px', background: '#e3e8ee' }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f3f4f6', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        <span style={{ fontWeight: 600, color: '#6b7280', fontSize: '12px' }}>expired</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#697386' }}>QR expired</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
