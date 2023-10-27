---
title: Tyk Gateway 5.0 Release Notes
description: Tyk Gateway v5.0 release notes
tags: ["release notes", "Tyk Gateway", "v5.0", "5.0", "5.0.0", "5.0.1", "5.0.1", "5.0.2", "5.0.3", "5.0.4", "5.0.5", "5.0.6"]
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 5.0.X displayed in reverse chronological order**

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

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.2/images/sha256-5e126d64571989f9e4b746544cf7a4a53add036a68fe0df4502f1e62f29627a7?context=explore) 
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.2)


#### Changelog {#Changelog-v5.0.2}

##### Updated
- Internal refactoring to make storage related parts more stable and less affected by potential race issues

---

## 5.0.1 Release Notes

##### Release Date 25 Apr 2023

#### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.0.1">}}) below.

#### Downloads
- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.1/images/sha256-5fa7aa910d62a7ed2c1cfbc68c69a988b4b0e9420d7a52018f80f9a45cadb083?context=explore
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.1)

#### Changelog {#Changelog-v5.0.1}

##### Added
- Added a new `enable_distributed_tracing` option to the NewRelic config to enable support for Distributed Tracer

##### Fixed
- Fixed  panic when JWK method was used for JWT authentication and the token didn't include kid
- Fixed an issue where failure to load GoPlugin middleware didn’t prevent the API from proxying traffic to the upstream: now Gateway logs an error when the plugin fails to load (during API creation/update) and responds with HTTP 500 if the API is called; at the moment this is fixed only for file based plugins
- Fixed MutualTLS issue causing leak of allowed CAs during TLS handshake when there are multiple mTLS APIs
- Fixed a bug during hot reload of Tyk Gateway where APIs with JSVM plugins stored in filesystem were not reloaded
- Fixed a bug where the gateway would remove the trailing `/`at the end of a URL
- Fixed a bug where nested field-mappings in UDG weren't working as intended
- Fixed a bug when using Tyk OAuth 2.0 flow on Tyk Cloud where a request for an Authorization Code would fail with a 404 error
- Fixed a bug where mTLS negotiation could fail when there are a large number of certificates and CAs; added an option (`http_server_options.skip_client_ca_announcement`) to use the alternative method for certificate transfer
- Fixed CVE issue with go.uuid package
- Fixed a bug where rate limits were not correctly applied when policies are partitioned to separate access rights and rate limits into different scopes

---

## 5.0.0 Release Notes

##### Release Date 28 Mar 2023

#### Deprecations
- Tyk Gateway no longer natively supports **LetsEncrypt** integration. You still can use LetsEncrypt CLI tooling to generate certificates and use them with Tyk.

#### Release Highlights

##### Improved OpenAPI support

We have added some great features to the Tyk OAS API definition bringing it closer to parity with our Tyk Classic API and to make it easier to get on board with Tyk using your Open API workflows.

Tyk’s OSS users can now make use of extensive [custom middleware](https://tyk.io/docs/plugins/) options with your OAS APIs, to transform API requests and responses, exposing your upstream services in the way that suits your users and internal API governance rules. We’ve enhanced the Request Validation for Tyk OAS APIs to include parameter validation (path, query, headers, cookie) as well as the body validation that was introduced in Tyk 4.1.

[Versioning your Tyk OAS APIs]({{< ref "getting-started/key-concepts/oas-versioning" >}}) is easier than ever, with the Tyk OSS Gateway now looking after the maintenance of the list of versions associated with the base API for you; we’ve also added a new endpoint on the Tyk API that will return details of the versions for a given API.

We’ve improved support for [OAS Mock Responses]({{< ref "getting-started/using-oas-definitions/mock-response" >}}), with the Tyk OAS API definition now allowing you to register multiple Mock Responses in a single API, providing you with increased testing flexibility.

Of course, we’ve also addressed some bugs and usability issues as part of our ongoing ambition to make Tyk OAS API the best way for you to create and manage your APIs.

Thanks to our community contributors [armujahid](https://github.com/armujahid), [JordyBottelier](https://github.com/JordyBottelier) and [ls-michal-dabrowski](https://github.com/ls-michal-dabrowski) for your PRs that further improve the quality of Tyk OSS Gateway!

#### Downloads

- [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.0/images/sha256-196815adff2805ccc14c267b14032f23913321b24ea86c052b62a7b1568b6725?context=explore)
- [source code](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.0)

#### Changelog {#Changelog-v5.0.0}

##### Added
- Support for request validation (including query params, headers and the rest of OAS rules) with Tyk OAS APIs
- Transform request/response middleware for Tyk OAS APIs
- Custom middleware for Tyk OAS APIs
- Added a new API endpoint to manage versions for Tyk OAS APIs
- Improved Mock API plugin for Tyk OAS APIs
- Universal Data Graph and GraphQL APIs now support using context variables in request headers, allowing passing information it to your subgraphs
- Now you can control access to introspection on policy and key level

#### Fixed
- Fixed potential race condition when using distributed rate limiter

---

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### API Documentation

- [OpenAPI Document]({{<ref "tyk-dashboard-api">}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/27225007-374cc3d0-f16d-4620-a435-68c53553ca40)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.