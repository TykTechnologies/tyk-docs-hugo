---
date: 2017-03-23T12:56:30Z
title: Session Object
menu:
  main:
    parent: "Key Concepts"
weight: 80 
aliases:
  - /concepts/session-meta-data/
---

In Tyk, all identities are mapped to a session object. Identities can be in the form of Bearer Tokens, HMAC Keys, JSON Web Tokens, OpenID Connect identities and Basic Auth users.

You should think about a session object as the metadata associated with a user, or the identity trying to gain access to your services.

In Tyk, a session object encapsulates the following details for any given identity:

*   What rate limit to apply
*   What quota to apply
*   What Access Control List to apply
*   What policy ID to use to override the above (if set)
*   When the session holder's access expires

Tyk also allows some additional metadata for a session object which is valuable for transformation or upstream identification purposes:

*   Metadata (a string key/value map that can hold any data)
*   Alias (a human-readable name for the identity)

{{< note success >}}
**Note**  

Expiry is not the same as invalidation, in Tyk, a session object will be "expired" but will still be in the database in order to inform the session owner that their token has expired and they should renew, if the token was invalidated (deleted after the expiry period), then the user would simply be denied access and their token would be invalid. This is important for developers that have (but shouldn't) hard-coded their token into their app so it is hard to change.
{{< /note >}}


#### Where are session objects stored?

Session objects are stored in Redis, not in MongoDB or in the Gateway itself. Session objects are stored as a token string / JSON object key/value pair in the Redis DB.

By default, the token itself is hashed and therefore **obfuscated**, this means using the Alias is important to identify token data in analytics and logs.

#### Where can I get more information?

A session object is just a JSON object. For more details of each parameter in the session object, see [Tyk Token Session Object Details]({{< ref "tyk-apis/tyk-gateway-api/token-session-object-details" >}}).
