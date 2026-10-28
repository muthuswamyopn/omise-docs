'use client';

import Link from 'next/link';
import Sidebar from '../../components/Sidebar';

interface ErrorCode {
  code: string;
  httpStatus: number;
  description: string;
  whenOccurs: string;
  resolution?: string;
}

const apiErrors: ErrorCode[] = [
  {
    code: 'authentication_failure',
    httpStatus: 401,
    description: 'The API key is invalid or missing.',
    whenOccurs: 'The Authorization header is missing, malformed, or contains an invalid secret key.',
    resolution: 'Verify your API key is correct and properly formatted. Use HTTP Basic Auth with your secret key as the username and an empty password.',
  },
  {
    code: 'not_found',
    httpStatus: 404,
    description: 'The resource does not exist.',
    whenOccurs: 'You attempt to retrieve, update, or act on a charge, token, customer, or source that does not exist.',
    resolution: 'Verify the resource ID is correct. Confirm the resource exists on the same account (test/live mode) you are currently using.',
  },
  {
    code: 'invalid_card',
    httpStatus: 400,
    description: 'The card information is invalid.',
    whenOccurs: 'You create a charge with invalid card details, an expired card, or a malformed card token.',
    resolution: 'Verify the card token is valid and not expired. Card tokens can only be used once and expire after a short period.',
  },
  {
    code: 'invalid_card_token',
    httpStatus: 400,
    description: 'The card token is invalid or already used.',
    whenOccurs: 'The token has expired, another charge already used it, or it does not exist.',
    resolution: 'Generate a new card token using Omise.js. Tokens are single-use and expire quickly.',
  },
  {
    code: 'missing_card',
    httpStatus: 400,
    description: 'The request is missing a payment method.',
    whenOccurs: 'You create a charge without specifying a card, source, or customer parameter.',
    resolution: 'Provide exactly one payment method: a card token, a payment source, or a customer ID with a saved card.',
  },
  {
    code: 'invalid_source',
    httpStatus: 400,
    description: 'The payment source is invalid or unusable.',
    whenOccurs: 'The source token is invalid, expired, or incompatible with the charge parameters.',
    resolution: 'Create a new source with valid parameters. Ensure the source type matches the currency and amount requirements.',
  },
  {
    code: 'used_token',
    httpStatus: 400,
    description: 'Another charge already used this token.',
    whenOccurs: 'You attempt to create a charge with a token that another charge already used.',
    resolution: 'Generate a new token for each charge. Tokens are single-use by design for security.',
  },
];

const chargeErrors: ErrorCode[] = [
  {
    code: 'bad_request',
    httpStatus: 400,
    description: 'The request is malformed or contains invalid parameters.',
    whenOccurs: 'Required parameters are missing, parameter types are incorrect, or values are out of valid range.',
    resolution: 'Check the request body for missing or invalid parameters. Refer to the endpoint documentation for required fields.',
  },
  {
    code: 'failed_capture',
    httpStatus: 400,
    description: 'The system cannot capture this charge.',
    whenOccurs: 'You attempt to capture a charge that is already captured, not authorized, or expired.',
    resolution: 'Verify the charge status is "pending" with authorized=true and captured=false. You must capture within 7 days of authorization.',
  },
  {
    code: 'failed_reverse',
    httpStatus: 400,
    description: 'The system cannot reverse this charge.',
    whenOccurs: 'You attempt to reverse a charge that is already captured, failed, or expired.',
    resolution: 'You can only reverse uncaptured authorized charges. For captured charges, use a refund instead.',
  },
  {
    code: 'failed_expire',
    httpStatus: 400,
    description: 'The system cannot expire this charge.',
    whenOccurs: 'You attempt to expire a charge that is not in pending status.',
    resolution: 'You can only manually expire pending charges awaiting customer action.',
  },
  {
    code: 'processed_charge',
    httpStatus: 400,
    description: 'The system already processed this charge.',
    whenOccurs: 'You call mark_as_paid or mark_as_failed on a charge that is not in pending status.',
    resolution: 'These test endpoints only work on pending charges. Create a new pending charge to test.',
  },
];

const paymentFailures: ErrorCode[] = [
  {
    code: 'insufficient_fund',
    httpStatus: 402,
    description: 'The card has insufficient funds or reached its credit limit.',
    whenOccurs: 'The cardholder\'s account does not have enough available balance or credit.',
    resolution: 'Ask the customer to use a different payment method or contact their bank.',
  },
  {
    code: 'payment_rejected',
    httpStatus: 402,
    description: 'The payment provider rejected the payment.',
    whenOccurs: 'The bank or payment provider declines the transaction for various reasons.',
    resolution: 'Ask the customer to contact their bank for details or try a different payment method.',
  },
  {
    code: 'stolen_or_lost_card',
    httpStatus: 402,
    description: 'The card issuer reported this card as stolen or lost.',
    whenOccurs: 'The card issuer flagged the card as compromised.',
    resolution: 'The customer must contact their bank and use a different payment method.',
  },
  {
    code: 'failed_fraud_check',
    httpStatus: 402,
    description: 'The transaction failed fraud detection checks.',
    whenOccurs: 'The payment triggers fraud prevention rules at the bank or Omise.',
    resolution: 'Ask the customer to verify their identity with their bank or try a different payment method.',
  },
  {
    code: 'invalid_account_number',
    httpStatus: 402,
    description: 'The card account number is invalid.',
    whenOccurs: 'The card number does not correspond to a valid account.',
    resolution: 'Verify the card number is correct or use a different card.',
  },
  {
    code: 'invalid_security_code',
    httpStatus: 402,
    description: 'The security code (CVV/CVC) is incorrect.',
    whenOccurs: 'The CVV/CVC does not match the card.',
    resolution: 'Ask the customer to verify and re-enter their security code.',
  },
  {
    code: 'expired_card',
    httpStatus: 402,
    description: 'The card has expired.',
    whenOccurs: 'The card\'s expiration date has passed.',
    resolution: 'Ask the customer to use a valid, non-expired card.',
  },
  {
    code: 'failed_processing',
    httpStatus: 402,
    description: 'The system encountered a general processing failure.',
    whenOccurs: 'The system cannot process the payment for unspecified reasons.',
    resolution: 'Retry the payment or ask the customer to use a different payment method.',
  },
];

const httpStatusCodes = [
  { code: 200, name: 'OK', description: 'The request succeeded.' },
  { code: 201, name: 'Created', description: 'The server created the resource successfully.' },
  { code: 400, name: 'Bad Request', description: 'The request is malformed or contains invalid parameters.' },
  { code: 401, name: 'Unauthorized', description: 'Authentication failed. Check your API key.' },
  { code: 402, name: 'Payment Required', description: 'The payment provider declined or could not process the payment.' },
  { code: 404, name: 'Not Found', description: 'The resource does not exist.' },
  { code: 429, name: 'Too Many Requests', description: 'You exceeded the rate limit. Slow down your requests.' },
  { code: 500, name: 'Internal Server Error', description: 'An error occurred on Omise\'s servers.' },
];

function ErrorSection({ title, errors }: { title: string; errors: ErrorCode[] }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
        {title}
      </h2>
      <div style={{ display: 'grid', gap: '16px' }}>
        {errors.map((error) => (
          <div key={error.code} style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <code style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#cd3d64',
                background: '#fde2dd',
                padding: '4px 10px',
                borderRadius: '4px',
                fontFamily: "'SF Mono', Monaco, monospace"
              }}>
                {error.code}
              </code>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#697386',
                background: '#f6f9fc',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                HTTP {error.httpStatus}
              </span>
            </div>
            <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, marginBottom: '8px' }}>
              {error.description}
            </p>
            <div style={{ fontSize: '14px', color: '#3c4257', lineHeight: 1.6, marginBottom: '12px' }}>
              <strong style={{ color: '#697386' }}>When it occurs:</strong> {error.whenOccurs}
            </div>
            {error.resolution && (
              <div style={{ fontSize: '14px', color: '#0e6245', background: '#cbf4c9', padding: '12px 16px', borderRadius: '6px', lineHeight: 1.6 }}>
                <strong>Resolution:</strong> {error.resolution}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ErrorsPage() {
  return (
    <div className="docs-layout">
      <Sidebar currentPage="charges/errors" />

      <main className="content">
        <div style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#1A1F71', textDecoration: 'none' }}>API Reference</Link>
          {' / '}
          <Link href="/charges" style={{ color: '#1A1F71', textDecoration: 'none' }}>Charges</Link>
          {' / '}
          <span style={{ color: '#1a1a1a' }}>Error Codes</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Charges API Error Codes
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '24px' }}>
          Comprehensive reference for all error codes returned by Charges API endpoints.
        </p>

        <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px' }}>
          When a Charges API request fails, Omise returns an error response with a specific error code and message.
          This page documents all possible error codes, when they occur, and how to resolve them.
        </p>

        {/* Error Response Format */}
        <div style={{ background: '#f6f9fc', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Error Response Format</div>
          <p style={{ fontSize: '14px', color: '#3c4257', marginBottom: '16px', lineHeight: 1.6 }}>
            All error responses follow this structure. The <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>code</code> field
            contains the machine-readable error type, while <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>message</code> provides
            a human-readable description.
          </p>
          <pre style={{
            background: '#1a2332',
            borderRadius: '8px',
            padding: '16px',
            margin: 0,
            fontSize: '13px',
            color: '#e6ebf1',
            fontFamily: "'SF Mono', Monaco, monospace",
            overflow: 'auto'
          }}>
{`{
  "object": "error",
  "location": "https://api.omise.co/charges",
  "code": "invalid_card",
  "message": "card token is invalid or was already used"
}`}
          </pre>
        </div>

        {/* HTTP Status Codes */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>
          HTTP Status Codes
        </h2>
        <div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', overflow: 'hidden', marginBottom: '48px' }}>
          {httpStatusCodes.map((status, index) => (
            <div
              key={status.code}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 20px',
                borderBottom: index < httpStatusCodes.length - 1 ? '1px solid #e3e8ee' : 'none',
                gap: '16px'
              }}
            >
              <span style={{
                fontSize: '14px',
                fontWeight: 700,
                minWidth: '45px',
                color: status.code < 300 ? '#0e6245' : status.code < 500 ? '#cd3d64' : '#9c6f19',
                fontFamily: "'SF Mono', Monaco, monospace"
              }}>
                {status.code}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a', minWidth: '180px' }}>
                {status.name}
              </span>
              <span style={{ fontSize: '14px', color: '#697386' }}>
                {status.description}
              </span>
            </div>
          ))}
        </div>

        <ErrorSection title="Authentication & Resource Errors" errors={apiErrors} />
        <ErrorSection title="Charge Operation Errors" errors={chargeErrors} />
        <ErrorSection title="Payment Failure Codes" errors={paymentFailures} />

        {/* Best Practices */}
        <div style={{ marginTop: '48px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0369a1', marginBottom: '16px' }}>
            Best Practices for Error Handling
          </h3>
          <ul style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
            <li>Always check the HTTP status code first to categorize the error type.</li>
            <li>Use the <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>code</code> field for programmatic error handling.</li>
            <li>Display the <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>message</code> field to users when appropriate.</li>
            <li>Implement retry logic with exponential backoff for 429 and 5xx errors.</li>
            <li>Log error responses for debugging and monitoring purposes.</li>
            <li>Never expose raw error messages containing sensitive information to end users.</li>
          </ul>
        </div>

        <div style={{ marginTop: '40px', padding: '16px', background: '#f6f9fc', borderRadius: '6px', fontSize: '13px', color: '#697386' }}>
          Full API schema available at <a href="https://api.omise.co/schema" style={{ color: '#1A1F71' }}>api.omise.co/schema</a>
        </div>
      </main>

      {/* Right Panel - Example Error Responses */}
      <aside className="code-panel">
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Authentication Error
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>401 Unauthorized</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://api.omise.co",
  "code": "authentication_failure",
  "message": "authentication failed"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Not Found Error
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>404 Not Found</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://api.omise.co/charges/chrg_test_invalid",
  "code": "not_found",
  "message": "charge chrg_test_invalid was not found"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Capture Failure
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>400 Bad Request</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://api.omise.co/charges/chrg_test_.../capture",
  "code": "failed_capture",
  "message": "charge was already captured"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Payment Declined
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>402 Payment Required</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "insufficient_fund",
  "failure_message": "insufficient funds in the account or the card has reached the credit limit"
}`}
            </pre>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px' }}>
            Invalid Token
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>400 Bad Request</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#e6ebf1', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://api.omise.co/charges",
  "code": "invalid_card_token",
  "message": "card token is invalid or was already used"
}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
