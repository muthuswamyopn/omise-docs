'use client';

import Link from 'next/link';
import SidebarNew from '../../../components/SidebarNew';

// ============================================================================
// ERROR CODES
// Source: https://docs.omise.co/charges-api
// NOTE: Error codes are NOT version-specific - same across all versions
// ============================================================================

interface ErrorCode {
  code: string;
  httpStatus: number;
  description: string;
  whenOccurs: string;
  resolution?: string;
}

// API Errors
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
    code: 'bad_request',
    httpStatus: 400,
    description: 'The request is malformed or missing required parameters.',
    whenOccurs: 'Required parameters are missing, parameter types are incorrect, or values are out of valid range.',
    resolution: 'Check the request body for missing or invalid parameters. Refer to the endpoint documentation for required fields.',
  },
];

// Charge Operation Errors
const chargeErrors: ErrorCode[] = [
  {
    code: 'failed_capture',
    httpStatus: 400,
    description: 'The system cannot capture this charge.',
    whenOccurs: 'You attempt to capture a charge that is already captured, not authorized, or expired.',
    resolution: 'Verify the charge status is "pending" with authorized=true. You must capture within 7 days of authorization.',
  },
  {
    code: 'failed_reverse',
    httpStatus: 400,
    description: 'The system cannot reverse this charge.',
    whenOccurs: 'You attempt to reverse a charge that is already captured, failed, or expired.',
    resolution: 'You can only reverse uncaptured authorized charges. For captured charges, use a refund instead.',
  },
  {
    code: 'failed_refund',
    httpStatus: 400,
    description: 'The refund processing failed.',
    whenOccurs: 'You attempt to refund a charge that cannot be refunded or exceeds refundable amount.',
    resolution: 'Verify the charge is refundable and the amount does not exceed the available refundable amount.',
  },
  {
    code: 'failed_expire',
    httpStatus: 400,
    description: 'The charge cannot be expired.',
    whenOccurs: 'You attempt to expire a charge that is already completed, failed, or expired.',
    resolution: 'You can only expire pending charges that have not been completed.',
  },
  {
    code: 'used_token',
    httpStatus: 400,
    description: 'The token has already been used.',
    whenOccurs: 'You attempt to create a charge with a token that was already used for another charge.',
    resolution: 'Tokens are single-use. Create a new token for each charge.',
  },
  {
    code: 'invalid_charge',
    httpStatus: 400,
    description: 'The charge parameters are invalid.',
    whenOccurs: 'The charge amount is below the minimum or other parameters are invalid.',
    resolution: 'Verify the amount meets the minimum (e.g., 100 satangs for THB) and all parameters are valid.',
  },
];

// Payment Failure Codes - These appear in failure_code when status=failed
const paymentFailures: ErrorCode[] = [
  {
    code: 'insufficient_fund',
    httpStatus: 402,
    description: 'The card has insufficient funds or reached its credit limit.',
    whenOccurs: 'The cardholder\'s account does not have enough available balance or credit.',
    resolution: 'Ask the customer to use a different payment method or contact their bank.',
  },
  {
    code: 'stolen_or_lost_card',
    httpStatus: 402,
    description: 'The card issuer reported this card as stolen or lost.',
    whenOccurs: 'The card issuer flagged the card as compromised.',
    resolution: 'The customer must contact their bank and use a different payment method.',
  },
  {
    code: 'failed_processing',
    httpStatus: 402,
    description: 'The system encountered a general processing failure.',
    whenOccurs: 'The system cannot process the payment for unspecified reasons.',
    resolution: 'Retry the payment or ask the customer to use a different payment method.',
  },
  {
    code: 'payment_rejected',
    httpStatus: 402,
    description: 'The payment provider rejected the payment.',
    whenOccurs: 'The bank or payment provider declines the transaction for various reasons.',
    resolution: 'Ask the customer to contact their bank for details or try a different payment method.',
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
    code: 'expired_card',
    httpStatus: 402,
    description: 'The card has expired.',
    whenOccurs: 'The card\'s expiration date has passed.',
    resolution: 'Ask the customer to use a valid, non-expired card.',
  },
  {
    code: 'invalid_security_code',
    httpStatus: 402,
    description: 'The security code (CVV/CVC) is incorrect.',
    whenOccurs: 'The CVV/CVC does not match the card.',
    resolution: 'Ask the customer to verify and re-enter their security code.',
  },
  {
    code: 'insufficient_balance',
    httpStatus: 402,
    description: 'The account has insufficient balance.',
    whenOccurs: 'The payment source account does not have enough balance.',
    resolution: 'Ask the customer to top up their account or use a different payment method.',
  },
  {
    code: 'payment_cancelled',
    httpStatus: 402,
    description: 'The customer cancelled the payment.',
    whenOccurs: 'The customer cancelled the payment during authorization.',
    resolution: 'Ask the customer to retry the payment if they wish to continue.',
  },
  // From official docs (https://docs.omise.co/charges-api)
  {
    code: 'confirmed_amount_mismatch',
    httpStatus: 402,
    description: 'The confirmed amount does not match the expected amount.',
    whenOccurs: 'The amount confirmed by the payment provider differs from the charge amount.',
    resolution: 'Verify the charge amount and retry or contact support.',
  },
  {
    code: 'timeout',
    httpStatus: 402,
    description: 'The payment request timed out.',
    whenOccurs: 'The payment provider did not respond within the expected time.',
    resolution: 'Ask the customer to retry the payment.',
  },
  {
    code: 'invalid_account',
    httpStatus: 402,
    description: 'The account is invalid (alias for invalid_account_number).',
    whenOccurs: 'The account number does not correspond to a valid account.',
    resolution: 'Verify the account details or use a different payment method.',
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

function ErrorSection({ title, description, errors }: { title: string; description?: string; errors: ErrorCode[] }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
        {title}
      </h2>
      {description && (
        <p style={{ fontSize: '14px', color: '#697386', marginBottom: '20px' }}>{description}</p>
      )}
      <div style={{ display: 'grid', gap: '16px' }}>
        {errors.map((error) => (
          <div key={error.code} style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
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
      <SidebarNew />

      <main className="content">
        <div style={{ fontSize: '14px', color: '#697386', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#1A1F71', textDecoration: 'none' }}>Documentation</Link>
          {' / '}
          <Link href="/api-reference" style={{ color: '#1A1F71', textDecoration: 'none' }}>API Reference</Link>
          {' / '}
          <Link href="/api-reference/charges" style={{ color: '#1A1F71', textDecoration: 'none' }}>Charges</Link>
          {' / '}
          <span style={{ color: '#1a1a1a' }}>Error Codes</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px', color: '#1a1a1a' }}>
          Charges API Error Codes
        </h1>
        <p style={{ fontSize: '16px', color: '#697386', marginBottom: '24px' }}>
          Comprehensive reference for all error codes returned by Charges API endpoints.
        </p>

        {/* Verification notice */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '16px',
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          marginBottom: '24px',
          fontSize: '13px',
          color: '#0369a1'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <div>
            <strong>Note:</strong> Error codes are consistent across all API versions.
          </div>
        </div>

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
            color: '#67e8f9',
            fontFamily: "'SF Mono', Monaco, monospace",
            overflow: 'auto'
          }}>
{`{
  "object": "error",
  "location": "https://www.omise.co/api-errors#bad-request",
  "code": "bad_request",
  "message": "either source, card or customer parameter must be supplied"
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

        <ErrorSection
          title="API Errors"
          description="Errors returned directly by the API for invalid requests or authentication issues."
          errors={apiErrors}
        />
        <ErrorSection
          title="Charge Operation Errors"
          description="Errors when performing operations on charges (capture, reverse, refund, etc.)."
          errors={chargeErrors}
        />
        <ErrorSection
          title="Payment Failure Codes"
          description="These codes appear in the failure_code field when a charge's status is 'failed'."
          errors={paymentFailures}
        />

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
          Full error documentation at <a href="https://www.omise.co/api-errors" target="_blank" rel="noopener noreferrer" style={{ color: '#1A1F71' }}>omise.co/api-errors</a>
        </div>
      </main>

      {/* Right Panel - Example Error Responses */}
      <aside className="code-panel">
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '20px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9' }}>
            Error Examples
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px', padding: '0 16px' }}>
            Authentication Failure
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', margin: '0 8px' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>401 Unauthorized</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://www.omise.co/api-errors#authentication-failure",
  "code": "authentication_failure",
  "message": "authentication failed"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px', padding: '0 16px' }}>
            Not Found
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', margin: '0 8px' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>404 Not Found</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://www.omise.co/api-errors#not-found",
  "code": "not_found",
  "message": "charge chrg_test_invalid123 was not found"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px', padding: '0 16px' }}>
            Bad Request
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', margin: '0 8px' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>400 Bad Request</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "error",
  "location": "https://www.omise.co/api-errors#bad-request",
  "code": "bad_request",
  "message": "either source, card or customer parameter must be supplied"
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px', padding: '0 16px' }}>
            Payment Failed
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', margin: '0 8px' }}>
            <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>Charge Object (status: failed)</span>
            </div>
            <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
{`{
  "object": "charge",
  "id": "chrg_test_69ie9n6ieysx3zgonqk",
  "status": "failed",
  "failure_code": "insufficient_fund",
  "failure_message": "insufficient funds in the account or the card has reached the credit limit"
}`}
            </pre>
          </div>
        </div>
      </aside>
    </div>
  );
}
