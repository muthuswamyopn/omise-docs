const fs = require('fs');

// Read the schema
const schema = JSON.parse(fs.readFileSync('schema-with-errors.json', 'utf8'));

// Fields that are INPUT parameters for POST /charges
const createInputFields = new Set([
  'amount',
  'authorization_type',
  'capture',
  'card',
  'currency',
  'customer',
  'description',
  'expires_at',
  'first_charge',
  'linked_account',
  'metadata',
  'platform_fee',
  'recurring_reason',
  'ref_id',
  'return_uri',
  'source',
  'statement_descriptor',
  'sub_merchant_country',
  'transaction_indicator',
  'webhook_endpoints',
  'zero_interest_installments'
]);

// Note: 'ip' is intentionally excluded - it's auto-captured, not user input

// Mark all charge schema fields that are NOT input fields as readOnly
const chargeProps = schema.components.schemas.charge.properties;

for (const [fieldName, fieldDef] of Object.entries(chargeProps)) {
  if (!createInputFields.has(fieldName)) {
    // This field is response-only (readOnly)
    fieldDef.readOnly = true;
    fieldDef.description = fieldDef.description || '';
    if (!fieldDef.description.includes('response')) {
      fieldDef.description = (fieldDef.description ? fieldDef.description + ' ' : '') + '(Response only)';
    }
  }
}

// Also add descriptions to clarify input fields
const inputDescriptions = {
  amount: 'Charge amount in smallest currency unit',
  currency: 'Three-letter ISO 4217 currency code',
  card: 'Card token or card ID',
  source: 'Payment source token',
  customer: 'Customer ID with saved card',
  capture: 'Whether to immediately capture (default: true)',
  description: 'Merchant-facing description',
  metadata: 'Custom key-value pairs',
  return_uri: 'Redirect URL after 3DS/payment completion',
  expires_at: 'ISO 8601 expiration timestamp'
};

for (const [field, desc] of Object.entries(inputDescriptions)) {
  if (chargeProps[field]) {
    chargeProps[field].description = desc;
  }
}

// Write updated schema
fs.writeFileSync('schema-with-errors.json', JSON.stringify(schema, null, 2));

console.log('Schema updated with readOnly annotations');

// Summary
const readOnlyFields = Object.entries(chargeProps)
  .filter(([_, def]) => def.readOnly)
  .map(([name, _]) => name);

const inputFields = Object.entries(chargeProps)
  .filter(([_, def]) => !def.readOnly)
  .map(([name, _]) => name);

console.log('\n=== INPUT FIELDS (can be sent in request) ===');
console.log(inputFields.join(', '));

console.log('\n=== RESPONSE-ONLY FIELDS (readOnly: true) ===');
console.log(readOnlyFields.join(', '));
