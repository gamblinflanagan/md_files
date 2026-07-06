import type { ApiMeta } from '../../../types/api';

const meta: ApiMeta = {
  slug: 'create-organization',
  name: 'Create Organization',
  category: 'Parties',
  description: 'Register a new organization party',
  method: 'POST',
  path: '/parties/orgs',
  baseUrl: 'https://api.finxact.internal/v1',
  headers: [
    {
      name: 'Authorization',
      type: 'string',
      required: true,
      description: 'Bearer token with the parties:write scope.',
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
      name: 'legalName',
      type: 'string',
      required: true,
      description: 'Registered legal name of the organization.',
      defaultValue: 'Acme Insurance Corp',
    },
    {
      name: 'taxIdType',
      type: 'select',
      required: true,
      options: ['EIN', 'SSN', 'ITIN'],
      defaultValue: 'EIN',
    },
    {
      name: 'taxId',
      type: 'string',
      required: true,
      description: 'Tax identifier matching the selected type.',
      defaultValue: '12-3456789',
    },
    {
      name: 'orgType',
      type: 'select',
      required: true,
      options: ['Corporation', 'LLC', 'Partnership', 'NonProfit'],
      defaultValue: 'Corporation',
    },
    {
      name: 'status',
      type: 'select',
      required: false,
      options: ['Active', 'Inactive', 'Pending'],
      defaultValue: 'Active',
    },
  ],
  codeSamples: {
    python: `import requests

url = "https://api.finxact.internal/v1/parties/orgs"
headers = {
    "Authorization": "Bearer <YOUR_TOKEN>",
    "Content-Type": "application/json",
}
payload = {
    "legalName": "Acme Insurance Corp",
    "taxIdType": "EIN",
    "taxId": "12-3456789",
    "orgType": "Corporation",
    "status": "Active",
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
    javascript: `const response = await fetch(
  "https://api.finxact.internal/v1/parties/orgs",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer <YOUR_TOKEN>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      legalName: "Acme Insurance Corp",
      taxIdType: "EIN",
      taxId: "12-3456789",
      orgType: "Corporation",
      status: "Active",
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
      "legalName": "Acme Insurance Corp",
      "taxIdType": "EIN",
      "taxId": "12-3456789",
      "orgType": "Corporation",
      "status": "Active"
    }
    """;

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.finxact.internal/v1/parties/orgs"))
    .header("Authorization", "Bearer <YOUR_TOKEN>")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> response =
    client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
    curl: `curl -X POST "https://api.finxact.internal/v1/parties/orgs" \\
  -H "Authorization: Bearer <YOUR_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "legalName": "Acme Insurance Corp",
    "taxIdType": "EIN",
    "taxId": "12-3456789",
    "orgType": "Corporation",
    "status": "Active"
  }'`,
  },
  exampleResponse: `{
  "id": "org_8f2c4a1e9b",
  "legalName": "Acme Insurance Corp",
  "taxIdType": "EIN",
  "taxId": "12-3456789",
  "orgType": "Corporation",
  "status": "Active",
  "createdAt": "2026-06-22T14:08:31Z",
  "updatedAt": "2026-06-22T14:08:31Z"
}`,
};

export default meta;
