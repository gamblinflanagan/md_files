# Create Deposit Account

Open a new **deposit account** for an existing party. Deposit accounts are the
core ledgered containers used for holding balances, posting transactions, and
running disbursement flows.

---

## Endpoint

`POST /accounts`# Create Organization

Register a new **organization party** in the platform. Organizations represent
companies, trusts, and other non-person legal entities that can hold accounts,
act as counterparties, and participate in disbursement flows.

> Organizations and people are both modeled as _parties_. Use this endpoint for
> any legal entity that is not an individual person.

---

## Endpoint

`POST /parties/orgs`

## Authorization

All requests must include a bearer token with the `parties:write` scope.

```
Authorization: Bearer <YOUR_TOKEN>
```

## Request body

| Field       | Type   | Required | Description                                           |
| ----------- | ------ | -------- | ----------------------------------------------------- |
| `legalName` | string | yes      | Full registered legal name of the organization.       |
| `taxIdType` | string | yes      | Tax identifier type. One of `EIN`, `SSN`, `ITIN`.     |
| `taxId`     | string | yes      | The tax identifier value, formatted per `taxIdType`.  |
| `orgType`   | string | yes      | Legal structure: `Corporation`, `LLC`, `Partnership`. |
| `status`    | string | no       | Initial status. Defaults to `Active`.                 |

### Example request body

```json
{
  "legalName": "Acme Insurance Corp",
  "taxIdType": "EIN",
  "taxId": "12-3456789",
  "orgType": "Corporation",
  "status": "Active"
}
```

## Response

Returns the created organization with a server-assigned `id` and timestamps.

- **201 Created** — the organization was created successfully.
- **400 Bad Request** — a required field is missing or malformed.
- **409 Conflict** — an organization with the same `taxId` already exists.

## Notes

1. The `taxId` must be unique across all organizations in a given tenant.
2. Newly created organizations can immediately be referenced by account
   onboarding endpoints.
3. Status transitions are audited and surfaced in the activity log.

---

For onboarding individuals instead of organizations, see **Create Person**.

## Authorization

Requires a bearer token with the `accounts:write` scope.

```
Authorization: Bearer <YOUR_TOKEN>
```

## Request body

| Field         | Type   | Required | Description                                   |
| ------------- | ------ | -------- | --------------------------------------------- |
| `ownerId`     | string | yes      | The party `id` that owns the account.         |
| `productType` | string | yes      | Account product. One of `DDA`, `SAV`, `LOAN`. |
| `currency`    | string | yes      | ISO 4217 currency code, e.g. `USD`.           |
| `nickname`    | string | no       | A human-friendly label for the account.       |

### Example request body

```json
{
  "ownerId": "org_8f2c4a1e9b",
  "productType": "DDA",
  "currency": "USD",
  "nickname": "Operating Account"
}
```

## Balances

Every account exposes two balance views:

- `available` — funds that can be spent right now.
- `ledger` — the settled balance including holds and pending items.

```
available <= ledger
```

## Response

- **201 Created** — the account was opened and is ready to transact.
- **404 Not Found** — the referenced `ownerId` does not exist.
- **422 Unprocessable Entity** — the product type is not enabled for the owner.

## Lifecycle

1. **Open** — account is active and can post transactions.
2. **Frozen** — account is temporarily blocked from debits.
3. **Closed** — account is permanently closed; balance must be zero.

---

To inspect activity on an account, see **Get Transaction**.
