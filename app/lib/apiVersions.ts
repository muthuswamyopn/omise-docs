// API Version configuration matching Omise's internal naming
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

// Charge endpoint availability by version
export interface VersionedEndpoint {
  available: boolean;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  addedIn?: string; // codename when added
  deprecatedIn?: string; // codename when deprecated
  removedIn?: string; // codename when removed
}

export interface ChargeFieldInfo {
  name: string;
  type: string;
  description: string;
  addedIn: string; // codename
  nullable?: boolean;
  deprecated?: boolean;
}

// Fields that differ between versions
export const CHARGE_FIELDS_BY_VERSION: Record<string, ChargeFieldInfo[]> = {
  // Fields available in all versions (aegaeon onwards)
  aegaeon: [
    { name: 'object', type: 'string', description: 'Object type, always "charge"', addedIn: 'aegaeon' },
    { name: 'id', type: 'string', description: 'Unique charge identifier (chrg_...)', addedIn: 'aegaeon' },
    { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode charge', addedIn: 'aegaeon' },
    { name: 'location', type: 'string', description: 'API path to retrieve this charge', addedIn: 'aegaeon' },
    { name: 'amount', type: 'integer', description: 'Charge amount in smallest currency unit', addedIn: 'aegaeon' },
    { name: 'currency', type: 'string', description: 'Three-letter ISO 4217 currency code', addedIn: 'aegaeon' },
    { name: 'description', type: 'string', description: 'Charge description', addedIn: 'aegaeon', nullable: true },
    { name: 'metadata', type: 'object', description: 'Custom key-value pairs', addedIn: 'aegaeon' },
    { name: 'status', type: 'string', description: 'Charge status: pending, successful, failed, expired, reversed', addedIn: 'aegaeon' },
    { name: 'authorized', type: 'boolean', description: 'Whether the charge has been authorized', addedIn: 'aegaeon' },
    { name: 'captured', type: 'boolean', description: 'Whether the charge has been captured', addedIn: 'aegaeon' },
    { name: 'capture', type: 'boolean', description: 'Auto-capture setting when created', addedIn: 'aegaeon' },
    { name: 'capturable', type: 'boolean', description: 'Whether the charge can be captured', addedIn: 'aegaeon' },
    { name: 'reversible', type: 'boolean', description: 'Whether the charge can be reversed', addedIn: 'aegaeon' },
    { name: 'reversed', type: 'boolean', description: 'Whether the charge has been reversed', addedIn: 'aegaeon' },
    { name: 'refundable', type: 'boolean', description: 'Whether the charge can be refunded', addedIn: 'aegaeon' },
    { name: 'refunded', type: 'integer', description: 'Total amount refunded', addedIn: 'aegaeon' },
    { name: 'card', type: 'object', description: 'Card details (for card payments)', addedIn: 'aegaeon', nullable: true },
    { name: 'customer', type: 'string', description: 'Customer ID if charged to a saved customer', addedIn: 'aegaeon', nullable: true },
    { name: 'ip', type: 'string', description: 'Customer IP address', addedIn: 'aegaeon', nullable: true },
    { name: 'failure_code', type: 'string', description: 'Error code if charge failed', addedIn: 'aegaeon', nullable: true },
    { name: 'failure_message', type: 'string', description: 'Human-readable failure message', addedIn: 'aegaeon', nullable: true },
    { name: 'created_at', type: 'datetime', description: 'Charge creation timestamp', addedIn: 'aegaeon' },
    { name: 'paid_at', type: 'datetime', description: 'Payment completion timestamp', addedIn: 'aegaeon', nullable: true },
    { name: 'expires_at', type: 'datetime', description: 'Charge expiration timestamp', addedIn: 'aegaeon', nullable: true },
    { name: 'offsite', type: 'string', description: 'Offsite payment method (alipay, internet_banking_*)', addedIn: 'aegaeon', nullable: true },
    { name: 'return_uri', type: 'string', description: 'Redirect URI after payment', addedIn: 'aegaeon', nullable: true },
    { name: 'authorize_uri', type: 'string', description: 'URL for customer authorization', addedIn: 'aegaeon', nullable: true },
  ],

  // Fields added in bestla (2015-11-17)
  bestla: [
    { name: 'dispute', type: 'object', description: 'Associated dispute if any', addedIn: 'bestla', nullable: true },
    { name: 'transaction', type: 'string', description: 'Transaction ID', addedIn: 'bestla', nullable: true },
    { name: 'refunds', type: 'list', description: 'List of refunds for this charge', addedIn: 'bestla' },
    { name: 'source_of_fund', type: 'string', description: 'Source type: card, offsite, offline', addedIn: 'bestla' },
    { name: 'disputable', type: 'boolean', description: 'Whether a dispute can be created', addedIn: 'bestla' },
    { name: 'voided', type: 'boolean', description: 'Whether the charge has been voided', addedIn: 'bestla' },
    { name: 'expired', type: 'boolean', description: 'Whether the charge has expired', addedIn: 'bestla' },
  ],

  // Fields added in cordelia (2017-11-02)
  cordelia: [
    { name: 'source', type: 'object', description: 'Payment source details (replaces offsite)', addedIn: 'cordelia', nullable: true },
    { name: 'platform_fee', type: 'object', description: 'Platform fee configuration (fixed, amount, percentage)', addedIn: 'cordelia', nullable: true },
    { name: 'linked_account', type: 'object', description: 'Linked account for marketplace payments', addedIn: 'cordelia', nullable: true },
    { name: 'zero_interest_installments', type: 'boolean', description: 'Whether merchant absorbs installment interest', addedIn: 'cordelia' },
    { name: 'authorization_type', type: 'string', description: 'pre_auth or final_auth', addedIn: 'cordelia', nullable: true },
    { name: 'authorized_amount', type: 'integer', description: 'Amount authorized', addedIn: 'cordelia' },
    { name: 'captured_amount', type: 'integer', description: 'Amount captured', addedIn: 'cordelia' },
    { name: 'funding_amount', type: 'integer', description: 'Amount in funding currency', addedIn: 'cordelia' },
    { name: 'funding_currency', type: 'string', description: 'Settlement currency', addedIn: 'cordelia' },
    { name: 'net', type: 'integer', description: 'Net amount after fees', addedIn: 'cordelia' },
    { name: 'fee', type: 'integer', description: 'Processing fee', addedIn: 'cordelia' },
    { name: 'fee_vat', type: 'integer', description: 'VAT on processing fee', addedIn: 'cordelia' },
    { name: 'interest', type: 'integer', description: 'Installment interest', addedIn: 'cordelia' },
    { name: 'interest_vat', type: 'integer', description: 'VAT on interest', addedIn: 'cordelia' },
    { name: 'partially_refundable', type: 'boolean', description: 'Whether partial refund is allowed', addedIn: 'cordelia' },
    { name: 'schedule', type: 'object', description: 'Associated schedule if recurring', addedIn: 'cordelia', nullable: true },
    { name: 'link', type: 'object', description: 'Associated payment link', addedIn: 'cordelia', nullable: true },
    { name: 'statement_descriptor', type: 'string', description: 'Statement descriptor shown to customer', addedIn: 'cordelia' },
    { name: 'approval_code', type: 'string', description: 'Authorization approval code', addedIn: 'cordelia', nullable: true },
  ],

  // Fields added in deimos (2019-05-29)
  deimos: [
    { name: 'three_ds_info', type: 'object', description: '3D Secure authentication details', addedIn: 'deimos', nullable: true },
    { name: 'unmanaged_payment', type: 'object', description: 'Unmanaged payment details', addedIn: 'deimos', nullable: true },
    { name: 'transaction_fees', type: 'object', description: 'Detailed transaction fee breakdown', addedIn: 'deimos', nullable: true },
    { name: 'multi_capture', type: 'boolean', description: 'Whether multiple captures are allowed', addedIn: 'deimos' },
    { name: 'merchant_advice', type: 'string', description: 'Advice from payment processor', addedIn: 'deimos', nullable: true },
    { name: 'merchant_advice_code', type: 'string', description: 'Merchant advice code', addedIn: 'deimos', nullable: true },
    { name: 'authenticated_by', type: 'string', description: '3DS authentication method', addedIn: 'deimos', nullable: true },
    { name: 'authorized_at', type: 'datetime', description: 'Authorization timestamp', addedIn: 'deimos', nullable: true },
    { name: 'reversed_at', type: 'datetime', description: 'Reversal timestamp', addedIn: 'deimos', nullable: true },
    { name: 'expired_at', type: 'datetime', description: 'Expiration timestamp', addedIn: 'deimos', nullable: true },
    { name: 'can_perform_void', type: 'boolean', description: 'Whether void operation is available', addedIn: 'deimos' },
    { name: 'acquirer_reference_number', type: 'string', description: 'Acquirer reference number (ARN)', addedIn: 'deimos', nullable: true },
    { name: 'ref_id', type: 'string', description: 'Merchant reference ID', addedIn: 'deimos', nullable: true },
    { name: 'first_charge', type: 'boolean', description: 'Whether this is the first charge in a series', addedIn: 'deimos' },
    { name: 'transaction_indicator', type: 'string', description: 'Transaction indicator for recurring', addedIn: 'deimos', nullable: true },
    { name: 'recurring_reason', type: 'string', description: 'Reason for recurring charge', addedIn: 'deimos', nullable: true },
    { name: 'missing_3ds_fields', type: 'array', description: 'Missing 3DS fields if any', addedIn: 'deimos' },
    { name: 'merchant_name', type: 'string', description: 'Merchant name', addedIn: 'deimos' },
    { name: 'merchant_uid', type: 'string', description: 'Merchant UID', addedIn: 'deimos' },
    { name: 'merchant_info', type: 'object', description: 'Merchant information', addedIn: 'deimos', nullable: true },
    { name: 'branch', type: 'object', description: 'Branch information', addedIn: 'deimos', nullable: true },
    { name: 'terminal', type: 'object', description: 'Terminal information', addedIn: 'deimos', nullable: true },
    { name: 'device', type: 'object', description: 'Device information', addedIn: 'deimos', nullable: true },
  ],
};

// Get all fields available for a specific version
export function getFieldsForVersion(codename: string): ChargeFieldInfo[] {
  const versionOrder = ['aegaeon', 'bestla', 'cordelia', 'deimos'];
  const versionIndex = versionOrder.indexOf(codename);

  if (versionIndex === -1) return [];

  const fields: ChargeFieldInfo[] = [];

  for (let i = 0; i <= versionIndex; i++) {
    const version = versionOrder[i];
    if (CHARGE_FIELDS_BY_VERSION[version]) {
      fields.push(...CHARGE_FIELDS_BY_VERSION[version]);
    }
  }

  return fields;
}

// Failure codes by version
export const FAILURE_CODES_BY_VERSION: Record<string, string[]> = {
  aegaeon: [
    'failed_processing',
    'insufficient_fund',
    'invalid_account_number',
    'payment_rejected',
    'timeout',
  ],
  bestla: [
    'failed_fraud_check',
    'insufficient_balance',
    'invalid_security_code',
    'payment_cancelled',
    'expired_card',
  ],
  cordelia: [
    // All previous codes plus these
  ],
  deimos: [
    // All previous codes plus these
    'stolen_or_lost_card',
    'blocked_card',
    'invalid_card',
    'invalid_card_token',
    'used_token',
    'invalid_source',
    'missing_card',
  ],
};

// Get all failure codes available for a version
export function getFailureCodesForVersion(codename: string): string[] {
  const versionOrder = ['aegaeon', 'bestla', 'cordelia', 'deimos'];
  const versionIndex = versionOrder.indexOf(codename);

  if (versionIndex === -1) return [];

  const codes: string[] = [];

  for (let i = 0; i <= versionIndex; i++) {
    const version = versionOrder[i];
    if (FAILURE_CODES_BY_VERSION[version]) {
      codes.push(...FAILURE_CODES_BY_VERSION[version]);
    }
  }

  return [...new Set(codes)]; // Remove duplicates
}

// Payment methods by version
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
