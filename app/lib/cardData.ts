// Card API data - Verified 2026-10-31 via direct API calls
// Cards are nested under customers: /customers/:customer_id/cards

export interface CardEndpointParam {
  name: string;
  type: string;
  required: boolean;
  desc: string;
  options?: string[];  // For dropdown fields
}

export interface CardEndpointConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  title: string;
  description: string;
  longDescription?: string;
  params: CardEndpointParam[];
}

// ============================================================================
// CARD API ENDPOINTS
// NOTE: Requires SECRET KEY authentication (public keys not accepted)
// Cards are always accessed through a customer: /customers/:id/cards
// ============================================================================

export const cardEndpoints: Record<string, CardEndpointConfig> = {
  list: {
    method: 'GET',
    path: 'https://api.omise.co/customers/:customer_id/cards',
    title: 'List cards',
    description: 'Lists all cards belonging to a customer.',
    longDescription: `Returns a paginated list of all cards attached to the specified customer.

Cards are returned in chronological order by default. Use pagination parameters to navigate through large result sets.`,
    params: [
      { name: 'customer_id', type: 'string', required: true, desc: 'The customer ID (cust_test_...)' },
      { name: 'offset', type: 'integer', required: false, desc: 'Number of records to skip (default: 0)' },
      { name: 'limit', type: 'integer', required: false, desc: 'Number of records to return (default: 20, max: 100)' },
      { name: 'from', type: 'datetime', required: false, desc: 'Start of date range. ISO 8601 format, e.g. 2026-01-01T00:00:00Z' },
      { name: 'to', type: 'datetime', required: false, desc: 'End of date range. ISO 8601 format, e.g. 2026-12-31T23:59:59Z' },
      { name: 'order', type: 'string', required: false, desc: 'Sort order for results', options: ['chronological', 'reverse_chronological'] },
    ]
  },
  retrieve: {
    method: 'GET',
    path: 'https://api.omise.co/customers/:customer_id/cards/:card_id',
    title: 'Retrieve a card',
    description: 'Retrieves the details of an existing card.',
    longDescription: `Returns the full card object for the specified card ID.

The card must belong to the specified customer.`,
    params: [
      { name: 'customer_id', type: 'string', required: true, desc: 'The customer ID (cust_test_...)' },
      { name: 'card_id', type: 'string', required: true, desc: 'The card ID (card_test_...)' },
    ]
  },
  update: {
    method: 'PATCH',
    path: 'https://api.omise.co/customers/:customer_id/cards/:card_id',
    title: 'Update a card',
    description: 'Updates the specified card with new information.',
    longDescription: `Updates billing address information and cardholder details on a card.

You can update the cardholder name, billing address fields, and expiration date. Card number and security code cannot be changed.`,
    params: [
      { name: 'customer_id', type: 'string', required: true, desc: 'The customer ID (cust_test_...)' },
      { name: 'card_id', type: 'string', required: true, desc: 'The card ID (card_test_...)' },
      { name: 'name', type: 'string', required: false, desc: 'Cardholder name as printed on the card' },
      { name: 'expiration_month', type: 'integer', required: false, desc: 'Card expiration month (1-12)' },
      { name: 'expiration_year', type: 'integer', required: false, desc: 'Card expiration year (4 digits)' },
      { name: 'postal_code', type: 'string', required: false, desc: 'Billing postal/ZIP code' },
      { name: 'city', type: 'string', required: false, desc: 'Billing city' },
      { name: 'state', type: 'string', required: false, desc: 'Billing state/province' },
      { name: 'street1', type: 'string', required: false, desc: 'Billing street address line 1' },
      { name: 'street2', type: 'string', required: false, desc: 'Billing street address line 2' },
      { name: 'phone_number', type: 'string', required: false, desc: 'Cardholder phone number' },
    ]
  },
  destroy: {
    method: 'DELETE',
    path: 'https://api.omise.co/customers/:customer_id/cards/:card_id',
    title: 'Destroy a card',
    description: 'Permanently removes a card from a customer.',
    longDescription: `Permanently deletes a card from a customer. This action cannot be undone.

After deletion, the card can no longer be used for charges. Any scheduled or recurring payments using this card will fail.`,
    params: [
      { name: 'customer_id', type: 'string', required: true, desc: 'The customer ID (cust_test_...)' },
      { name: 'card_id', type: 'string', required: true, desc: 'The card ID (card_test_...)' },
    ]
  },
};

// ============================================================================
// VERSION-SPECIFIC CARD FIELDS
// Verified: 2026-10-31 via direct API calls across all 4 versions
// ============================================================================

export interface CardFieldInfo {
  name: string;
  type: string;
  description: string;
  io: 'input' | 'output' | 'editable';
}

// Deimos (2019-05-29) - 24 fields
// Uses created_at, has deleted field
export const CARD_DEIMOS_FIELDS: CardFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Always "card"', io: 'output' },
  { name: 'id', type: 'string', description: 'Card identifier (card_test_...)', io: 'output' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode card', io: 'output' },
  { name: 'location', type: 'string', description: 'API path to this card', io: 'output' },
  { name: 'deleted', type: 'boolean', description: 'Whether the card has been deleted (Deimos only)', io: 'output' },
  { name: 'bank', type: 'string', description: 'Issuing bank name', io: 'output' },
  { name: 'brand', type: 'string', description: 'Card brand: Visa, MasterCard, JCB, American Express', io: 'output' },
  { name: 'financing', type: 'string', description: 'Card type: credit, debit, prepaid, or unknown', io: 'output' },
  { name: 'fingerprint', type: 'string', description: 'Unique card fingerprint for duplicate detection', io: 'output' },
  { name: 'first_digits', type: 'string', description: 'First 6 digits (BIN) - may be null', io: 'output' },
  { name: 'last_digits', type: 'string', description: 'Last 4 digits of card number', io: 'output' },
  { name: 'name', type: 'string', description: 'Cardholder name', io: 'editable' },
  { name: 'expiration_month', type: 'integer', description: 'Expiration month (1-12)', io: 'editable' },
  { name: 'expiration_year', type: 'integer', description: 'Expiration year (4 digits)', io: 'editable' },
  { name: 'security_code_check', type: 'boolean', description: 'Whether CVV was verified', io: 'output' },
  { name: 'tokenization_method', type: 'string', description: 'How card was tokenized: applepay, googlepay, or null', io: 'output' },
  { name: 'country', type: 'string', description: 'Card issuing country (ISO 3166 alpha-2)', io: 'output' },
  { name: 'city', type: 'string', description: 'Billing city', io: 'editable' },
  { name: 'state', type: 'string', description: 'Billing state/province', io: 'editable' },
  { name: 'postal_code', type: 'string', description: 'Billing postal/ZIP code', io: 'editable' },
  { name: 'street1', type: 'string', description: 'Billing address line 1', io: 'editable' },
  { name: 'street2', type: 'string', description: 'Billing address line 2', io: 'editable' },
  { name: 'phone_number', type: 'string', description: 'Cardholder phone number', io: 'editable' },
  { name: 'created_at', type: 'datetime', description: 'When the card was created', io: 'output' },
];

// Cordelia/Bestla/Aegaeon (older versions) - 23 fields
// Uses created instead of created_at, no deleted field
export const CARD_OLDER_FIELDS: CardFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Always "card"', io: 'output' },
  { name: 'id', type: 'string', description: 'Card identifier (card_test_...)', io: 'output' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode card', io: 'output' },
  { name: 'location', type: 'string', description: 'API path to this card', io: 'output' },
  { name: 'bank', type: 'string', description: 'Issuing bank name', io: 'output' },
  { name: 'brand', type: 'string', description: 'Card brand: Visa, MasterCard, JCB, American Express', io: 'output' },
  { name: 'financing', type: 'string', description: 'Card type: credit, debit, prepaid, or unknown', io: 'output' },
  { name: 'fingerprint', type: 'string', description: 'Unique card fingerprint for duplicate detection', io: 'output' },
  { name: 'first_digits', type: 'string', description: 'First 6 digits (BIN) - may be null', io: 'output' },
  { name: 'last_digits', type: 'string', description: 'Last 4 digits of card number', io: 'output' },
  { name: 'name', type: 'string', description: 'Cardholder name', io: 'editable' },
  { name: 'expiration_month', type: 'integer', description: 'Expiration month (1-12)', io: 'editable' },
  { name: 'expiration_year', type: 'integer', description: 'Expiration year (4 digits)', io: 'editable' },
  { name: 'security_code_check', type: 'boolean', description: 'Whether CVV was verified', io: 'output' },
  { name: 'tokenization_method', type: 'string', description: 'How card was tokenized: applepay, googlepay, or null', io: 'output' },
  { name: 'country', type: 'string', description: 'Card issuing country (ISO 3166 alpha-2)', io: 'output' },
  { name: 'city', type: 'string', description: 'Billing city', io: 'editable' },
  { name: 'state', type: 'string', description: 'Billing state/province', io: 'editable' },
  { name: 'postal_code', type: 'string', description: 'Billing postal/ZIP code', io: 'editable' },
  { name: 'street1', type: 'string', description: 'Billing address line 1', io: 'editable' },
  { name: 'street2', type: 'string', description: 'Billing address line 2', io: 'editable' },
  { name: 'phone_number', type: 'string', description: 'Cardholder phone number', io: 'editable' },
  { name: 'created', type: 'datetime', description: 'When the card was created (renamed to created_at in Deimos)', io: 'output' },
];

export function getCardFieldsForVersion(codename: string): CardFieldInfo[] {
  return codename === 'deimos' ? CARD_DEIMOS_FIELDS : CARD_OLDER_FIELDS;
}

// Code examples for Card API
export const cardCodeExamples: Record<string, Record<string, string>> = {
  list: {
    curl: `curl https://api.omise.co/customers/cust_test_no1t4tnemucod0e51mo/cards \\
  -u $OMISE_SECRET_KEY:`,
    ruby: `customer = Omise::Customer.retrieve("cust_test_...")
cards = customer.cards.list
cards.each { |card| puts card.last_digits }`,
    python: `import omise

omise.api_secret = "skey_test_..."

customer = omise.Customer.retrieve("cust_test_...")
cards = customer.cards.list()
for card in cards:
    print(card.last_digits)`,
    node: `const omise = require('omise')({
  secretKey: 'skey_test_...'
});

const cards = await omise.customers.listCards('cust_test_...');
console.log(cards.data);`,
    php: `<?php
$customer = OmiseCustomer::retrieve("cust_test_...");
$cards = $customer->cards();
foreach ($cards['data'] as $card) {
    echo $card['last_digits'];
}`,
    go: `cards, _ := client.Customer.ListCards("cust_test_...", nil)
for _, card := range cards.Data {
    fmt.Println(card.LastDigits)
}`,
    java: `Customer customer = client.customers().get("cust_test_...");
ScopedList<Card> cards = customer.cards().list();
for (Card card : cards.getData()) {
    System.out.println(card.getLastDigits());
}`,
    csharp: `var cards = await client.Cards.GetList("cust_test_...");
foreach (var card in cards.Data) {
    Console.WriteLine(card.LastDigits);
}`,
  },
  retrieve: {
    curl: `curl https://api.omise.co/customers/cust_test_no1t4tnemucod0e51mo/cards/card_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY:`,
    ruby: `customer = Omise::Customer.retrieve("cust_test_...")
card = customer.cards.retrieve("card_test_...")
puts card.brand`,
    python: `customer = omise.Customer.retrieve("cust_test_...")
card = customer.cards.retrieve("card_test_...")
print(card.brand)`,
    node: `const card = await omise.customers.retrieveCard(
  'cust_test_...',
  'card_test_...'
);
console.log(card.brand);`,
    php: `$customer = OmiseCustomer::retrieve("cust_test_...");
$card = $customer->cards()->retrieve("card_test_...");
echo $card['brand'];`,
    go: `card, _ := client.Customer.RetrieveCard("cust_test_...", "card_test_...")
fmt.Println(card.Brand)`,
    java: `Customer customer = client.customers().get("cust_test_...");
Card card = customer.cards().get("card_test_...");
System.out.println(card.getBrand());`,
    csharp: `var card = await client.Cards.Get("cust_test_...", "card_test_...");
Console.WriteLine(card.Brand);`,
  },
  update: {
    curl: `curl https://api.omise.co/customers/cust_test_no1t4tnemucod0e51mo/cards/card_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY: \\
  -X PATCH \\
  -d "name=John Doe" \\
  -d "city=Bangkok" \\
  -d "postal_code=10110"`,
    ruby: `customer = Omise::Customer.retrieve("cust_test_...")
card = customer.cards.retrieve("card_test_...")
card.update(
  name: "John Doe",
  city: "Bangkok",
  postal_code: "10110"
)`,
    python: `customer = omise.Customer.retrieve("cust_test_...")
card = customer.cards.retrieve("card_test_...")
card.update(
    name="John Doe",
    city="Bangkok",
    postal_code="10110"
)`,
    node: `const card = await omise.customers.updateCard(
  'cust_test_...',
  'card_test_...',
  {
    name: 'John Doe',
    city: 'Bangkok',
    postal_code: '10110'
  }
);`,
    php: `$customer = OmiseCustomer::retrieve("cust_test_...");
$card = $customer->cards()->retrieve("card_test_...");
$card->update([
    'name' => 'John Doe',
    'city' => 'Bangkok',
    'postal_code' => '10110'
]);`,
    go: `card, _ := client.Customer.UpdateCard("cust_test_...", "card_test_...", &omise.UpdateCardParams{
    Name: "John Doe",
    City: "Bangkok",
    PostalCode: "10110",
})`,
    java: `Customer customer = client.customers().get("cust_test_...");
Card card = customer.cards().update("card_test_...", new Card.UpdateParams()
    .name("John Doe")
    .city("Bangkok")
    .postalCode("10110"));`,
    csharp: `var card = await client.Cards.Update("cust_test_...", "card_test_...", new UpdateCardRequest {
    Name = "John Doe",
    City = "Bangkok",
    PostalCode = "10110"
});`,
  },
  destroy: {
    curl: `curl https://api.omise.co/customers/cust_test_no1t4tnemucod0e51mo/cards/card_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY: \\
  -X DELETE`,
    ruby: `customer = Omise::Customer.retrieve("cust_test_...")
card = customer.cards.retrieve("card_test_...")
card.destroy`,
    python: `customer = omise.Customer.retrieve("cust_test_...")
card = customer.cards.retrieve("card_test_...")
card.destroy()`,
    node: `const result = await omise.customers.destroyCard(
  'cust_test_...',
  'card_test_...'
);`,
    php: `$customer = OmiseCustomer::retrieve("cust_test_...");
$card = $customer->cards()->retrieve("card_test_...");
$card->destroy();`,
    go: `result, _ := client.Customer.DestroyCard("cust_test_...", "card_test_...")
fmt.Println(result.Deleted)`,
    java: `Customer customer = client.customers().get("cust_test_...");
Card card = customer.cards().destroy("card_test_...");
System.out.println(card.isDeleted());`,
    csharp: `var result = await client.Cards.Destroy("cust_test_...", "card_test_...");
Console.WriteLine(result.Deleted);`,
  },
};

// Response examples (Deimos format)
export const cardResponseExample = `{
  "object": "card",
  "id": "card_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/customers/cust_test_no1t4tnemucod0e51mo/cards/card_test_no1t4tnemucod0e51mo",
  "deleted": false,
  "street1": "123 Example St",
  "street2": "Apt 4B",
  "city": "Bangkok",
  "state": null,
  "phone_number": "+66812345678",
  "postal_code": "10110",
  "country": "th",
  "financing": "credit",
  "bank": "KASIKORNBANK",
  "brand": "Visa",
  "fingerprint": "z42imPkFqT3qDxQdJVVOIzCy+kTfmzWiiEfFdwjMDSM=",
  "first_digits": "424242",
  "last_digits": "4242",
  "name": "John Doe",
  "expiration_month": 12,
  "expiration_year": 2028,
  "security_code_check": true,
  "tokenization_method": null,
  "created_at": "2026-10-31T10:16:46Z"
}`;

export const cardListResponseExample = `{
  "object": "list",
  "data": [
    {
      "object": "card",
      "id": "card_test_no1t4tnemucod0e51mo",
      "livemode": false,
      "location": "/customers/cust_test_no1t4tnemucod0e51mo/cards/card_test_no1t4tnemucod0e51mo",
      "deleted": false,
      "brand": "Visa",
      "last_digits": "4242",
      "name": "John Doe",
      "expiration_month": 12,
      "expiration_year": 2028,
      "created_at": "2026-10-31T10:16:46Z"
    }
  ],
  "limit": 20,
  "offset": 0,
  "total": 1,
  "location": "/customers/cust_test_no1t4tnemucod0e51mo/cards",
  "order": "chronological"
}`;

export const cardDestroyResponseExample = `{
  "object": "card",
  "id": "card_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "deleted": true
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
};
