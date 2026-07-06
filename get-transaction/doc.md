# Get Transaction

Retrieve a single **transaction** by its identifier. Transactions are immutable,
ledgered records of money movement against an account.

---

## Endpoint

`GET /transactions/{id}`

## Authorization

Requires a bearer token with the `transactions:read` scope.

```
Authorization: Bearer <YOUR_TOKEN>
```

## Path parameters

| Parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| `id`      | string | yes      | The unique transaction identifier. |

## Transaction types

| Type     | Direction | Description                              |
| -------- | --------- | ---------------------------------------- |
| `Credit` | inbound   | Funds added to the account.              |
| `Debit`  | outbound  | Funds removed from the account.          |
| `Hold`   | reserved  | Authorization that reduces availability. |

## Status values

- `Pending` — created but not yet settled.
- `Posted` — settled and reflected in the ledger balance.
- `Reversed` — a posted transaction that was later reversed.

### Example response

```json
{
  "id": "txn_a1b2c3d4e5",
  "type": "Credit",
  "amount": 25000,
  "status": "Posted"
}
```

## Response codes

- **200 OK** — the transaction was found and returned.
- **404 Not Found** — no transaction matches the supplied `id`.

## Notes

> Amounts are expressed in the account's minor currency units (cents for `USD`).
> A value of `25000` represents **$250.00**.

---

To open an account that can receive transactions, see **Create Deposit Account**.
