---
title: "Error Codes"
date: 2022-12-13
tags: [""]
description: "Response codes that the gateway returns via an API"
weight: 0
draft: true
---

**Error Code 400:**

- Creating key without policy
- Authorization Field Missing
- testGRPCIgnore - no header
- Extractor Errors
- Failed to create key, keys must have at least one Access Rights record set
- Attempted access with malformed header, values not in basic auth format (basic auth)
- Attempted access with malformed header. Auth data not encoded correctly (basic auth)
- POST method with malformed data for Batch request
- Request malformed
- Spec field is missing
- Request field is missing
- Spec not valid, skipped!
- Body do not contain username (Basic Auth from body)
- Body do not contain password
- Request with empty authorization header (JWT session)
- The provided request is empty (graphql playground)
- Key cannot be used without a certificate
- Key must be used with an existent certificate
- Failed to remove the key
- Request ID does not match that in policy! For Update operations these must match
- ErrAPINotMigrated (oasEndpoint)
- Request APIID does not match that in Definition! For Update operations these must match
- Must specify an apiID to update
- Must specify an apiID to delete
- Must specify an apiID to patch
- Couldn’t decode instruction (policyUpdateHandler)
- Failed to create key, keys must have at least one Access Rights record set.
- API is not Oauth2
- Policy access rights doesn’t contain API this OAuth client belongs to
- Missing parameter api_id
- Oauth is not enabled for this API
- Health checks are not enabled for this node
- Cannot parse form. Form malformed
- oAuthTokenEmpty
- oAuthClientIdEmpty
- OAuth client doesn’t exist
- ErrImportWithTykExtension
- ErrPayloadWithoutTykExtension
- Couldn’t decode OAS object
- Batch request malformed
- Batch request creation failed, request structure malformed
- Error parsing form. Form malformed
- Access to this API has been disallowed
- Authorization field missing
- Bearer token malformed
- TBD

**Error Code 401:**

- Authorization Field Missing
- Wrong Password (Basic Auth)
- Header missing (JS Middleware)
- Not authorised (JS middleware)
- oauthClientIdEmpty
- oauthClientSecretEmpty
- Request signature verification failed (auth keys: could be empty signature header, or validation failed)
- TBD

**Error Code 403:**

- Wrong key ID (when creating key with policy)
- Quota Exceeded
- Rejected paths not within whitelist
- This organisation quota has been exceed, please contact your API administrator (processing requests live)
- This organisation rate limit has been exceeded, please contact your API administrator
- This organization access has been disabled or quota/rate limit is exceeded, please contact your API administrator (processing requests off thread)
- Invalid Token (Form Value Test for Value ExtractorHeader Source)
- Tls: bad certificate (no valid cert IDs exist in Certificate.ControlAPI)
- Client TLS certificate is required (Multiple APIs on same domain without certs)
- Certificate with SHA256 $CLIENTCERT not allowed (Multiple APIs with Mutual TLS on same domain)
- Unknown cert without domain
- Unknown cert with custom domain
- Key not authorised
  - JWT → id is in the ‘sub’ claim while the ‘kid’ claim in the header is not empty
  - request with malformed JWT
  - request with malformed JWT no track, invalid JWT, RSA bearer invalid for JWTsession, invalid 2 bearers, valid JWT/RSA signature/invalid public key request
  - oAuthkey not found
- Key not authorised. OAuth client access was revoked
- Key not authorised: Unexpected signing method
  - invalid JWT signature, JWT access with non-existent key
- Key not authorized: no matching policy
  - request with invalid policy in JWT, or
  - checking session and identity for valid key for openID
- Key not authorised. oAuth client access was revoked (oAuth client deleted)
- No matching policy found in scope claim (wrong scope in JWT request)
- Found an empty user ID in predefined base field claim user_id
  - request with valid JWT/RSA
  - signature/empty user_id/sub claim, or signature/no base field or no sub or no id claim
- This API version does not seem to exist
- Access to this API has been disallowed
- Version expired
- Attempted administrative access with invalid or missing key!
- Login failure, Response was:
- Access to this API has been disallowed
- emptySigHeader (signature validation with auth keys → fill in a signature)
- invalidSigHeader (signature validation with auth keys → have a valid signature)
- emptySigPath (Signature validation with auth keys → path for signature is empty)
- invalidSigPath (Signature validation with auth keys → path for signature is not valid)
- Attempted access with non-existent cert. (Authentication cert not found)
- Access to this resource has been disallowed (Granular Access Rights)
- GraphQL Depth Limit Exceeded
- Access from this IP has been disallowed (blacklist or whitelist IP’s)
- Failed with 403 after x requests over quota
  - process request off thread with quota
  - process request live with rate limit
  - process request off thread with rate limit
- This organisation access has been disabled, please contact your API administrator (orgSession.isInactive)
- Depth limit exceeded (on an API level or Field Level)
- Accessing to sub-version with base API listen path should require base API key (version checking)
- Version Information not found
- Client authorize request in with invalid redirect URI
- Attempted administrative access with invalid or missing key! (checking correct security credentials of the tyk API)
- Run Go-plugin auth failed (invalid token)
- TBD

**Error Code 404:**

- Policy not found
- API not found
  - testing health check endpoint
  - accessing API after deletion)
- Accessing a nonexistent endpoint (HTTP request)
- Accessing a key that doesn’t exist or thats been deleted
- Accessing unknown OAuth clients
- Key is not found(if the gw’s global session manager returns false)
- Key not found
  - Failed to update hashed key
- There is no such key found (handleDeleteKey, handleDeleteHashedKey)
  - when trying to delete a deleted key or a deleted hashed key
- Hashed key listing is diabled in config (enable_hashed_keys_listing)
  - Get all keys is disabled by default
- No such organisation found in Active API list
- Couldn't find organisation session in active API list
- Org not found
  - Could not retrieve record of org ID
  - Failed to delete org keys → spec for org is nil
- OAuth Client ID not found
  - oAuth Client ID doesn’t exist in storage
  - Failed to retrieve OAuth tokens or client details or deleting OAuth client or retrieve OAuth client list or report OAuth client list or failed to revoke OAuth client list
- API for this refresh token not found
- oAuthClientNotFound
- Oauth client doesn’t exist
  - Trying to get APIs for OAuth client ID
  - Client was not found
- API ID not found (when API ID doesnt exist in gw)
- Certificate with given SHA256 fingerprint not found
  - If no certificates exist in the cert manager list
- API doesn’t exist
  - Checking if API exists when rotating OauthClient
  - If ApiSpec is nil
- API for this refresh token not found
  - When invalidating Oauth refresh
  - If apiSpec is nil
- There should be at least one provider configured
  - There’s 0 external OAuth providers
- Version Does Not Exist
  - Checks on request through the system
  - Internal Http Handler by name or id does not exist
- Error getting oauth client
  - Client id doesnt exist in storage
- Accessing subroutes that dont exist
- Failed
  - OAS version does not exist within the OASSchema
- Bundle not found
  - No bundles within the gw
- TBD

**Error Code 405:**

- Method not supported (serveHTTP, doJSONWrite, etc)
  - If its not a get method during liveCheckHandler
- Malformed request body (certHandler)

**Error Code 429:**

- Rate Limit Exceeded
- TBD

**Error Code 500:**

- Creating key with bad policy
- Post Hook with unallowed message length
- Verification Requried (virtual endpoint batch)
- Pub key not match (public key pinning)
- Pinning disabled (public key pinning)
- Global: Cipher not match (proxy transport)
- API: MinTLS not match
- API: Invalid Proxy
- There was a problem proxying the request (SSL force common name)
- Loop level too deep. Found more than 2 loops in single request
- There was a problem proxying the request (single error response)
- Failed to create key, ensure security settings are correct (handleAddOrUpdate)
- Key request by hash but key hashing is not enabled
- Due to enabled service policy source, please use the Dashboard API
- Marshalling failed
- Failed to create file (handleAddOrUpdatePolicy)
- Delete failed
- Could not write key data
- Error writing to key store
- Unmarshalling failed
- Failed to create key - Key with given certificate already found
- Failure in storing client data
- Failed to invalidate refresh token
- Get client tokens failed
- Cache invalidation failed
- Due to enabled use_dp_app_configs, please use Dashboard API
- [OAuth] There was an error with the request: #RESPONSE
- Proxying Request Failed (GraphQL Proxy)
- There was a problem proxying the request (GraphQL MiddleWare Request Validation: Bad Schema)
- TBD

**Error Code 507:**

- StatusInsufficientStorage (POST method for an API on mock response)

**Error Code x509:**

- Certificate signed by unknown authority (ControlAPI without cert)
