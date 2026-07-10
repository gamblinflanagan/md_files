# Create Organization

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
Authorization: Bearer ***
```

## Request body

| Field       | Type   | Required | Description                                                      |
| ----------- | ------ | -------- | ---------------------------------------------------------------- |
| `legalName` | string | yes      | Full registered legal name of the organization.                  |
| `owner`     | string | yes      | Current owner of the organization. Letters `A-Z` and `a-z` only. |
| `taxIdType` | string | yes      | Tax identifier type. One of `EIN`, `SSN`, `ITIN`.                |
| `taxId`     | string | yes      | The tax identifier value, formatted per `taxIdType`.             |
| `orgType`   | string | yes      | Legal structure: `Corporation`, `LLC`, `Partnership`.            |
| `status`    | string | no       | Initial status. Defaults to `Active`.                            |

### Example request body

```json
{
  "legalName": "Acme Insurance Corp",
  "owner": "JaneDoe",
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

1. The `owner` field is required and must contain only upper- and lower-case letters (`^[A-Za-z]+$`).
2. The `taxId` must be unique across all organizations in a given tenant.
3. Newly created organizations can immediately be referenced by account
   onboarding endpoints.
4. Status transitions are audited and surfaced in the activity log.

---

For onboarding individuals instead of organizations, see **Create Person**.
