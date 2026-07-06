import type { ApiMeta } from '../../../types/api';

const meta: ApiMeta = {
  slug: 'get-transaction',
  name: 'Get Transaction',
  category: 'Transactions',
  description: 'Retrieve a transaction by ID',
  method: 'GET',
  path: '/transactions/{id}',
  baseUrl: 'https://api.finxact.internal/v1',
  headers: [
    {
      name: 'Authorization',
      type: 'string',
      required: true,
      description: 'Bearer token with the transactions:read scope.',
      defaultValue: 'Bearer <YOUR_TOKEN>',
    },
  ],
  pathParams: [
    {
      name: 'id',
      type: 'string',
      required: true,
      description: 'The unique transaction identifier.',
      defaultValue: 'txn_a1b2c3d4e5',
    },
  ],
  codeSamples: {
    python: `import requests

txn_id = "txn_a1b2c3d4e5"
url = f"https://api.finxact.internal/v1/transactions/{txn_id}"
headers = {"Authorization": "Bearer <YOUR_TOKEN>"}

response = requests.get(url, headers=headers)
print(response.json())`,
    javascript: `const txnId = "txn_a1b2c3d4e5";
const response = await fetch(
  \`https://api.finxact.internal/v1/transactions/\${txnId}\`,
  {
    headers: {
      Authorization: "Bearer <YOUR_TOKEN>",
    },
  }
);

const data = await response.json();
console.log(data);`,
    java: `import java.net.http.*;
import java.net.URI;

String txnId = "txn_a1b2c3d4e5";
HttpClient client = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(
        "https://api.finxact.internal/v1/transactions/" + txnId))
    .header("Authorization", "Bearer <YOUR_TOKEN>")
    .GET()
    .build();

HttpResponse<String> response =
    client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    curl: `curl "https://api.finxact.internal/v1/transactions/txn_a1b2c3d4e5" \\
  -H "Authorization: Bearer <YOUR_TOKEN>"`,
  },
  exampleResponse: `{
  "id": "txn_a1b2c3d4e5",
  "accountId": "acct_3d9b71f0c4",
  "type": "Credit",
  "amount": 25000,
  "currency": "USD",
  "status": "Posted",
  "description": "Claim disbursement to Premier Auto Body",
  "postedAt": "2026-06-22T15:42:09Z",
  "metadata": {
    "claimId": "clm_77f1a0",
    "channel": "ACH"
  }
}`,
};

export default meta;
