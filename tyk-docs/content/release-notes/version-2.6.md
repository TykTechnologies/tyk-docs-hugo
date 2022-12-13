---
title: Tyk Gateway v2.6
menu:
  main:
    parent: "Release Notes"
weight: 11
---

# <a name="new"></a>New in this Release:

## <a name="gateway"></a>Tyk Gateway v2.6.0

### Organisation Level Rate Limiting

Endpoints Create organisation keys and 
Add/update organisation keys now allow you to set rate limits at an organisation level. You will need to add the following fields in your create/add/update key request:

* `"allowance"`
* `"rate"`

These are the number of allowed requests for the specified `per` value, and need to be set to the same value.

* `"per"` is the time period, in seconds.

So, if you want to restrict an organisation rate limit to 100 requests per second you will need to add the following to your request:
```
  "allowance": 100,
  "rate": 100,
  "per": 5
```

> **NOTE:** if you don't want to have organisation level rate limiting, set `"rate"` or `"per"` to zero, or don't add them to your request.

See the Keys section of the [Tyk Gateway REST API]({{< ref "tyk-gateway-api" >}}) Swagger doc for more details.

### Keys hashing improvements

Now it is possible to do more operations with key by hash (when we set `"hash_keys":` to `true` in `tyk.conf`):

- endpoints `POST /keys/create`, `POST /keys` and `POST /keys/{keyName}` also return field `"key_hash"` for future use
- endpoint `GET /keys` get all (or per API) key hashes. You can disable this endpoint by using the new `tyk.conf` setting `enable_hashed_keys_listing` (set to false by default)
- endpoint `GET /keys/{keyName}` was modified to be able to get a key by hash. You just need provide the key hash as a `keyName` 
and call it with the new optional query parameter `hashed=true`. So the new format is `GET /keys/{keyName}?hashed=true"`
- also, we already have the same optional parameter for endpoint `DELETE /keys/{keyName}?hashed=true`

### JSON schema validation

You can now use Tyk to verify user requests against a specified JSON schema and check that the data sent to your API by a consumer is in the right format. This means you can offload data validation from your application to us.

If it's not in the right format, then the request will be rejected. And even better, the response will be a meaningful error rather than just a 'computer says no'.

Schema validation is implemented as for the rest of our plugins, and its configuration should be added to `extended_paths` in the following format:
```
"validate_json": [{
  "method": "POST",
  "path": "me",
  "schema": {..schema..}, // JSON object
  "error_response_code": 422 // 422 default however can override.
}]
```

The schema must be a draft v4 JSON Schema spec, see http://json-schema.org/specification-links.html#draft-4 for details. An example schema can look like this:
```
{
  "title": "Person",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    }
  },
  "required": ["firstName", "lastName"]
}
```


### New endpoint to get list of tokens generated for provided OAuth-client

`GET /oauth/clients/{apiID}/{oauthClientId}/tokens`

This endpoint allows you to retrieve a list of all current tokens and their expiry date issued for a provided API ID and OAuth-client ID in the following format. New endpoint will work only for newly created tokens:
```
[
  {
    "code": "5a7d110be6355b0c071cc339327563cb45174ae387f52f87a80d2496",
    "expires": 1518158407
  },
  {
    "code": "5a7d110be6355b0c071cc33988884222b0cf436eba7979c6c51d6dbd",
    "expires": 1518158594
  },
  {
    "code": "5a7d110be6355b0c071cc33990bac8b5261041c5a7d585bff291fec4",
    "expires": 1518158638
  },
  {
    "code": "5a7d110be6355b0c071cc339a66afe75521f49388065a106ef45af54",
    "expires": 1518159792
  }
]
```

You can control how long you want to store expired tokens in this list using `oauth_token_expired_retain_period ` which specifies the retain period for expired tokens stored in Redis. The value is in seconds, and the default value is `0`. Using the default value means expired tokens are never removed from Redis.

### Creating OAuth clients with access to multiple APIs

When creating a client using `POST /oauth/clients/create`, the `api_id` is now optional - these changes make the endpoint more generic. If you provide the `api_id` it works the same as in previous releases. If you don't provide the `api_id` the request uses policy access rights and enumerates APIs from their setting in the newly created OAuth-client. 

At the moment this changes not reflected on Dashboard UI yet, as we going to do major OAuth improvements in 2.7

### Certificate public key pinning

Certificate pinning is a feature which allows you to allow public keys used to generate certificates, so you will be protected in case an upstream certificate is compromised.

Using Tyk you can allow one or multiple public keys per domain. Wildcard domains are also supported.

Public keys are stored inside the Tyk certificate storage, so you can use Certificate API to manage them.

You can define them globally, from the Tyk Gateway configuration file using the `security.pinned_public_keys` option, or via an API definition `pinned_public_keys` field, using the following format:
```
{
  "example.com": "<key-id>",
  "foo.com": "/path/to/pub.pem",
  "*.wild.com": "<key-id>,<key-id-2>"
}
```

For `key-id` you should set the ID returned after you upload the public key using the Certificate API. Additionally, you can just set path to public key, located on your server. You can specify multiple public keys by separating their IDs by a comma.

Note that only public keys in PEM format are supported.

If public keys are not provided by your upstream, you can extract them
by yourself using the following command:
> openssl s_client -connect the.host.name:443 | openssl x509 -pubkey -noout

If you already have a certificate, and just need to get its public key, you can do it using the following command:
> openssl x509 -pubkey -noout -in cert.pem

**Note:** Upstream certificates now also have wildcard domain support

### JQ transformations (experimental support)

> This feature is experimental and can be used only if you compile Tyk yourself own using `jq` tag: `go build --tags 'jq'`

If you work with JSON you are probably aware of the popular `jq` command line JSON processor. For more details, see here https://stedolan.github.io/jq/

Now you can use the full power of its queries and transformations to transform requests, responses, headers and even context variables.

We have added two new plugins: 

* `transform_jq` - for request transforms.
* `transform_jq_response` - for response transforms
 
Both have the same structure, similar to the rest of our plugins: 
`{ "path": "<path>", "method": "<method>", "filter": "<content>" }`

### Request Transforms
Inside a request transform you can use following variables: 
* `.body` - your current request body
* `._tyk_context` - Tyk context variables. You can use it to access request headers as well.

Your JQ request transform should return an object in the following format: 
`{ "body": <transformed-body>, "rewrite_headers": <set-or-add-headers>, "tyk_context": <set-or-add-context-vars> }`. 

`body` is required, while `rewrite_headers` and `tyk_context` are optional.


### Response Transforms 
Inside a response transform you can use following variables: 
* `.body` - your current response body
* `._tyk_context` - Tyk context variables. You can use it to access request headers as well.
* `._tyk_response_headers` - Access to response headers

Your JQ response transform should return an object in the following format: 
`{ "body": <transformed-body>, "rewrite_headers": <set-or-add-headers>}`. 

`body` is required, while `rewrite_headers` is optional.

### Example
```
"extended_paths": {
  "transform_jq": [{
    "path": "/post",
    "method": "POST",
    "filter": "{\"body\": (.body + {\"TRANSFORMED-REQUEST-BY-JQ\": true, path: ._tyk_context.path, user_agent: ._tyk_context.headers_User_Agent}), \"rewrite_headers\": {\"X-added-rewrite-headers\": \"test\"}, \"tyk_context\": {\"m2m_origin\": \"CSE3219/C9886\", \"deviceid\": .body.DEVICEID}}"
   }],
  "transform_jq_response": [{
    "path": "/post",
    "method": "POST",
    "filter": "{\"body\": (.body + {\"TRANSFORMED-RESPONSE-BY-JQ\": true, \"HEADERS-OF-RESPONSE\": ._tyk_response_headers}), \"rewrite_headers\": {\"JQ-Response-header\": .body.origin}}"
  }]
}
```


## <a name="dashboard"></a>Tyk Dashboard v1.6.0

### API categories

You can apply multiple categories to an API definition, and then filter by these categories on the API list page.

They might refer to the APIs general focus: 'weather', 'share prices'; geographic location 'APAC', 'EMEA'; or technical markers 'Dev', 'Test'. It's completely up to you.

From an API perspective, categories are stored inside API definition `name` field like this: "Api name #category1 #category2", e.g. categories just appended to the end of the name. 

Added new API `/api/apis/categories` to return list of all categories and belonging APIs.

### Raw API Definition mode

Now you can directly edit a raw API definition JSON object directly from the API Designer, by selecting either the **Raw API Definition** or the **API Designer** at the top of the API Designer screen. 

![Raw or Designer](img/dashboard/system-management/raw_or_designer_mode.png)

This feature comes especially handy if you need copy paste parts of one API to another, or if you need to access fields not yet exposed to the Dashboard UI.

### Certificate public key pinning

You can configure certificate pinning on the **Advanced** tab of the API Designer, using a similar method to how you specify upstream client certificates.

![Certificate Pinning](img/release-notes/certificate_pinning.png)

### JSON schema validation

Reflecting the Tyk Gateway changes, on the Dashboard we have added a new **Validate JSON** plugin, which you can specify per URL, and can set both a schema, and custom error code, if needed.

### Improved key hashing support

The Tyk Dashboard API reflects changes made in the v2.6.0 Gateway API, and now supports more operations with key by hash (when we have set `"hash_keys":` to ` true` in `tyk_analytics.conf`):

- endpoint `POST /keys/` also returns a new field `key_hash` per each key in the list
- endpoint `GET /apis/{apiId}/keys/{keyId}` supports query string parameter `hashed=true` to get the key info via hash
- endpoint `GET /apis/{apiId}/keys` returns keys hashes
- endpoint `DELETE /apis/{apiId}/keys?hashed=true` can delete a key by its hash, but its functionality is disabled by default, unless you set `enable_delete_key_by_hash` boolean option inside the Dashboard configuration file. 


### Key requests management API now supports OAuth

For this release we've improved our developer portal APIs to fully support an OAuth2.0 based workflow. Developers using your API will now be able to register OAuth clients and manage them.

This change is not yet supported by our built-in portal, but if you are using custom developer portals, you can start using this new functionality right away. Full UI support for built-in portal will be shipped with our next 2.7 release.

Developers can request access to an API protected with OAuth and get OAuth client credentials.

The endpoint `POST /api/portal/requests` now has an optional `"oauth_info"` field which identifies the OAuth key request.

Example of the OAuth key request:  
```
{
  "by_user": "5a3b2e7798b28f03a4b7b3f0",
  "date_created": "2018-01-15T04:49:20.992-04:00",
  "for_plan": "5a52dfce1c3b4802c10053c8",
  "version": "v2",
  "oauth_info": {
    "redirect_uri": "http://new1.com,http://new2.com"
  }
}
```

Where:

- `"by_user"` - contains the ID of portal developer who is requesting OAuth access
- `"for_plan"` - subscription ID
- `"version"` - is expected to have the value `"v2"`
- `"oauth_info"` - simple structure which contains a field with comma-separated list of redirect URI for OAuth flow

A new field `"oauth_info"` will be present in replies for endpoints `GET /api/portal/requests/{id}` and `GET /api/portal/requests`

When this kind of OAuth key request gets approved when using endpoint `PUT /api/portal/requests/approve/{id}` 
a new OAuth-client is generated for a developer specified in the specified `"by_user"` field.

Example of OAuth key request approval reply:
```
{
    "client_id": "203defa5162b42708c6bcafcfa28c9fb",
    "secret": "YjUxZDJjNmYtMzgwMy00YzllLWI2YzctYTUxODQ4ODYwNWQw",
    "policy_id": "5a52dfce1c3b4802c10053c8",
    "redirect_uri": "http://new1.com,http://new2.com"
}
```

Where:

- `"client_id"` and `"secret"` are OAuth-client credentials used to request the get token (they are to be kept in secret)
- `"policy_id"` - the subscription this OAuth-client provides access to
- `"redirect_uri"` - with comma-separated list of redirect URI for OAuth flow

Also, if you set email notifications in your portal, an email with the  OAuth-client credentials will be sent to the developer 
who made that OAuth key request.

There is also a change in the reply from the `GET /api/portal/developers` endpoint.The developer object will have new field - 
`"oauth_clients"` which will contain a mapping of subscription IDs to the list of OAuth clients that the developer requested and
was approved, i.e.:
```
"oauth_clients": {
  "5a52dfce1c3b4802c10053c8": [
    {
      "client_id": "203defa5162b42708c6bcafcfa28c9fb",
      "redirect_uri": "http://new1.com,http://new2.com",
      "secret": "YjUxZDJjNmYtMzgwMy00YzllLWI2YzctYTUxODQ4ODYwNWQw"
    }
  ]
},
```

### New endpoints to get tokens per OAuth client

These endpoints allow you to get a list of all current tokens issued for provided OAuth client ID:

- `GET /apis/oauth/{apiId}/{oauthClientId}/tokens`
- `GET /apis/oauth/{oauthClientId}/tokens` when the API ID is unknown or OAuth-client provides access to several APIs


### Renamed the response `_id` field to `id` in List Key Requests

We have renamed the response `_id` field when retrieving a list of key requests to `id`.

See [List Key Requests]({{< ref "tyk-apis/tyk-dashboard-api/manage-key-requests/#list-key-requests" >}}) for more details.


### Developers can request a password reset email

If a developer forgets their password, they can now request a password reset email from the Developer Portal Login screen.

![Request email reset](img/dashboard/portal-management/password_request.png)

See [Developer Profiles]({{< ref "tyk-developer-portal/tyk-portal-classic/developer-profiles#reset-developer-password" >}}) for more details.

### SSO API custom email support

Now you can set email address for users logging though the Dashboard SSO API, by adding an "Email" field to the JSON payload which you sent to `/admin/sso` endpoint. For example:
```
POST /admin/sso HTTP/1.1
Host: localhost:3000
admin-auth: 12345
    
{
  "ForSection": "dashboard",
  "Email": "user@example.com",
  "OrgID": "588b4f0bb275ff0001cc7471"
}
```

### Set Catalogue settings for each individual API 

Now you can override the global catalogue settings and specify settings per catalogue. 
The Catalogue object now has `config` field, with exactly same structure as Portal Config, except new `override` boolean field. 
If set, Catalogue settings will override global ones. 

At the moment the following options can be overriden: `Key request fields`, `Require key approval` and `Redirect on key request` (with `Redirect to` option as well).

### {{<fn>}}Blocklist{{</fn>}} IP Support

Tyk allows you to block IP Addresses, which is located in the **Advanced Options** tab in the **Endpoint Designer**.

![Blocklist Support](img/release-notes/blacklist_option.png)

## <a name="tib"></a>Tyk Identity Broker v0.4.0

With this release TIB joins the Tyk product line as a first class citizen and is now distributed via packages and [Docker image](https://hub.docker.com/r/tykio/tyk-identity-broker/).

### Support for SSO API email field
If IDP provides a user email, it should be passed to the Dashboard SSO API, and you should see it in the Dashboard UI.

### Improved support for local IDPs
If you run a local IDP, like Ping, with an untrusted SSL certificate, you can now turn off SSL verification by setting `SSLInsecureSkipVerify` to `true` in the TIB configuration file. 

### Added Redis TLS support
To enable set `BackEnd.UseSSL` and, optionally, `BackEnd.SSLInsecureSkipVerify`.

## <a name="tib"></a>Tyk Pump v0.5.2

### Redis TLS support
Added new `redis_use_ssl` and `redis_ssl_insecure_skip_verify` options.


## <a name="redis"></a> Redis TLS support

Many Redis hosting providers now support TLS and we're pleased to confirm that we do too.

Whether it's the open source API Gateway, or Dashboard, Pump, Sink and Tyk Identity Broker (TIB): you can now make secure connections to Redis from all Tyk products, as long as your provider allows it.

## <a name="mdcb"></a>MDCB v1.5.3

### Redis TLS support
Added new `redis_use_ssl` and `redis_ssl_insecure_skip_verify` options.

## <a name="upgrade"></a>Upgrading all new Components

For details on upgrading all Tyk versions, see [Upgrading Tyk](https://tyk.io/docs/upgrading-tyk/).

## <a name="new"></a>Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)