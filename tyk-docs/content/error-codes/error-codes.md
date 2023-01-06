---
title: "Error Codes (WIP)"
date: 2023-1-6
tags: [""]
description: "Response codes that the Tyk Gateway (v4.3.0) returns via an API"
weight: 0
draft: true
---

Different error codes will be in seperate tables (i.e. 400 vs 401). The tables will provide the text that comes with the error code, and the description of the error.

## Error Code 400:

| Text                                                                                    | Description                          |
| :-------------------------------------------------------------------------------------- | :----------------------------------- |
| Access to this API has been disallowed                                                  | Trying to access an unauthorized API |
| API is not OAuth2                                                                       |
| Attempted access with malformed header, values not in basic auth format                 |
| Attempted access with malformed header, auth data not encoded correctly                 |
| Authorization Field Missing                                                             |
| Batch request creation failed, request structure malformed                              |
| Batch request malformed                                                                 |
| Bearer token malformed                                                                  |
| Body do not contain password                                                            |
| Body do not contain username                                                            |
| Cannot parse form. Form malformed                                                       |
| Couldn’t decode instruction (policyUpdateHandler)                                       |
| Couldn’t decode OAS object                                                              |
| Creating key without policy                                                             |
| ErrAPINotMigrated (oasEndpoint)                                                         |
| ErrImportWithTykExtension                                                               |
| Error parsing form. Form malformed                                                      |
| ErrPayloadWithoutTykExtension                                                           |
| Extractor Errors                                                                        |
| Failed to create key, keys must have at least one Access Rights record set              |
| Failed to create key, keys must have at least one Access Rights record set.             |
| Failed to remove the key                                                                |
| Health checks are not enabled for this node                                             |
| Key cannot be used without a certificate                                                |
| Key must be used with an existent certificate                                           |
| Missing parameter api_id                                                                |
| Must specify an apiID to delete                                                         |
| Must specify an apiID to patch                                                          |
| Must specify an apiID to update                                                         |
| OAuth client doesn’t exist                                                              |
| Oauth is not enabled for this API                                                       |
| oAuthClientIdEmpty                                                                      |
| oAuthTokenEmpty                                                                         |
| Policy access rights doesn’t contain API this OAuth client belongs to                   |
| POST method with malformed data for Batch request                                       |
| Request APIID does not match that in Definition! For Update operations these must match |
| Request field is missing                                                                |
| Request ID does not match that in policy! For Update operations these must match        |
| Request malformed                                                                       |
| Request with empty authorization header (JWT session)                                   |
| Spec field is missing                                                                   |
| Spec not valid, skipped!                                                                |
| testGRPCIgnore - no header                                                              |
| The provided request is empty (graphql playground)                                      |
| TBD (To be determined)                                                                  |

## Error Code 401:

| Text                                                                                                     | Description |
| :------------------------------------------------------------------------------------------------------- | :---------- |
| Authorization Field Missing                                                                              |
| Header missing (JS Middleware)                                                                           |
| Not authorised (JS middleware)                                                                           |
| oauthClientIdEmpty                                                                                       |
| oauthClientSecretEmpty                                                                                   |
| Request signature verification failed (auth keys: could be empty signature header, or validation failed) |
| Wrong Password                                                                                           |
| TBD (To be determined)                                                                                   |

## Error Code 403:

| Text                                                                                                                                               | Description                                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Access from this IP has been disallowed (blacklist or whitelist IP’s)                                                                              |
| Access to this API has been disallowed                                                                                                             |
| Access to this API has been disallowed                                                                                                             |
| Access to this resource has been disallowed (Granular Access Rights)                                                                               |
| Accessing to sub-version with base API listen path should require base API key (version checking)                                                  |
| Attempted access with non-existent cert. (Authentication cert not found)                                                                           |
| Attempted administrative access with invalid or missing key!                                                                                       |
| Attempted administrative access with invalid or missing key! (checking correct security credentials of the tyk API)                                |
| Certificate with SHA256 $CLIENTCERT not allowed (Multiple APIs with Mutual TLS on same domain)                                                     |
| Client authorize request in with invalid redirect URI                                                                                              |
| Client TLS certificate is required (Multiple APIs on same domain without certs)                                                                    |
| Depth limit exceeded (on an API level or Field Level)                                                                                              |
| emptySigHeader (signature validation with auth keys → fill in a signature)                                                                         |
| emptySigPath (Signature validation with auth keys → path for signature is empty)                                                                   |
| Failed with 403 after x requests over quota                                                                                                        | process request off thread with quota or process request live with rate limit or process request off thread with rate limit |
| Found an empty user ID in predefined base field claim user_id                                                                                      | request with valid JWT/RSA or signature/empty user_id/sub claim, or signature/no base field or no sub or no id claim        |
| GraphQL Depth Limit Exceeded                                                                                                                       |
| Invalid Token (Form Value Test for Value ExtractorHeader Source)                                                                                   |
| invalidSigHeader (signature validation with auth keys → have a valid signature)                                                                    |
| invalidSigPath (Signature validation with auth keys → path for signature is not valid)                                                             |
| Key not authorised                                                                                                                                 |                                                                                                                             |
| Key not authorised: Unexpected signing method                                                                                                      | invalid JWT signature, JWT access with non-existent key                                                                     |
| Key not authorised. OAuth client access was revoked                                                                                                |
| Key not authorised. oAuth client access was revoked (oAuth client deleted)                                                                         |
| Key not authorized: no matching policy                                                                                                             | request with invalid policy in JWT, or checking session and identity for valid key for openID                               |
| Login failure, Response was:                                                                                                                       |
| No matching policy found in scope claim (wrong scope in JWT request)                                                                               |
| Quota Exceeded                                                                                                                                     |
| Rejected paths not within whitelist                                                                                                                |
| Run Go-plugin auth failed (invalid token)                                                                                                          |
| This API version does not seem to exist                                                                                                            |
| This organisation access has been disabled, please contact your API administrator (orgSession.isInactive)                                          |
| This organisation quota has been exceed, please contact your API administrator (processing requests live)                                          |
| This organisation rate limit has been exceeded, please contact your API administrator                                                              |
| This organization access has been disabled or quota/rate limit is exceeded, please contact your API administrator (processing requests off thread) |
| Tls: bad certificate (no valid cert IDs exist in Certificate.ControlAPI)                                                                           |
| Unknown cert with custom domain                                                                                                                    |
| Unknown cert without domain                                                                                                                        |
| Version expired                                                                                                                                    |
| Version Information not found                                                                                                                      |
| Wrong key ID (when creating key with policy)                                                                                                       |
| TBD                                                                                                                                                |

## Error Code 404:

| Text                                                                 | Description                                                                                                                                                                                                         |
| :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Accessing a key that doesn’t exist or thats been deleted             |
| Accessing a nonexistent endpoint (HTTP request)                      |
| Accessing unknown OAuth clients                                      |
| API doesn’t exist                                                    | Checking if API exists when rotating OauthClient or If ApiSpec is nil                                                                                                                                               |
| API for this refresh token not found                                 | When invalidating Oauth refresh or If apiSpec is nil                                                                                                                                                                |
| API ID not found (when API ID doesnt exist in gw)                    |
| API not found                                                        | testing health check endpoint or accessing API after deletion                                                                                                                                                       |
| Bundle not found                                                     | No bundles within the gw                                                                                                                                                                                            |
| Certificate with given SHA256 fingerprint not found                  | If no certificates exist in the cert manager list                                                                                                                                                                   |
| Couldn't find organisation session in active API list                |
| Error getting oauth client                                           | Client id doesnt exist in storage                                                                                                                                                                                   |
| Hashed key listing is diabled in config (enable_hashed_keys_listing) | Get all keys is disabled by default                                                                                                                                                                                 |
| Key is not found(if the gw’s global session manager returns false)   |
| Key not found                                                        | Failed to update hashed key                                                                                                                                                                                         |
| No such organisation found in Active API list                        |
| Oauth client doesn’t exist                                           | Trying to get APIs for OAuth or client ID Client was not found                                                                                                                                                      |
| OAuth Client ID not found                                            | oAuth Client ID doesn’t exist in storage Failed to retrieve OAuth tokens or client details or deleting OAuth client or retrieve OAuth client list or report OAuth client list or failed to revoke OAuth client list |
| oAuthClientNotFound                                                  |
| Org not found                                                        | Could not retrieve record of org ID orFailed to delete org keys → spec for org is nil                                                                                                                               |
| Policy not found                                                     |
| There is no such key found                                           | when trying to delete a deleted key or a deleted hashed key                                                                                                                                                         |
| Version Does Not Exist                                               | Internal Http Handler by name or id does not exist                                                                                                                                                                  |
| TBD                                                                  |

## Error Code 405:

| Text                   | Description                                                     |
| :--------------------- | :-------------------------------------------------------------- |
| Malformed request body |                                                                 |
| Method not supported   | Attempting to add a method that is not supported by our system? |
| TBD                    |                                                                 |

## Error Code 429:

| Text                    | Description                                                                          |
| :---------------------- | :----------------------------------------------------------------------------------- |
| API Rate Limit Exceeded | Attempted too many API requests that exceeded the limit that has been put on the API |
| TBD                     |                                                                                      |

## Error Code 500:

| Text                                                                                                                                       | Description |
| :----------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| API: Invalid Proxy                                                                                                                         |             |
| API: MinTLS not match                                                                                                                      |             |
| Cache invalidation failed                                                                                                                  |             |
| Could not write key data                                                                                                                   |             |
| Creating key with bad policy                                                                                                               |             |
| Delete failed                                                                                                                              |             |
| Due to enabled service policy source, please use the Dashboard API                                                                         |             |
| Due to enabled use_dp_app_configs, please use Dashboard API                                                                                |             |
| Error writing to key store                                                                                                                 |             |
| Failed to create file                                                                                                                      |             |
| Failed to create key - Key with given certificate already found                                                                            |             |
| Failed to create key, ensure security settings are correct (handleAddOrUpdate)                                                             |             |
| Failed to invalidate refresh token                                                                                                         |             |
| Failure in storing client data                                                                                                             |             |
| Get client tokens failed                                                                                                                   |             |
| Global: Cipher not match (proxy transport)                                                                                                 |             |
| Key request by hash but key hashing is not enabled                                                                                         |             |
| Loop level too deep. Found more than 2 loops in single request                                                                             |             |
| Marshalling failed                                                                                                                         |             |
| Pinning disabled (public key pinning)                                                                                                      |             |
| Post Hook with unallowed message length                                                                                                    |             |
| Proxying Request Failed (GraphQL Proxy)                                                                                                    |             |
| Pub key not match (public key pinning)                                                                                                     |             |
| There was a problem proxying the request (GraphQL MiddleWare Request Validation: Bad Schema, single error response, SSL force common name) |             |
| Unmarshalling failed                                                                                                                       |             |
| Verification Required (virtual endpoint batch)                                                                                             |             |
| TBD                                                                                                                                        |             |

## Error Code 507:

| Text                                                                | Description |
| :------------------------------------------------------------------ | :---------- |
| StatusInsufficientStorage (POST method for an API on mock response) |             |
| TBD                                                                 |             |

## Error Code x509:

| Text                                                              | Description |
| :---------------------------------------------------------------- | :---------- |
| Certificate signed by unknown authority (ControlAPI without cert) |             |
| TBD                                                               |             |
