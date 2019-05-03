---
date: 2017-03-24T17:10:33Z
title: Portal Concepts
menu:
  main:
    parent: "Tyk Developer Portal"
weight: 1 
---

## <a name="api-catalogue"></a> API Catalogue

The API Catalogue is a list of APIs that you have published to your portal.

The API Catalogue entry is not a one-to-one map between an API you manage in Tyk, since you might want to compose multiple managed services into a single public-facing API Facade, a catalogue entry is actually an entry that maps against a security policy.

From the API Catalogue, a user can either:

*   View the documentation for the API
*   Request for a token to the API

When a developer requests a token, a new Auth token is generated on the linked policy, instead of the actual API, since you may wish to publish multi-tier access to the same API (E.g. Bronze / Silver / Gold).

## <a name="key-requests"></a> Key Requests

A key request is a record that is generated when a developer requests an access token for an API published in the API Catalogue. The Key request encompasses the following information:

*   The policy of which access is being requested
*   The developer doing the requesting
*   The catalogue entry in question
*   The reasoning of why the developer should have access (these are dynamic fields and can be configured)

When a developer requests access to an API Catalogue entry, this key request represents that request for access. The key request can then be acted on, either by the portal itself, or by an administrator. The key request does not grant a token yet, it simply marks the fact that a token has been requested and why.

Once a key request is created, one of two things can be done to it:

*   It can be approved: This creates a new token and notifies the developer.
*   It can be declined: In which case the request is deleted.

Tyk enables you to manage this flow in a few ways:

*   Auto-approve the key request.
*   Have an admin approve the key-request.
*   Hand off to a third-party system to manage the key-request (e.g. for billing or additional user validation).

A key request can be created using the Dashboard API too, in fact, the Key-Request mechanism is a great way to create a mapping between an identity (a developer) and a token, and managing that process.

## <a name="policies"></a> Policies

In the context of the developer portal, a security policy is the main "element" being exposed to public access. The policy is the same as a standard policy, and the policy forms the baseline template that gets used when the portal generates a token for the developer.

Security policies are used instead of a one-to-one mapping because they encapsulate all the information needed for a public API programme:

1.  Rate limits
2.  Quota
3.  Access Lists (What APIs and which versions are permitted)
4.  Granular access (Which methods and paths are allowed, e.g. you may want to only expose read-only access to the portal, so only GET requests are allowed)
5.  Multi-key-management (With a policy, you can manage thousands of tokens, instead of one by one)

Within the developer portal admin area, under a developer record, you will see their subscriptions. Those subscriptions represent the tokens they have and their policy level access. It is possible to then "upgrade" or "downgrade" a developers access without actually managing their token, but just assigning a new policy to that token.

## <a name="documentation"></a> Documentation

Within the portal, documentation is what a developer can use to learn how to access and use your APIs.

The developer portal supports two types of documentation, and will render them differently:

1.  API Blueprint - this is rendered to HTML templates using Jade and Aglio.
2.  Swagger (OpenAPI) - either by pasting your Swagger JSON content into the code editor, or by linking to any public facing Swagger JSON URL. The URL version can be rendered using [Swagger UI](https://swagger.io/tools/swagger-ui/) which offers a sandbox environment where developers can interact with your API from the browser.

Within an API Catalogue entry, documentation must be attached to the catalogue entry for it to be published.

## <a name="developers"></a> Developers

Within the developer portal, a developer is an end-user that has access to the developer portal section of the portal website. This user is completely separate from Tyk Dashboard users and they do not ever intersect (they are also stored separately).

A developer record consists of some basic sign-up information and a set of admin-definable fields that get attached to the developer as metadata.

Within the developer view of the Tyk Dashboard, it is possible to manage all access of a developer, including the access levels of their tokens.






