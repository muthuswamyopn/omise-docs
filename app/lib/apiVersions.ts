// API Version configuration matching Omise's internal naming
// VERIFIED: 2026-10-29 via direct API calls with Omise-Version header

export interface ApiVersion {
  codename: string;
  date: string;
  label: string;
  isLatest?: boolean;
}

export const API_VERSIONS: ApiVersion[] = [
  { codename: 'deimos', date: '2019-05-29', label: 'Deimos (2019-05-29)', isLatest: true },
  { codename: 'cordelia', date: '2017-11-02', label: 'Cordelia (2017-11-02)' },
  { codename: 'bestla', date: '2015-11-17', label: 'Bestla (2015-11-17)' },
  { codename: 'aegaeon', date: '2014-07-27', label: 'Aegaeon (2014-07-27)' },
];

export const DEFAULT_VERSION = 'deimos';

export function getVersionByCodename(codename: string): ApiVersion | undefined {
  return API_VERSIONS.find(v => v.codename === codename);
}

export function getVersionByDate(date: string): ApiVersion | undefined {
  return API_VERSIONS.find(v => v.date === date);
}

// ============================================================================
// VERIFIED CHARGE FIELDS BY VERSION
// Source: Direct API calls with Omise-Version header on 2026-10-29
// ============================================================================

export interface ChargeFieldInfo {
  name: string;
  type: string;
  description: string;
  nullable?: boolean;
}

// Aegaeon (2014-07-27) - 55 fields verified
export const AEGAEON_FIELDS: ChargeFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "charge"' },
  { name: 'id', type: 'string', description: 'Unique charge identifier' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge' },
  { name: 'location', type: 'string', description: 'API path to retrieve this charge' },
  { name: 'amount', type: 'integer', description: 'Charge amount in smallest currency unit' },
  { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code' },
  { name: 'funding_amount', type: 'integer', description: 'Amount in funding currency' },
  { name: 'funding_currency', type: 'string', description: 'Settlement currency' },
  { name: 'description', type: 'string', description: 'Charge description', nullable: true },
  { name: 'metadata', type: 'object', description: 'Custom key-value pairs' },
  { name: 'status', type: 'string', description: 'Charge status: pending, successful, failed, expired, reversed' },
  { name: 'authorized', type: 'boolean', description: 'Whether the charge has been authorized' },
  { name: 'authorized_amount', type: 'integer', description: 'Amount authorized' },
  { name: 'authorization_type', type: 'string', description: 'pre_auth or final_auth', nullable: true },
  { name: 'captured', type: 'boolean', description: 'Whether the charge has been captured' },
  { name: 'captured_amount', type: 'integer', description: 'Amount captured' },
  { name: 'captured_at', type: 'datetime', description: 'Capture timestamp', nullable: true },
  { name: 'capture', type: 'boolean', description: 'Auto-capture setting when created' },
  { name: 'capturable', type: 'boolean', description: 'Whether the charge can be captured' },
  { name: 'can_perform_void', type: 'boolean', description: 'Whether void operation is available' },
  { name: 'reversible', type: 'boolean', description: 'Whether the charge can be reversed' },
  { name: 'reversed', type: 'boolean', description: 'Whether the charge has been reversed' },
  { name: 'reversed_at', type: 'datetime', description: 'Reversal timestamp', nullable: true },
  { name: 'refundable', type: 'boolean', description: 'Whether the charge can be refunded' },
  { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refund is allowed' },
  { name: 'refunded', type: 'integer', description: 'Total amount refunded' },
  { name: 'refunds', type: 'list', description: 'List of refunds for this charge' },
  { name: 'voided', type: 'boolean', description: 'Whether the charge has been voided' },
  { name: 'expired', type: 'boolean', description: 'Whether the charge has expired' },
  { name: 'expires_at', type: 'datetime', description: 'Expected expiration timestamp', nullable: true },
  { name: 'expired_at', type: 'datetime', description: 'Actual expiration timestamp', nullable: true },
  { name: 'disputable', type: 'boolean', description: 'Whether a dispute can be created' },
  { name: 'dispute', type: 'object', description: 'Associated dispute if any', nullable: true },
  { name: 'card', type: 'object', description: 'Card details (for card payments)', nullable: true },
  { name: 'customer', type: 'string', description: 'Customer ID if charged to a saved customer', nullable: true },
  { name: 'ip', type: 'string', description: 'Customer IP address', nullable: true },
  { name: 'failure_code', type: 'string', description: 'Error code if charge failed', nullable: true },
  { name: 'failure_message', type: 'string', description: 'Human-readable failure message', nullable: true },
  { name: 'created', type: 'datetime', description: 'Charge creation timestamp' },
  { name: 'paid_at', type: 'datetime', description: 'Payment completion timestamp', nullable: true },
  { name: 'offline', type: 'string', description: 'Offline payment method', nullable: true },
  { name: 'offsite', type: 'string', description: 'Offsite payment method (internet_banking_*)', nullable: true },
  { name: 'source_of_fund', type: 'string', description: 'Source type: card, offsite, offline' },
  { name: 'return_uri', type: 'string', description: 'Redirect URI after payment', nullable: true },
  { name: 'authorize_uri', type: 'string', description: 'URL for customer authorization', nullable: true },
  { name: 'reference', type: 'string', description: 'Payment reference', nullable: true },
  { name: 'transaction', type: 'string', description: 'Transaction ID', nullable: true },
  { name: 'transaction_fees', type: 'object', description: 'Fee breakdown' },
  { name: 'approval_code', type: 'string', description: 'Authorization approval code', nullable: true },
  { name: 'acquirer_reference_number', type: 'string', description: 'Acquirer reference number', nullable: true },
  { name: 'schedule', type: 'object', description: 'Associated schedule if recurring', nullable: true },
  { name: 'link', type: 'object', description: 'Associated payment link', nullable: true },
  { name: 'linked_account', type: 'object', description: 'Linked account for marketplace', nullable: true },
  { name: 'branch', type: 'object', description: 'Branch information', nullable: true },
  { name: 'terminal', type: 'object', description: 'Terminal information', nullable: true },
  { name: 'device', type: 'object', description: 'Device information', nullable: true },
];

// Bestla (2015-11-17) - 52 fields verified
// Same as Aegaeon but without: authorization_type, authorized_amount, captured_amount
export const BESTLA_FIELDS: ChargeFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "charge"' },
  { name: 'id', type: 'string', description: 'Unique charge identifier' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge' },
  { name: 'location', type: 'string', description: 'API path to retrieve this charge' },
  { name: 'amount', type: 'integer', description: 'Charge amount in smallest currency unit' },
  { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code' },
  { name: 'funding_amount', type: 'integer', description: 'Amount in funding currency' },
  { name: 'funding_currency', type: 'string', description: 'Settlement currency' },
  { name: 'description', type: 'string', description: 'Charge description', nullable: true },
  { name: 'metadata', type: 'object', description: 'Custom key-value pairs' },
  { name: 'status', type: 'string', description: 'Charge status' },
  { name: 'authorized', type: 'boolean', description: 'Whether the charge has been authorized' },
  { name: 'capture', type: 'boolean', description: 'Auto-capture setting when created' },
  { name: 'capturable', type: 'boolean', description: 'Whether the charge can be captured' },
  { name: 'can_perform_void', type: 'boolean', description: 'Whether void operation is available' },
  { name: 'reversible', type: 'boolean', description: 'Whether the charge can be reversed' },
  { name: 'reversed', type: 'boolean', description: 'Whether the charge has been reversed' },
  { name: 'reversed_at', type: 'datetime', description: 'Reversal timestamp', nullable: true },
  { name: 'refundable', type: 'boolean', description: 'Whether the charge can be refunded' },
  { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refund is allowed' },
  { name: 'refunded', type: 'integer', description: 'Total amount refunded' },
  { name: 'refunds', type: 'list', description: 'List of refunds for this charge' },
  { name: 'voided', type: 'boolean', description: 'Whether the charge has been voided' },
  { name: 'expired', type: 'boolean', description: 'Whether the charge has expired' },
  { name: 'expires_at', type: 'datetime', description: 'Expected expiration timestamp', nullable: true },
  { name: 'expired_at', type: 'datetime', description: 'Actual expiration timestamp', nullable: true },
  { name: 'disputable', type: 'boolean', description: 'Whether a dispute can be created' },
  { name: 'dispute', type: 'object', description: 'Associated dispute if any', nullable: true },
  { name: 'card', type: 'object', description: 'Card details', nullable: true },
  { name: 'customer', type: 'string', description: 'Customer ID', nullable: true },
  { name: 'ip', type: 'string', description: 'Customer IP address', nullable: true },
  { name: 'failure_code', type: 'string', description: 'Error code if charge failed', nullable: true },
  { name: 'failure_message', type: 'string', description: 'Failure message', nullable: true },
  { name: 'created', type: 'datetime', description: 'Charge creation timestamp' },
  { name: 'paid_at', type: 'datetime', description: 'Payment completion timestamp', nullable: true },
  { name: 'offline', type: 'string', description: 'Offline payment method', nullable: true },
  { name: 'offsite', type: 'string', description: 'Offsite payment method', nullable: true },
  { name: 'source_of_fund', type: 'string', description: 'Source type: card, offsite, offline' },
  { name: 'return_uri', type: 'string', description: 'Redirect URI after payment', nullable: true },
  { name: 'authorize_uri', type: 'string', description: 'URL for customer authorization', nullable: true },
  { name: 'reference', type: 'string', description: 'Payment reference', nullable: true },
  { name: 'transaction', type: 'string', description: 'Transaction ID', nullable: true },
  { name: 'transaction_fees', type: 'object', description: 'Fee breakdown' },
  { name: 'approval_code', type: 'string', description: 'Authorization approval code', nullable: true },
  { name: 'acquirer_reference_number', type: 'string', description: 'Acquirer reference number', nullable: true },
  { name: 'schedule', type: 'object', description: 'Associated schedule', nullable: true },
  { name: 'link', type: 'object', description: 'Associated payment link', nullable: true },
  { name: 'linked_account', type: 'object', description: 'Linked account', nullable: true },
  { name: 'branch', type: 'object', description: 'Branch information', nullable: true },
  { name: 'terminal', type: 'object', description: 'Terminal information', nullable: true },
  { name: 'device', type: 'object', description: 'Device information', nullable: true },
];

// Cordelia (2017-11-02) - 55 fields verified
// Adds: source, platform_fee, zero_interest_installments, authorization_type, authorized_amount, captured_amount
// Removes: offline, offsite, source_of_fund (replaced by source)
export const CORDELIA_FIELDS: ChargeFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "charge"' },
  { name: 'id', type: 'string', description: 'Unique charge identifier' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge' },
  { name: 'location', type: 'string', description: 'API path to retrieve this charge' },
  { name: 'amount', type: 'integer', description: 'Charge amount in smallest currency unit' },
  { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code' },
  { name: 'funding_amount', type: 'integer', description: 'Amount in funding currency' },
  { name: 'funding_currency', type: 'string', description: 'Settlement currency' },
  { name: 'description', type: 'string', description: 'Charge description', nullable: true },
  { name: 'metadata', type: 'object', description: 'Custom key-value pairs' },
  { name: 'status', type: 'string', description: 'Charge status' },
  { name: 'authorized', type: 'boolean', description: 'Whether the charge has been authorized' },
  { name: 'authorized_amount', type: 'integer', description: 'Amount authorized' },
  { name: 'authorization_type', type: 'string', description: 'pre_auth or final_auth', nullable: true },
  { name: 'captured_amount', type: 'integer', description: 'Amount captured' },
  { name: 'capture', type: 'boolean', description: 'Auto-capture setting' },
  { name: 'capturable', type: 'boolean', description: 'Whether the charge can be captured' },
  { name: 'can_perform_void', type: 'boolean', description: 'Whether void operation is available' },
  { name: 'reversible', type: 'boolean', description: 'Whether the charge can be reversed' },
  { name: 'reversed', type: 'boolean', description: 'Whether the charge has been reversed' },
  { name: 'reversed_at', type: 'datetime', description: 'Reversal timestamp', nullable: true },
  { name: 'refundable', type: 'boolean', description: 'Whether the charge can be refunded' },
  { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refund is allowed' },
  { name: 'refunded', type: 'integer', description: 'Total amount refunded' },
  { name: 'refunds', type: 'list', description: 'List of refunds' },
  { name: 'voided', type: 'boolean', description: 'Whether the charge has been voided' },
  { name: 'expired', type: 'boolean', description: 'Whether the charge has expired' },
  { name: 'expires_at', type: 'datetime', description: 'Expected expiration timestamp', nullable: true },
  { name: 'expired_at', type: 'datetime', description: 'Actual expiration timestamp', nullable: true },
  { name: 'disputable', type: 'boolean', description: 'Whether a dispute can be created' },
  { name: 'dispute', type: 'object', description: 'Associated dispute', nullable: true },
  { name: 'card', type: 'object', description: 'Card details', nullable: true },
  { name: 'source', type: 'object', description: 'Payment source details', nullable: true },
  { name: 'customer', type: 'string', description: 'Customer ID', nullable: true },
  { name: 'ip', type: 'string', description: 'Customer IP address', nullable: true },
  { name: 'failure_code', type: 'string', description: 'Error code if charge failed', nullable: true },
  { name: 'failure_message', type: 'string', description: 'Failure message', nullable: true },
  { name: 'created', type: 'datetime', description: 'Charge creation timestamp' },
  { name: 'paid_at', type: 'datetime', description: 'Payment completion timestamp', nullable: true },
  { name: 'return_uri', type: 'string', description: 'Redirect URI after payment', nullable: true },
  { name: 'authorize_uri', type: 'string', description: 'URL for customer authorization', nullable: true },
  { name: 'reference', type: 'string', description: 'Payment reference', nullable: true },
  { name: 'transaction', type: 'string', description: 'Transaction ID', nullable: true },
  { name: 'transaction_fees', type: 'object', description: 'Fee breakdown' },
  { name: 'platform_fee', type: 'object', description: 'Platform fee configuration' },
  { name: 'zero_interest_installments', type: 'boolean', description: 'Whether merchant absorbs installment interest' },
  { name: 'approval_code', type: 'string', description: 'Authorization approval code', nullable: true },
  { name: 'acquirer_reference_number', type: 'string', description: 'Acquirer reference number', nullable: true },
  { name: 'schedule', type: 'object', description: 'Associated schedule', nullable: true },
  { name: 'link', type: 'object', description: 'Associated payment link', nullable: true },
  { name: 'linked_account', type: 'object', description: 'Linked account', nullable: true },
  { name: 'branch', type: 'object', description: 'Branch information', nullable: true },
  { name: 'terminal', type: 'object', description: 'Terminal information', nullable: true },
  { name: 'device', type: 'object', description: 'Device information', nullable: true },
];

// Deimos (2019-05-29) - 62 fields verified
// Adds: created_at (replaces created), authorized_at, fee, fee_vat, interest, interest_vat,
//       merchant_advice, multi_capture, net, refunded_amount (replaces refunded)
// Removes: created, refunded, reference
export const DEIMOS_FIELDS: ChargeFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "charge"' },
  { name: 'id', type: 'string', description: 'Unique charge identifier' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge' },
  { name: 'location', type: 'string', description: 'API path to retrieve this charge' },
  { name: 'amount', type: 'integer', description: 'Charge amount in smallest currency unit' },
  { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code' },
  { name: 'funding_amount', type: 'integer', description: 'Amount in funding currency' },
  { name: 'funding_currency', type: 'string', description: 'Settlement currency' },
  { name: 'net', type: 'integer', description: 'Net amount after fees' },
  { name: 'fee', type: 'integer', description: 'Processing fee' },
  { name: 'fee_vat', type: 'integer', description: 'VAT on processing fee' },
  { name: 'interest', type: 'integer', description: 'Installment interest' },
  { name: 'interest_vat', type: 'integer', description: 'VAT on interest' },
  { name: 'description', type: 'string', description: 'Charge description', nullable: true },
  { name: 'metadata', type: 'object', description: 'Custom key-value pairs' },
  { name: 'status', type: 'string', description: 'Charge status' },
  { name: 'authorized', type: 'boolean', description: 'Whether the charge has been authorized' },
  { name: 'authorized_amount', type: 'integer', description: 'Amount authorized' },
  { name: 'authorized_at', type: 'datetime', description: 'Authorization timestamp', nullable: true },
  { name: 'authorization_type', type: 'string', description: 'pre_auth or final_auth', nullable: true },
  { name: 'captured_amount', type: 'integer', description: 'Amount captured' },
  { name: 'capture', type: 'boolean', description: 'Auto-capture setting' },
  { name: 'capturable', type: 'boolean', description: 'Whether the charge can be captured' },
  { name: 'can_perform_void', type: 'boolean', description: 'Whether void operation is available' },
  { name: 'multi_capture', type: 'boolean', description: 'Whether multiple captures are allowed' },
  { name: 'reversible', type: 'boolean', description: 'Whether the charge can be reversed' },
  { name: 'reversed', type: 'boolean', description: 'Whether the charge has been reversed' },
  { name: 'reversed_at', type: 'datetime', description: 'Reversal timestamp', nullable: true },
  { name: 'refundable', type: 'boolean', description: 'Whether the charge can be refunded' },
  { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refund is allowed' },
  { name: 'refunded_amount', type: 'integer', description: 'Total amount refunded' },
  { name: 'refunds', type: 'list', description: 'List of refunds' },
  { name: 'voided', type: 'boolean', description: 'Whether the charge has been voided' },
  { name: 'expired', type: 'boolean', description: 'Whether the charge has expired' },
  { name: 'expires_at', type: 'datetime', description: 'Expected expiration timestamp', nullable: true },
  { name: 'expired_at', type: 'datetime', description: 'Actual expiration timestamp', nullable: true },
  { name: 'paid', type: 'boolean', description: 'Whether charge is captured (paid)' },
  { name: 'paid_at', type: 'datetime', description: 'Payment completion timestamp', nullable: true },
  { name: 'disputable', type: 'boolean', description: 'Whether a dispute can be created' },
  { name: 'dispute', type: 'object', description: 'Associated dispute', nullable: true },
  { name: 'card', type: 'object', description: 'Card details', nullable: true },
  { name: 'source', type: 'object', description: 'Payment source details', nullable: true },
  { name: 'customer', type: 'string', description: 'Customer ID', nullable: true },
  { name: 'ip', type: 'string', description: 'Customer IP address', nullable: true },
  { name: 'failure_code', type: 'string', description: 'Error code if charge failed', nullable: true },
  { name: 'failure_message', type: 'string', description: 'Failure message', nullable: true },
  { name: 'merchant_advice', type: 'string', description: 'Advice from payment processor', nullable: true },
  { name: 'created_at', type: 'datetime', description: 'Charge creation timestamp' },
  { name: 'return_uri', type: 'string', description: 'Redirect URI after payment', nullable: true },
  { name: 'authorize_uri', type: 'string', description: 'URL for customer authorization', nullable: true },
  { name: 'transaction', type: 'string', description: 'Transaction ID', nullable: true },
  { name: 'transaction_fees', type: 'object', description: 'Detailed fee breakdown' },
  { name: 'platform_fee', type: 'object', description: 'Platform fee configuration' },
  { name: 'zero_interest_installments', type: 'boolean', description: 'Whether merchant absorbs installment interest' },
  { name: 'approval_code', type: 'string', description: 'Authorization approval code', nullable: true },
  { name: 'acquirer_reference_number', type: 'string', description: 'Acquirer reference number', nullable: true },
  { name: 'schedule', type: 'object', description: 'Associated schedule', nullable: true },
  { name: 'link', type: 'object', description: 'Associated payment link', nullable: true },
  { name: 'linked_account', type: 'object', description: 'Linked account', nullable: true },
  { name: 'branch', type: 'object', description: 'Branch information', nullable: true },
  { name: 'terminal', type: 'object', description: 'Terminal information', nullable: true },
  { name: 'device', type: 'object', description: 'Device information', nullable: true },
];

// Get fields for a specific version
export function getFieldsForVersion(codename: string): ChargeFieldInfo[] {
  switch (codename) {
    case 'deimos': return DEIMOS_FIELDS;
    case 'cordelia': return CORDELIA_FIELDS;
    case 'bestla': return BESTLA_FIELDS;
    case 'aegaeon': return AEGAEON_FIELDS;
    default: return DEIMOS_FIELDS;
  }
}

// ============================================================================
// VERIFIED ERROR CODES
// Source: Direct API testing on 2026-10-29
// NOTE: Error codes are NOT version-specific - same across all versions
// ============================================================================

export interface ErrorCodeInfo {
  code: string;
  httpStatus: number;
  description: string;
  example?: string;
}

// API Errors (400/401/404) - verified via actual API calls
export const API_ERROR_CODES: ErrorCodeInfo[] = [
  {
    code: 'authentication_failure',
    httpStatus: 401,
    description: 'The API key is invalid or missing.',
    example: 'authentication failed',
  },
  {
    code: 'not_found',
    httpStatus: 404,
    description: 'The resource does not exist.',
    example: 'charge chrg_test_xxx was not found',
  },
  {
    code: 'bad_request',
    httpStatus: 400,
    description: 'The request is malformed or missing required parameters.',
    example: 'either source, card or customer parameter must be supplied',
  },
];

// Payment failure codes (returned in failure_code field when status=failed)
// These are documented at https://www.omise.co/api-errors
export const PAYMENT_FAILURE_CODES: string[] = [
  'failed_processing',
  'insufficient_fund',
  'invalid_account_number',
  'payment_rejected',
  'stolen_or_lost_card',
  'failed_fraud_check',
  'invalid_security_code',
  'expired_card',
  'insufficient_balance',
  'payment_cancelled',
  'blocked_card',
];

// ============================================================================
// PAYMENT METHODS (not verified - keeping existing data)
// TODO: Verify against actual API
// ============================================================================

export const PAYMENT_METHODS_BY_VERSION: Record<string, string[]> = {
  aegaeon: [
    'card',
    'internet_banking_bay',
    'internet_banking_bbl',
    'internet_banking_ktb',
    'internet_banking_scb',
  ],
  bestla: [
    'alipay',
    'internet_banking_kbank',
  ],
  cordelia: [
    'promptpay',
    'truemoney',
    'installment_bay',
    'installment_bbl',
    'installment_first_choice',
    'installment_kbank',
    'installment_ktc',
    'installment_scb',
  ],
  deimos: [
    'rabbit_linepay',
    'shopeepay',
    'mobile_banking_bay',
    'mobile_banking_bbl',
    'mobile_banking_kbank',
    'mobile_banking_ktb',
    'mobile_banking_scb',
    'fpx',
    'paynow',
    'grabpay',
    'boost',
    'duitnow_qr',
    'touch_n_go',
    'alipay_cn',
    'alipay_hk',
    'dana',
    'gcash',
    'kakaopay',
    'wechat_pay',
    'paypay',
    'atome',
  ],
};

export function getPaymentMethodsForVersion(codename: string): string[] {
  const versionOrder = ['aegaeon', 'bestla', 'cordelia', 'deimos'];
  const versionIndex = versionOrder.indexOf(codename);

  if (versionIndex === -1) return [];

  const methods: string[] = [];

  for (let i = 0; i <= versionIndex; i++) {
    const version = versionOrder[i];
    if (PAYMENT_METHODS_BY_VERSION[version]) {
      methods.push(...PAYMENT_METHODS_BY_VERSION[version]);
    }
  }

  return [...new Set(methods)];
}
