// Customer API data - Verified 2026-10-31 via direct API calls
// Customers store payment methods for repeated charges

export interface CustomerEndpointParam {
  name: string;
  type: string;
  required: boolean;
  desc: string;
  options?: string[];
}

export interface CustomerEndpointConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  title: string;
  description: string;
  longDescription?: string;
  params: CustomerEndpointParam[];
}

// ============================================================================
// CUSTOMER API ENDPOINTS
// NOTE: Requires SECRET KEY authentication (public keys not accepted)
// ============================================================================

export const customerEndpoints: Record<string, CustomerEndpointConfig> = {
  create: {
    method: 'POST',
    path: 'https://api.omise.co/customers',
    title: 'Create a customer',
    description: 'Creates a new customer, optionally with a card attached.',
    longDescription: `Creates a new customer object. You can optionally attach a card by providing a token ID.

The customer can then be used to create charges without requiring the customer to re-enter payment details.`,
    params: [
      { name: 'email', type: 'string', required: false, desc: 'Customer email address for receipts and communication' },
      { name: 'description', type: 'string', required: false, desc: 'Arbitrary description for your reference' },
      { name: 'card', type: 'string', required: false, desc: 'Token ID (tokn_test_...) to attach as a card' },
      { name: 'metadata', type: 'object', required: false, desc: 'Custom key-value pairs, e.g. metadata[order_id]=123' },
    ]
  },
  list: {
    method: 'GET',
    path: 'https://api.omise.co/customers',
    title: 'List customers',
    description: 'Returns a paginated list of all customers.',
    longDescription: `Returns a list of all customers. Customers are returned in chronological order by default.

Use pagination parameters to navigate through large result sets.`,
    params: [
      { name: 'offset', type: 'integer', required: false, desc: 'Number of records to skip (default: 0)' },
      { name: 'limit', type: 'integer', required: false, desc: 'Number of records to return (default: 20, max: 100)' },
      { name: 'from', type: 'datetime', required: false, desc: 'Start of date range. ISO 8601 format, e.g. 2026-01-01T00:00:00Z' },
      { name: 'to', type: 'datetime', required: false, desc: 'End of date range. ISO 8601 format, e.g. 2026-12-31T23:59:59Z' },
      { name: 'order', type: 'string', required: false, desc: 'Sort order for results', options: ['chronological', 'reverse_chronological'] },
    ]
  },
  retrieve: {
    method: 'GET',
    path: 'https://api.omise.co/customers/:id',
    title: 'Retrieve a customer',
    description: 'Retrieves the details of an existing customer.',
    longDescription: `Returns the full customer object including their cards and linked accounts.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The customer ID (cust_test_...)' },
    ]
  },
  update: {
    method: 'PATCH',
    path: 'https://api.omise.co/customers/:id',
    title: 'Update a customer',
    description: 'Updates the specified customer with new information.',
    longDescription: `Updates customer details such as email, description, or metadata. You can also attach a new card or change the default card.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The customer ID (cust_test_...)' },
      { name: 'email', type: 'string', required: false, desc: 'Customer email address' },
      { name: 'description', type: 'string', required: false, desc: 'Arbitrary description for your reference' },
      { name: 'card', type: 'string', required: false, desc: 'Token ID (tokn_test_...) to attach as a new card' },
      { name: 'default_card', type: 'string', required: false, desc: 'Card ID (card_test_...) to set as default' },
      { name: 'metadata', type: 'object', required: false, desc: 'Custom key-value pairs, e.g. metadata[order_id]=123' },
    ]
  },
  destroy: {
    method: 'DELETE',
    path: 'https://api.omise.co/customers/:id',
    title: 'Destroy a customer',
    description: 'Permanently deletes a customer and all associated cards.',
    longDescription: `Permanently deletes a customer. This action cannot be undone.

All cards and linked accounts associated with the customer will also be deleted. Any scheduled charges using this customer will fail.`,
    params: [
      { name: 'id', type: 'string', required: true, desc: 'The customer ID (cust_test_...)' },
    ]
  },
};

// ============================================================================
// VERSION-SPECIFIC CUSTOMER FIELDS
// Verified: 2026-10-31 via direct API calls across all 4 versions
// ============================================================================

export interface CustomerFieldInfo {
  name: string;
  type: string;
  description: string;
  io: 'input' | 'output' | 'editable';
}

// Deimos (2019-05-29) - 12 fields
// Uses created_at, has deleted field
export const CUSTOMER_DEIMOS_FIELDS: CustomerFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Always "customer"', io: 'output' },
  { name: 'id', type: 'string', description: 'Customer identifier (cust_test_...)', io: 'output' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode customer', io: 'output' },
  { name: 'location', type: 'string', description: 'API path to this customer', io: 'output' },
  { name: 'deleted', type: 'boolean', description: 'Whether the customer has been deleted (Deimos only)', io: 'output' },
  { name: 'email', type: 'string', description: 'Customer email address', io: 'editable' },
  { name: 'description', type: 'string', description: 'Arbitrary description', io: 'editable' },
  { name: 'metadata', type: 'object', description: 'Custom key-value pairs (max 20 keys, 15KB total)', io: 'editable' },
  { name: 'default_card', type: 'string', description: 'ID of the default card for charges', io: 'editable' },
  { name: 'cards', type: 'list', description: 'Paginated list of cards attached to this customer', io: 'output' },
  { name: 'linked_accounts', type: 'list', description: 'Paginated list of linked bank accounts', io: 'output' },
  { name: 'created_at', type: 'datetime', description: 'When the customer was created', io: 'output' },
];

// Cordelia/Bestla/Aegaeon (older versions) - 11 fields
// Uses created instead of created_at, no deleted field
export const CUSTOMER_OLDER_FIELDS: CustomerFieldInfo[] = [
  { name: 'object', type: 'string', description: 'Always "customer"', io: 'output' },
  { name: 'id', type: 'string', description: 'Customer identifier (cust_test_...)', io: 'output' },
  { name: 'livemode', type: 'boolean', description: 'Whether this is a live mode customer', io: 'output' },
  { name: 'location', type: 'string', description: 'API path to this customer', io: 'output' },
  { name: 'email', type: 'string', description: 'Customer email address', io: 'editable' },
  { name: 'description', type: 'string', description: 'Arbitrary description', io: 'editable' },
  { name: 'metadata', type: 'object', description: 'Custom key-value pairs (max 20 keys, 15KB total)', io: 'editable' },
  { name: 'default_card', type: 'string', description: 'ID of the default card for charges', io: 'editable' },
  { name: 'cards', type: 'list', description: 'Paginated list of cards attached to this customer', io: 'output' },
  { name: 'linked_accounts', type: 'list', description: 'Paginated list of linked bank accounts', io: 'output' },
  { name: 'created', type: 'datetime', description: 'When the customer was created (renamed to created_at in Deimos)', io: 'output' },
];

export function getCustomerFieldsForVersion(codename: string): CustomerFieldInfo[] {
  return codename === 'deimos' ? CUSTOMER_DEIMOS_FIELDS : CUSTOMER_OLDER_FIELDS;
}

// Code examples for Customer API
export const customerCodeExamples: Record<string, Record<string, string>> = {
  create: {
    curl: `curl https://api.omise.co/customers \\
  -u $OMISE_SECRET_KEY: \\
  -d "email=customer@example.com" \\
  -d "description=Customer for order #12345" \\
  -d "card=tokn_test_..."`,
    ruby: `customer = Omise::Customer.create(
  email: "customer@example.com",
  description: "Customer for order #12345",
  card: "tokn_test_..."
)`,
    python: `import omise

omise.api_secret = "skey_test_..."

customer = omise.Customer.create(
    email="customer@example.com",
    description="Customer for order #12345",
    card="tokn_test_..."
)`,
    node: `const omise = require('omise')({
  secretKey: 'skey_test_...'
});

const customer = await omise.customers.create({
  email: 'customer@example.com',
  description: 'Customer for order #12345',
  card: 'tokn_test_...'
});`,
    php: `<?php
$customer = OmiseCustomer::create([
    'email' => 'customer@example.com',
    'description' => 'Customer for order #12345',
    'card' => 'tokn_test_...'
]);`,
    go: `customer, _ := client.Customer.Create(&omise.CreateCustomerParams{
    Email: "customer@example.com",
    Description: "Customer for order #12345",
    Card: "tokn_test_...",
})`,
    java: `Customer customer = client.customers().create(new Customer.CreateParams()
    .email("customer@example.com")
    .description("Customer for order #12345")
    .card("tokn_test_..."));`,
    csharp: `var customer = await client.Customers.Create(new CreateCustomerRequest {
    Email = "customer@example.com",
    Description = "Customer for order #12345",
    Card = "tokn_test_..."
});`,
  },
  list: {
    curl: `curl https://api.omise.co/customers \\
  -u $OMISE_SECRET_KEY:`,
    ruby: `customers = Omise::Customer.list
customers.each { |c| puts c.email }`,
    python: `customers = omise.Customer.list()
for customer in customers:
    print(customer.email)`,
    node: `const customers = await omise.customers.list();
console.log(customers.data);`,
    php: `<?php
$customers = OmiseCustomer::retrieve();
foreach ($customers['data'] as $customer) {
    echo $customer['email'];
}`,
    go: `customers, _ := client.Customer.List(nil)
for _, c := range customers.Data {
    fmt.Println(c.Email)
}`,
    java: `ScopedList<Customer> customers = client.customers().list();
for (Customer c : customers.getData()) {
    System.out.println(c.getEmail());
}`,
    csharp: `var customers = await client.Customers.GetList();
foreach (var c in customers.Data) {
    Console.WriteLine(c.Email);
}`,
  },
  retrieve: {
    curl: `curl https://api.omise.co/customers/cust_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY:`,
    ruby: `customer = Omise::Customer.retrieve("cust_test_...")
puts customer.email`,
    python: `customer = omise.Customer.retrieve("cust_test_...")
print(customer.email)`,
    node: `const customer = await omise.customers.retrieve('cust_test_...');
console.log(customer.email);`,
    php: `<?php
$customer = OmiseCustomer::retrieve("cust_test_...");
echo $customer['email'];`,
    go: `customer, _ := client.Customer.Retrieve("cust_test_...")
fmt.Println(customer.Email)`,
    java: `Customer customer = client.customers().get("cust_test_...");
System.out.println(customer.getEmail());`,
    csharp: `var customer = await client.Customers.Get("cust_test_...");
Console.WriteLine(customer.Email);`,
  },
  update: {
    curl: `curl https://api.omise.co/customers/cust_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY: \\
  -X PATCH \\
  -d "email=updated@example.com" \\
  -d "description=Updated description"`,
    ruby: `customer = Omise::Customer.retrieve("cust_test_...")
customer.update(
  email: "updated@example.com",
  description: "Updated description"
)`,
    python: `customer = omise.Customer.retrieve("cust_test_...")
customer.update(
    email="updated@example.com",
    description="Updated description"
)`,
    node: `const customer = await omise.customers.update('cust_test_...', {
  email: 'updated@example.com',
  description: 'Updated description'
});`,
    php: `<?php
$customer = OmiseCustomer::retrieve("cust_test_...");
$customer->update([
    'email' => 'updated@example.com',
    'description' => 'Updated description'
]);`,
    go: `customer, _ := client.Customer.Update("cust_test_...", &omise.UpdateCustomerParams{
    Email: "updated@example.com",
    Description: "Updated description",
})`,
    java: `Customer customer = client.customers().update("cust_test_...", new Customer.UpdateParams()
    .email("updated@example.com")
    .description("Updated description"));`,
    csharp: `var customer = await client.Customers.Update("cust_test_...", new UpdateCustomerRequest {
    Email = "updated@example.com",
    Description = "Updated description"
});`,
  },
  destroy: {
    curl: `curl https://api.omise.co/customers/cust_test_no1t4tnemucod0e51mo \\
  -u $OMISE_SECRET_KEY: \\
  -X DELETE`,
    ruby: `customer = Omise::Customer.retrieve("cust_test_...")
customer.destroy`,
    python: `customer = omise.Customer.retrieve("cust_test_...")
customer.destroy()`,
    node: `const result = await omise.customers.destroy('cust_test_...');
console.log(result.deleted);`,
    php: `<?php
$customer = OmiseCustomer::retrieve("cust_test_...");
$customer->destroy();`,
    go: `result, _ := client.Customer.Destroy("cust_test_...")
fmt.Println(result.Deleted)`,
    java: `Customer customer = client.customers().destroy("cust_test_...");
System.out.println(customer.isDeleted());`,
    csharp: `var result = await client.Customers.Destroy("cust_test_...");
Console.WriteLine(result.Deleted);`,
  },
};

// Response examples (Deimos format)
export const customerResponseExample = `{
  "object": "customer",
  "id": "cust_test_no1t4tnemucod0e51mo",
  "livemode": false,
  "location": "/customers/cust_test_no1t4tnemucod0e51mo",
  "deleted": false,
  "metadata": {
    "order_id": "12345"
  },
  "cards": {
    "object": "list",
    "data": [],
    "limit": 20,
    "offset": 0,
    "total": 0
  },
  "default_card": null,
  "linked_accounts": {
    "object": "list",
    "data": [],
    "limit": 20,
    "offset": 0,
    "total": 0
  },
  "description": "Customer for order #12345",
  "email": "customer@example.com",
  "created_at": "2026-10-31T14:30:00Z"
}`;

export const customerListResponseExample = `{
  "object": "list",
  "data": [
    {
      "object": "customer",
      "id": "cust_test_no1t4tnemucod0e51mo",
      "livemode": false,
      "email": "customer@example.com",
      "description": "Customer for order #12345",
      "created_at": "2026-10-31T14:30:00Z"
    }
  ],
  "limit": 20,
  "offset": 0,
  "total": 1,
  "location": "/customers",
  "order": "chronological"
}`;

export const customerDestroyResponseExample = `{
  "object": "customer",
  "id": "cust_test_no1t4tnemucod0e51mo",
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
