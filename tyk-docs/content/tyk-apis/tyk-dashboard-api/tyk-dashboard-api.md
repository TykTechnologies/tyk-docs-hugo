---
date: 2017-03-27T12:08:14+01:00
title: Tyk Dashboard API
weight: 200
menu:
  main:
    parent: "Tyk APIs"
weight: 2
url: "/tyk-dashboard-api"
---

## <a name="introduction"></a> Introduction

The Tyk Dashboard API offers granular, programmatic access to a centralised database of resources that your Tyk nodes can pull from. This API has a dynamic user administrative structure which means the secret key that is used to communicate with your Tyk nodes can be kept secret and access to the wider management functions can be handled on a user-by-user and organisation-by-organisation basis.

A common question around using a database-backed configuration is how to programatically add API definitions to your Tyk nodes, the Dashboard API allows much more fine-grained, secure and multi-user access to your Tyk cluster, and should be used to manage a database-backed Tyk node.

The Tyk Dashboard API works seamlessly with the Tyk Dashboard (and the two come bundled together).

## <a name="security-hierarchy"></a> Security Hierarchy

The Dashboard API provides a more structured security layer to managing Tyk nodes.

### Organisations, APIs and Users

With the Dashboard API and a database-backed Tyk setup, (and to an extent with file-based API setups - if diligence is used in naming an creating definitions), the following security model is applied to the management of Upstream APIs:

* **Organisations**: All APIs are *owned* by an organisation, this is designated by the `OrgID` parameter in the API Definition.
* **Users**: All users created in the Dashboard belong to an organisation (unless an exception is made for super-administrative access).
* **APIs**: All APIs belong to an Organisation and only Users that belong to that organisation can see the analytics for those APIs and manage their configurations.
* **API Keys**: API Keys are designated by organisation, this means an API key that has full access rights will not be allowed to access the APIs of another organisation on the same system, but can have full access to all APIs within the organisation.
* **Access Rights**: Access rights are stored with the key, this enables a key to give access to multiple APIs, this is defined by the session object in the core Tyk API.

### Creating Organisations and Users

The Tyk Dashboard API application (`tyk_analytics`), can use a command line flag to create users and organisations (this is used in the initial setup of a node):

``
    #~/> ./tyk_analytics --neworg --newuser 
``

The `--neworg` flag creates a new organisation, and the `--newuser` flag creates a new user, which can be assigned to an organisation. Organisations and un-tagged users can also be created using the Dashboard Admin API. See [Admin API Organisations](/docs/dashboard-admin-api/organisations/) for more details.

### Special cases

The only special case is when a user is created with an empty OrgID, this can be done via the command line by not selecting an API on user creation, or via the Dashboard API.

Users that are not assigned to an Organisation gain special privileges in the Dashboard, and can see all APIs, users and all analytics data disregarding organisations. These users will not be able to add new users to other organisations though, only to their own context - so any users they create will also be super-users.
