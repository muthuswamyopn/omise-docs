# Verified Omise Charge API Data

**Verified on:** 2026-10-29
**API Key:** skey_test_63mhuytgr8d72dozrf4 (test mode)
**Method:** Direct API calls with Omise-Version header

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

### CORRECTIONS from previous documentation:
- ❌ `missing_card` - Does NOT exist. Returns `bad_request` instead.
- ❌ `invalid_card_token` - Does NOT exist for invalid token. Returns `not_found` instead.

---

## Notes

1. Field names changed between versions:
   - `created` → `created_at` (Deimos)
   - `refunded` → `refunded_amount` (Deimos)

2. The `source` field replaced `offsite`, `offline`, and `source_of_fund` in Cordelia

3. Error codes are NOT version-specific - they are the same across all versions

4. Many fields appear in all versions due to backward compatibility (newer fields return null in older versions)
