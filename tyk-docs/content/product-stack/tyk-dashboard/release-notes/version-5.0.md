---
title: Tyk Dashboard v5.0
tags: ["release notes", "Tyk Dashboard", "v5.0", "5.0", "5.0.0", "5.0.1", "5.0.1", "5.0.2", "5.0.3", "5.0.4", "5.0.5", "5.0.6", "5.0.7", "5.0.8", "5.0.9", "5.0.10", "5.0.11", "5.0.12", "5.0.13", "5.0.14"]
weight: 2
---

**Licensed Protected Product**

**This page contains all release notes for version 5.0.X displayed in reverse chronological order**

---

## 5.0.14 Release Notes {#rn-v5.0.14}

### Release Date 18th September 2024

### Upgrade Instructions

This release is not tightly coupled with Tyk Gateway v5.0.14, so you do not have to upgrade both together.


Go to the [Upgrading Tyk](https://tyk.io/docs/product-stack/tyk-gateway/release-notes/version-5.0/#upgrading-tyk) section for detailed upgrade instructions.


### Release Highlights

This release fixes some display issues in Tyk Dashboard and Tyk Classic Portal when using PostgreSQL.

### Changelog {#Changelog-v5.0.14}

#### Fixed

<ul>
<li>
<details>
<summary>Tyk Dashboard UI: Fixed display issue for API statistics</summary>

Fixed an issue where API statistics were not being shown when using PostgreSQL and adding two or more tags in the Activity page
</details>
</li>
<li>
<details>
<summary>Tyk Dashboard UI:  Fixed issue with display of HTTP 429 status codes on the Activity page</summary>

Fixed an issue where HTTP 429 status codes were not being shown on the Activity page when using PostgreSQL
</details>
</li>
<li>
<details>
<summary>Tyk Classic Portal UI: Fixed display of graphs and requests counter</summary>

Fixed wrong graphs and incorrect requests counter on Tyk Classic Portal when using PostgreSQL
</details>
</li>
<li>
<details>
<summary>Tyk Dashboard UI: fixed issues with the Error Breakdown display, specifically related to date handling</summary>

Fixed Error Breakdown issue showing errors that happened on different dates than selected date
</details>
</li>
</ul>

---

## 5.0.13 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.13)

---

## 5.0.12 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.12)

---

## 5.0.11 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.11)

---

## 5.0.10 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.10)

---

## 5.0.9 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.9)

---

## 5.0.8 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.8)

--- 

## 5.0.7 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.7).

---

## 5.0.6 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.6). 

---

## 5.0.5 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.5).

---

## 5.0.4 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.4).

---

## 5.0.3 Release Notes
Please refer to our GitHub [release notes](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.3).

---

## 5.0.2 Release Notes

##### Release Date 29 May 2023

#### Release Highlights

##### Support for MongoDB 5 and 6
From Tyk 5.0.2, we added support for MongoDB 5.0.x and 6.0.x. To enable this, you have to set new Dashboard config option driver to *mongo-go*. 
The driver setting defines the driver type to use for MongoDB. It can be one of the following values:
- [mgo](https://github.com/go-mgo/mgo) (default): Uses the *mgo* driver. This driver supports MongoDB versions <= v4.x (lower or equal to v4.x). You can get more information about this driver in the [mgo](https://github.com/go-mgo/mgo) GH repository. To allow users more time for migration, we will update our default driver to the new driver, *mongo-go*, in next major release.
- [mongo-go](https://github.com/mongodb/mongo-go-driver): Uses the official MongoDB driver. This driver supports MongoDB versions >= v4.x (greater or equal to v4.x). You can get more information about this driver in [mongo-go-driver](https://github.com/mongodb/mongo-go-driver) GH repository.

See how to [Choose a MongoDB driver]({{< ref "planning-for-production/database-settings/mongodb#choose-a-mongodb-driver" >}})

**Note: Tyk Pump 1.8.0 and MDCB 2.2 releases have been updated to support the new driver option**

#### Downloads

[docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.0.2/images/sha256-fe3009c14ff9096771d10995a399a494389321707e951a3c46f944afd28d18cd?context=explore)


#### Changelog {#Changelog-v5.0.2}

##### Fixed
- Fixed a bug on migration of a portal catalog with deleted policy to SQL
- Fixed: Redirect unregistered user to new page when SSOOnlyForRegisteredUsers is set to true

---

## 5.0.1 Release Notes

##### Release Date 25 Apr 2023

#### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.0.1">}}) below.

#### Downloads
- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.0.1/images/sha256-013d971fc826507702f7226fa3f00e1c7e9d390fc0fb268bed42e410b126e89d?context=explore)

#### Changelog {#Changelog-v5.0.1}

##### Added
- Improved security for people using the Dashboard by adding the Referrer-Policy header with the value `no-referrer`
- Added ability to select the plugin driver within the Tyk OAS API Designer

##### Changed
- When creating a new API in the Tyk OAS API Designer, caching is now disabled by default

##### Fixed
- Fixed a bug where a call to the `/hello` endpoint would unnecessarily log `http: superfluous response.WriteHeader call`
- Fixed a bug where the Dashboard was showing *Average usage over time* for all Developers, rather than just those relevant to the logged in developer
- Fixed a bug where logged in users could see Identity Management pages, even if they didn't have the rights to use these features
- Fixed a bug that prevented Tyk Dashboard users from resetting their own passwords
- Fixed issue with GraphQL proxy headers added via UI
- Fixed a bug where the Dashboard would not allow access to any screens if a logged in user didn’t have access to the APIs resource regardless of other access rights
- Fixed a bug on the key management page where searching by `key_id` did not work - you can now initiate the search by pressing enter after typing in the `key_id`
- Fixed a bug where Dashboard API could incorrectly return HTTP 400 when deleting an API
- Fixed UDG UI bug that caused duplicate data source creation on renaming
- Fixed schema validation for custom domain in Tyk OAS API definition
- Fixed a bug where the left menu did not change when Dashboard language was changed
- Fixed a bug that caused the Dashboard to report errors when decoding multiple APIs associated with a policy
- Fixed a bug where it was not possible to disable the Use Scope Claim option when using JWT authentication
- Fixed a bug in the default OPA rule that prevented users from resetting their own password
- Fixed a bug where authToken data was incorrectly stored in the JWT section of the authentication config when a new API was created

---

## v5.0.0 Release Notes

##### Release Date 28 Mar 2023

#### Release Highlights

##### Improved OpenAPI support

Tyk Dashboard has been enhanced with **all the custom middleware options** for Tyk OAS APIs, so **for the first time** you can configure your custom middleware from the Dashboard; this covers the full suite of custom middleware from pre- to post- and response plugins. We’ve got support for middleware bundles, Go plugins and Tyk Virtual Endpoints, all within the new and improved Tyk Dashboard UI.

[Versioning your Tyk OAS APIs]({{< ref "getting-started/key-concepts/oas-versioning" >}}) is easier than ever, with the Tyk OSS Gateway now looking after the maintenance of the list of versions associated with the base API for you; we’ve also added a new endpoint on the Tyk API that will return details of the versions for a given API.

Tyk Dashboard hasn’t been left out, we’ve implemented a brand new version management UI for Tyk OAS APIs, to make it as easy as possible for you to manage those API versions as you develop and extend your API products with Tyk.

We’ve improved support for [OAS Mock Responses]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}), with the Tyk OAS API definition now allowing you to register multiple Mock Responses in a single API, providing you with increased testing flexibility.

Another new feature in the Tyk OAS API Designer is that you can now update (PATCH) your existing Tyk OAS APIs through the Dashboard API without having to resort to curl. That should make life just that little bit easier.
Of course, we’ve also addressed some bugs and usability issues as part of our ongoing ambition to make Tyk OAS API the best way for you to create and manage your APIs.

##### GraphQL and Universal Data Graph improvements

This release is all about making things easier for our users with GraphQL and Universal Data Graph.

In order to get our users up and running with a working Universal Data Graph quickly, we’ve created a repository of examples that anyone can import into their Dashboard or Gateway and see what Universal Data Graph is capable of. Import can be done in two ways:
- manually, by simply copying a Tyk API definition from GitHub - [TykTechnologies/tyk-examples](https://TykTechnologies/tyk-examples): A repository containing example API definitions and policies for Tyk products. 
- via command line [using tyk-sync]({{< ref "universal-data-graph/udg-examples" >}})

To make it easier for our users to find their way to Universal Data Graph, we’ve also given it its own space in the Dashboard. From now on you can find UDG under Data Graphs section of the menu.

It also got a lot easier to turn a Kafka topic into a GraphQL subscription. Using our new Dashboard API endpoint, users will be able to transform their AsyncAPI documentation into Universal Data Graph definition with a single click. Support for OAS coming soon as well!

With this release we are also giving our users [improved headers for GQL APIs]({{< ref "graphql/gql-headers" >}}). It is now possible to use context variables in request headers and persist headers needed for introspection separately for improved security.

Additionally we’ve added Dashboard support for introspection control on policy and key level. It is now possible to allow or block certain consumers from being able to introspect any graph while creating a policy or key via Dashboard.

#### Downloads

[docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.0/images/sha256-3d736b06b023e23f406b1591f4915b3cb15a417fcb953d380eb8b4d71829f20f?tab=vulnerabilities)

#### Changelog {#Changelog-v5.0.0}

##### Added
- Numerous UX improvements
- New UI for custom middleware for Tyk OAS APIs
- Significantly improved Tyk OAS API versioning user experience
- It now possible to use PATCH method to modify Tyk OAS APIs via the Dashboard API
- Now you can turn a Kafka topic into a GraphQL subscription by simply [importing your AsyncAPI definition]({{< ref "tyk-apis/tyk-dashboard-api/data-graphs-api" >}})
- Way to control access to introspection on policy and key level

##### Changed
- Universal Data Graph moved to a separate dashboard section

---

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### API Documentation

- [OpenAPI Document]({{<ref "tyk-dashboard-api">}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/27225007-374cc3d0-f16d-4620-a435-68c53553ca40)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
