'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import SidebarNew from '../../../components/SidebarNew';

declare global {
  interface Window {
    Omise: {
      setPublicKey: (key: string) => void;
      createToken: (type: string, card: object, callback: (statusCode: number, response: any) => void) => void;
    };
  }
}

const faqItems = [
  {
    question: 'Does my server ever see raw card data?',
    answer: 'No. Card data is sent from the customer\'s browser directly to Omise via Omise.js. Your server only ever receives the resulting token, never the card number, expiration date, or security code.',
  },
  {
    question: 'Should I store the token for later use?',
    answer: 'No. Tokens are single-use — once you\'ve used a token to charge a card, save it to a customer, or attach it to an existing customer, it has served its purpose. Use it immediately and discard it; there\'s no benefit to storing it.',
  },
  {
    question: 'Do I need jQuery to use Omise.js?',
    answer: 'No. jQuery is used in these examples purely for convenience when accessing the DOM and handling the form submit event. Omise.js itself has no jQuery dependency, and the same logic can be written in vanilla JavaScript.',
  },
  {
    question: 'How long is an unused token valid before it expires?',
    answer: 'Tokens are valid for a single use and expire after a short period if unused — typically a few minutes. Always use a token promptly after receiving it; do not cache or hold onto it.',
  },
  {
    question: 'What happens if I try to reuse a token that\'s already been used?',
    answer: 'The API returns a used_token error with the message "token was already used." Tokens are single-use only — once a token has been used to create a charge or attach a card, it cannot be used again, regardless of whether that charge succeeded.',
  },
  {
    question: 'After I use the token to create a charge, do I need to handle 3D Secure separately?',
    answer: 'Possibly. If 3D Secure is enabled on your account, the charge response can include an authorize_uri that you redirect the cardholder to for bank-side authentication before the charge completes.',
  },
];

const errorCodes = [
  { code: 'invalid_card', meaning: 'One or more card fields failed validation.' },
  { code: 'expired_card', meaning: 'The card\'s expiration date is in the past.' },
  { code: 'invalid_security_code', meaning: 'The CVV/security code provided is invalid.' },
  { code: 'authentication_failure', meaning: 'The public key is missing, invalid, or doesn\'t have sufficient access.' },
  { code: 'service_not_found', meaning: 'Card payments aren\'t enabled on your account.' },
];

const codeBlockStyle: React.CSSProperties = {
  background: '#1a2332',
  borderRadius: '8px',
  padding: '16px 20px',
  overflow: 'auto',
  fontFamily: "'SF Mono', Monaco, monospace",
  fontSize: '13px',
  lineHeight: 1.6,
  color: '#67e8f9',
  marginBottom: '16px',
};

export default function CollectingCardsPage() {
  const [cardName, setCardName] = useState('JOHN DOE');
  const [cardNumber, setCardNumber] = useState('4242424242424242');
  const [expMonth, setExpMonth] = useState('12');
  const [expYear, setExpYear] = useState('2030');
  const [cvc, setCvc] = useState('111');
  const [token, setToken] = useState('...');
  const [isLoading, setIsLoading] = useState(false);
  const [omiseLoaded, setOmiseLoaded] = useState(false);

  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!omiseLoaded || !window.Omise) {
      setToken('Omise.js not loaded');
      return;
    }

    setIsLoading(true);
    const card = {
      name: cardName,
      number: cardNumber,
      expiration_month: parseInt(expMonth),
      expiration_year: parseInt(expYear),
      security_code: cvc,
    };

    window.Omise.createToken('card', card, (statusCode: number, response: any) => {
      setIsLoading(false);
      if (!response || response.object === 'error') {
        setToken(response?.message || 'Error generating token');
      } else {
        setToken(response.id);
      }
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <SidebarNew />

      <main style={{ background: '#fff', padding: '48px 56px', maxWidth: '900px' }}>
        <Script
          src="https://cdn.omise.co/omise.js"
          onLoad={() => {
            window.Omise.setPublicKey('pkey_test_63mhuyszryxc22j1ioo');
            setOmiseLoaded(true);
          }}
        />

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
          <Link href="/accept-payments" style={{ color: '#697386', textDecoration: 'none' }}>Accept Payments</Link>
          <span style={{ color: '#697386' }}>/</span>
          <Link href="/accept-payments/cards" style={{ color: '#697386', textDecoration: 'none' }}>Cards</Link>
          <span style={{ color: '#697386' }}>/</span>
          <span style={{ color: '#1a1a1a', fontWeight: 500 }}>Collecting Cards</span>
        </div>

        {/* Hero */}
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 16px', color: '#1a1a1a' }}>
          Collecting cards with Omise.js
        </h1>
        <p style={{ fontSize: '17px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px', maxWidth: '700px' }}>
          This article will help you build a form that lets you collect cards directly from a page on your website and tokenize them.
        </p>
        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          Omise.js allows you to collect card information easily. Omise.js is a client-side JavaScript library that lets you run your own HTML form in your customer's browser. It sends sensitive card data to the Omise server and receives a card token in exchange. Forward that token to your server for processing — your server never has to handle sensitive card information directly.
        </p>
        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
          This guide focuses specifically on collecting and tokenizing card details. Omise.js also handles non-card payment methods (PromptPay, GrabPay, and other sources) and offers a pre-built payment widget as an alternative to a custom form.
        </p>

        {/* Notice boxes */}
        <div style={{ padding: '16px 20px', background: '#fff', border: '1px solid #e3e8ee', borderLeft: '4px solid #1A1F71', borderRadius: '8px', marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
            The only supported way to send card data to Omise is via JavaScript using Omise.js, unless your organization holds a PCI-DSS license permitting server-side card data handling.
          </p>
        </div>

        <div style={{ padding: '16px 20px', background: '#fff', border: '1px solid #e3e8ee', borderLeft: '4px solid #f59e0b', borderRadius: '8px', marginBottom: '32px' }}>
          <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
            <strong>Requirement:</strong> Your checkout page must be served over HTTPS. Omise.js will not function on pages served over plain HTTP. Omise recommends enabling HTTPS across your entire site, not only the checkout page.
          </p>
        </div>

        {/* Token flow image */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <img
            src="https://cdn.omise.co/assets/developer-documents/images_jpg/small_token@2x.jpg"
            alt="Token overview"
            style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #e3e8ee' }}
          />
        </div>

        {/* How it works */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            How it works
          </h2>
          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            On a high level, this is how it works:
          </p>
          <ul style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.8, paddingLeft: '24px', marginBottom: '24px' }}>
            <li>Using Omise.js and your public key, send the cardholder data from your customer's browser to Omise.</li>
            <li>The Omise tokens service responds with a single-use card token.</li>
            <li>Forward the token back to your server.</li>
            <li>Use the token to take an action on the card. You can <Link href="/api-reference/charges/create" style={{ color: '#1A1F71' }}>charge the card</Link>, save the card to a new customer, or attach the card to an existing one.</li>
          </ul>

          <div style={{ padding: '16px 20px', background: '#fff', border: '1px solid #e3e8ee', borderLeft: '4px solid #1A1F71', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
              Omise recommends against storing the token. Since it is for one-time use only, there is no benefit in saving it for later — use it and discard it immediately.
            </p>
          </div>
        </section>

        {/* Token Simulator */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Try it: Omise token simulator
          </h2>

          <div style={{ border: '1px solid #e3e8ee', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#f6f9fc', padding: '12px 20px', borderBottom: '1px solid #e3e8ee' }}>
              <strong style={{ fontSize: '14px', color: '#1a1a1a' }}>Omise Token Simulator</strong>
            </div>
            <form onSubmit={handleGenerateToken} style={{ padding: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#697386', marginBottom: '6px' }}>Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e3e8ee', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#697386', marginBottom: '6px' }}>Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e3e8ee', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#697386', marginBottom: '6px' }}>Month</label>
                  <input
                    type="text"
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e3e8ee', borderRadius: '6px', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#697386', marginBottom: '6px' }}>Year</label>
                  <input
                    type="text"
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e3e8ee', borderRadius: '6px', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#697386', marginBottom: '6px' }}>CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #e3e8ee', borderRadius: '6px', fontSize: '14px' }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#1A1F71',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: isLoading ? 'wait' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? 'Generating...' : 'Generate Token'}
              </button>
            </form>
            <div style={{ background: '#f6f9fc', padding: '12px 20px', borderTop: '1px solid #e3e8ee' }}>
              <span style={{ fontSize: '13px', color: '#697386' }}>Generated Token: </span>
              <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71' }}>{token}</code>
            </div>
          </div>
        </section>

        {/* Full example */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            A full-fledged example
          </h2>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            First, insert Omise.js into your webpage. Add it before the closing <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71', background: '#f6f9fc', padding: '2px 6px', borderRadius: '4px' }}>&lt;/body&gt;</code> tag.
          </p>
          <pre style={codeBlockStyle}>
{`<script src="https://cdn.omise.co/omise.js"></script>`}
          </pre>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Then add your public key so Omise.js can authenticate against the Omise API:
          </p>
          <pre style={codeBlockStyle}>
{`<script>
  Omise.setPublicKey("pkey_test_...");
</script>`}
          </pre>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Next, build a form to collect the card details.
          </p>
          <pre style={codeBlockStyle}>
{`<form action="/checkout" method="post" id="checkout">
  <div id="token_errors"></div>
  <input type="hidden" name="omise_token">

  <div>
    Name<br>
    <input type="text" data-omise="holder_name">
  </div>
  <div>
    Number<br>
    <input type="text" data-omise="number">
  </div>
  <div>
    Date<br>
    <input type="text" data-omise="expiration_month" size="4"> /
    <input type="text" data-omise="expiration_year" size="8">
  </div>
  <div>
    Security Code<br>
    <input type="text" data-omise="security_code" size="8">
  </div>

  <input type="submit" id="create_token">
</form>`}
          </pre>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '16px' }}>
            Next, trigger token creation when the submit button is pressed. On success, populate the token field and clear the sensitive fields so they aren't submitted to your server.
          </p>
          <pre style={codeBlockStyle}>
{`$("#checkout").submit(function () {
  var form = $(this);

  // Disable the submit button to avoid repeated clicks.
  form.find("input[type=submit]").prop("disabled", true);

  // Serialize the form fields into a valid card object.
  var card = {
    "name": form.find("[data-omise=holder_name]").val(),
    "number": form.find("[data-omise=number]").val(),
    "expiration_month": form.find("[data-omise=expiration_month]").val(),
    "expiration_year": form.find("[data-omise=expiration_year]").val(),
    "security_code": form.find("[data-omise=security_code]").val()
  };

  Omise.createToken("card", card, function (statusCode, response) {
    if (!response || response.object == "error") {
      // Display an error message.
      var message_text = response?.message || "Unable to generate token.";
      $("#token_errors").html(message_text);
      form.find("input[type=submit]").prop("disabled", false);
    } else {
      // Fill in the omise_token field.
      form.find("[name=omise_token]").val(response.id);

      // Remove sensitive data before submitting.
      form.find("[data-omise=number]").val("");
      form.find("[data-omise=security_code]").val("");

      // Submit the token to the server.
      form.get(0).submit();
    }
  });

  return false;
});`}
          </pre>

          <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '24px' }}>
            That's it. Omise.js collects the credit card information and returns a token, which you can use to take action on the card.
          </p>

          <div style={{ padding: '16px 20px', background: '#fff', border: '1px solid #e3e8ee', borderLeft: '4px solid #1A1F71', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.6 }}>
              <strong>Note:</strong> As of April 1, 2020, Omise permanently hardcodes <code style={{ fontSize: '12px', fontFamily: "'SF Mono', Monaco, monospace", background: '#f6f9fc', padding: '1px 4px', borderRadius: '3px' }}>security_code_check</code> to always return <code style={{ fontSize: '12px', fontFamily: "'SF Mono', Monaco, monospace", background: '#f6f9fc', padding: '1px 4px', borderRadius: '3px' }}>true</code> in Token and Card API responses — a deliberate fix to close a CVV brute-forcing vector.
            </p>
          </div>
        </section>

        {/* Error codes table */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Common error codes
          </h2>
          <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f6f9fc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase' }}>Code</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#697386', textTransform: 'uppercase' }}>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {errorCodes.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '14px 16px', borderTop: '1px solid #e3e8ee' }}>
                      <code style={{ fontSize: '13px', fontFamily: "'SF Mono', Monaco, monospace", color: '#1A1F71' }}>{row.code}</code>
                    </td>
                    <td style={{ padding: '14px 16px', borderTop: '1px solid #e3e8ee', fontSize: '14px', color: '#3c4257' }}>{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqItems.map((item, i) => (
              <div key={i} style={{ padding: '20px', background: '#f6f9fc', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontSize: '15px' }}>
                  {item.question}
                </div>
                <p style={{ fontSize: '14px', color: '#3c4257', margin: 0, lineHeight: 1.7 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Content */}
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
            Related content
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <Link
              href="/api-reference/tokens"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#697386" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              <div>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>Tokens API</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>API reference</div>
              </div>
            </Link>
            <Link
              href="/api-reference/charges"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#697386" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              <div>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>Charges API</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>API reference</div>
              </div>
            </Link>
            <Link
              href="/accept-payments/cards/3d-secure"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#697386" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>3D Secure</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Authentication</div>
              </div>
            </Link>
            <Link
              href="/integrations/client-libraries/omise-js"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: '#fff',
                border: '1px solid #e3e8ee',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#697386" strokeWidth="2">
                <rect width="8" height="8" x="2" y="2" rx="2"/>
                <rect width="8" height="8" x="14" y="2" rx="2"/>
                <rect width="8" height="8" x="2" y="14" rx="2"/>
                <rect width="8" height="8" x="14" y="14" rx="2"/>
              </svg>
              <div>
                <div style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '14px' }}>Omise.js</div>
                <div style={{ fontSize: '12px', color: '#697386' }}>Client library</div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
