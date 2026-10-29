// Shared data for Charge API endpoints

export interface EndpointParam {
  name: string;
  type: string;
  required: boolean | 'conditional';
  desc: string;
  default?: string;
  options?: string[];
  inPath?: boolean;
}

export interface EndpointConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  path: string;
  title: string;
  description: string;
  longDescription?: string;
  params: EndpointParam[];
  testModeOnly?: boolean;
}

export const endpoints: Record<string, EndpointConfig> = {
  create: {
    method: 'POST',
    path: 'https://api.omise.co/charges',
    title: 'Create a charge',
    description: 'Creates a new charge to collect payment from a customer.',
    longDescription: `Use this endpoint to initiate a payment. You must provide one payment method: a card token, a payment source, or a customer ID with a saved card.

For card payments, first tokenize the card using Omise.js on the client side, then pass the token to this endpoint. For alternative payment methods (PromptPay, TrueMoney, etc.), create a source first and pass the source ID.

When \`capture\` is set to \`false\`, the charge is only authorized and must be captured separately within 7 days.`,
    params: [
      { name: 'amount', type: 'integer', required: true, desc: 'Charge amount in smallest currency unit (e.g., satang for THB, cents for USD)', default: '100000' },
      { name: 'currency', type: 'string', required: true, desc: 'Three-letter ISO 4217 currency code', default: 'thb', options: ['thb', 'jpy', 'usd', 'sgd', 'myr'] },
      { name: 'card', type: 'string', required: 'conditional', desc: 'Card token (tokn_test_...) or card ID. Required if source and customer are not provided.', default: 'tokn_test_' },
      { name: 'source', type: 'string', required: 'conditional', desc: 'Payment source token for alternative payment methods (PromptPay, TrueMoney, etc.).', default: '' },
      { name: 'customer', type: 'string', required: 'conditional', desc: 'Customer ID (cust_test_...) with a saved default card.', default: '' },
      { name: 'return_uri', type: 'uri', required: 'conditional', desc: 'URL to redirect customer after 3-D Secure authentication or redirect-based payment completion. Required for 3DS and redirect flows.', default: '' },
      { name: 'capture', type: 'boolean', required: false, desc: 'Whether to immediately capture the charge. Set to false for pre-authorization.', default: 'true', options: ['true', 'false'] },
      { name: 'description', type: 'string', required: false, desc: 'Merchant-facing transaction description for your records.', default: '' },
      { name: 'metadata', type: 'object', required: false, desc: 'Custom key-value pairs to store additional information about the charge.', default: '' },
      { name: 'expires_at', type: 'date-time', required: false, desc: 'ISO 8601 timestamp when the charge should expire if not completed.', default: '' },
    ]
  },
  retrieve: {
    method: 'GET',
    path: 'https://api.omise.co/charges/:id',
    title: 'Retrieve a charge',
    description: 'Retrieves the details of a charge that has previously been created.',
    longDescription: `Fetch the current state of a charge by its ID. This is useful for checking the status of a payment, verifying capture state, or retrieving transaction details.

The response includes the full charge object with all attributes including card details (masked), refund information, and failure details if applicable.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The charge ID to retrieve (chrg_test_...)', default: 'chrg_test_', inPath: true },
    ]
  },
  update: {
    method: 'PATCH',
    path: 'https://api.omise.co/charges/:id',
    title: 'Update a charge',
    description: 'Updates the description or metadata of an existing charge.',
    longDescription: `Modify the description or metadata of an existing charge. This is useful for adding order information, customer notes, or any custom data after the charge has been created.

Note: You cannot modify the amount, currency, or payment method of an existing charge.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The charge ID to update', default: 'chrg_test_', inPath: true },
      { name: 'description', type: 'string', required: false, desc: 'New merchant-facing transaction description', default: '' },
      { name: 'metadata', type: 'object', required: false, desc: 'Custom key-value pairs (merged with existing metadata)', default: '' },
    ]
  },
  list: {
    method: 'GET',
    path: 'https://api.omise.co/charges',
    title: 'List all charges',
    description: 'Returns a paginated list of charges.',
    longDescription: `Retrieve a paginated list of all charges on your account. Results can be filtered by date range and sorted chronologically.

Use pagination parameters to navigate through large result sets. The response includes the total count and links for navigation.`,
    params: [
      { name: 'limit', type: 'integer', required: false, desc: 'Number of records per page (1-100)', default: '20' },
      { name: 'offset', type: 'integer', required: false, desc: 'Number of records to skip for pagination', default: '0' },
      { name: 'from', type: 'date-time', required: false, desc: 'Filter charges created on or after this ISO 8601 timestamp', default: '' },
      { name: 'to', type: 'date-time', required: false, desc: 'Filter charges created before this ISO 8601 timestamp', default: '' },
      { name: 'order', type: 'string', required: false, desc: 'Sort order by creation date', default: 'chronological', options: ['chronological', 'reverse_chronological'] },
    ]
  },
  capture: {
    method: 'POST',
    path: 'https://api.omise.co/charges/:id/capture',
    title: 'Capture a charge',
    description: 'Captures a previously authorized charge.',
    longDescription: `Capture funds from a charge that was created with \`capture: false\`. Authorization holds typically expire after 7 days, so capture must occur before then.

You can capture the full authorized amount or a partial amount. Partial capture releases the remaining authorized amount back to the customer.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The charge ID to capture', default: 'chrg_test_', inPath: true },
      { name: 'capture_amount', type: 'integer', required: false, desc: 'Amount to capture in smallest currency unit. If not specified, captures the full authorized amount.', default: '' },
    ]
  },
  reverse: {
    method: 'POST',
    path: 'https://api.omise.co/charges/:id/reverse',
    title: 'Reverse a charge',
    description: 'Reverses an authorized but uncaptured charge.',
    longDescription: `Void an authorization hold on a charge that has not been captured. This releases the held funds back to the customer's card immediately.

You can only reverse charges that are in the \`pending\` state with \`authorized: true\` and \`captured: false\`. Once a charge is captured, you must use a refund instead.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The charge ID to reverse', default: 'chrg_test_', inPath: true },
    ]
  },
  expire: {
    method: 'POST',
    path: 'https://api.omise.co/charges/:id/expire',
    title: 'Expire a charge',
    description: 'Manually expires a pending charge.',
    longDescription: `Force a pending charge to expire immediately. This is useful for canceling charges that are awaiting customer action (e.g., redirect-based payments or bank transfers).

Only charges in \`pending\` status can be expired. Authorized, captured, or already expired charges cannot be expired.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The charge ID to expire', default: 'chrg_test_', inPath: true },
    ]
  },
  'mark-as-paid': {
    method: 'POST',
    path: 'https://api.omise.co/charges/:id/mark_as_paid',
    title: 'Mark as paid',
    description: 'Force a test charge to the successful state.',
    testModeOnly: true,
    longDescription: `This endpoint is only available in test mode. It forces a pending charge to transition to the \`successful\` state without actually processing a payment.

Use this for integration testing to simulate successful payments without connecting to a live payment backend. Attempting to call this endpoint on a live-mode charge will return a \`400 Bad Request\` error.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The charge ID to mark as paid', default: 'chrg_test_', inPath: true },
    ]
  },
  'mark-as-failed': {
    method: 'POST',
    path: 'https://api.omise.co/charges/:id/mark_as_failed',
    title: 'Mark as failed',
    description: 'Force a test charge to the failed state.',
    testModeOnly: true,
    longDescription: `This endpoint is only available in test mode. It forces a pending charge to transition to the \`failed\` state without actually processing a payment.

Use this for integration testing to simulate failed payments and test your error handling logic. Attempting to call this endpoint on a live-mode charge will return a \`400 Bad Request\` error.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The charge ID to mark as failed', default: 'chrg_test_', inPath: true },
    ]
  },
};

export const codeExamples: Record<string, Record<string, string>> = {
  create: {
    curl: `curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "amount=100000" \\
  -d "currency=thb" \\
  -d "card=tokn_test_no1t4tnemucod0e51mo"`,
    ruby: `charge = Omise::Charge.create({
  amount: 100000,
  currency: "thb",
  card: "tokn_test_no1t4tnemucod0e51mo"
})`,
    python: `import omise

omise.api_secret = "skey_test_..."

charge = omise.Charge.create(
    amount=100000,
    currency="thb",
    card="tokn_test_no1t4tnemucod0e51mo"
)
print(charge.id)`,
    node: `const omise = require('omise')({
  secretKey: 'skey_test_...'
});

const charge = await omise.charges.create({
  amount: 100000,
  currency: 'thb',
  card: 'tokn_test_no1t4tnemucod0e51mo'
});
console.log(charge.id);`,
    php: `<?php
require_once 'vendor/autoload.php';

Omise::setSecretKey('skey_test_...');

$charge = OmiseCharge::create([
    'amount' => 100000,
    'currency' => 'thb',
    'card' => 'tokn_test_no1t4tnemucod0e51mo'
]);
echo $charge['id'];`,
    go: `package main

import "github.com/omise/omise-go"

client, _ := omise.NewClient("pkey_test_...", "skey_test_...")
charge, _ := client.Charges.Create(&omise.CreateChargeParams{
    Amount:   100000,
    Currency: "thb",
    Card:     "tokn_test_no1t4tnemucod0e51mo",
})`,
    java: `import co.omise.Client;
import co.omise.models.Charge;

Client client = new Client("skey_test_...");
Charge charge = client.charges().create(
    new Charge.CreateParams()
        .amount(100000)
        .currency("thb")
        .card("tokn_test_no1t4tnemucod0e51mo")
);`,
    csharp: `using Omise;

var client = new OmiseClient("skey_test_...");
var charge = await client.Charges.CreateAsync(
    new CreateChargeRequest {
        Amount = 100000,
        Currency = "thb",
        Card = "tokn_test_no1t4tnemucod0e51mo"
    }
);`,
  },
  retrieve: {
    curl: `curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY:`,
    ruby: `charge = Omise::Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
puts charge.status`,
    python: `charge = omise.Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
print(charge.status)`,
    node: `const charge = await omise.charges.retrieve('chrg_test_no1t4tnemucod0e51mo');
console.log(charge.status);`,
    php: `$charge = OmiseCharge::retrieve('chrg_test_no1t4tnemucod0e51mo');
echo $charge['status'];`,
    go: `charge, _ := client.Charges.Retrieve("chrg_test_no1t4tnemucod0e51mo")
fmt.Println(charge.Status)`,
    java: `Charge charge = client.charges().retrieve("chrg_test_no1t4tnemucod0e51mo");
System.out.println(charge.getStatus());`,
    csharp: `var charge = await client.Charges.GetAsync("chrg_test_no1t4tnemucod0e51mo");
Console.WriteLine(charge.Status);`,
  },
  list: {
    curl: `curl https://api.omise.co/charges \\
  -u $OMISE_SECRET_KEY: \\
  -d "limit=10" \\
  -d "order=reverse_chronological"`,
    ruby: `charges = Omise::Charge.list(limit: 10, order: "reverse_chronological")
charges.data.each { |c| puts c.id }`,
    python: `charges = omise.Charge.list(limit=10, order="reverse_chronological")
for charge in charges:
    print(charge.id)`,
    node: `const charges = await omise.charges.list({
  limit: 10,
  order: 'reverse_chronological'
});
charges.data.forEach(c => console.log(c.id));`,
    php: `$charges = OmiseCharge::all(['limit' => 10, 'order' => 'reverse_chronological']);
foreach ($charges['data'] as $charge) {
    echo $charge['id'];
}`,
    go: `charges, _ := client.Charges.List(&omise.ListParams{
    Limit: 10,
    Order: "reverse_chronological",
})`,
    java: `ChargeList charges = client.charges().list(
    new ListParams().limit(10).order("reverse_chronological")
);`,
    csharp: `var charges = await client.Charges.ListAsync(new ListOptions {
    Limit = 10,
    Order = "reverse_chronological"
});`,
  },
  capture: {
    curl: `curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo/capture \\
  -u $OMISE_SECRET_KEY: \\
  -X POST`,
    ruby: `charge = Omise::Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.capture
puts charge.captured # => true`,
    python: `charge = omise.Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.capture()
print(charge.captured)  # True`,
    node: `const charge = await omise.charges.capture('chrg_test_no1t4tnemucod0e51mo');
console.log(charge.captured); // true`,
    php: `$charge = OmiseCharge::retrieve('chrg_test_no1t4tnemucod0e51mo');
$charge->capture();
echo $charge['captured']; // true`,
    go: `charge, _ := client.Charges.Capture("chrg_test_no1t4tnemucod0e51mo", nil)
fmt.Println(charge.Captured) // true`,
    java: `Charge charge = client.charges().capture("chrg_test_no1t4tnemucod0e51mo");
System.out.println(charge.isCaptured()); // true`,
    csharp: `var charge = await client.Charges.CaptureAsync("chrg_test_no1t4tnemucod0e51mo");
Console.WriteLine(charge.Captured); // true`,
  },
  reverse: {
    curl: `curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo/reverse \\
  -u $OMISE_SECRET_KEY: \\
  -X POST`,
    ruby: `charge = Omise::Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.reverse
puts charge.reversed # => true`,
    python: `charge = omise.Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.reverse()
print(charge.reversed)  # True`,
    node: `const charge = await omise.charges.reverse('chrg_test_no1t4tnemucod0e51mo');
console.log(charge.reversed); // true`,
    php: `$charge = OmiseCharge::retrieve('chrg_test_no1t4tnemucod0e51mo');
$charge->reverse();
echo $charge['reversed']; // true`,
    go: `charge, _ := client.Charges.Reverse("chrg_test_no1t4tnemucod0e51mo")
fmt.Println(charge.Reversed) // true`,
    java: `Charge charge = client.charges().reverse("chrg_test_no1t4tnemucod0e51mo");
System.out.println(charge.isReversed()); // true`,
    csharp: `var charge = await client.Charges.ReverseAsync("chrg_test_no1t4tnemucod0e51mo");
Console.WriteLine(charge.Reversed); // true`,
  },
  expire: {
    curl: `curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo/expire \\
  -u $OMISE_SECRET_KEY: \\
  -X POST`,
    ruby: `charge = Omise::Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.expire
puts charge.status # => "expired"`,
    python: `charge = omise.Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.expire()
print(charge.status)  # "expired"`,
    node: `const charge = await omise.charges.expire('chrg_test_no1t4tnemucod0e51mo');
console.log(charge.status); // "expired"`,
    php: `$charge = OmiseCharge::retrieve('chrg_test_no1t4tnemucod0e51mo');
$charge->expire();
echo $charge['status']; // "expired"`,
    go: `charge, _ := client.Charges.Expire("chrg_test_no1t4tnemucod0e51mo")
fmt.Println(charge.Status) // "expired"`,
    java: `Charge charge = client.charges().expire("chrg_test_no1t4tnemucod0e51mo");
System.out.println(charge.getStatus()); // "expired"`,
    csharp: `var charge = await client.Charges.ExpireAsync("chrg_test_no1t4tnemucod0e51mo");
Console.WriteLine(charge.Status); // "expired"`,
  },
  update: {
    curl: `curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY: \\
  -X PATCH \\
  -d "description=Order #12345" \\
  -d "metadata[order_id]=12345"`,
    ruby: `charge = Omise::Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.update(
  description: "Order #12345",
  metadata: { order_id: "12345" }
)`,
    python: `charge = omise.Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.update(
    description="Order #12345",
    metadata={"order_id": "12345"}
)`,
    node: `const charge = await omise.charges.update('chrg_test_no1t4tnemucod0e51mo', {
  description: 'Order #12345',
  metadata: { order_id: '12345' }
});`,
    php: `$charge = OmiseCharge::retrieve('chrg_test_no1t4tnemucod0e51mo');
$charge->update([
    'description' => 'Order #12345',
    'metadata' => ['order_id' => '12345']
]);`,
    go: `charge, _ := client.Charges.Update("chrg_test_no1t4tnemucod0e51mo", &omise.UpdateChargeParams{
    Description: "Order #12345",
    Metadata: map[string]string{"order_id": "12345"},
})`,
    java: `Charge charge = client.charges().update("chrg_test_no1t4tnemucod0e51mo",
    new Charge.UpdateParams()
        .description("Order #12345")
        .metadata(Map.of("order_id", "12345"))
);`,
    csharp: `var charge = await client.Charges.UpdateAsync("chrg_test_no1t4tnemucod0e51mo",
    new UpdateChargeRequest {
        Description = "Order #12345",
        Metadata = new Dictionary<string, string> { { "order_id", "12345" } }
    }
);`,
  },
  'mark-as-paid': {
    curl: `curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo/mark_as_paid \\
  -u $OMISE_SECRET_KEY: \\
  -X POST`,
    ruby: `# Test mode only
charge = Omise::Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.mark_as_paid
puts charge.status # => "successful"`,
    python: `# Test mode only
charge = omise.Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.mark_as_paid()
print(charge.status)  # "successful"`,
    node: `// Test mode only
const charge = await omise.charges.markAsPaid('chrg_test_no1t4tnemucod0e51mo');
console.log(charge.status); // "successful"`,
    php: `// Test mode only
$charge = OmiseCharge::retrieve('chrg_test_no1t4tnemucod0e51mo');
$charge->mark_as_paid();
echo $charge['status']; // "successful"`,
    go: `// Test mode only
charge, _ := client.Charges.MarkAsPaid("chrg_test_no1t4tnemucod0e51mo")
fmt.Println(charge.Status) // "successful"`,
    java: `// Test mode only
Charge charge = client.charges().markAsPaid("chrg_test_no1t4tnemucod0e51mo");
System.out.println(charge.getStatus()); // "successful"`,
    csharp: `// Test mode only
var charge = await client.Charges.MarkAsPaidAsync("chrg_test_no1t4tnemucod0e51mo");
Console.WriteLine(charge.Status); // "successful"`,
  },
  'mark-as-failed': {
    curl: `curl https://api.omise.co/charges/chrg_test_no1t4tnemucod0e51mo/mark_as_failed \\
  -u $OMISE_SECRET_KEY: \\
  -X POST`,
    ruby: `# Test mode only
charge = Omise::Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.mark_as_failed
puts charge.status # => "failed"`,
    python: `# Test mode only
charge = omise.Charge.retrieve("chrg_test_no1t4tnemucod0e51mo")
charge.mark_as_failed()
print(charge.status)  # "failed"`,
    node: `// Test mode only
const charge = await omise.charges.markAsFailed('chrg_test_no1t4tnemucod0e51mo');
console.log(charge.status); // "failed"`,
    php: `// Test mode only
$charge = OmiseCharge::retrieve('chrg_test_no1t4tnemucod0e51mo');
$charge->mark_as_failed();
echo $charge['status']; // "failed"`,
    go: `// Test mode only
charge, _ := client.Charges.MarkAsFailed("chrg_test_no1t4tnemucod0e51mo")
fmt.Println(charge.Status) // "failed"`,
    java: `// Test mode only
Charge charge = client.charges().markAsFailed("chrg_test_no1t4tnemucod0e51mo");
System.out.println(charge.getStatus()); // "failed"`,
    csharp: `// Test mode only
var charge = await client.Charges.MarkAsFailedAsync("chrg_test_no1t4tnemucod0e51mo");
Console.WriteLine(charge.Status); // "failed"`,
  },
};

export const responseExamples: Record<string, string> = {
  create: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "location": "/charges/chrg_test_no1t4tnemucod0e51mo",
  "amount": 100000,
  "net": 96350,
  "fee": 3650,
  "fee_vat": 256,
  "interest": 0,
  "interest_vat": 0,
  "funding_amount": 100000,
  "refunded_amount": 0,
  "currency": "thb",
  "funding_currency": "thb",
  "description": null,
  "metadata": {},
  "status": "successful",
  "authorized": true,
  "reversed": false,
  "captured": true,
  "capture": true,
  "disputable": true,
  "capturable": false,
  "reversible": false,
  "refundable": true,
  "expired": false,
  "expires_at": "2024-01-22T10:30:00Z",
  "paid": true,
  "transaction": "trxn_test_no1t4tnemucod0e51mo",
  "card": {
    "object": "card",
    "id": "card_test_no1t4tnemucod0e51mo",
    "livemode": false,
    "location": null,
    "deleted": false,
    "brand": "Visa",
    "financing": "credit",
    "last_digits": "4242",
    "name": "JOHN DOE",
    "expiration_month": 12,
    "expiration_year": 2025
  },
  "source": null,
  "schedule": null,
  "customer": null,
  "created_at": "2024-01-15T10:30:00Z",
  "paid_at": "2024-01-15T10:30:01Z"
}`,
  retrieve: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "location": "/charges/chrg_test_no1t4tnemucod0e51mo",
  "amount": 100000,
  "currency": "thb",
  "status": "successful",
  "authorized": true,
  "captured": true,
  "paid": true,
  "card": {
    "object": "card",
    "id": "card_test_no1t4tnemucod0e51mo",
    "brand": "Visa",
    "last_digits": "4242"
  },
  "created_at": "2024-01-15T10:30:00Z"
}`,
  list: `{
  "object": "list",
  "location": "/charges",
  "offset": 0,
  "limit": 20,
  "total": 156,
  "order": "chronological",
  "data": [
    {
      "object": "charge",
      "id": "chrg_test_no1t4tnemucod0e51mo",
      "amount": 100000,
      "currency": "thb",
      "status": "successful"
    },
    {
      "object": "charge",
      "id": "chrg_test_no1t4tnemucod0e51mo",
      "amount": 250000,
      "currency": "thb",
      "status": "successful"
    }
  ]
}`,
  capture: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "amount": 100000,
  "currency": "thb",
  "status": "successful",
  "authorized": true,
  "captured": true,
  "capturable": false,
  "paid": true,
  "paid_at": "2024-01-15T11:45:00Z"
}`,
  reverse: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "amount": 100000,
  "currency": "thb",
  "status": "reversed",
  "authorized": true,
  "captured": false,
  "reversed": true,
  "reversible": false
}`,
  expire: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "amount": 100000,
  "currency": "thb",
  "status": "expired",
  "expired": true,
  "expired_at": "2024-01-15T12:00:00Z"
}`,
  update: `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "amount": 100000,
  "currency": "thb",
  "description": "Order #12345",
  "metadata": {
    "order_id": "12345"
  },
  "status": "successful"
}`,
  'mark-as-paid': `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "amount": 100000,
  "currency": "thb",
  "status": "successful",
  "authorized": true,
  "captured": true,
  "paid": true,
  "livemode": false,
  "paid_at": "2024-01-15T12:00:00Z"
}`,
  'mark-as-failed': `{
  "object": "charge",
  "id": "chrg_test_no1t4tnemucod0e51mo",
  "amount": 100000,
  "currency": "thb",
  "status": "failed",
  "authorized": false,
  "captured": false,
  "paid": false,
  "livemode": false,
  "failure_code": "failed_processing",
  "failure_message": "Charge was marked as failed (test mode)"
}`,
};

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
