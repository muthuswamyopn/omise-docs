// Shared data for Account, Balance, and Capability API endpoints

export interface EndpointParam {
  name: string;
  type: string;
  required: boolean;
  desc: string;
  default?: string;
  addedIn?: string; // Version codename when this param was added
}

export interface EndpointConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  path: string;
  title: string;
  description: string;
  longDescription?: string;
  params: EndpointParam[];
  internalNote?: string;
}

// Balance API endpoints
export const balanceEndpoints: Record<string, EndpointConfig> = {
  retrieve: {
    method: 'GET',
    path: 'https://api.omise.co/balance',
    title: 'Retrieve balance',
    description: 'Retrieves the current balance of your Omise account.',
    longDescription: `Returns the current balance for your account. The balance includes several components:

• total - Total balance after fees have been deducted
• transferable - Amount available for immediate transfer to your bank account
• reserve - Funds held in reserve as a security buffer
• on_hold - Funds temporarily held due to pending disputes or reviews

All monetary values are returned in the smallest currency unit (e.g., satang for THB).`,
    params: []
  },
};

// Account API endpoints
export const accountEndpoints: Record<string, EndpointConfig> = {
  retrieve: {
    method: 'GET',
    path: 'https://api.omise.co/account',
    title: 'Retrieve account',
    description: 'Retrieves the current account information.',
    longDescription: `Fetch the current state of your account including configuration settings, supported currencies, and webhook URI.

Both test and live keys return the same account information, but some fields like \`livemode\` will reflect which key was used.`,
    params: []
  },
  update: {
    method: 'PATCH',
    path: 'https://api.omise.co/account',
    title: 'Update account',
    description: 'Updates account settings and returns the updated account.',
    longDescription: `Modify account configuration settings such as the webhook URI, chain settings, or zero interest installment preferences.

Only the fields you specify will be updated; other fields remain unchanged.`,
    params: [
      { name: 'webhook_uri', type: 'string', required: false, desc: 'URL endpoint where Omise sends webhook notifications for events like charge completion.', addedIn: 'aegaeon' },
      { name: 'chain_enabled', type: 'boolean', required: false, desc: 'Whether to enable chain integration for multi-merchant setups.', addedIn: 'aegaeon' },
      { name: 'chain_return_uri', type: 'string', required: false, desc: 'URL to redirect users after chain transactions.', addedIn: 'aegaeon' },
      { name: 'zero_interest_installments', type: 'boolean', required: false, desc: 'Whether the merchant absorbs installment interest charges.', addedIn: 'cordelia' },
      { name: 'metadata_export_keys', type: 'object', required: false, desc: 'Custom metadata keys to include in exports for charges, transfers, refunds, and disputes.', addedIn: 'aegaeon' },
    ]
  },
  'update-api-version': {
    method: 'PATCH',
    path: 'https://api.omise.co/account/api_version',
    title: 'Update API version',
    description: 'Updates API version to the latest version.',
    longDescription: `Updates your account's default API version to the latest version (currently 2019-05-29).

This endpoint is called automatically when you update your API version through the dashboard. For per-request version control, use the \`Omise-Version\` header instead.`,
    params: [],
    internalNote: 'This is an internal API used by the dashboard.'
  },
};

// Account attributes - All 22 fields from Deimos (verified 2026-10-30)
// INPUT = can be set via PATCH, OUTPUT = read-only
export const accountAttributes = [
  { name: 'id', type: 'string', desc: 'account_test_... (Deimos) or acct_... (older)', io: 'output' },
  { name: 'object', type: 'string', desc: 'Always "account"', io: 'output' },
  { name: 'team', type: 'string', desc: 'Team identifier (Deimos only)', io: 'output' },
  { name: 'livemode', type: 'boolean', desc: 'Whether live mode', io: 'output' },
  { name: 'location', type: 'string', desc: 'API path "/account"', io: 'output' },
  { name: 'country', type: 'string', desc: 'Two-letter ISO 3166 country code', io: 'output' },
  { name: 'currency', type: 'string', desc: 'Default currency (UPPERCASE in Deimos)', io: 'output' },
  { name: 'email', type: 'string', desc: 'Primary email address', io: 'output' },
  { name: 'supported_currencies', type: 'array', desc: 'Available currencies for card charges', io: 'output' },
  { name: 'api_version', type: 'string', desc: 'Current API version (e.g., "2019-05-29")', io: 'output' },
  { name: 'webhook_uri', type: 'string', desc: 'URL for event notifications', io: 'input' },
  { name: 'chain_enabled', type: 'boolean', desc: 'Whether chain integration enabled', io: 'input' },
  { name: 'chain_return_uri', type: 'string', desc: 'Redirect URL for chain transactions', io: 'input' },
  { name: 'chaining_allowed', type: 'boolean', desc: 'Whether chaining is allowed', io: 'output' },
  { name: 'zero_interest_installments', type: 'boolean', desc: 'Merchant absorbs interest', io: 'input' },
  { name: 'auto_activate_recipients', type: 'boolean', desc: 'Auto-activate new recipients', io: 'output' },
  { name: 'metadata_export_keys', type: 'object', desc: 'Custom metadata keys for exports', io: 'input' },
  { name: 'transfer_config', type: 'object', desc: 'Transfer limits, fees, provider settings', io: 'output' },
  { name: 'last_updated_api_version', type: 'string', desc: 'API version update date', io: 'output' },
  { name: 'restricted_recipient_management', type: 'boolean', desc: 'Recipient management restricted (Deimos only)', io: 'output' },
  { name: 'paas_enabled', type: 'boolean', desc: 'Platform as a Service enabled (Deimos only)', io: 'output' },
  { name: 'created_at', type: 'datetime', desc: 'Creation timestamp (Deimos: created_at, older: created)', io: 'output' },
];

// Balance attributes (all fields are OUTPUT-only - Balance API is read-only)
// Version differences:
// - Deimos (2019-05-29): transferable, reserve, created_at
// - Cordelia/Aegaeon: available (instead of transferable), reserve_amount (instead of reserve), no created_at
export const balanceAttributes = [
  { name: 'object', type: 'string', desc: 'Object type, always "balance"', io: 'output' },
  { name: 'livemode', type: 'boolean', desc: 'Whether this is live mode balance', io: 'output' },
  { name: 'location', type: 'string', desc: 'API path to retrieve the balance', io: 'output' },
  { name: 'currency', type: 'string', desc: 'Three-letter ISO 4217 currency code', io: 'output' },
  { name: 'total', type: 'integer', desc: 'Total balance in smallest currency unit (after fees deducted)', io: 'output' },
  { name: 'transferable', type: 'integer', desc: 'Amount available for transfer (Deimos). Called "available" in older versions.', io: 'output' },
  { name: 'reserve', type: 'integer', desc: 'Amount held in reserve (Deimos). Called "reserve_amount" in older versions.', io: 'output' },
  { name: 'on_hold', type: 'integer', desc: 'Amount temporarily on hold (pending disputes/reviews)', io: 'output' },
  { name: 'created_at', type: 'datetime', desc: 'Balance record creation timestamp (Deimos only)', io: 'output' },
];

// ============================================================================
// VERSION-SPECIFIC BALANCE FIELDS
// Verified: 2026-10-30 via direct API calls
// ============================================================================

export interface BalanceFieldInfo {
  name: string;
  type: string;
  description: string;
}

// Deimos (2019-05-29) - 9 fields
export const BALANCE_DEIMOS_FIELDS: BalanceFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "balance"' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is live mode balance' },
  { name: 'location', type: 'string', description: 'API path "/balance"' },
  { name: 'currency', type: 'string', description: 'ISO 4217 currency code (e.g., "THB")' },
  { name: 'total', type: 'integer', description: 'Total balance after fees deducted' },
  { name: 'transferable', type: 'integer', description: 'Amount available for immediate transfer to bank' },
  { name: 'reserve', type: 'integer', description: 'Funds held by Omise as security buffer' },
  { name: 'on_hold', type: 'integer', description: 'Funds held for pending disputes/reviews' },
  { name: 'created_at', type: 'datetime', description: 'Balance record creation timestamp' },
];

// Cordelia/Bestla/Aegaeon (older versions) - 8 fields
export const BALANCE_OLDER_FIELDS: BalanceFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "balance"' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is live mode balance' },
  { name: 'location', type: 'string', description: 'API path "/balance"' },
  { name: 'currency', type: 'string', description: 'ISO 4217 currency code (e.g., "thb")' },
  { name: 'total', type: 'integer', description: 'Total balance after fees deducted' },
  { name: 'available', type: 'integer', description: 'Amount available for immediate transfer (renamed to "transferable" in Deimos)' },
  { name: 'reserve_amount', type: 'integer', description: 'Funds held as security buffer (renamed to "reserve" in Deimos)' },
  { name: 'on_hold', type: 'integer', description: 'Funds held for pending disputes/reviews' },
];

export function getBalanceFieldsForVersion(codename: string): BalanceFieldInfo[] {
  return codename === 'deimos' ? BALANCE_DEIMOS_FIELDS : BALANCE_OLDER_FIELDS;
}

// ============================================================================
// VERSION-SPECIFIC ACCOUNT FIELDS
// Verified: 2026-10-30 via direct API calls
// ============================================================================

export interface AccountFieldInfo {
  name: string;
  type: string;
  description: string;
  io: 'input' | 'output';
}

// Deimos (2019-05-29) - 22 fields
export const ACCOUNT_DEIMOS_FIELDS: AccountFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Always "account"', io: 'output' },
  { name: 'id', type: 'string', description: 'Account ID (account_test_... format)', io: 'output' },
  { name: 'team', type: 'string', description: 'Team identifier', io: 'output' },
  { name: 'livemode', type: 'boolean', description: 'Whether live mode', io: 'output' },
  { name: 'location', type: 'string', description: 'API path "/account"', io: 'output' },
  { name: 'country', type: 'string', description: 'Two-letter ISO 3166 country code', io: 'output' },
  { name: 'currency', type: 'string', description: 'Default currency (UPPERCASE)', io: 'output' },
  { name: 'email', type: 'string', description: 'Primary email address', io: 'output' },
  { name: 'supported_currencies', type: 'array', description: 'Available currencies for charges', io: 'output' },
  { name: 'api_version', type: 'string', description: 'Current API version', io: 'output' },
  { name: 'webhook_uri', type: 'string', description: 'URL for event notifications', io: 'input' },
  { name: 'chain_enabled', type: 'boolean', description: 'Whether chain integration enabled', io: 'input' },
  { name: 'chain_return_uri', type: 'string', description: 'Redirect URL for chain transactions', io: 'input' },
  { name: 'chaining_allowed', type: 'boolean', description: 'Whether chaining is allowed', io: 'output' },
  { name: 'zero_interest_installments', type: 'boolean', description: 'Merchant absorbs interest', io: 'input' },
  { name: 'auto_activate_recipients', type: 'boolean', description: 'Auto-activate new recipients', io: 'output' },
  { name: 'metadata_export_keys', type: 'object', description: 'Custom metadata keys for exports', io: 'input' },
  { name: 'transfer_config', type: 'object', description: 'Transfer limits and fees', io: 'output' },
  { name: 'last_updated_api_version', type: 'string', description: 'API version update date', io: 'output' },
  { name: 'restricted_recipient_management', type: 'boolean', description: 'Recipient management restricted', io: 'output' },
  { name: 'paas_enabled', type: 'boolean', description: 'Platform as a Service enabled', io: 'output' },
  { name: 'created_at', type: 'datetime', description: 'Creation timestamp', io: 'output' },
];

// Cordelia/Bestla/Aegaeon (older versions) - 19 fields
export const ACCOUNT_OLDER_FIELDS: AccountFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Always "account"', io: 'output' },
  { name: 'id', type: 'string', description: 'Account ID (acct_... format)', io: 'output' },
  { name: 'livemode', type: 'boolean', description: 'Whether live mode', io: 'output' },
  { name: 'location', type: 'string', description: 'API path "/account"', io: 'output' },
  { name: 'country', type: 'string', description: 'Two-letter ISO 3166 country code', io: 'output' },
  { name: 'currency', type: 'string', description: 'Default currency (lowercase)', io: 'output' },
  { name: 'email', type: 'string', description: 'Primary email address', io: 'output' },
  { name: 'supported_currencies', type: 'array', description: 'Available currencies for charges', io: 'output' },
  { name: 'api_version', type: 'string', description: 'Current API version', io: 'output' },
  { name: 'webhook_uri', type: 'string', description: 'URL for event notifications', io: 'input' },
  { name: 'chain_enabled', type: 'boolean', description: 'Whether chain integration enabled', io: 'input' },
  { name: 'chain_return_uri', type: 'string', description: 'Redirect URL for chain transactions', io: 'input' },
  { name: 'chaining_allowed', type: 'boolean', description: 'Whether chaining is allowed', io: 'output' },
  { name: 'zero_interest_installments', type: 'boolean', description: 'Merchant absorbs interest (Cordelia+)', io: 'input' },
  { name: 'auto_activate_recipients', type: 'boolean', description: 'Auto-activate new recipients', io: 'output' },
  { name: 'metadata_export_keys', type: 'object', description: 'Custom metadata keys for exports', io: 'input' },
  { name: 'transfer_config', type: 'object', description: 'Transfer limits and fees', io: 'output' },
  { name: 'last_updated_api_version', type: 'string', description: 'API version update date', io: 'output' },
  { name: 'created', type: 'datetime', description: 'Creation timestamp', io: 'output' },
];

export function getAccountFieldsForVersion(codename: string): AccountFieldInfo[] {
  return codename === 'deimos' ? ACCOUNT_DEIMOS_FIELDS : ACCOUNT_OLDER_FIELDS;
}

// Helper to filter endpoint params by version
const VERSION_ORDER = ['aegaeon', 'bestla', 'cordelia', 'deimos'];

export function getParamsForVersion(params: EndpointParam[], codename: string): EndpointParam[] {
  const versionIndex = VERSION_ORDER.indexOf(codename);
  return params.filter(param => {
    if (!param.addedIn) return true; // No version specified = available in all
    const paramVersionIndex = VERSION_ORDER.indexOf(param.addedIn);
    return paramVersionIndex <= versionIndex;
  });
}

// ============================================================================
// CAPABILITY API
// Verified 2026-10-30: Accepts BOTH public and secret keys
// Public key recommended for client-side usage
// ============================================================================

// Capability API endpoints
export const capabilityEndpoints: Record<string, EndpointConfig> = {
  retrieve: {
    method: 'GET',
    path: 'https://api.omise.co/capability',
    title: 'Retrieve capability',
    description: 'Retrieves your account capabilities including payment methods and limits.',
    longDescription: `Returns information about what payment methods and features are available for your account.

This endpoint accepts both public and secret keys, but **public key is recommended** since it can be safely used in client-side code.

The response includes:
• Available payment methods with their supported currencies
• Transaction limits for charges, transfers, and installments
• Supported banks for transfer recipients
• Tokenization methods (Apple Pay, Google Pay)`,
    params: []
  },
};

// ============================================================================
// VERSION-SPECIFIC CAPABILITY FIELDS
// Verified: 2026-10-30 via direct API calls
// ============================================================================

export interface CapabilityFieldInfo {
  name: string;
  type: string;
  description: string;
}

// Deimos (2019-05-29) - 8 fields
// Keys: ["banks", "country", "limits", "location", "object", "payment_methods", "tokenization_methods", "zero_interest_installments"]
export const CAPABILITY_DEIMOS_FIELDS: CapabilityFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "capability"' },
  { name: 'location', type: 'string', description: 'API path "/capability"' },
  { name: 'country', type: 'string', description: 'Two-letter ISO 3166 country code where account is registered (Deimos only)' },
  { name: 'banks', type: 'array', description: 'List of supported bank codes for transfer recipients' },
  { name: 'payment_methods', type: 'array', description: 'Available payment methods with currencies, card brands, and terms' },
  { name: 'tokenization_methods', type: 'array', description: 'Supported tokenization: "googlepay", "applepay", or null' },
  { name: 'limits', type: 'object', description: 'Min/max for charge_amount, transfer_amount, installment_amount' },
  { name: 'zero_interest_installments', type: 'boolean', description: 'Whether merchant absorbs installment interest costs' },
];

// Cordelia/Bestla/Aegaeon (older versions) - 7 fields
// Keys: ["banks", "limits", "location", "object", "payment_backends", "tokenization_methods", "zero_interest_installments"]
// NOTE: Uses payment_backends instead of payment_methods, no country field
export const CAPABILITY_OLDER_FIELDS: CapabilityFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Object type, always "capability"' },
  { name: 'location', type: 'string', description: 'API path "/capability"' },
  { name: 'banks', type: 'array', description: 'List of supported bank codes for transfer recipients' },
  { name: 'payment_backends', type: 'array', description: 'Available payment backends (renamed to payment_methods in Deimos)' },
  { name: 'tokenization_methods', type: 'array', description: 'Supported tokenization: "googlepay", "applepay", or null' },
  { name: 'limits', type: 'object', description: 'Min/max for charge_amount, transfer_amount, installment_amount' },
  { name: 'zero_interest_installments', type: 'boolean', description: 'Whether merchant absorbs installment interest costs' },
];

export function getCapabilityFieldsForVersion(codename: string): CapabilityFieldInfo[] {
  return codename === 'deimos' ? CAPABILITY_DEIMOS_FIELDS : CAPABILITY_OLDER_FIELDS;
}

// Default export uses Deimos fields (latest version)
export const CAPABILITY_FIELDS = CAPABILITY_DEIMOS_FIELDS;

// Legacy export for backward compatibility
export const capabilityAttributes = CAPABILITY_FIELDS.map(f => ({
  name: f.name,
  type: f.type,
  desc: f.description,
}));

// Code examples
export const accountCodeExamples: Record<string, Record<string, string>> = {
  retrieve: {
    curl: `curl https://api.omise.co/account \\
  -u $OMISE_SECRET_KEY:`,
    ruby: `account = Omise::Account.retrieve
puts account.email`,
    python: `import omise

omise.api_secret = "skey_test_..."

account = omise.Account.retrieve()
print(account.email)`,
    node: `const omise = require('omise')({
  secretKey: 'skey_test_...'
});

const account = await omise.account.retrieve();
console.log(account.email);`,
    php: `<?php
require_once 'vendor/autoload.php';

Omise::setSecretKey('skey_test_...');

$account = OmiseAccount::retrieve();
echo $account['email'];`,
    go: `package main

import "github.com/omise/omise-go"

client, _ := omise.NewClient("pkey_test_...", "skey_test_...")
account, _ := client.Account.Retrieve()
fmt.Println(account.Email)`,
    java: `import co.omise.Client;
import co.omise.models.Account;

Client client = new Client("skey_test_...");
Account account = client.account().retrieve();
System.out.println(account.getEmail());`,
    csharp: `using Omise;

var client = new OmiseClient("skey_test_...");
var account = await client.Account.GetAsync();
Console.WriteLine(account.Email);`,
  },
  update: {
    curl: `curl https://api.omise.co/account \\
  -u $OMISE_SECRET_KEY: \\
  -X PATCH \\
  -d "webhook_uri=https://example.com/webhooks"`,
    ruby: `account = Omise::Account.retrieve
account.update(webhook_uri: "https://example.com/webhooks")
puts account.webhook_uri`,
    python: `account = omise.Account.retrieve()
account.update(webhook_uri="https://example.com/webhooks")
print(account.webhook_uri)`,
    node: `const account = await omise.account.update({
  webhook_uri: 'https://example.com/webhooks'
});
console.log(account.webhook_uri);`,
    php: `$account = OmiseAccount::retrieve();
$account->update([
    'webhook_uri' => 'https://example.com/webhooks'
]);
echo $account['webhook_uri'];`,
    go: `account, _ := client.Account.Update(&omise.UpdateAccountParams{
    WebhookURI: "https://example.com/webhooks",
})
fmt.Println(account.WebhookURI)`,
    java: `Account account = client.account().update(
    new Account.UpdateParams()
        .webhookUri("https://example.com/webhooks")
);
System.out.println(account.getWebhookUri());`,
    csharp: `var account = await client.Account.UpdateAsync(
    new UpdateAccountRequest {
        WebhookUri = "https://example.com/webhooks"
    }
);
Console.WriteLine(account.WebhookUri);`,
  },
  'update-api-version': {
    curl: `curl https://api.omise.co/account/api_version \\
  -u $OMISE_SECRET_KEY: \\
  -X PATCH`,
    ruby: `account = Omise::Account.update_api_version
puts account.api_version`,
    python: `account = omise.Account.update_api_version()
print(account.api_version)`,
    node: `const account = await omise.account.updateApiVersion();
console.log(account.api_version);`,
    php: `$account = OmiseAccount::updateApiVersion();
echo $account['api_version'];`,
    go: `account, _ := client.Account.UpdateApiVersion()
fmt.Println(account.ApiVersion)`,
    java: `Account account = client.account().updateApiVersion();
System.out.println(account.getApiVersion());`,
    csharp: `var account = await client.Account.UpdateApiVersionAsync();
Console.WriteLine(account.ApiVersion);`,
  },
};

export const balanceCodeExamples: Record<string, Record<string, string>> = {
  retrieve: {
    curl: `curl https://api.omise.co/balance \\
  -u $OMISE_SECRET_KEY:`,
    ruby: `balance = Omise::Balance.retrieve
puts balance.total`,
    python: `balance = omise.Balance.retrieve()
print(balance.total)`,
    node: `const balance = await omise.balance.retrieve();
console.log(balance.total);`,
    php: `$balance = OmiseBalance::retrieve();
echo $balance['total'];`,
    go: `balance, _ := client.Balance.Retrieve()
fmt.Println(balance.Total)`,
    java: `Balance balance = client.balance().retrieve();
System.out.println(balance.getTotal());`,
    csharp: `var balance = await client.Balance.GetAsync();
Console.WriteLine(balance.Total);`,
  },
};

// NOTE: Capability API uses PUBLIC KEY (not secret key)
export const capabilityCodeExamples: Record<string, Record<string, string>> = {
  retrieve: {
    curl: `curl https://api.omise.co/capability \\
  -u $OMISE_PUBLIC_KEY:`,
    ruby: `# Note: Uses public key
Omise.api_key = "pkey_test_..."

capability = Omise::Capability.retrieve
puts capability.payment_methods`,
    python: `import omise

# Note: Uses public key
omise.api_public_key = "pkey_test_..."

capability = omise.Capability.retrieve()
print(capability.payment_methods)`,
    node: `const omise = require('omise')({
  publicKey: 'pkey_test_...'  // Note: public key
});

const capability = await omise.capability.retrieve();
console.log(capability.payment_methods);`,
    php: `<?php
require_once 'vendor/autoload.php';

// Note: Uses public key
Omise::setPublicKey('pkey_test_...');

$capability = OmiseCapability::retrieve();
print_r($capability['payment_methods']);`,
    go: `package main

import "github.com/omise/omise-go"

// Note: Uses public key
client, _ := omise.NewClient("pkey_test_...", "")
capability, _ := client.Capability.Retrieve()
fmt.Println(capability.PaymentMethods)`,
    java: `import co.omise.Client;
import co.omise.models.Capability;

// Note: Uses public key
Client client = new Client.Builder()
    .publicKey("pkey_test_...")
    .build();
Capability capability = client.capability().retrieve();
System.out.println(capability.getPaymentMethods());`,
    csharp: `using Omise;

// Note: Uses public key
var client = new OmiseClient(publicKey: "pkey_test_...");
var capability = await client.Capability.GetAsync();
Console.WriteLine(capability.PaymentMethods);`,
  },
};

// Response examples (verified 2026-10-30 - Deimos format)
export const accountResponseExamples: Record<string, string> = {
  retrieve: `{
  "object": "account",
  "id": "account_test_no1t4tnemucod0e51mo",
  "team": "acct_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/account",
  "country": "TH",
  "currency": "THB",
  "email": "merchant@example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "supported_currencies": [
    "THB", "JPY", "USD", "EUR", "GBP",
    "SGD", "AUD", "CHF", "CNY", "DKK",
    "HKD", "NOK", "SEK"
  ],
  "api_version": "2019-05-29",
  "auto_activate_recipients": false,
  "chain_enabled": true,
  "chaining_allowed": true,
  "zero_interest_installments": false,
  "chain_return_uri": "https://example.com/chain",
  "webhook_uri": "https://example.com/webhooks",
  "metadata_export_keys": {
    "charge": ["order_id"],
    "transfer": [],
    "refund": [],
    "dispute": []
  },
  "last_updated_api_version": "2024-01-15",
  "transfer_config": {
    "min_transfer_amount": "30.00",
    "max_transfer_amount": "2000000000.00",
    "fee": "30.00",
    "is_payout_enabled": false
  },
  "restricted_recipient_management": false,
  "paas_enabled": false
}`,
  update: `{
  "object": "account",
  "id": "account_test_no1t4tnemucod0e51mo",
  "team": "acct_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/account",
  "country": "TH",
  "currency": "THB",
  "email": "merchant@example.com",
  "webhook_uri": "https://example.com/webhooks",
  "chain_enabled": true,
  "chaining_allowed": true,
  "zero_interest_installments": false,
  "last_updated_api_version": "2024-01-15"
}`,
  'update-api-version': `{
  "object": "account",
  "id": "account_test_no1t4tnemucod0e51mo",
  "team": "acct_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/account",
  "country": "TH",
  "currency": "THB",
  "email": "merchant@example.com",
  "api_version": "2019-05-29",
  "last_updated_api_version": "2024-01-15"
}`,
};

export const balanceResponseExample = `{
  "object": "balance",
  "livemode": false,
  "location": "/balance",
  "currency": "THB",
  "total": 1656795,
  "transferable": 1656795,
  "reserve": 0,
  "on_hold": 0,
  "created_at": "2024-01-15T10:30:00Z"
}`;

// Verified against real API response 2026-10-30
export const capabilityResponseExample = `{
  "object": "capability",
  "location": "/capability",
  "country": "TH",
  "banks": [
    "test", "bbl", "kbank", "rbs", "ktb",
    "jpm", "mufg", "ttb", "scb", "citi",
    "smbc", "sc", "cimb", "uob", "bay",
    "mega", "boa", "cacib", "gsb", "hsbc",
    "db", "ghb", "baac", "mb", "bnp",
    "ibank", "tisco", "kk", "icbc", "tcrb", "lhb"
  ],
  "limits": {
    "charge_amount": {
      "min": 100,
      "max": 15000000
    },
    "transfer_amount": {
      "min": 2000,
      "max": 200000000000
    },
    "installment_amount": {
      "min": 200000
    }
  },
  "payment_methods": [
    {
      "object": "payment_method",
      "name": "card",
      "currencies": ["THB", "JPY", "USD", "EUR", "GBP", "SGD", "AUD", "CHF", "CNY", "DKK", "HKD", "NOK", "SEK"],
      "card_brands": ["JCB", "Visa", "MasterCard", "American Express", "UnionPay"],
      "installment_terms": null,
      "loan_installment_terms": null,
      "banks": [],
      "provider": null
    },
    {
      "object": "payment_method",
      "name": "promptpay",
      "currencies": ["THB"],
      "card_brands": null,
      "installment_terms": null,
      "loan_installment_terms": null,
      "banks": [],
      "provider": null
    },
    {
      "object": "payment_method",
      "name": "truemoney",
      "currencies": ["THB"],
      "card_brands": null,
      "installment_terms": null,
      "loan_installment_terms": null,
      "banks": [],
      "provider": null
    },
    {
      "object": "payment_method",
      "name": "installment_wlb_kbank",
      "currencies": ["THB"],
      "card_brands": null,
      "installment_terms": [3, 4, 5, 6, 7, 8, 9, 10],
      "loan_installment_terms": null,
      "banks": [],
      "provider": null
    },
    {
      "object": "payment_method",
      "name": "grabpay",
      "currencies": ["THB"],
      "card_brands": null,
      "installment_terms": null,
      "loan_installment_terms": null,
      "banks": [],
      "provider": null
    }
  ],
  "tokenization_methods": [
    "googlepay",
    "applepay"
  ],
  "zero_interest_installments": false
}`;

export const languages = [
  { id: 'curl', name: 'cURL' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'python', name: 'Python' },
  { id: 'node', name: 'Node.js' },
  { id: 'php', name: 'PHP' },
  { id: 'go', name: 'Go' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
];

export const methodColors: Record<string, { bg: string; color: string }> = {
  GET: { bg: '#d6ecff', color: '#0055bc' },
  POST: { bg: '#cbf4c9', color: '#0e6245' },
  PATCH: { bg: '#fcefc7', color: '#9c6f19' },
  DELETE: { bg: '#fde2dd', color: '#cd3d64' },
  PUT: { bg: '#e8defd', color: '#5f25a4' },
};
