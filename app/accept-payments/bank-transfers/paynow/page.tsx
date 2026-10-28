'use client';

import PaymentMethodPage from '../../../components/PaymentMethodPage';
import { getPaymentMethodById } from '../../../lib/paymentMethods';

const method = getPaymentMethodById('paynow')!;

const codeExamples = {
  createSource: `// Create source using Omise.js (client-side)
Omise.createSource('paynow', {
  amount: 400000,  // 4,000.00 SGD
  currency: 'SGD'
}, function(statusCode, response) {
  // Send response.id to your server
  console.log(response);
});`,
  createCharge: `# Create charge (server-side)
curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=400000" \\
  -d "currency=SGD" \\
  -d "source=src_test_5jb3h6zcadqsuyxpz47"`,
};

export default function PayNowPage() {
  return (
    <PaymentMethodPage
      method={method}
      codeExamples={codeExamples}
      additionalSections={
        <>
          {/* How PayNow Works */}
          <section id="how-it-works" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              How PayNow Works
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              PayNow is Singapore's instant fund transfer system operated by the Association of Banks in Singapore. It enables real-time payments 24/7.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>QR Code Display</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>Show the QR code to your customer at checkout</div>
              </div>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Customer Scans</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>Customer scans with any PayNow-enabled banking app</div>
              </div>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Instant Confirmation</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>Receive webhook notification when payment completes</div>
              </div>
            </div>
          </section>

          {/* Participating Banks */}
          <section id="banks" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Participating Banks
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Customers can pay via PayNow using any of these participating bank apps:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                'DBS/POSB',
                'OCBC',
                'UOB',
                'Standard Chartered',
                'Citibank',
                'HSBC',
                'Maybank',
                'Bank of China',
                'ICBC',
                'GrabPay',
                'Singtel Dash',
              ].map(bank => (
                <span
                  key={bank}
                  style={{
                    padding: '8px 14px',
                    background: '#f6f9fc',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#3c4257',
                  }}
                >
                  {bank}
                </span>
              ))}
            </div>
          </section>

          {/* QR Code Display */}
          <section id="qr-display" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Displaying the QR Code
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              After creating a charge, retrieve the QR code image URL from the response:
            </p>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <pre style={{ background: '#1a2332', padding: '16px', borderRadius: '6px', overflow: 'auto', margin: 0 }}>
                <code style={{ color: '#67e8f9', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`// Charge response contains QR code URL
{
  "object": "charge",
  "id": "chrg_test_5jb3h77oldf7xmcsqex",
  "status": "pending",
  "source": {
    "object": "source",
    "type": "paynow",
    "scannable_code": {
      "type": "paynow",
      "image": {
        "download_uri": "https://api.omise.co/..."
      }
    }
  }
}`}
                </code>
              </pre>
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
