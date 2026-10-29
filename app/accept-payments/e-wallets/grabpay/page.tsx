'use client';

import PaymentMethodPage from '../../../components/PaymentMethodPage';
import { getPaymentMethodById } from '../../../lib/paymentMethods';

const method = getPaymentMethodById('grabpay')!;

const codeExamples = {
  createSource: `// Create source using Omise.js (client-side)
Omise.createSource('grabpay', {
  amount: 5000,    // 50.00 SGD
  currency: 'SGD'
}, function(statusCode, response) {
  // Send response.id to your server
  console.log(response);
});`,
  createCharge: `# Create charge with return_uri (server-side)
curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=5000" \\
  -d "currency=SGD" \\
  -d "source=src_test_no1t4tnemucod0e51mo" \\
  -d "return_uri=https://yoursite.com/complete"`,
};

export default function GrabPayPage() {
  return (
    <PaymentMethodPage
      method={method}
      codeExamples={codeExamples}
      additionalSections={
        <>
          {/* Payment Options */}
          <section id="payment-options" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              GrabPay Payment Options
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Customers can pay using multiple funding sources within their Grab app:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Wallet Balance</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>Singapore & Malaysia</div>
              </div>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>Credit Card</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>Malaysia only</div>
              </div>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>PayLater Postpaid</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>Singapore & Malaysia</div>
              </div>
              <div style={{ padding: '16px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>PayLater Installments</div>
                <div style={{ fontSize: '13px', color: '#697386' }}>Singapore & Malaysia</div>
              </div>
            </div>
          </section>

          {/* Country Limits */}
          <section id="country-limits" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Transaction Limits by Country
            </h2>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f6f9fc' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Country</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Currency</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Min</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Max</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>Singapore</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>SGD</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>$1.00</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>$5,000.00</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a' }}>Malaysia</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>MYR</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>RM1.00</td>
                    <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>RM1,500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Authorization Flow */}
          <section id="auth-flow" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Authorization Flow
            </h2>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '700px', margin: '0 auto' }}>
                {[
                  { step: '1', label: 'Create charge', desc: 'Get authorize_uri' },
                  { step: '2', label: 'Redirect', desc: 'To Grab app/web' },
                  { step: '3', label: 'Select payment', desc: 'Customer chooses' },
                  { step: '4', label: 'Authorize', desc: 'Enter PIN/biometrics' },
                  { step: '5', label: 'Return', desc: 'To your site' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1A1F71', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 700, fontSize: '13px' }}>
                      {s.step}
                    </div>
                    <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '12px', marginBottom: '2px' }}>{s.label}</div>
                    <div style={{ fontSize: '10px', color: '#697386' }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
