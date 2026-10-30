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
  { name: 'id', type: 'string', description: 'Charge identifier matching /chrg(_test)?_[0-9a-z]+/' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge' },
  { name: 'location', type: 'string', description: 'API path to retrieve the charge object' },
  { name: 'amount', type: 'integer', description: 'Charge amount in smallest unit of currency' },
  { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code' },
  { name: 'funding_amount', type: 'integer', description: 'Amount after exchange into funding currency' },
  { name: 'funding_currency', type: 'string', description: 'Account funding currency (ISO 4217)' },
  { name: 'description', type: 'string', description: 'Charge description provided by merchant', nullable: true },
  { name: 'metadata', type: 'object', description: 'Custom metadata key-value pairs' },
  { name: 'status', type: 'string', description: 'Charge status: pending, successful, failed, expired, reversed' },
  { name: 'authorized', type: 'boolean', description: 'Whether charge has been authorized' },
  { name: 'authorized_amount', type: 'integer', description: 'Maximum amount authorized for the charge' },
  { name: 'authorization_type', type: 'string', description: 'Determines capture amount: pre_auth or final_auth', nullable: true },
  { name: 'captured', type: 'boolean', description: 'Whether charge has been captured (paid)' },
  { name: 'captured_amount', type: 'integer', description: 'Captured amount in smallest currency unit' },
  { name: 'captured_at', type: 'datetime', description: 'UTC datetime of capture (ISO 8601)', nullable: true },
  { name: 'capture', type: 'boolean', description: 'Whether charge is set to auto-capture' },
  { name: 'capturable', type: 'boolean', description: 'Whether charge can be captured (paid)' },
  { name: 'can_perform_void', type: 'boolean', description: 'Whether charge can be voided' },
  { name: 'reversible', type: 'boolean', description: 'Whether authorization can be reversed' },
  { name: 'reversed', type: 'boolean', description: 'Whether authorization has been reversed' },
  { name: 'reversed_at', type: 'datetime', description: 'UTC datetime of reversal (ISO 8601)', nullable: true },
  { name: 'refundable', type: 'boolean', description: 'Whether charge can be refunded' },
  { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refunds are allowed' },
  { name: 'refunded', type: 'integer', description: 'Refunded amount in smallest currency unit' },
  { name: 'refunds', type: 'list', description: 'List of refunds for this charge' },
  { name: 'voided', type: 'boolean', description: 'Whether charge was voided instead of refunded' },
  { name: 'expired', type: 'boolean', description: 'Whether charge has expired' },
  { name: 'expires_at', type: 'datetime', description: 'UTC datetime of expected expiration (ISO 8601)', nullable: true },
  { name: 'expired_at', type: 'datetime', description: 'UTC datetime of actual expiration (ISO 8601)', nullable: true },
  { name: 'disputable', type: 'boolean', description: 'Whether charge can be disputed' },
  { name: 'dispute', type: 'object', description: 'Dispute associated with charge', nullable: true },
  { name: 'card', type: 'object', description: 'Card that was charged (if card payment)', nullable: true },
  { name: 'customer', type: 'string', description: 'Customer associated with charge', nullable: true },
  { name: 'ip', type: 'string', description: 'IP address provided at charge creation', nullable: true },
  { name: 'failure_code', type: 'string', description: 'Failure code if status is failed', nullable: true },
  { name: 'failure_message', type: 'string', description: 'Message describing the failure', nullable: true },
  { name: 'created', type: 'datetime', description: 'UTC datetime of charge creation (ISO 8601)' },
  { name: 'paid_at', type: 'datetime', description: 'UTC datetime of payment (ISO 8601)', nullable: true },
  { name: 'offline', type: 'string', description: 'Offline payment method type', nullable: true },
  { name: 'offsite', type: 'string', description: 'Offsite payment method (internet_banking_*)', nullable: true },
  { name: 'source_of_fund', type: 'string', description: 'Payment source type: card, offsite, or offline' },
  { name: 'return_uri', type: 'string', description: 'URI customer is redirected to after authorization', nullable: true },
  { name: 'authorize_uri', type: 'string', description: 'URI for payment authorization (3DS, redirects)', nullable: true },
  { name: 'reference', type: 'string', description: 'Payment reference number', nullable: true },
  { name: 'transaction', type: 'object', description: 'Transaction generated by charge (expandable)', nullable: true },
  { name: 'transaction_fees', type: 'object', description: 'Transaction fees breakdown' },
  { name: 'approval_code', type: 'string', description: 'Approval code assigned to transaction', nullable: true },
  { name: 'acquirer_reference_number', type: 'string', description: 'Reference number from acquirer', nullable: true },
  { name: 'schedule', type: 'object', description: 'Schedule associated with charge', nullable: true },
  { name: 'link', type: 'object', description: 'Payment link associated with charge', nullable: true },
  { name: 'linked_account', type: 'object', description: 'Linked account for direct debit', nullable: true },
  { name: 'branch', type: 'object', description: 'Physical location of merchant terminal', nullable: true },
  { name: 'terminal', type: 'object', description: 'Point of sale within a branch', nullable: true },
  { name: 'device', type: 'object', description: 'Physical hardware linked to terminal', nullable: true },
];

// Bestla (2015-11-17) - 52 fields verified
// Same as Aegaeon but without: authorization_type, authorized_amount, captured_amount
export const BESTLA_FIELDS: ChargeFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "charge"' },
  { name: 'id', type: 'string', description: 'Charge identifier matching /chrg(_test)?_[0-9a-z]+/' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge' },
  { name: 'location', type: 'string', description: 'API path to retrieve the charge object' },
  { name: 'amount', type: 'integer', description: 'Charge amount in smallest unit of currency' },
  { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code' },
  { name: 'funding_amount', type: 'integer', description: 'Amount after exchange into funding currency' },
  { name: 'funding_currency', type: 'string', description: 'Account funding currency (ISO 4217)' },
  { name: 'description', type: 'string', description: 'Charge description provided by merchant', nullable: true },
  { name: 'metadata', type: 'object', description: 'Custom metadata key-value pairs' },
  { name: 'status', type: 'string', description: 'Charge status: pending, successful, failed, expired, reversed' },
  { name: 'authorized', type: 'boolean', description: 'Whether charge has been authorized' },
  { name: 'capture', type: 'boolean', description: 'Whether charge is set to auto-capture' },
  { name: 'capturable', type: 'boolean', description: 'Whether charge can be captured (paid)' },
  { name: 'can_perform_void', type: 'boolean', description: 'Whether charge can be voided' },
  { name: 'reversible', type: 'boolean', description: 'Whether authorization can be reversed' },
  { name: 'reversed', type: 'boolean', description: 'Whether authorization has been reversed' },
  { name: 'reversed_at', type: 'datetime', description: 'UTC datetime of reversal (ISO 8601)', nullable: true },
  { name: 'refundable', type: 'boolean', description: 'Whether charge can be refunded' },
  { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refunds are allowed' },
  { name: 'refunded', type: 'integer', description: 'Refunded amount in smallest currency unit' },
  { name: 'refunds', type: 'list', description: 'List of refunds for this charge' },
  { name: 'voided', type: 'boolean', description: 'Whether charge was voided instead of refunded' },
  { name: 'expired', type: 'boolean', description: 'Whether charge has expired' },
  { name: 'expires_at', type: 'datetime', description: 'UTC datetime of expected expiration (ISO 8601)', nullable: true },
  { name: 'expired_at', type: 'datetime', description: 'UTC datetime of actual expiration (ISO 8601)', nullable: true },
  { name: 'disputable', type: 'boolean', description: 'Whether charge can be disputed' },
  { name: 'dispute', type: 'object', description: 'Dispute associated with charge', nullable: true },
  { name: 'card', type: 'object', description: 'Card that was charged (if card payment)', nullable: true },
  { name: 'customer', type: 'string', description: 'Customer associated with charge', nullable: true },
  { name: 'ip', type: 'string', description: 'IP address provided at charge creation', nullable: true },
  { name: 'failure_code', type: 'string', description: 'Failure code if status is failed', nullable: true },
  { name: 'failure_message', type: 'string', description: 'Message describing the failure', nullable: true },
  { name: 'created', type: 'datetime', description: 'UTC datetime of charge creation (ISO 8601)' },
  { name: 'paid_at', type: 'datetime', description: 'UTC datetime of payment (ISO 8601)', nullable: true },
  { name: 'offline', type: 'string', description: 'Offline payment method type', nullable: true },
  { name: 'offsite', type: 'string', description: 'Offsite payment method (internet_banking_*)', nullable: true },
  { name: 'source_of_fund', type: 'string', description: 'Payment source type: card, offsite, or offline' },
  { name: 'return_uri', type: 'string', description: 'URI customer is redirected to after authorization', nullable: true },
  { name: 'authorize_uri', type: 'string', description: 'URI for payment authorization (3DS, redirects)', nullable: true },
  { name: 'reference', type: 'string', description: 'Payment reference number', nullable: true },
  { name: 'transaction', type: 'object', description: 'Transaction generated by charge (expandable)', nullable: true },
  { name: 'transaction_fees', type: 'object', description: 'Transaction fees breakdown' },
  { name: 'approval_code', type: 'string', description: 'Approval code assigned to transaction', nullable: true },
  { name: 'acquirer_reference_number', type: 'string', description: 'Reference number from acquirer', nullable: true },
  { name: 'schedule', type: 'object', description: 'Schedule associated with charge', nullable: true },
  { name: 'link', type: 'object', description: 'Payment link associated with charge', nullable: true },
  { name: 'linked_account', type: 'object', description: 'Linked account for direct debit', nullable: true },
  { name: 'branch', type: 'object', description: 'Physical location of merchant terminal', nullable: true },
  { name: 'terminal', type: 'object', description: 'Point of sale within a branch', nullable: true },
  { name: 'device', type: 'object', description: 'Physical hardware linked to terminal', nullable: true },
];

// Cordelia (2017-11-02) - 55 fields verified
// Adds: source, platform_fee, zero_interest_installments, authorization_type, authorized_amount, captured_amount
// Removes: offline, offsite, source_of_fund (replaced by source)
export const CORDELIA_FIELDS: ChargeFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "charge"' },
  { name: 'id', type: 'string', description: 'Charge identifier matching /chrg(_test)?_[0-9a-z]+/' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge' },
  { name: 'location', type: 'string', description: 'API path to retrieve the charge object' },
  { name: 'amount', type: 'integer', description: 'Charge amount in smallest unit of currency' },
  { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code' },
  { name: 'funding_amount', type: 'integer', description: 'Amount after exchange into funding currency' },
  { name: 'funding_currency', type: 'string', description: 'Account funding currency (ISO 4217)' },
  { name: 'description', type: 'string', description: 'Charge description provided by merchant', nullable: true },
  { name: 'metadata', type: 'object', description: 'Custom metadata key-value pairs' },
  { name: 'status', type: 'string', description: 'Charge status: pending, successful, failed, expired, reversed' },
  { name: 'authorized', type: 'boolean', description: 'Whether charge has been authorized' },
  { name: 'authorized_amount', type: 'integer', description: 'Maximum amount authorized for the charge' },
  { name: 'authorization_type', type: 'string', description: 'Determines capture amount: pre_auth or final_auth', nullable: true },
  { name: 'captured_amount', type: 'integer', description: 'Captured amount in smallest currency unit' },
  { name: 'capture', type: 'boolean', description: 'Whether charge is set to auto-capture' },
  { name: 'capturable', type: 'boolean', description: 'Whether charge can be captured (paid)' },
  { name: 'can_perform_void', type: 'boolean', description: 'Whether charge can be voided' },
  { name: 'reversible', type: 'boolean', description: 'Whether authorization can be reversed' },
  { name: 'reversed', type: 'boolean', description: 'Whether authorization has been reversed' },
  { name: 'reversed_at', type: 'datetime', description: 'UTC datetime of reversal (ISO 8601)', nullable: true },
  { name: 'refundable', type: 'boolean', description: 'Whether charge can be refunded' },
  { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refunds are allowed' },
  { name: 'refunded', type: 'integer', description: 'Refunded amount in smallest currency unit' },
  { name: 'refunds', type: 'list', description: 'List of refunds for this charge' },
  { name: 'voided', type: 'boolean', description: 'Whether charge was voided instead of refunded' },
  { name: 'expired', type: 'boolean', description: 'Whether charge has expired' },
  { name: 'expires_at', type: 'datetime', description: 'UTC datetime of expected expiration (ISO 8601)', nullable: true },
  { name: 'expired_at', type: 'datetime', description: 'UTC datetime of actual expiration (ISO 8601)', nullable: true },
  { name: 'disputable', type: 'boolean', description: 'Whether charge can be disputed' },
  { name: 'dispute', type: 'object', description: 'Dispute associated with charge', nullable: true },
  { name: 'card', type: 'object', description: 'Card that was charged (if card payment)', nullable: true },
  { name: 'source', type: 'object', description: 'Source that was charged (if source payment)', nullable: true },
  { name: 'customer', type: 'string', description: 'Customer associated with charge', nullable: true },
  { name: 'ip', type: 'string', description: 'IP address provided at charge creation', nullable: true },
  { name: 'failure_code', type: 'string', description: 'Failure code if status is failed', nullable: true },
  { name: 'failure_message', type: 'string', description: 'Message describing the failure', nullable: true },
  { name: 'created', type: 'datetime', description: 'UTC datetime of charge creation (ISO 8601)' },
  { name: 'paid_at', type: 'datetime', description: 'UTC datetime of payment (ISO 8601)', nullable: true },
  { name: 'return_uri', type: 'string', description: 'URI customer is redirected to after authorization', nullable: true },
  { name: 'authorize_uri', type: 'string', description: 'URI for payment authorization (3DS, redirects)', nullable: true },
  { name: 'reference', type: 'string', description: 'Payment reference number', nullable: true },
  { name: 'transaction', type: 'object', description: 'Transaction generated by charge (expandable)', nullable: true },
  { name: 'transaction_fees', type: 'object', description: 'Transaction fees breakdown' },
  { name: 'platform_fee', type: 'object', description: 'Platform fee as fixed amount and/or percentage', nullable: true },
  { name: 'zero_interest_installments', type: 'boolean', description: 'Whether merchant absorbs installment interest' },
  { name: 'approval_code', type: 'string', description: 'Approval code assigned to transaction', nullable: true },
  { name: 'acquirer_reference_number', type: 'string', description: 'Reference number from acquirer', nullable: true },
  { name: 'schedule', type: 'object', description: 'Schedule associated with charge', nullable: true },
  { name: 'link', type: 'object', description: 'Payment link associated with charge', nullable: true },
  { name: 'linked_account', type: 'object', description: 'Linked account for direct debit', nullable: true },
  { name: 'branch', type: 'object', description: 'Physical location of merchant terminal', nullable: true },
  { name: 'terminal', type: 'object', description: 'Point of sale within a branch', nullable: true },
  { name: 'device', type: 'object', description: 'Physical hardware linked to terminal', nullable: true },
];

// Deimos (2019-05-29) - 68 fields (verified + official docs)
// Adds: created_at (replaces created), authorized_at, fee, fee_vat, interest, interest_vat,
//       merchant_advice, multi_capture, net, refunded_amount (replaces refunded)
// Removes: created, refunded, reference
export const DEIMOS_FIELDS: ChargeFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "charge"' },
  { name: 'id', type: 'string', description: 'Charge identifier matching /chrg(_test)?_[0-9a-z]+/' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge' },
  { name: 'location', type: 'string', description: 'API path to retrieve the charge object' },
  { name: 'amount', type: 'integer', description: 'Charge amount in smallest unit of currency' },
  { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code' },
  { name: 'funding_amount', type: 'integer', description: 'Amount after exchange into funding currency' },
  { name: 'funding_currency', type: 'string', description: 'Account funding currency (ISO 4217)' },
  { name: 'net', type: 'integer', description: 'Funding amount after fees, interest, and VAT deducted' },
  { name: 'fee', type: 'integer', description: 'Omise processing fee amount' },
  { name: 'fee_vat', type: 'integer', description: 'VAT applied to fee' },
  { name: 'interest', type: 'integer', description: 'Interest paid over installment term' },
  { name: 'interest_vat', type: 'integer', description: 'VAT applied to interest' },
  { name: 'description', type: 'string', description: 'Charge description provided by merchant', nullable: true },
  { name: 'metadata', type: 'object', description: 'Custom metadata key-value pairs' },
  { name: 'status', type: 'string', description: 'Charge status: pending, successful, failed, expired, reversed' },
  { name: 'authorized', type: 'boolean', description: 'Whether charge has been authorized' },
  { name: 'authorized_amount', type: 'integer', description: 'Maximum amount authorized for the charge' },
  { name: 'authorized_at', type: 'datetime', description: 'UTC datetime of authorization (ISO 8601)', nullable: true },
  { name: 'authorization_type', type: 'string', description: 'Determines capture amount: pre_auth or final_auth', nullable: true },
  { name: 'captured_amount', type: 'integer', description: 'Captured amount in smallest currency unit' },
  { name: 'capture', type: 'boolean', description: 'Whether charge is set to auto-capture' },
  { name: 'capturable', type: 'boolean', description: 'Whether charge can be captured (paid)' },
  { name: 'can_perform_void', type: 'boolean', description: 'Whether charge can be voided' },
  { name: 'multi_capture', type: 'boolean', description: 'Whether charge allows multiple partial captures' },
  { name: 'reversible', type: 'boolean', description: 'Whether authorization can be reversed' },
  { name: 'reversed', type: 'boolean', description: 'Whether authorization has been reversed' },
  { name: 'reversed_at', type: 'datetime', description: 'UTC datetime of reversal (ISO 8601)', nullable: true },
  { name: 'refundable', type: 'boolean', description: 'Whether charge can be refunded' },
  { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refunds are allowed' },
  { name: 'refunded_amount', type: 'integer', description: 'Refunded amount in smallest currency unit' },
  { name: 'refunds', type: 'list', description: 'List of refunds for this charge' },
  { name: 'voided', type: 'boolean', description: 'Whether charge was voided instead of refunded' },
  { name: 'expired', type: 'boolean', description: 'Whether charge has expired' },
  { name: 'expires_at', type: 'datetime', description: 'UTC datetime of expected expiration (ISO 8601)', nullable: true },
  { name: 'expired_at', type: 'datetime', description: 'UTC datetime of actual expiration (ISO 8601)', nullable: true },
  { name: 'paid', type: 'boolean', description: 'Whether charge has been captured (paid)' },
  { name: 'paid_at', type: 'datetime', description: 'UTC datetime of payment (ISO 8601)', nullable: true },
  { name: 'disputable', type: 'boolean', description: 'Whether charge can be disputed' },
  { name: 'dispute', type: 'object', description: 'Dispute associated with charge', nullable: true },
  { name: 'card', type: 'object', description: 'Card that was charged (if card payment)', nullable: true },
  { name: 'source', type: 'object', description: 'Source that was charged (if source payment)', nullable: true },
  { name: 'customer', type: 'string', description: 'Customer associated with charge', nullable: true },
  { name: 'ip', type: 'string', description: 'IP address provided at charge creation', nullable: true },
  { name: 'failure_code', type: 'string', description: 'Failure code if status is failed', nullable: true },
  { name: 'failure_message', type: 'string', description: 'Message describing the failure', nullable: true },
  { name: 'merchant_advice', type: 'string', description: 'Error description with advice on declined response', nullable: true },
  { name: 'merchant_advice_code', type: 'string', description: 'Numerical representation of merchant advice', nullable: true },
  { name: 'created_at', type: 'datetime', description: 'UTC datetime of charge creation (ISO 8601)' },
  { name: 'return_uri', type: 'string', description: 'URI customer is redirected to after authorization', nullable: true },
  { name: 'authorize_uri', type: 'string', description: 'URI for payment authorization (3DS, redirects)', nullable: true },
  { name: 'transaction', type: 'object', description: 'Transaction generated by charge (expandable)', nullable: true },
  { name: 'transaction_fees', type: 'object', description: 'Transaction fees breakdown' },
  { name: 'platform_fee', type: 'object', description: 'Platform fee as fixed amount and/or percentage', nullable: true },
  { name: 'zero_interest_installments', type: 'boolean', description: 'Whether merchant absorbs installment interest' },
  { name: 'approval_code', type: 'string', description: 'Approval code assigned to transaction', nullable: true },
  { name: 'acquirer_reference_number', type: 'string', description: 'Reference number from acquirer', nullable: true },
  { name: 'schedule', type: 'object', description: 'Schedule associated with charge', nullable: true },
  { name: 'link', type: 'object', description: 'Payment link associated with charge', nullable: true },
  { name: 'linked_account', type: 'object', description: 'Linked account for direct debit', nullable: true },
  { name: 'branch', type: 'object', description: 'Physical location of merchant terminal', nullable: true },
  { name: 'terminal', type: 'object', description: 'Point of sale within a branch', nullable: true },
  { name: 'device', type: 'object', description: 'Physical hardware linked to terminal', nullable: true },
  // 3DS and authentication fields
  { name: 'three_ds_info', type: 'object', description: '3-D Secure authentication details', nullable: true },
  { name: 'authenticated_by', type: 'string', description: 'How cardholder was authenticated: PASSKEY or 3DS', nullable: true },
  { name: 'missing_3ds_fields', type: 'array', description: 'Cardholder fields required by 3DS but missing', nullable: true },
  // Sub-merchant/marketplace fields
  { name: 'merchant_info', type: 'object', description: 'Details identifying merchant in master merchant hierarchy', nullable: true },
  { name: 'merchant_name', type: 'string', description: 'Name of sub-merchant who initiated the charge', nullable: true },
  { name: 'merchant_uid', type: 'string', description: 'ID of sub-merchant who initiated the charge', nullable: true },
  // Other fields
  { name: 'unmanaged_payment', type: 'object', description: 'Unmanaged payment information', nullable: true },
  { name: 'ref_id', type: 'string', description: 'Idempotency reference ID sent when creating charge', nullable: true },
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
// Source: https://docs.omise.co/charges-api (official documentation)
export const PAYMENT_FAILURE_CODES: string[] = [
  // Verified via API testing (2026-10-30)
  'insufficient_fund',
  'stolen_or_lost_card',
  'failed_processing',
  'payment_rejected',
  'failed_fraud_check',
  'invalid_account_number',
  // From official docs (not tested)
  'confirmed_amount_mismatch',
  'timeout',
  'insufficient_balance',
  'invalid_account', // alias for invalid_account_number
  'payment_cancelled',
  'expired_card',
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
