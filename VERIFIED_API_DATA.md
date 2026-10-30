# Verified Omise Charge API Data

**Verified on:** 2026-10-30
**API Key:** skey_test_63mhuytgr8d72dozrf4 (test mode)
**Method:** Direct API calls with Omise-Version header + 3DS flow completion

---

## Charge Object Fields by Version

### Deimos (2019-05-29) - 62 fields
```
acquirer_reference_number, amount, approval_code, authorization_type,
authorize_uri, authorized, authorized_amount, authorized_at, branch,
can_perform_void, capturable, capture, captured_amount, card, created_at,
currency, customer, description, device, disputable, dispute, expired,
expired_at, expires_at, failure_code, failure_message, fee, fee_vat,
funding_amount, funding_currency, id, interest, interest_vat, ip, link,
linked_account, livemode, location, merchant_advice, metadata, multi_capture,
net, object, paid, paid_at, partially_refundable, platform_fee, refundable,
refunded_amount, refunds, return_uri, reversed, reversed_at, reversible,
schedule, source, status, terminal, transaction, transaction_fees, voided,
zero_interest_installments
```

### Cordelia (2017-11-02) - 55 fields
```
acquirer_reference_number, amount, approval_code, authorization_type,
authorize_uri, authorized, authorized_amount, branch, can_perform_void,
capturable, capture, captured_amount, card, created, currency, customer,
description, device, disputable, dispute, expired, expired_at, expires_at,
failure_code, failure_message, funding_amount, funding_currency, id, ip,
link, linked_account, livemode, location, metadata, object, paid, paid_at,
partially_refundable, platform_fee, reference, refundable, refunded, refunds,
return_uri, reversed, reversed_at, reversible, schedule, source, status,
terminal, transaction, transaction_fees, voided, zero_interest_installments
```

### Bestla (2015-11-17) - 52 fields
```
acquirer_reference_number, amount, approval_code, authorize_uri, authorized,
branch, can_perform_void, capturable, capture, card, created, currency,
customer, description, device, disputable, dispute, expired, expired_at,
expires_at, failure_code, failure_message, funding_amount, funding_currency,
id, ip, link, linked_account, livemode, location, metadata, object, offline,
offsite, paid, paid_at, partially_refundable, reference, refundable, refunded,
refunds, return_uri, reversed, reversed_at, reversible, schedule,
source_of_fund, status, terminal, transaction, transaction_fees, voided
```

### Aegaeon (2014-07-27) - 55 fields
```
acquirer_reference_number, amount, approval_code, authorization_type,
authorize_uri, authorized, authorized_amount, branch, can_perform_void,
capturable, capture, captured, captured_amount, captured_at, card, created,
currency, customer, description, device, disputable, dispute, expired,
expired_at, expires_at, failure_code, failure_message, funding_amount,
funding_currency, id, ip, link, linked_account, livemode, location, metadata,
object, offline, offsite, partially_refundable, reference, refundable,
refunded, refunds, return_uri, reversed, reversed_at, reversible, schedule,
source_of_fund, status, terminal, transaction, transaction_fees, voided
```

---

## Key Differences Between Versions

### Fields ADDED in Deimos (2019-05-29)
- `created_at` (replaces `created`)
- `authorized_at`
- `fee`, `fee_vat`
- `interest`, `interest_vat`
- `merchant_advice`
- `multi_capture`
- `net`
- `refunded_amount` (replaces `refunded`)

### Fields REMOVED in Deimos (2019-05-29)
- `created` (replaced by `created_at`)
- `reference`
- `refunded` (replaced by `refunded_amount`)
- `offline`
- `offsite`
- `source_of_fund`

### Fields ADDED in Cordelia (2017-11-02)
- `source` (replaces `offsite`/`offline`/`source_of_fund`)
- `zero_interest_installments`
- `platform_fee`

### Fields in Bestla/Aegaeon but NOT in newer versions
- `offline`
- `offsite`
- `source_of_fund`
- `reference`
- `captured` (boolean, in Aegaeon only)
- `captured_at` (in Aegaeon only)

---

## Verified Error Codes

### Tested and Confirmed:
| Error Code | HTTP Status | Trigger | Actual Message |
|------------|-------------|---------|----------------|
| `authentication_failure` | 401 | Invalid API key | "authentication failed" |
| `not_found` | 404 | Invalid charge/token ID | "charge {id} was not found" |
| `bad_request` | 400 | Missing required params | "either source, card or customer parameter must be supplied" |

### Payment Failure Codes (Tested via 3DS flow):
| Failure Code | Test Card | Actual Message |
|-------------|-----------|----------------|
| `insufficient_fund` | 4111111111140011 | "insufficient funds in the account or the card has reached the credit limit" |
| `stolen_or_lost_card` | 4111111111130012 | "card is stolen or lost" |
| `failed_processing` | 4111111111120013 | "failed processing" |
| `payment_rejected` | 4111111111110014 | "payment rejected" |
| `failed_fraud_check` | 4111111111190016 | "failed fraud check" |
| `invalid_account_number` | 4111111111180017 | "the account number is invalid" |

### From Official Docs (https://docs.omise.co/charges-api):
| Failure Code | Description |
|-------------|-------------|
| `confirmed_amount_mismatch` | Confirmed amount does not match expected amount |
| `timeout` | Payment request timed out |
| `invalid_account` | Alias for `invalid_account_number` |
| `insufficient_balance` | Account has insufficient balance |
| `payment_cancelled` | Customer cancelled the payment |
| `expired_card` | Card has expired |

### Additional Fields from Official Docs:
| Field | Type | Description |
|-------|------|-------------|
| `three_ds_info` | object | 3DS authentication details |
| `authenticated_by` | string | Authentication method (PASSKEY or 3DS) |
| `missing_3ds_fields` | array | Array of missing 3DS fields |
| `merchant_advice_code` | string | Numerical merchant advice code |
| `unmanaged_payment` | object | Unmanaged payment information |
| `ref_id` | string | Idempotency reference ID |

### CORRECTIONS from previous documentation:
- ❌ `missing_card` - Does NOT exist. Returns `bad_request` instead.
- ❌ `invalid_card_token` - Does NOT exist for invalid token. Returns `not_found` instead.
- ❌ `expired_card` - Test card 4111111111170018 returns `payment_rejected`, NOT `expired_card`
- ❌ `invalid_security_code` - Test card 4111111111160019 returns SUCCESSFUL charge, no error

---

## Notes

1. Field names changed between versions:
   - `created` → `created_at` (Deimos)
   - `refunded` → `refunded_amount` (Deimos)

2. The `source` field replaced `offsite`, `offline`, and `source_of_fund` in Cordelia

3. Error codes are NOT version-specific - they are the same across all versions

4. Many fields appear in all versions due to backward compatibility (newer fields return null in older versions)
