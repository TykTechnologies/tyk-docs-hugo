---
date: 2017-03-24T16:52:36Z
title: Integrate with OIDC
menu:
  main:
    parent: "API Authentication Mode"
weight: 0
---

Tyk comes with support for OpenID Connect (OIDC) Identity Tokens provided by any standards compliant OIDC provider.

### The OIDC Flow:

1.  User requests access to resource via a supported OIDC Provider (e.g. Google).
2.  User logs into resource provider and grants scope access to their data.
3.  Identity Provider generates OAuth token set and OIDC ID Token. ID Token is signed by provider with their public key.
4.  User's client utilises OIDC ID Token as access token for an API managed by Tyk Gateway.
5.  Tyk Gateway validates OIDC ID Token signature.
6.  Tyk Gateway checks the IDP is a recognised IDP (registered as approved).
7.  Tyk verifies the client ID as one that is trusted and pre-registered with the Tyk Gateway.
8.  If the client ID is valid, Tyk applies the policy ID matched with this client to the user session.
9.  Tyk then validates the users session according to the quotas, rate limits and access rules for the matching policy for **either** the bearer of the token across all clients they use from this IDP **or** validates the session on a per client / per identity basis, e.g. User Alice will have different Access Rules depending on whether they are using a mobile client or a web client.

With this flow, Tyk does not need to be aware of the user or the token in advance, it only needs to know about the approved IDPs, approved ClientIDs within those IDPs and which Policy to apply to those Client IDs.

### Auth0 example flow

[Worked Example: API with OpenIDC Using Auth0]({{< ref "advanced-configuration/integrate/api-auth-mode/oidc-auth0-example/" >}})

{{< img src="/img/diagrams/diagram_docs_openID-connect.png" alt="OpenID Connect example flow" >}}

#### Behaviour - Internal Tokens

When an OIDC token is processed, Tyk generates an internal representation of the bearer, this ID is a hash of the organisation and user-id provided by the IDP for this user. Tyk uses this internal ID to hang policy rules off of during the lifetime of the users usage of the API.

It is useful for the downstream service to be able to query this data somehow in order to manage access (e.g. to invalidate the token at some point). To make this possible, Tyk adds the internal Token ID to the meta-data of the session object.

It is possible to inject this as a header into the request moving upstream to the underlying service using header injection and invoking the reserved metadata field: `$tyk_meta.TykJWTSessionID`.

### Aliases

In order to make OIDC Access tokens meaningful in analytics data, Tyk will also set an Alias for the internal token so the user can be easily identified in analytics. The OIDC Alias will always be the `ClientID + User ID` provided by the IDP. This can then be queried separately.

### Setting up OIDC

To set up an API Definition to use OIDC, add the following block to the definition, and ensure no other access methods are enabled:

```{.copyWrapper}
"use_openid": true,
"openid_options": {
  "providers": [
    {
      "issuer": "accounts.google.com",
      "client_ids": {
        "MTIzNDU2Nzc4OQ==": "5654566b30c55e3904000003"
      }
    }
  ],
    "segregate_by_client": false
}
```

*   `use_openid`: Set to true to enable the OpenID Connect check.
*   `openid_options.providers`: A list of authorised providers and their client IDs/Matched Policies.
*   `openid_options.providers.client_ids`: The list of client IDs and policy IDs to apply to users thereof. **Note:** Client IDs are Base64 encoded, so the map is `base64(clientid):policy_id` .When a valid user appears from a matching IDP/Client ID, the policy listed in this entry will be applied to their token across OIDC ID Tokens.
*   `openid_options.segregate_by_client`: Enable this to have the policy applied to the combination of the User ID AND the Client ID. For example:
    *   **If disabled**: When Alice uses the mobile app to log into the API, Tyk applies the same rate limit and access rules as if she had logged in via the web app or the desktop client.
    *   **If enabled**: When Alice uses the mobile app to log into the API, Tyk applies different rate limit and access rules than if she had logged in via the web app or the desktop client. In fact, each client and user combination will have its **own** internal representation.


#### JWT scope to policy mapping support

{{< note success >}}
**Note**: 

This feature is available starting from v2.9
{{< /note >}}

Many times companies define the user's authorisation rules in a central place such as an authorisation server or some central identity provider (IdP). As such you would want to be able to enforce these rules using your API gateway. 
This feature enables you to onboard those rights into your Tyk Gateway and enforce them on the APIs you expose with Tyk by configuring the gateway itself. The identity provider does not need to know Tyk at all.
As always, Tyk does it in the standard way, using *scopes* claim but you can set it to use any claim you want. 
In the API definition you define a map of a scope (from the JWT claim) to one or more policies in Tyk and your Tyk Gateway would know to apply those policies to the key when the API is called.
This feature works with any generic JWT you would choose to create or with OIDC JWT tokens.

To enable this feature you will need to add the following fields in your API:
```{.copyWrapper}
  "jwt_scope_to_policy_mapping": {
    "admin": "59672779fa4387000129507d",
    "developer": "53222349fa4387004324324e"
  },
  "jwt_scope_claim_name": "our_scope"
}
```
Here we have set:

* `jwt_scope_to_policy_mapping` provides a mapping of scopes (read from claim) to an actual policy ID. In this example we specify that scope "admin" will apply policy `"59672779fa4387000129507d"` to a key.
* `jwt_scope_claim_name` identifies the JWT claim name which contains scopes. This API Spec field is optional with default value `"scope"`. This claim value could be any of the following:
  - a string with space delimited list of values (by standard)
  - a slice of strings
  - a string with space delimited list of values inside a nested key. In this case, provide `"jwt_scope_claim_name"` in dot notation. For eg. `"scope1.scope2"`, `"scope2"` will be having the list of values nested inside `"scope1"`
  - a slice of strings inside a nested key. In this case, provide `"jwt_scope_claim_name"` in dot notation. For eg. `"scope1.scope2"`, `"scope2"` will be having a slice of strings nested inside `"scope1"`

{{< note success >}}
**Note**  

Several scopes in JWT claim will lead to have several policies applied to a key. In this case all policies should have `"per_api"` set to `true` and shouldn't have the same `API ID` in access rights. I.e. if claim with scopes contains value `"admin developer"` then two policies `"59672779fa4387000129507d"` and `"53222349fa4387004324324e"` will be applied to a key (with using our example config above).
{{< /note >}}



#### Setting JWT Scope Claims with the Dashboard

You can also map your JWT scope to your policies from the **API Designer**.

1. Create a new API or edit an existing API that has the **Authentication mode** set to **JSON Web Token (JWT)**.
2. In the **Core Settings** tab, under **Default Policy** choose a default policy for your JWT as explained in [step 4](https://tyk.io/docs/basic-config-and-security/security/authentication-authorization/json-web-tokens/#step-4-set-a-default-policy) above. This is required when using scopes to enforce a policy.

{{< img src="/img/dashboard/system-management/jwt_default_policy.png" alt="Default JWT Policy" >}}

1. At the bottom of the **Core Settings** tab, select **Use Scope Claim**.

{{< img src="/img/2.10/jwt_scope_claim.png" alt="Use Scope Claim" >}}

2. Enter a **Scope Name** for your scope. For example "admin" in the above example.
3. Enter a **Claim Name** for your scope. This is the equivalent to setting `jwt_scope_claim_name` above.
4. Select an available policy from the **Policies** drop-down list. This is the equivalent to setting `jwt_scope_to_policy_mapping` above.
5. Click add to save the scope claim.
6. Repeat this process for all the scope claims you want to add to the API.
7. Click **Update** to save the new settings for your API.
