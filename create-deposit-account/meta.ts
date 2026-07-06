import type { ApiMeta } from '../../../types/api';

const meta: ApiMeta = {
  slug: 'create-deposit-account',
  name: 'Create Deposit Account',
  category: 'Accounts',
  description: 'Open a new deposit account',
  method: 'POST',
  path: '/accounts',
  baseUrl: 'https://api.finxact.internal/v1',
  headers: [
    {
      name: 'Authorization',
      type: 'string',
      required: true,
      description: 'Bearer token with the accounts:write scope.',
      defaultValue: 'Bearer <YOUR_TOKEN>',
    },
    {
      name: 'Content-Type',
      type: 'string',
      required: true,
      defaultValue: 'application/json',
    },
  ],
  bodyFields: [
    {
      name: 'ownerId',
      type: 'string',
      required: true,
      description: 'Identifier of the party that owns the account.',
      defaultValue: 'org_8f2c4a1e9b',
    },
    {
      name: 'productType',
      type: 'select',
      required: true,
      description: 'The deposit product to open.',
      options: ['DDA', 'SAV', 'MMA', 'CD'],
      defaultValue: 'DDA',
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      options: ['USD', 'EUR', 'GBP', 'CAD'],
      defaultValue: 'USD',
    },
    {
      name: 'nickname',
      type: 'string',
      required: false,
      description: 'A friendly label for the account.',
      defaultValue: 'Operating Account',
    },
  ],
  codeSamples: {
    python: `import requests

url = "https://api.finxact.internal/v1/accounts"
headers = {
    "Authorization": "Bearer <YOUR_TOKEN>",
    "Content-Type": "application/json",
}
payload = {
    "ownerId": "org_8f2c4a1e9b",
    "productType": "DDA",
    "currency": "USD",
    "nickname": "Operating Account",
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
    javascript: `const response = await fetch(
  "https://api.finxact.internal/v1/accounts",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer <YOUR_TOKEN>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ownerId: "org_8f2c4a1e9b",
      productType: "DDA",
      currency: "USD",
      nickname: "Operating Account",
    }),
  }
);

const data = await response.json();
console.log(data);`,
    java: `import java.net.http.*;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
String body = """
    {
      "ownerId": "org_8f2c4a1e9b",
      "productType": "DDA",
      "currency": "USD",
      "nickname": "Operating Account"
    }
    """;

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.finxact.internal/v1/accounts"))
    .header("Authorization", "Bearer <YOUR_TOKEN>")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> response =
    client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    curl: `curl -X POST "https://api.finxact.internal/v1/accounts" \\
  -H "Authorization: Bearer <YOUR_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "ownerId": "org_8f2c4a1e9b",
    "productType": "DDA",
    "currency": "USD",
    "nickname": "Operating Account"
  }'`,
  },
  exampleResponse: `{
  "id": "acct_3d9b71f0c4",
  "ownerId": "org_8f2c4a1e9b",
  "productType": "DDA",
  "currency": "USD",
  "nickname": "Operating Account",
  "balance": {
    "available": 0,
    "ledger": 0
  },
  "status": "Open",
  "createdAt": "2026-06-22T14:11:02Z"
}`,
};

export default meta;
