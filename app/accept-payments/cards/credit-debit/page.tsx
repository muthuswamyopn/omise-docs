'use client';

import PaymentMethodPage from '../../../components/PaymentMethodPage';
import { getPaymentMethodById } from '../../../lib/paymentMethods';

const method = getPaymentMethodById('credit-debit')!;

const codeExamples = {
  createSource: `// Collect card with Omise.js (client-side)
<script src="https://cdn.omise.co/omise.js"></script>
<script>
  Omise.setPublicKey('pkey_test_...');

  Omise.createToken('card', {
    name: 'JOHN DOE',
    number: '4242424242424242',
    expiration_month: 12,
    expiration_year: 2025,
    security_code: '123'
  }, function(statusCode, response) {
    // Send response.id (token) to your server
    console.log(response);
  });
</script>`,
  createCharge: `# Create charge with card token (server-side)
curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=100000" \\
  -d "currency=THB" \\
  -d "card=tokn_test_no1t4tnemucod0e51mo" \\
  -d "capture=true"`,
};

export default function CreditDebitPage() {
  return (
    <PaymentMethodPage
      method={method}
      codeExamples={codeExamples}
      additionalSections={
        <>
          {/* Supported Card Networks */}
          <section id="networks" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Supported Card Networks
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {[
                { name: 'Visa', desc: 'Credit & Debit' },
                { name: 'Mastercard', desc: 'Credit & Debit' },
                { name: 'JCB', desc: 'Credit & Debit' },
                { name: 'American Express', desc: 'Credit' },
              ].map(card => (
                <div key={card.name} style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>{card.name}</div>
                  <div style={{ fontSize: '12px', color: '#697386' }}>{card.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Test Cards */}
          <section id="test-cards" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Test Card Numbers
            </h2>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f6f9fc' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Card Number</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Result</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>CVV</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { number: '4242424242424242', result: 'Successful charge', cvv: 'Any 3 digits' },
                    { number: '4111111111111111', result: 'Successful charge', cvv: 'Any 3 digits' },
                    { number: '4012888888881881', result: 'Successful charge (3DS)', cvv: 'Any 3 digits' },
                    { number: '4000000000000002', result: 'Declined (insufficient funds)', cvv: 'Any 3 digits' },
                    { number: '4000000000000069', result: 'Declined (expired card)', cvv: 'Any 3 digits' },
                    { number: '4000000000000127', result: 'Declined (invalid CVV)', cvv: 'Any 3 digits' },
                  ].map((card, i) => (
                    <tr key={i}>
                      <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                        <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1a1a1a' }}>{card.number}</code>
                      </td>
                      <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>{card.result}</td>
                      <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#697386' }}>{card.cvv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '13px', color: '#697386', marginTop: '12px' }}>
              Use any future expiration date (MM/YY) with these test cards.
            </p>
          </section>

          {/* Tokenization */}
          <section id="tokenization" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Card Tokenization
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Omise uses tokenization to securely handle card data. Card numbers never touch your server.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>1. Collect</div>
                <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Use Omise.js to collect card details in a secure form. Data is encrypted and sent directly to Omise.
                </p>
              </div>
              <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>2. Tokenize</div>
                <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Omise returns a single-use token representing the card. The token is safe to transmit.
                </p>
              </div>
              <div style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>3. Charge</div>
                <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Use the token to create a charge on your server. Tokens expire after use or 20 minutes.
                </p>
              </div>
            </div>
          </section>

          {/* Auth vs Capture */}
          <section id="auth-capture" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Authorization vs Capture
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Control when funds are captured from the customer's card:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <code style={{ fontSize: '12px', color: '#1A1F71', fontFamily: "'SF Mono', Monaco, monospace" }}>capture=true</code>
                <div style={{ fontWeight: 600, color: '#1a1a1a', margin: '8px 0 4px' }}>Auto-capture</div>
                <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Funds are captured immediately. Use for instant fulfillment (digital goods, subscriptions).
                </p>
              </div>
              <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
                <code style={{ fontSize: '12px', color: '#1A1F71', fontFamily: "'SF Mono', Monaco, monospace" }}>capture=false</code>
                <div style={{ fontWeight: 600, color: '#1a1a1a', margin: '8px 0 4px' }}>Manual capture</div>
                <p style={{ fontSize: '13px', color: '#697386', margin: 0, lineHeight: 1.6 }}>
                  Authorize first, capture later (up to 7 days). Use for physical goods shipped after payment.
                </p>
              </div>
            </div>
          </section>

          {/* 3D Secure */}
          <section id="3ds" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              3D Secure Authentication
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              3D Secure adds an extra authentication step with the card issuer, reducing fraud and shifting liability.
            </p>
            <div style={{ padding: '20px', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 600, color: '#166534', marginBottom: '8px' }}>Benefits of 3D Secure</div>
              <ul style={{ fontSize: '14px', color: '#166534', paddingLeft: '20px', margin: 0, lineHeight: 1.8 }}>
                <li>Reduced chargeback liability</li>
                <li>Lower fraud rates</li>
                <li>Compliance with SCA regulations</li>
                <li>Increased customer trust</li>
              </ul>
            </div>
          </section>
        </>
      }
    />
  );
}
