---
date: 2017-03-24T17:10:33Z
title: Portal Concepts
menu:
  main:
    parent: "Tyk Portal Classic"
weight: 1
aliases:
  - /tyk-developer-portal/portal-concepts
---

## API Catalogue

The API Catalogue is a list of APIs that you have published to your portal.

The API Catalogue entry is not a one-to-one map between an API you manage in Tyk, since you might want to compose multiple managed services into a single public-facing API Facade, a catalogue entry is actually an entry that maps against a security policy.

From the API Catalogue, a user can either:

- View the documentation for the API
- Request for a token to the API

When a developer requests a token, a new Auth token is generated on the linked policy, instead of the actual API, since you may wish to publish multi-tier access to the same API (E.g. Bronze / Silver / Gold).

## Key Requests

A key request is a record that is generated when a developer requests an access token for an API published in the API Catalogue. The Key request encompasses the following information:

Read more about them in the [Key Request section]({{< ref "tyk-developer-portal/tyk-portal-classic/key-requests" >}})

### Multiple APIs for a single Key Request

New for v1.9, a developer can now request access to multiple APIs with a single key request. The APIs you group together via a single key should all be of the same authentication type.

![Multiple APIs per Key Request](/img/dashboard/portal-management/multi-api-per-request.png)

To enable this functionality, select **Enable subscribing to multiple APIs with a single key** from the Portal Management Settings.

![Multiple APIs](/img/dashboard/portal-management/multi-api-setting.png)

### Edit APIs associated with a single Key Request

New for v1.9.4, if you have **Enable subscribing to multiple APIs with a single key** selected you can edit the APIs associated with the Key. You can perform the following:

* Remove access to existing APIs
* Subscribe to new APIs (of the same authentication type as the existing ones).

 ![Edit APIs](/img/dashboard/system-management/modify_key_approval.png) 


If a new API requires key approval, the new key request will be generated, and access to this API will be granted after your admin approves it.


## Policies

In the context of the developer portal, a security policy is the main "element" being exposed to public access. The policy is the same as a standard policy, and the policy forms the baseline template that gets used when the portal generates a token for the developer.

Security policies are used instead of a one-to-one mapping because they encapsulate all the information needed for a public API programme:

1.  Rate limits
2.  Quota
3.  Access Lists (What APIs and which versions are permitted)
4.  Granular access (Which methods and paths are allowed, e.g. you may want to only expose read-only access to the portal, so only GET requests are allowed)
5.  Multi-policy-management (With a Key, you can assign more than one policy to an APIs and each policy will have it's own counter).

Within the developer portal admin area, under a developer record, you will see their subscriptions. Those subscriptions represent the tokens they have and their policy level access. It is possible to then "upgrade" or "downgrade" a developers access without actually managing their token, but just assigning a new policy to that token.

## Documentation

Within the portal, documentation is what a developer can use to learn how to access and use your APIs.

The developer portal supports two types of documentation, and will render them differently:

1.  API Blueprint - this is rendered to HTML templates using Jade and Aglio.
2.  Swagger/OpenAPI (OpenAPI 2.0 and 3.0 are supported) - either by pasting your Swagger JSON or YAML content into the code editor, or by linking to any public facing Swagger URL. The URL version can be rendered using [Swagger UI](https://swagger.io/tools/swagger-ui/) which offers a sandbox environment where developers can interact with your API from the browser.

{{< note success >}}
**Note**  

Support for API Blueprint is being deprecated. See [Importing APIs]({{< ref "getting-started/import-apis#api-blueprint-is-being-deprecated" >}}) for more details.
{{< /note >}}

Within an API Catalogue entry, documentation must be attached to the catalogue entry for it to be published.

## Developers

Within the developer portal, a developer is an end-user that has access to the developer portal section of the portal website. This user is completely separate from Tyk Dashboard users and they do not ever intersect (they are also stored separately).

A developer record consists of some basic sign-up information and a set of admin-definable fields that get attached to the developer as metadata.

Within the developer view of the Tyk Dashboard, it is possible to manage all access of a developer, including the access levels of their tokens.


