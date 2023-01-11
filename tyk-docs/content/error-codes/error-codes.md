---
title: "Error Codes (WIP)"
date: 2023-1-6
tags: [""]
description: "Response codes that the Tyk Gateway (v4.3.0) returns via an API"
weight: 0
draft: true
---

Tables for each error codes. Each table contains the possible texts that comes with the error code and a description of the error.

## Error Code 400:

| Text                                                                                    | Solution                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Access to this API has been disallowed                                                  | <ul><li>Check if the key has access to the right API version or definition</li><li>Check if the authentication key used is still valid</li><li>Check if the certificate used for authentication is present</li><li>Check if the authentication key is created and present in the database. You can use Gateway Keys APIs for confirmation</li><li>Check if API definition is using JWT auth and if auth header key and or value is empty or missing</li></ul> |
| API is not OAuth2                                                                       | Check if OAuth2 is integrated into the API by auth tokens or using Tyk OAuth flow                                                                                                                                                                                                                                                                                                                                                                             |
| Attempted access with malformed header                                                  | Values not in basic auth format or auth data not encoded correctly                                                                                                                                                                                                                                                                                                                                                                                            |
| Authorization Field Missing                                                             | <ul><li>Check if the authorization field is missing</li><li>Check if the OAuth authorization field is missing</li></ul>                                                                                                                                                                                                                                                                                                                                       |
| Batch request creation failed, request structure malformed                              |
| Batch request malformed                                                                 |
| Bearer token malformed                                                                  | Check if the OAuth authorization field is malformed                                                                                                                                                                                                                                                                                                                                                                                                           |
| Body do not contain password or username                                                |
| Cannot parse form. Form malformed                                                       |
| Couldn’t decode instruction                                                             |
| Couldn’t decode OAS object                                                              |
| Creating key without policy                                                             |
| Error parsing form. Form malformed                                                      |
| The payload should contain x-tyk-api-gateway                                            |
| Extractor Errors                                                                        |
| Failed to create key, keys must have at least one Access Rights record set              |
| Failed to remove the key                                                                |
| Health checks are not enabled for this node                                             |
| Key not authorized                                                                      | <ul><li>Check if OAuth key is present</li><li>Check if the OAuth client is not deleted</li><li> Check if there is a valid policy associated with the key/token used</li><li>Check if the policy associated with the key is not expired or if the owner is valid</li><li>Check if JWT default policies exist</li></ul>                                                                                                                                         |
| Key cannot be used without a certificate                                                |
| Key must be used with an existent certificate                                           |
| Missing parameter api_id                                                                |
| Must specify an apiID to delete, patch, or update                                       |
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
| The provided request is empty (graphql playground)                                      |
| TBD (To be determined)                                                                  |

## Error Code 401:

| Text                                  | Solution                                                                                                                |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| Authorization Field Missing           | <ul><li>Check if the authorization field is missing</li><li>Check if the OAuth authorization field is missing</li></ul> |
| Header missing (JS Middleware)        |
| Key has expired, please renew         |                                                                                                                         |
| Not authorised (JS middleware)        |
| oauthClientIdEmpty                    |
| oauthClientSecretEmpty                |
| Request signature verification failed | Possible empty signature headeer or validation failed                                                                   |
| Wrong Password                        |
| TBD (To be determined)                |

## Error Code 403:

| Text                                                                                                              | Solution                                                                                                                    |
| :---------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Access to this API has been disallowed                                                                            |
| Access to this resource has been disallowed                                                                       |
| Accessing to sub-version with base API listen path should require base API key                                    |
| Attempted access with non-existent cert                                                                           | Check if authentication certificate exists                                                                                  |
| Attempted administrative access with invalid or missing key!                                                      | Check if there is correct security credentials of the tyk API                                                               |
| Certificate with SHA256 $CLIENTCERT not allowed (Multiple APIs with Mutual TLS on same domain)                    |
| Client authorize request in with invalid redirect URI                                                             |
| Client TLS certificate is required                                                                                | Check if theres multiple APIs on the same domain with no certificates                                                       |
| Depth limit exceeded                                                                                              | Check on an API level or on a field level                                                                                   |
| Empty Signature Header                                                                                            | Fill in a signature for auth keys                                                                                           |
| Empty Signature Path                                                                                              | Check if path for signature is empty                                                                                        |
| Failed with 403 after x-amount requests over quota                                                                | Process request off thread with quota or process request live with rate limit or process request off thread with rate limit |
| Found an empty user ID in predefined base field claim user_id                                                     | Request with valid JWT/RSA or signature/empty user_id/sub claim, or signature/no base field or no sub or no id claim        |
| GraphQL Depth Limit Exceeded                                                                                      |
| Invalid Token (Form Value Test for Value ExtractorHeader Source)                                                  |
| Invalid Signature Header                                                                                          |                                                                                                                             |
| Invalid Signature Path                                                                                            |                                                                                                                             |
| Key is not active, please renew                                                                                   |
| Key not authorised                                                                                                |                                                                                                                             |
| Key not authorised: Unexpected signing method                                                                     | Invalid JWT signature, JWT access with non-existent key                                                                     |
| Key not authorised: oAuth client access was revoked                                                               | Check if oAuth client exists                                                                                                |
| Key not authorized: no matching policy                                                                            | Request with invalid policy in JWT, or checking session and identity for valid key for openID                               |
| No matching policy found in scope claim                                                                           | Check if wrong scope for JWT request                                                                                        |
| Quota Exceeded                                                                                                    |
| Rejected paths not within whitelist                                                                               |
| Run Go-plugin auth failed                                                                                         | Used an invalid token for authentication                                                                                    |
| This API version does not seem to exist                                                                           |
| This organisation access has been disabled, please contact your API administrator                                 |
| This organisation quota has been exceed, please contact your API administrator                                    |
| This organisation rate limit has been exceeded, please contact your API administrator                             |
| This organization access has been disabled or quota/rate limit is exceeded, please contact your API administrator |
| Tls: bad certificate (no valid cert IDs exist in Certificate.ControlAPI)                                          |
| Unknown cert with custom domain                                                                                   |
| Unknown cert without domain                                                                                       |
| Version expired                                                                                                   |
| Version Information not found                                                                                     |
| Wrong key ID (when creating key with policy)                                                                      |
| TBD                                                                                                               |

## Error Code 404:

| Text                                                  | Solution                                                                                                                                                                                                            |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Accessing unknown OAuth clients                       |
| API doesn’t exist                                     | Checking if API exists when rotating OauthClient or If ApiSpec is nil                                                                                                                                               |
| API for this refresh token not found                  | When invalidating Oauth refresh or If apiSpec is nil                                                                                                                                                                |
| API ID not found                                      | Check if API ID exists in the Gateway                                                                                                                                                                               |
| API not found                                         | Check if API exists                                                                                                                                                                                                 |
| Bundle not found                                      | No bundles found within the Gateway                                                                                                                                                                                 |
| Certificate with given SHA256 fingerprint not found   | No certificates exist in the certificate manager list                                                                                                                                                               |
| Couldn't find organisation session in active API list |
| Error getting oauth client                            | See if oAuth client id exists                                                                                                                                                                                       |
| Key not found                                         | Failed to update hashed key                                                                                                                                                                                         |
| No such organisation found in Active API list         |
| Oauth client doesn’t exist                            | Trying to get APIs for OAuth or client ID Client was not found                                                                                                                                                      |
| OAuth Client ID not found                             | oAuth Client ID doesn’t exist in storage Failed to retrieve OAuth tokens or client details or deleting OAuth client or retrieve OAuth client list or report OAuth client list or failed to revoke OAuth client list |
| Org not found                                         | Could not retrieve record of org ID orFailed to delete org keys → spec for org is nil                                                                                                                               |
| Policy not found                                      |
| There is no such key found                            | Check if key is already deleted. Check if hashed key has been deleted already.                                                                                                                                      |
| Version Does Not Exist                                | Check if version path is filled and correct                                                                                                                                                                         |
| TBD                                                   |

## Error Code 405:

| Text                   | Solution                                                        |
| :--------------------- | :-------------------------------------------------------------- |
| Malformed request body |                                                                 |
| Method not supported   | Attempting to add a method that is not supported by our system? |
| TBD                    |                                                                 |

## Error Code 429:

| Text                    | Solution                                                                                                                                     |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| API Rate Limit Exceeded | <ul><li>Check the rate of the requests on the API level</li><li>Check the rate of requests on the API key (Auth token, certs, etc)</li></ul> |
| TBD                     |                                                                                                                                              |

## Error Code 499:

| Text                  | Solution                                      |
| :-------------------- | :-------------------------------------------- |
| Client closed request | check if the client closed the TCP connection |

## Error Code 500:

| Text                                                               | Solution                                                                                                        |
| :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| API: Invalid Proxy                                                 |                                                                                                                 |
| API: MinTLS not match                                              |                                                                                                                 |
| Cache invalidation failed                                          |                                                                                                                 |
| Can't detect loop target                                           | <ul><li>Verify target API exsists</li><li>Check if URL scheme is "tyk://"</li><li>Refer to 404 errors</li></ul> |
| Could not write key data                                           |                                                                                                                 |
| Creating key with bad policy                                       |                                                                                                                 |
| Delete failed                                                      |                                                                                                                 |
| Due to enabled service policy source, please use the Dashboard API |                                                                                                                 |
| Due to enabled use_dp_app_configs, please use Dashboard API        |                                                                                                                 |
| Error writing to key store                                         |                                                                                                                 |
| Failed to create file                                              |                                                                                                                 |
| Failed to create key                                               | Check if key already exist or exist with given certificate. Ensure security settings are correct                |
| Failed to invalidate refresh token                                 |                                                                                                                 |
| Failure in storing client data                                     |                                                                                                                 |
| Get client tokens failed                                           |                                                                                                                 |
| Key request by hash but key hashing is not enabled                 |                                                                                                                 |
| Loop level too deep. Found more than 2 loops in single request     |                                                                                                                 |
| Marshalling failed                                                 |                                                                                                                 |
| Pinning disabled (public key pinning)                              |                                                                                                                 |
| Post Hook with unallowed message length                            |                                                                                                                 |
| Proxying Request Failed (GraphQL Proxy)                            |                                                                                                                 |
| Pub key not match (public key pinning)                             |                                                                                                                 |
| There was a problem proxying the request                           | Check if the target URL is unavailable to the Gateway                                                           |
| Unmarshalling failed                                               |                                                                                                                 |
| Unsupported schema, unable to validate                             | Check GraphQL properties are valid                                                                              |
| Upstreaming host lookup failed                                     | Check if the target URL is not resolvable in DNS                                                                |
| Verification Required (virtual endpoint batch)                     |                                                                                                                 |
| TBD                                                                |                                                                                                                 |

## Error Code 503:

| Text                            | Solution                                         |
| :------------------------------ | :----------------------------------------------- |
| Service temporarily unavailable | Check if a circuit braker middleware is enforced |
| All hosts are down              |                                                  |
| TBD                             |                                                  |

## Error Code 503:

| Text                                  | Solution |
| :------------------------------------ | :------- |
| Upstream service reached hard timeout |          |
| TBD                                   |          |

## Error Code 507:

| Text                      | Solution |
| :------------------------ | :------- |
| StatusInsufficientStorage |          |
| TBD                       |          |

## Error Code x509:

| Text                                    | Solution |
| :-------------------------------------- | :------- |
| Certificate signed by unknown authority |          |
| TBD                                     |          |
