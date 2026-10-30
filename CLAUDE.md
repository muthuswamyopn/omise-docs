# Doc Agent Project Context

---

## CRITICAL RULES - READ FIRST

### 1. Deployment
**Push to GitHub to deploy. DO NOT use rsync.**
```bash
git add -A && git commit -m "message" && git push origin main
```
Check deployment status: `gh run list --limit 1`

### 2. Git Commits
**NEVER include Co-Authored-By: Claude in commits.**
Just use a plain commit message without any co-author line.

### 3. Anonymization
- IPs: Use `xxx.xxx.xxx.xxx`
- Test IDs: Use pattern `chrg_test_no1t4tnemucod0e51mo` (reads "omise documentation" backwards)
- API keys: Use `skey_test_...` pattern

---

## STANDING INSTRUCTION: ALWAYS VERIFY

**NEVER document API data without verifying against official sources first.**

### Source of Truth
- **For API (endpoints, fields, types, errors):** Official API schema (OpenAPI/Swagger spec) is the definitive source
- **For guides and tutorials:** Official docs.omise.co documentation

### Before documenting, ALWAYS verify:

1. **Error codes** - Verify exact codes, HTTP status, messages from official schema
2. **Field names and types** - Verify from official API schema, not assumptions
3. **API responses** - Verify actual response structure from schema for each API version
4. **Payment methods** - Verify availability, limits, and supported features
5. **Endpoints** - Verify parameters, required fields, and version differences from schema

### Verification process:
1. Fetch official API schema for the version being documented
2. Cross-reference with actual API responses if possible
3. Document ONLY verified information
4. Mark any assumptions clearly as "UNVERIFIED"

### DO NOT:
- Assume data in codebase files (like `apiVersions.ts`) is correct without verification
- Make up version assignments for when features were introduced
- Copy error codes or fields without checking official schema

---

## Project Overview
Documentation generation platform that auto-generates API docs from multiple sources (codebase, Jira, Slack). Python CLI tool paired with a Next.js documentation website.

## Directory Structure
```
docagent/
├── src/                          # Python agent code
│   ├── agent.py                  # Main orchestration agent
│   ├── cli.py                    # Command-line interface
│   └── tools/                    # Integration tools
│       ├── codebase.py           # Code analysis
│       ├── jira_tools.py         # Jira integration
│       └── slack_tools.py        # Slack integration
├── stripe-docs/                  # Next.js documentation website
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── charges/page.tsx      # Charges API docs (interactive)
│   │   ├── components/Sidebar.tsx
│   │   └── globals.css
│   ├── package.json
│   └── next.config.ts
├── output/                       # Generated documentation
│   ├── charge_api.md             # Main Charge API docs (Markdown)
│   ├── charge_api.mdx            # MDX version with JSX
│   ├── charge_api_full.mdx       # Full API guide
│   ├── introduction.mdx          # Getting started
│   ├── openapi.yaml              # OpenAPI specification
│   ├── mint.json                 # Mintlify config
│   └── api-reference/charges/    # Individual endpoint docs
│       ├── create.mdx
│       ├── list.mdx
│       ├── retrieve.mdx
│       ├── update.mdx
│       ├── capture.mdx
│       ├── reverse.mdx
│       └── expire.mdx
├── config/settings.yaml          # Agent configuration
├── templates/default.md          # Documentation template
├── tests/                        # Test suite
└── pyproject.toml                # Python project config
```

## Tech Stack
- **Backend**: Python 3.12+ with Anthropic Claude API
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Documentation**: Markdoc, MDX, OpenAPI YAML

## API Being Documented
**Omise Charge API** - Payment processing for Southeast Asia

### Endpoints
1. `POST /charges` - Create a charge
2. `GET /charges` - List charges
3. `GET /charges/search` - Search charges
4. `GET /charges/:id` - Retrieve charge
5. `PATCH /charges/:id` - Update charge
6. `POST /charges/:id/capture` - Capture authorized charge
7. `POST /charges/:id/reverse` - Void a charge
8. `POST /charges/:id/expire` - Expire a charge

### Charge Lifecycle
- Pending → Authorized → Captured → [Refunded/Disputed]
- Pending → Failed
- Pending → Expired
- Authorized → Reversed

## Current Status
Multi-page documentation website completed with individual pages for each endpoint.

### Website Features (stripe-docs/)
- Stripe-inspired design with sidebar navigation
- Interactive "Try It Out" API tester on each page
- Multi-language code examples (8 languages: cURL, Ruby, Python, Node.js, PHP, Go, Java, C#)
- Parameter editor with validation
- Response examples for each endpoint
- Method badges (GET, POST, PATCH) in sidebar
- Anonymized test IDs (chrg_test_no1t4tnemucod0e51mo pattern)
- Comprehensive error codes documentation

### Page Structure
- `/` - Home/Introduction
- `/charges` - Charges overview with object attributes
- `/charges/create` - POST /charges
- `/charges/retrieve` - GET /charges/:id
- `/charges/list` - GET /charges
- `/charges/update` - PATCH /charges/:id
- `/charges/capture` - POST /charges/:id/capture
- `/charges/reverse` - POST /charges/:id/reverse
- `/charges/expire` - POST /charges/:id/expire
- `/charges/mark-as-paid` - POST /charges/:id/mark_as_paid (test mode only)
- `/charges/mark-as-failed` - POST /charges/:id/mark_as_failed (test mode only)
- `/charges/errors` - Comprehensive error codes reference for Charges API

### Deployment
Live at: https://omise-doc-test.dnsmaster.lol
- Server: Linode (Alpine Linux, 172.233.83.61)
- Process Manager: PM2
- Web Server: nginx with SSL (Let's Encrypt)

### Error Codes Documented
Authentication & Resource Errors:
- `authentication_failure` - Invalid or missing API key
- `not_found` - Resource not found
- `invalid_card` - Invalid card information
- `invalid_card_token` - Invalid or used card token
- `missing_card` - No payment method provided
- `invalid_source` - Invalid payment source
- `used_token` - Token already used

Charge Operation Errors:
- `bad_request` - Malformed request or invalid parameters
- `failed_capture` - Charge cannot be captured
- `failed_reverse` - Charge cannot be reversed
- `failed_expire` - Charge cannot be expired
- `processed_charge` - Charge already processed

Payment Failure Codes:
- `insufficient_fund` - Insufficient funds or credit limit reached
- `payment_rejected` - Payment rejected by provider
- `stolen_or_lost_card` - Card reported stolen/lost
- `failed_fraud_check` - Failed fraud detection
- `invalid_account_number` - Invalid card number
- `invalid_security_code` - Incorrect CVV/CVC
- `expired_card` - Card has expired
- `failed_processing` - General processing failure

## Key Files to Reference
- `output/charge_api.mdx` - Full API documentation content
- `output/openapi.yaml` - OpenAPI specification
- `stripe-docs/app/charges/page.tsx` - Current interactive page design
- `output/api-reference/charges/*.mdx` - Individual endpoint documentation

---

## CRITICAL: Payment Method Documentation Standards

**ALWAYS fetch and carefully analyze the official docs.omise.co page BEFORE creating any payment method page.**

### Pre-Implementation Checklist
1. **Fetch the official page** from docs.omise.co/{payment-method}
2. **List ALL sections** in order as they appear
3. **Identify ALL images/diagrams** - get exact CDN URLs
4. **Note exact wording** for key sections
5. **Map the complete flow** with all steps

### Required Page Elements

#### 1. Images & Diagrams (NEVER use placeholder SVGs)
- Use **actual CDN images** from `https://cdn.omise.co/assets/{payment-method}/`
- Payment flow screenshots with numbered annotations (❶❷❸❹❺)
- Sequence diagrams using **Mermaid.js** matching official structure

#### 2. Numbered Steps (with styled circles)
- Use purple circular badges (background: #635bff) with white numbers
- Match step numbers to image annotations exactly
- Include descriptive text for each step

#### 3. Section Structure (match official docs exactly)
- **How to enable** - Country, API version, activation steps
- **Payment flow** - Customer journey with screenshots
  - QR code scanning flow (if applicable)
  - Login/redirect flow (if applicable)
- **Complete payment flow** - Mermaid sequence diagram WITH step-by-step explanation
- **Implementation** - Code examples for source and charge creation
- **Completing the charge**
  - **Authorizing the charge** - Exact wording about authorize_uri and return_uri
  - Webhook notifications
  - Charge status verification
- **Voids and refunds** - Supported operations, time windows
- **Limits** - Min/max amounts, authorization window, refund window
- **Related content** - Links to related docs (NOT "Next steps")
- **FAQ** - Common questions

#### 4. Sequence Diagram Requirements
- Use Mermaid.js (component at `/app/components/MermaidDiagram.tsx`)
- Include ALL participants: Customer, omise.js, Merchant, api.omise.co
- Show ALL webhooks: charge.create, charge.complete
- Include redirect flows: authorize_uri, return_uri
- **Add step-by-step explanation** below the diagram with 10 numbered steps

#### 5. Content Accuracy
- **Authorizing the charge** must say: "Redirect the customer to the location specified in `authorize_uri` so they can authorize the charge."
- Include test mode simulation instructions
- Match exact terminology from official docs

### Quality Checklist (TRIPLE CHECK)
- [ ] All images load from CDN (not placeholder SVGs)
- [ ] Step numbers match image annotations
- [ ] All sections from official docs are present
- [ ] Sequence diagram has step-by-step explanation
- [ ] Section names match official docs
- [ ] "Related content" not "Next steps"
- [ ] Mermaid diagram includes all webhooks
- [ ] Code examples are complete and accurate
- [ ] Limits table has all values
- [ ] FAQ answers are accurate

### Common Mistakes to AVOID
1. ❌ Using abstract SVG boxes instead of real screenshots
2. ❌ Missing step-by-step explanation for sequence diagram
3. ❌ Wrong section names ("Next steps" instead of "Related content")
4. ❌ Missing webhooks in sequence diagram (charge.create, charge.complete)
5. ❌ Incomplete "Authorizing the charge" section
6. ❌ Missing numbered annotations matching images
7. ❌ Skipping content sections present in official docs
8. ❌ Not fetching official docs first to verify structure

---

## Omise API Versions

Four API versions exist. Set via `Omise-Version` header.

| Version | Date | Key Features |
|---------|------|--------------|
| **Deimos** | 2019-05-29 | Latest. `created_at`, `fee`, `net`, `multi_capture`, `three_ds_info` |
| **Cordelia** | 2017-11-02 | `source` object, `expire` endpoint, `platform_fee` |
| **Bestla** | 2015-11-17 | Disputes, refund tracking |
| **Aegaeon** | 2014-07-27 | Original version, has `captured` boolean |

### Key Field Differences

**Charges:**
| Field | Deimos | Cordelia | Bestla | Aegaeon |
|-------|--------|----------|--------|---------|
| `created_at` | ✓ | - (`created`) | - (`created`) | - (`created`) |
| `refunded_amount` | ✓ | - (`refunded`) | - (`refunded`) | - (`refunded`) |
| `captured` (boolean) | - | - | - | ✓ |
| `source` | ✓ | ✓ | - (`offsite`) | - (`offsite`) |
| `fee`, `fee_vat`, `net` | ✓ | - | - | - |

**How to check capture status:**
- Aegaeon: `captured` boolean
- Cordelia/Deimos: `captured_amount > 0`
- Bestla: `status === 'successful' && capturable === false`

**Balance:**
| Field | Deimos | Older Versions |
|-------|--------|----------------|
| `transferable` | ✓ | `available` |
| `reserve` | ✓ | `reserve_amount` |
| `created_at` | ✓ | - |

### Version-Specific YAML Files
- `public/openapi-deimos.yaml`
- `public/openapi-cordelia.yaml`
- `public/openapi-bestla.yaml`
- `public/openapi-aegaeon.yaml`

### Verified API Data
See `stripe-docs/VERIFIED_API_DATA.md` for actual API-verified field lists and error codes.

---

## Input/Output Field Classification

When documenting API fields, use these badges:
- **INPUT** (green): Can be set when creating
- **EDITABLE** (yellow): Can be updated via PATCH after creation
- **OUTPUT** (gray): Read-only, set by API

Example in code:
```tsx
{ name: 'amount', type: 'integer', desc: '...', io: 'input' }
{ name: 'description', type: 'string', desc: '...', io: 'editable' }
{ name: 'status', type: 'string', desc: '...', io: 'output' }
```
