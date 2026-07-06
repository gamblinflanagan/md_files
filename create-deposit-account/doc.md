# Create Deposit Account

Open a new **deposit account** for an existing party. Deposit accounts are the
core ledgered containers used for holding balances, posting transactions, and
running disbursement flows.

---

## Endpoint

`POST /accounts`

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
