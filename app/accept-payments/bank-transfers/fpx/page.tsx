'use client';

import PaymentMethodPage from '../../../components/PaymentMethodPage';
import { getPaymentMethodById } from '../../../lib/paymentMethods';

const method = getPaymentMethodById('fpx')!;

const codeExamples = {
  createSource: `// Create source using Omise.js (client-side)
Omise.createSource('fpx', {
  amount: 400000,  // 4,000.00 MYR
  currency: 'MYR',
  bank: 'maybank2u'  // Customer's selected bank
}, function(statusCode, response) {
  // Send response.id to your server
  console.log(response);
});`,
  createCharge: `# Create charge with return_uri (server-side)
curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=400000" \\
  -d "currency=MYR" \\
  -d "source=src_test_5jb3h6zcadqsuyxpz47" \\
  -d "return_uri=https://yoursite.com/complete"`,
};

export default function FPXPage() {
  return (
    <PaymentMethodPage
      method={method}
      codeExamples={codeExamples}
      additionalSections={
        <>
          {/* Supported Banks */}
          <section id="banks" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Supported Banks
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              FPX supports major Malaysian banks. Use the bank code when creating the source:
            </p>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f6f9fc' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Bank Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Bank Code</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Maybank2U', code: 'maybank2u' },
                    { name: 'CIMB Clicks', code: 'cimb' },
                    { name: 'Public Bank', code: 'public_bank' },
                    { name: 'RHB Bank', code: 'rhb' },
                    { name: 'Hong Leong Bank', code: 'hong_leong' },
                    { name: 'AmBank', code: 'ambank' },
                    { name: 'Bank Islam', code: 'bank_islam' },
                    { name: 'Affin Bank', code: 'affin' },
                    { name: 'Alliance Bank', code: 'alliance' },
                    { name: 'HSBC', code: 'hsbc' },
                    { name: 'Standard Chartered', code: 'standard_chartered' },
                    { name: 'OCBC', code: 'ocbc' },
                    { name: 'Bank Rakyat', code: 'bank_rakyat' },
                    { name: 'UOB', code: 'uob' },
                    { name: 'Bank Muamalat', code: 'bank_muamalat' },
                    { name: 'BSN', code: 'bsn' },
                    { name: 'Agrobank', code: 'agrobank' },
                    { name: 'Bank Simpanan Nasional', code: 'bank_simpanan_nasional' },
                    { name: 'Kuwait Finance House', code: 'kfh' },
                  ].map((bank, i) => (
                    <tr key={bank.code}>
                      <td style={{ padding: '10px 16px', borderTop: '1px solid #e3e8ee', fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>
                        {bank.name}
                      </td>
                      <td style={{ padding: '10px 16px', borderTop: '1px solid #e3e8ee' }}>
                        <code style={{ fontSize: '12px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>
                          {bank.code}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bank Selection UI */}
          <section id="bank-selection" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Bank Selection Interface
            </h2>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
              Display a bank selection interface to your customers before creating the source:
            </p>
            <div style={{ padding: '20px', background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px' }}>
              <pre style={{ background: '#1a2332', padding: '16px', borderRadius: '6px', overflow: 'auto', margin: 0 }}>
                <code style={{ color: '#e6ebf1', fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`<!-- Bank selection dropdown -->
<select id="fpx-bank">
  <option value="maybank2u">Maybank2U</option>
  <option value="cimb">CIMB Clicks</option>
  <option value="public_bank">Public Bank</option>
  <option value="rhb">RHB Bank</option>
  <!-- Add more banks -->
</select>

<script>
  const bank = document.getElementById('fpx-bank').value;

  Omise.createSource('fpx', {
    amount: 400000,
    currency: 'MYR',
    bank: bank
  }, callback);
</script>`}
                </code>
              </pre>
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
                  { step: '1', label: 'Select bank', desc: 'Customer chooses' },
                  { step: '2', label: 'Create source', desc: 'With bank code' },
                  { step: '3', label: 'Redirect', desc: 'To bank login' },
                  { step: '4', label: 'Authorize', desc: 'TAC/OTP' },
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

          {/* Error Handling */}
          <section id="errors" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
              Common Failure Codes
            </h2>
            <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f6f9fc' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Code</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: 'payment_rejected', desc: 'Customer canceled or bank rejected the payment' },
                    { code: 'insufficient_fund', desc: 'Customer has insufficient balance' },
                    { code: 'payment_expired', desc: 'Customer did not complete payment in time' },
                    { code: 'invalid_account', desc: 'Bank account issue' },
                    { code: 'failed_processing', desc: 'General processing error at the bank' },
                  ].map((err, i) => (
                    <tr key={err.code}>
                      <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee' }}>
                        <code style={{ fontSize: '12px', fontFamily: "'SF Mono', Monaco, monospace", color: '#991b1b' }}>
                          {err.code}
                        </code>
                      </td>
                      <td style={{ padding: '12px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>
                        {err.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      }
    />
  );
}
