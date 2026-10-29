'use client';

import Link from 'next/link';
import { useState } from 'react';
import SidebarNew from '../../../components/SidebarNew';
import { API_VERSIONS } from '../../../lib/apiVersions';

interface ErrorCode {
  code: string;
  httpStatus: number;
  description: string;
  whenOccurs: string;
  resolution?: string;
  addedIn: string; // Version codename when this error was added
}

// All error codes organized by version
const errorsByVersion: Record<string, {
  apiErrors: ErrorCode[];
  chargeErrors: ErrorCode[];
  paymentFailures: ErrorCode[];
}> = {
  aegaeon: {
    apiErrors: [
      {
        code: 'authentication_failure',
        httpStatus: 401,
        description: 'The API key is invalid or missing.',
        whenOccurs: 'The Authorization header is missing, malformed, or contains an invalid secret key.',
        resolution: 'Verify your API key is correct and properly formatted. Use HTTP Basic Auth with your secret key as the username and an empty password.',
        addedIn: 'aegaeon',
      },
      {
        code: 'not_found',
        httpStatus: 404,
        description: 'The resource does not exist.',
        whenOccurs: 'You attempt to retrieve, update, or act on a charge, token, customer, or source that does not exist.',
        resolution: 'Verify the resource ID is correct. Confirm the resource exists on the same account (test/live mode) you are currently using.',
        addedIn: 'aegaeon',
      },
    ],
    chargeErrors: [
      {
        code: 'bad_request',
        httpStatus: 400,
        description: 'The request is malformed or contains invalid parameters.',
        whenOccurs: 'Required parameters are missing, parameter types are incorrect, or values are out of valid range.',
        resolution: 'Check the request body for missing or invalid parameters. Refer to the endpoint documentation for required fields.',
        addedIn: 'aegaeon',
      },
      {
        code: 'failed_capture',
        httpStatus: 400,
        description: 'The system cannot capture this charge.',
        whenOccurs: 'You attempt to capture a charge that is already captured, not authorized, or expired.',
        resolution: 'Verify the charge status is "pending" with authorized=true and captured=false. You must capture within 7 days of authorization.',
        addedIn: 'aegaeon',
      },
      {
        code: 'failed_reverse',
        httpStatus: 400,
        description: 'The system cannot reverse this charge.',
        whenOccurs: 'You attempt to reverse a charge that is already captured, failed, or expired.',
        resolution: 'You can only reverse uncaptured authorized charges. For captured charges, use a refund instead.',
        addedIn: 'aegaeon',
      },
    ],
    paymentFailures: [
      {
        code: 'failed_processing',
        httpStatus: 402,
        description: 'The system encountered a general processing failure.',
        whenOccurs: 'The system cannot process the payment for unspecified reasons.',
        resolution: 'Retry the payment or ask the customer to use a different payment method.',
        addedIn: 'aegaeon',
      },
      {
        code: 'insufficient_fund',
        httpStatus: 402,
        description: 'The card has insufficient funds or reached its credit limit.',
        whenOccurs: 'The cardholder\'s account does not have enough available balance or credit.',
        resolution: 'Ask the customer to use a different payment method or contact their bank.',
        addedIn: 'aegaeon',
      },
      {
        code: 'invalid_account_number',
        httpStatus: 402,
        description: 'The card account number is invalid.',
        whenOccurs: 'The card number does not correspond to a valid account.',
        resolution: 'Verify the card number is correct or use a different card.',
        addedIn: 'aegaeon',
      },
      {
        code: 'payment_rejected',
        httpStatus: 402,
        description: 'The payment provider rejected the payment.',
        whenOccurs: 'The bank or payment provider declines the transaction for various reasons.',
        resolution: 'Ask the customer to contact their bank for details or try a different payment method.',
        addedIn: 'aegaeon',
      },
      {
        code: 'timeout',
        httpStatus: 402,
        description: 'The payment request timed out.',
        whenOccurs: 'The payment processor did not respond within the allowed time.',
        resolution: 'Retry the payment. If the issue persists, the customer should try a different payment method.',
        addedIn: 'aegaeon',
      },
    ],
  },
  bestla: {
    apiErrors: [],
    chargeErrors: [
      {
        code: 'failed_expire',
        httpStatus: 400,
        description: 'The system cannot expire this charge.',
        whenOccurs: 'You attempt to expire a charge that is not in pending status.',
        resolution: 'You can only manually expire pending charges awaiting customer action.',
        addedIn: 'bestla',
      },
    ],
    paymentFailures: [
      {
        code: 'failed_fraud_check',
        httpStatus: 402,
        description: 'The transaction failed fraud detection checks.',
        whenOccurs: 'The payment triggers fraud prevention rules at the bank or Omise.',
        resolution: 'Ask the customer to verify their identity with their bank or try a different payment method.',
        addedIn: 'bestla',
      },
      {
        code: 'insufficient_balance',
        httpStatus: 402,
        description: 'The account has insufficient balance.',
        whenOccurs: 'The payment source account does not have enough balance to complete the transaction.',
        resolution: 'Ask the customer to top up their account or use a different payment method.',
        addedIn: 'bestla',
      },
      {
        code: 'invalid_security_code',
        httpStatus: 402,
        description: 'The security code (CVV/CVC) is incorrect.',
        whenOccurs: 'The CVV/CVC does not match the card.',
        resolution: 'Ask the customer to verify and re-enter their security code.',
        addedIn: 'bestla',
      },
      {
        code: 'payment_cancelled',
        httpStatus: 402,
        description: 'The customer cancelled the payment.',
        whenOccurs: 'The customer cancelled the payment during authorization or on the payment page.',
        resolution: 'Ask the customer to retry the payment if they wish to continue.',
        addedIn: 'bestla',
      },
      {
        code: 'expired_card',
        httpStatus: 402,
        description: 'The card has expired.',
        whenOccurs: 'The card\'s expiration date has passed.',
        resolution: 'Ask the customer to use a valid, non-expired card.',
        addedIn: 'bestla',
      },
    ],
  },
  cordelia: {
    apiErrors: [],
    chargeErrors: [
      {
        code: 'processed_charge',
        httpStatus: 400,
        description: 'The system already processed this charge.',
        whenOccurs: 'You call mark_as_paid or mark_as_failed on a charge that is not in pending status.',
        resolution: 'These test endpoints only work on pending charges. Create a new pending charge to test.',
        addedIn: 'cordelia',
      },
    ],
    paymentFailures: [],
  },
  deimos: {
    apiErrors: [
      {
        code: 'invalid_card',
        httpStatus: 400,
        description: 'The card information is invalid.',
        whenOccurs: 'You create a charge with invalid card details, an expired card, or a malformed card token.',
        resolution: 'Verify the card token is valid and not expired. Card tokens can only be used once and expire after a short period.',
        addedIn: 'deimos',
      },
      {
        code: 'invalid_card_token',
        httpStatus: 400,
        description: 'The card token is invalid or already used.',
        whenOccurs: 'The token has expired, another charge already used it, or it does not exist.',
        resolution: 'Generate a new card token using Omise.js. Tokens are single-use and expire quickly.',
        addedIn: 'deimos',
      },
      {
        code: 'missing_card',
        httpStatus: 400,
        description: 'The request is missing a payment method.',
        whenOccurs: 'You create a charge without specifying a card, source, or customer parameter.',
        resolution: 'Provide exactly one payment method: a card token, a payment source, or a customer ID with a saved card.',
        addedIn: 'deimos',
      },
      {
        code: 'invalid_source',
        httpStatus: 400,
        description: 'The payment source is invalid or unusable.',
        whenOccurs: 'The source token is invalid, expired, or incompatible with the charge parameters.',
        resolution: 'Create a new source with valid parameters. Ensure the source type matches the currency and amount requirements.',
        addedIn: 'deimos',
      },
      {
        code: 'used_token',
        httpStatus: 400,
        description: 'Another charge already used this token.',
        whenOccurs: 'You attempt to create a charge with a token that another charge already used.',
        resolution: 'Generate a new token for each charge. Tokens are single-use by design for security.',
        addedIn: 'deimos',
      },
    ],
    chargeErrors: [],
    paymentFailures: [
      {
        code: 'stolen_or_lost_card',
        httpStatus: 402,
        description: 'The card issuer reported this card as stolen or lost.',
        whenOccurs: 'The card issuer flagged the card as compromised.',
        resolution: 'The customer must contact their bank and use a different payment method.',
        addedIn: 'deimos',
      },
      {
        code: 'blocked_card',
        httpStatus: 402,
        description: 'The card has been blocked by the issuer.',
        whenOccurs: 'The card issuer has blocked the card from making transactions.',
        resolution: 'The customer should contact their bank to unblock the card or use a different payment method.',
        addedIn: 'deimos',
      },
    ],
  },
};

// Example error responses by version for the right sidebar
const exampleErrorsByVersion: Record<string, Array<{
  title: string;
  httpStatus: string;
  httpCode: number;
  response: string;
}>> = {
  aegaeon: [
    // API Errors (2)
    {
      title: 'Authentication Failure',
      httpStatus: '401 Unauthorized',
      httpCode: 401,
      response: `{
  "object": "error",
  "location": "https://api.omise.co",
  "code": "authentication_failure",
  "message": "authentication failed"
}`,
    },
    {
      title: 'Not Found',
      httpStatus: '404 Not Found',
      httpCode: 404,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges/chrg_test_invalid",
  "code": "not_found",
  "message": "charge chrg_test_invalid was not found"
}`,
    },
    // Charge Errors (3)
    {
      title: 'Bad Request',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges",
  "code": "bad_request",
  "message": "amount is required"
}`,
    },
    {
      title: 'Failed Capture',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges/chrg_test_.../capture",
  "code": "failed_capture",
  "message": "charge was already captured"
}`,
    },
    {
      title: 'Failed Reverse',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges/chrg_test_.../reverse",
  "code": "failed_reverse",
  "message": "charge was already captured"
}`,
    },
    // Payment Failures (5)
    {
      title: 'Failed Processing',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "failed_processing",
  "failure_message": "payment processing failed"
}`,
    },
    {
      title: 'Insufficient Fund',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "insufficient_fund",
  "failure_message": "insufficient funds in the account"
}`,
    },
    {
      title: 'Invalid Account Number',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "invalid_account_number",
  "failure_message": "card account number is invalid"
}`,
    },
    {
      title: 'Payment Rejected',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "payment_rejected",
  "failure_message": "payment was rejected by the issuer"
}`,
    },
    {
      title: 'Timeout',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "timeout",
  "failure_message": "payment request timed out"
}`,
    },
  ],
  bestla: [
    // Charge Errors (1)
    {
      title: 'Failed Expire',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges/chrg_test_.../expire",
  "code": "failed_expire",
  "message": "charge is not in pending status"
}`,
    },
    // Payment Failures (5)
    {
      title: 'Failed Fraud Check',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "failed_fraud_check",
  "failure_message": "payment failed fraud detection"
}`,
    },
    {
      title: 'Insufficient Balance',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "insufficient_balance",
  "failure_message": "account has insufficient balance"
}`,
    },
    {
      title: 'Invalid Security Code',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "invalid_security_code",
  "failure_message": "security code is incorrect"
}`,
    },
    {
      title: 'Payment Cancelled',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "payment_cancelled",
  "failure_message": "customer cancelled the payment"
}`,
    },
    {
      title: 'Expired Card',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "expired_card",
  "failure_message": "card has expired"
}`,
    },
  ],
  cordelia: [
    {
      title: 'Processed Charge',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges/chrg_test_.../mark_as_paid",
  "code": "processed_charge",
  "message": "charge was already processed"
}`,
    },
  ],
  deimos: [
    {
      title: 'Invalid Card',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges",
  "code": "invalid_card",
  "message": "card is invalid or cannot be used"
}`,
    },
    {
      title: 'Invalid Card Token',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges",
  "code": "invalid_card_token",
  "message": "card token is invalid or was already used"
}`,
    },
    {
      title: 'Missing Payment Method',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges",
  "code": "missing_card",
  "message": "no payment method was provided"
}`,
    },
    {
      title: 'Invalid Source',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges",
  "code": "invalid_source",
  "message": "source is invalid or cannot be used"
}`,
    },
    {
      title: 'Used Token',
      httpStatus: '400 Bad Request',
      httpCode: 400,
      response: `{
  "object": "error",
  "location": "https://api.omise.co/charges",
  "code": "used_token",
  "message": "token was already used by another charge"
}`,
    },
    {
      title: 'Stolen or Lost Card',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "stolen_or_lost_card",
  "failure_message": "card was reported as stolen or lost"
}`,
    },
    {
      title: 'Blocked Card',
      httpStatus: '402 Payment Required',
      httpCode: 402,
      response: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "status": "failed",
  "failure_code": "blocked_card",
  "failure_message": "card has been blocked by the issuer"
}`,
    },
  ],
};

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
  if (errors.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px', paddingTop: '24px', borderTop: '1px solid #e3e8ee' }}>
        {title}
        <span style={{ fontSize: '13px', fontWeight: 400, color: '#697386', marginLeft: '12px' }}>
          ({errors.length} error{errors.length !== 1 ? 's' : ''})
        </span>
      </h2>
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
  const [selectedVersion, setSelectedVersion] = useState('deimos');

  const versionErrors = errorsByVersion[selectedVersion] || { apiErrors: [], chargeErrors: [], paymentFailures: [] };
  const versionExamples = exampleErrorsByVersion[selectedVersion] || [];

  const totalErrors = versionErrors.apiErrors.length + versionErrors.chargeErrors.length + versionErrors.paymentFailures.length;

  const selectedVersionInfo = API_VERSIONS.find(v => v.codename === selectedVersion);

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
          Error codes introduced in each API version.
        </p>

        {/* Version Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          background: '#f6f9fc',
          border: '1px solid #e3e8ee',
          borderRadius: '8px',
          marginBottom: '24px',
        }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#3c4257' }}>
            API Version:
          </label>
          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            style={{
              padding: '8px 32px 8px 12px',
              fontSize: '14px',
              fontWeight: 500,
              border: '1px solid #e3e8ee',
              borderRadius: '6px',
              background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23697386\' d=\'M2 4l4 4 4-4\'/%3E%3C/svg%3E") no-repeat right 10px center',
              cursor: 'pointer',
              appearance: 'none',
              color: '#1a1a1a',
            }}
          >
            {API_VERSIONS.map((version) => (
              <option key={version.codename} value={version.codename}>
                {version.label}
              </option>
            ))}
          </select>
          <span style={{
            fontSize: '13px',
            color: '#697386',
            marginLeft: '8px',
          }}>
            {totalErrors} error{totalErrors !== 1 ? 's' : ''} introduced in this version
          </span>
        </div>

        {totalErrors === 0 ? (
          <div style={{
            padding: '40px',
            background: '#f6f9fc',
            border: '1px solid #e3e8ee',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#697386',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.5 }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" strokeLinecap="round" />
            </svg>
            <p style={{ fontSize: '15px', marginBottom: '8px' }}>
              No new error codes were introduced in {selectedVersionInfo?.label || selectedVersion}.
            </p>
            <p style={{ fontSize: '13px' }}>
              Select a different version to see error codes added in that release.
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '15px', color: '#3c4257', lineHeight: 1.7, marginBottom: '32px' }}>
              The following error codes were introduced in API version <strong>{selectedVersionInfo?.label || selectedVersion}</strong>.
              When using this version or later, your application should handle these error codes appropriately.
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
  "location": "https://api.omise.co/charges",
  "code": "error_code",
  "message": "human-readable error message"
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

            <ErrorSection title="Authentication & Resource Errors" errors={versionErrors.apiErrors} />
            <ErrorSection title="Charge Operation Errors" errors={versionErrors.chargeErrors} />
            <ErrorSection title="Payment Failure Codes" errors={versionErrors.paymentFailures} />
          </>
        )}

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
          Full API schema available at <Link href="/openapi.yaml" style={{ color: '#1A1F71' }}>openapi.yaml</Link>
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
            {selectedVersionInfo?.label || selectedVersion} Error Examples
          </div>
        </div>

        {versionExamples.length === 0 ? (
          <div style={{ padding: '24px 16px', textAlign: 'center', color: '#697386', fontSize: '13px' }}>
            No error examples for this version.
            <br />
            <span style={{ fontSize: '12px', opacity: 0.7 }}>Select a version with error codes.</span>
          </div>
        ) : (
          versionExamples.map((example, index) => (
            <div key={index} style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#b8c7d9', marginBottom: '12px', padding: '0 16px' }}>
                {example.title}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', margin: '0 8px' }}>
                <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#ff6b6b' }}>{example.httpStatus}</span>
                </div>
                <pre style={{ padding: '16px', margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#67e8f9', overflow: 'auto', fontFamily: "'SF Mono', Monaco, monospace" }}>
                  {example.response}
                </pre>
              </div>
            </div>
          ))
        )}
      </aside>
    </div>
  );
}
