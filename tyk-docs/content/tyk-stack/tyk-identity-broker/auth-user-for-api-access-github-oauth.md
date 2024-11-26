---
date: 2021-01-20T00:40:21Z
Title: Practical TIB Integration Examples
menu:
  main:
    parent: "Tyk Identity Broker"
weight: 6
aliases:
  - "/getting-started/tutorials/auth-user-for-api-access-github-oauth/"
---

## Authenticate a user for api access using Github OAuth

{{< youtube gqUaDM4aJTw >}}

## Implementing JWE with OIDC in Tyk Identity Broker: A Step-by-Step Guide

### Prerequisites
- Tyk Identity Broker v1.6.1+ or Tyk Dashboard v5.7.0+ (JWE feature is available from these versions and in all subsequent releases).
- An Identity Provider (IdP) that supports JSON Web Encryption (JWE)
- A certificate with a private key for Tyk (used to decrypt the ID token)
- A public key file for the IdP (used to encrypt the ID token)

### Setup process

#### Step 1. Prepare Encryption Keys
  
  - Load the certificate with the private key into Tyk:
    - **For embedded TIB in Dashboard:** Use Tyk Dashboard's certificate manager. In the below image you can see the module in dashboard that allows to upload certificates:
      {{< img src="/img/dashboard/certificate-manager/adding-certificate.gif" alt="Certificate manager" >}}
    - **For standalone TIB:** Store the certificate as a file accessible to Tyk

  - Load the public key into your IdP for ID token encryption (process varies by IdP)

#### Step 2. Configure the Identity Provider
- Create a new client in your IdP for Tyk Identity Broker

#### Step 3. Setup OIDC Profile
  - Create a new [TIB profile]({{< ref "tyk-stack/tyk-identity-broker/about-profiles#what-are-the-tib-profiles" >}}):
    - Select Social > OIDC as the provider
    - Enter the client key and client secret from the IdP
    - Copy the callback URL from TIB and add it to the IdP client's allowed redirect URLs
    {{< img src="/img/tib/profiles/tib-profile-creation.gif" alt="Profile creation" >}}
  - Test the basic SSO flow to ensure it's working correctly

#### Step 4. Enable JWE
  - [Updated the TIB profile via API]{{{< ref "tyk-identity-broker/tib-rest-api#a-nameupdate-profilea-update-profile" >}}}
    - Add the following fields to the `ProviderConfig` section:

      ```json
      ...
      "ProviderConfig": {
        "JWE": {
          "Enabled": true,
          "PrivateKeyLocation": "CERT-ID"
        },
      ...
      ```

    - Set `PrivateKeyLocation` to either:
      - The certificate ID from the certificate manager, or
      - The file path where the certificate and private key are stored
    
  - Update the IdP client configuration
    - Enable JWE for the client
    - Provide the public key for encryption

#### Step 5. Verification
  - Test the complete flow with JWE enabled to ensure proper functionality.

### Troubleshooting
While setting up JWE with Tyk Identity Broker, you may encounter some challenges. This section outlines common issues and their solutions to help you navigate the implementation process smoothly. 

1. **oauth2: error decoding JWT token: jws: invalid token received, not all parts available** it means that JWE is not enabled in the profile and the IDP is already using JWE.
2. **JWE Private Key not loaded** Tyk encountered some issues while loading the certificate with the private key. Ensure that the path or certId are correct.