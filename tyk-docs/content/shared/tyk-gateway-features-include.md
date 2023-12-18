---
---
Tyk is an open source Enterprise API Gateway, supporting REST, GraphQL, TCP and gRPC protocols.

Tyk Gateway is provided ‘Batteries-included’, with no feature lockout. Enabling your organisation to control who accesses your APIs, when they access, and how they access it.

Tyk Technologies uses the same API Gateway for all it’s applications. Protecting, securing, and processing APIs for thousands of organisations and businesses around the world. Ideal for Open Banking, building software in the clouds as well as exposing APIs to teams, partners & consumers.

Built from the ground up to be the fastest API gateway on the planet. It does not depend on a legacy proxy underneath. It has no 3rd party dependencies aside from Redis for distributed rate-limiting and token storage. Tyk Gateway can also be deployed as part of a larger Full Lifecycle API Management platform Tyk Self-Managed which also includes Management Control Plane, Dashboard GUI and Developer Portal.

{{< img src="/img/diagrams/gateway4.png" alt="Tyk Open Source Gateway features" >}}

## Open Source API Gateway Features

**Use any protocol:** REST, SOAP, GraphQL, gRPC, and TCP.

**Industry Standard Authentication**: OIDC, JWT, bearer Tokens, Basic Auth, Client Certificates and more.

**Open API Standards**: Import your Swagger and OAS2/3 documents to scaffold APIs in Tyk.

**Ultra performant:** Low latency, and thousands of rps with just a single CPU, horizontally and vertically scalable.

**Content mediation**: Transform all the things, from request or response headers to converting between SOAP and GraphQL. 

**Extensible Plugin Architecture**: Customise Tyk’s middleware chain by writing plugins in your language of choice - from Python to Javascript to Go, or any language which supports gRPC.


**Rate Limiting & Quotas:** Protect your upstreams from becoming overloaded and/or apply limits for each consumer. 

**API Versioning** - API Versions can be easily set and deprecated at a specific time and date.

**Granular Access Control** - Grant access to one or more APIs on a per version and operation basis.

**Blocklist/Allowlist/Ignored endpoint access** - Enforce strict security models on a version-by-version basis to your access points.

**Analytics logging** - Record detailed usage data on who is using your API's (raw data only)

**CORS** - Enable [CORS](https://tyk.io/docs/tyk-apis/tyk-gateway-api/api-definition-objects/cors/) for certain APIs so users can make browser-based requests

**Webhooks** - Trigger webhooks against events such as Quota Violations and Authentication failures

**IP AllowListing** - Block access to non-trusted IP addresses for more secure interactions

**Hitless reloads** - Tyk configurations can be altered dynamically and the service restarted without affecting any active request

**Kubernetes native declarative API:** using Open Source [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) (more info in OSS section)

_And everything else you expect from a Cloud Native API Gateway_