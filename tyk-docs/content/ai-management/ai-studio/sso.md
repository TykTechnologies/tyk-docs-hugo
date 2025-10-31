---
title: "SSO Integration"
date: 2025-04-25
tags: ["AI Studio", "AI Management", "Single Sign On"]
description: "How to configure SSO in Tyk AI Studio?"
keywords: ["AI Studio", "AI Management", "Single Sign On"]
---

Tyk AI Studio supports Single Sign-On (SSO) integration, allowing users to authenticate using their existing credentials from external Identity Providers (IdPs). This simplifies login, enhances security, and centralizes user management.

## Purpose

The SSO integration aims to:

*   Allow users to log in to Tyk AI Studio using their familiar corporate or social identity credentials.
*   Eliminate the need for separate Tyk AI Studio-specific passwords.
*   Improve security by leveraging the organization's existing IdP infrastructure and policies (e.g., MFA).
*   Streamline user provisioning and de-provisioning (depending on IdP capabilities and configuration).

{{< youtube vn2ZfY9couw >}}


## Technology: Tyk Identity Broker (TIB)

Tyk AI Studio leverages the embedded **Tyk Identity Broker (TIB)** component to handle SSO integrations. TIB acts as a bridge between Tyk AI Studio (the Service Provider or SP) and various external Identity Providers (IdPs).

## Supported Protocols & Providers

TIB enables Tyk AI Studio to integrate with IdPs supporting standard protocols, including:

*   **OpenID Connect (OIDC):** Commonly used by providers like Google, Microsoft Entra ID (Azure AD), Okta, Auth0.
*   **SAML 2.0:** Widely used in enterprise environments (e.g., Okta, Ping Identity, ADFS).
*   **LDAP:** For integration with traditional directory services like Active Directory.
*   **Social Logins:** Providers like GitHub, GitLab, etc. (often via OIDC).

## Configuration (Admin)

Administrators configure SSO providers within the Tyk AI Studio administration interface (likely via TIB's configuration settings exposed through Tyk AI Studio):

1.  **Select Protocol:** Choose the appropriate protocol (OIDC, SAML, etc.).
2.  **Provider Details:** Enter the specific configuration details required by the chosen protocol and IdP.
    *   **OIDC Example:** Client ID, Client Secret, Issuer URL, Discovery Endpoint.
    *   **SAML Example:** IdP SSO URL, IdP Issuer/Entity ID, IdP Public Certificate, SP Entity ID (Tyk AI Studio's identifier).
3.  **Profile Mapping:** Configure how attributes received from the IdP (e.g., email, name, group memberships) map to Tyk AI Studio user profiles.
    *   Identify which IdP attribute contains the unique user identifier (e.g., `email`, `sub`, `preferred_username`).
    *   Map IdP attributes to Tyk AI Studio user fields (e.g., `given_name` -> First Name, `family_name` -> Last Name).
4.  **Group Mapping (Optional but Recommended):** Configure rules to automatically assign users to Tyk AI Studio [Groups]({{< ref "ai-management/ai-studio/user-management" >}}) based on group information received from the IdP.
    *   *Example:* If the IdP sends a `groups` claim containing "Tyk AI Studio Admins", map this to automatically add the user to the "Administrators" group in Tyk AI Studio.
5.  **Enable Provider:** Activate the configured IdP for user login.

    {{< img src="/img/ai-management/sso-config-ui.png" alt="SSO Config UI" >}}

## Login Flow

When SSO is enabled:

1.  User navigates to the Tyk AI Studio login page.
2.  User clicks a button like "Login with [Your IdP Name]" (e.g., "Login with Google", "Login with Okta").
3.  User is redirected to the external IdP's login page.
4.  User authenticates with the IdP (using their corporate password, MFA, etc.).
5.  Upon successful authentication, the IdP redirects the user back to Tyk AI Studio (via TIB) with an authentication assertion (e.g., OIDC ID token, SAML response).
6.  TIB validates the assertion and extracts user profile information.
7.  Tyk AI Studio finds an existing user matching the unique identifier or provisions a new user account based on the received profile information (Just-In-Time Provisioning).
8.  Group memberships may be updated based on configured mapping rules.
9.  The user is logged into Tyk AI Studio.

## Benefits

*   **Improved User Experience:** One less password to remember.
*   **Enhanced Security:** Leverages established IdP security policies.
*   **Centralized Control:** User access can often be managed centrally via the IdP.
*   **Simplified Onboarding/Offboarding:** User access to Tyk AI Studio can be tied to their status in the central IdP.
