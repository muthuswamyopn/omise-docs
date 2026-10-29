// Shared data for Account, Balance, and Capability API endpoints

export interface EndpointParam {
  name: string;
  type: string;
  required: boolean;
  desc: string;
  default?: string;
}

export interface EndpointConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  path: string;
  title: string;
  description: string;
  longDescription?: string;
  params: EndpointParam[];
}

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
      { name: 'webhook_uri', type: 'string', required: false, desc: 'URL endpoint where Omise sends webhook notifications for events like charge completion.' },
      { name: 'chain_enabled', type: 'boolean', required: false, desc: 'Whether to enable chain integration for multi-merchant setups.' },
      { name: 'chain_return_uri', type: 'string', required: false, desc: 'URL to redirect users after chain transactions.' },
      { name: 'zero_interest_installments', type: 'boolean', required: false, desc: 'Whether the merchant absorbs installment interest charges.' },
      { name: 'metadata_export_keys', type: 'object', required: false, desc: 'Custom metadata keys to include in exports for charges, transfers, refunds, and disputes.' },
    ]
  },
  'update-api-version': {
    method: 'PATCH',
    path: 'https://api.omise.co/account/api_version',
    title: 'Update API version',
    description: 'Updates the account to use the latest API version.',
    longDescription: `Update your account to use the latest Omise API version. This affects the default API version used for all requests that don't specify a version header.

This is typically used when you want to migrate to a newer API version after testing your integration.`,
    params: []
  },
};

// Account attributes
export const accountAttributes = [
  { name: 'id', type: 'string', desc: 'Unique identifier for the account (acct_test_...)' },
  { name: 'object', type: 'string', desc: 'Object type, always "account"' },
  { name: 'livemode', type: 'boolean', desc: 'Whether this is a live mode account (true) or test mode (false)' },
  { name: 'location', type: 'string', desc: 'API path to retrieve this account' },
  { name: 'team', type: 'string', desc: 'Team identifier this account belongs to' },
  { name: 'country', type: 'string', desc: 'Two-letter ISO 3166 country code' },
  { name: 'currency', type: 'string', desc: 'Default three-letter ISO 4217 currency code' },
  { name: 'email', type: 'string', desc: 'Primary email address associated with the account' },
  { name: 'supported_currencies', type: 'array', desc: 'List of currencies available for card charges' },
  { name: 'api_version', type: 'string', desc: 'Current API version used by the account' },
  { name: 'webhook_uri', type: 'string', desc: 'URL where Omise sends event notifications' },
  { name: 'chain_enabled', type: 'boolean', desc: 'Whether chain integration is enabled' },
  { name: 'chain_return_uri', type: 'string', desc: 'Redirect URL for chain transactions' },
  { name: 'zero_interest_installments', type: 'boolean', desc: 'Whether merchant absorbs installment interest' },
  { name: 'auto_activate_recipients', type: 'boolean', desc: 'Whether new recipients are auto-activated' },
  { name: 'metadata_export_keys', type: 'object', desc: 'Custom metadata keys for exports' },
  { name: 'transfer_config', type: 'object', desc: 'Transfer configuration including limits and fees' },
  { name: 'created_at', type: 'datetime', desc: 'Account creation timestamp (ISO 8601)' },
];

// Balance attributes
export const balanceAttributes = [
  { name: 'object', type: 'string', desc: 'Object type, always "balance"' },
  { name: 'livemode', type: 'boolean', desc: 'Whether this is live mode balance' },
  { name: 'location', type: 'string', desc: 'API path to retrieve the balance' },
  { name: 'currency', type: 'string', desc: 'Three-letter ISO 4217 currency code' },
  { name: 'total', type: 'integer', desc: 'Total balance in smallest currency unit (after fees deducted)' },
  { name: 'transferable', type: 'integer', desc: 'Amount available for transfer' },
  { name: 'reserve', type: 'integer', desc: 'Amount held in reserve' },
  { name: 'on_hold', type: 'integer', desc: 'Amount currently on hold' },
  { name: 'created_at', type: 'datetime', desc: 'Balance record creation timestamp' },
];

// Capability attributes
export const capabilityAttributes = [
  { name: 'object', type: 'string', desc: 'Object type, always "capability"' },
  { name: 'location', type: 'string', desc: 'API path to retrieve capabilities' },
  { name: 'country', type: 'string', desc: 'Two-letter ISO 3166 country code' },
  { name: 'banks', type: 'array', desc: 'List of supported bank codes' },
  { name: 'payment_methods', type: 'array', desc: 'Available payment methods with their configurations' },
  { name: 'tokenization_methods', type: 'array', desc: 'Supported tokenization methods (e.g., googlepay, applepay)' },
  { name: 'limits', type: 'object', desc: 'Transaction limits for charges, transfers, and installments' },
  { name: 'zero_interest_installments', type: 'boolean', desc: 'Whether zero interest installments are available' },
];

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

export const capabilityCodeExamples: Record<string, Record<string, string>> = {
  retrieve: {
    curl: `curl https://api.omise.co/capability \\
  -u $OMISE_SECRET_KEY:`,
    ruby: `capability = Omise::Capability.retrieve
puts capability.payment_methods`,
    python: `capability = omise.Capability.retrieve()
print(capability.payment_methods)`,
    node: `const capability = await omise.capability.retrieve();
console.log(capability.payment_methods);`,
    php: `$capability = OmiseCapability::retrieve();
print_r($capability['payment_methods']);`,
    go: `capability, _ := client.Capability.Retrieve()
fmt.Println(capability.PaymentMethods)`,
    java: `Capability capability = client.capability().retrieve();
System.out.println(capability.getPaymentMethods());`,
    csharp: `var capability = await client.Capability.GetAsync();
Console.WriteLine(capability.PaymentMethods);`,
  },
};

// Response examples
export const accountResponseExamples: Record<string, string> = {
  retrieve: `{
  "object": "account",
  "id": "acct_test_no1t4tnemucod0e51mo",
  "team": "team_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/account",
  "country": "TH",
  "currency": "THB",
  "email": "merchant@example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "supported_currencies": [
    "THB",
    "JPY",
    "USD",
    "EUR",
    "GBP",
    "SGD"
  ],
  "api_version": "2019-05-29",
  "auto_activate_recipients": false,
  "chain_enabled": true,
  "zero_interest_installments": false,
  "chain_return_uri": "https://dashboard.omise.co/v2/settings",
  "webhook_uri": "https://example.com/webhooks",
  "metadata_export_keys": {
    "charge": ["order_id"],
    "transfer": [],
    "refund": [],
    "dispute": []
  }
}`,
  update: `{
  "object": "account",
  "id": "acct_test_no1t4tnemucod0e51mo",
  "team": "team_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/account",
  "country": "TH",
  "currency": "THB",
  "email": "merchant@example.com",
  "webhook_uri": "https://example.com/webhooks",
  "chain_enabled": true,
  "zero_interest_installments": false
}`,
  'update-api-version': `{
  "object": "account",
  "id": "acct_test_no1t4tnemucod0e51mo",
  "team": "team_test_no1t4tnemucod0e51mo",
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

export const capabilityResponseExample = `{
  "object": "capability",
  "location": "/capability",
  "country": "TH",
  "banks": [
    "bbl",
    "kbank",
    "ktb",
    "scb",
    "bay"
  ],
  "limits": {
    "charge_amount": {
      "max": 15000000,
      "min": 100
    },
    "transfer_amount": {
      "max": 200000000000,
      "min": 2000
    },
    "installment_amount": {
      "min": 200000
    }
  },
  "payment_methods": [
    {
      "object": "payment_method",
      "name": "card",
      "currencies": ["THB", "USD", "EUR"],
      "card_brands": ["Visa", "MasterCard", "JCB"]
    },
    {
      "object": "payment_method",
      "name": "promptpay",
      "currencies": ["THB"]
    },
    {
      "object": "payment_method",
      "name": "truemoney",
      "currencies": ["THB"]
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
