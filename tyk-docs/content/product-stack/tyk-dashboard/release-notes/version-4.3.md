---
title: Tyk Dashboard v4.3
description: Tyk Dashboard v4.3 release notes
tags: ["release notes", "Tyk Dashboard", "v4.3", "4.3"]
---

## Release Highlights

#### Tyk OAS APIs - Versioning via the Dashboard

Tyk v4.3 adds API versioning to the Dashboard UI, including:

- Performing CRUD operations over API versions
- Navigate seamlessly between versions
- A dedicated manage versions screen
- easily identify the default version and the base API.

#### Importing OAS v3 via the Dashboard

Importing OpenAPI v3 documents in order to generate Tyk OAS API definition is now fully supported in our Dashboard UI. Our UI automatically detects the version of your OpenAPI Document, and will suggest options that you can pass or allow Tyk to read from the provided document, in order to configure the Tyk OAS API Definition. Such as: 

- custom upstream URL
- custom listen path
- authentication mechanism
- validation request rules and limit access only to the defined paths.

[Importing OAS v3 via the Dashboard]({{< ref "/content/getting-started/using-oas-definitions/import-an-oas-api.md#tutorial-7-using-the-tyk-dashboard-ui" >}})

#### Updated the Tyk Dashboard version of Golang, to 1.16.

**Our Dashboard is using Golang 1.16 version starting with 4.3 release. This version of the Golang release deprecates x509 commonName certificates usage. This will be the last release where it's still possible to use commonName, users need to explicitly re-enable it with an environment variable.**

The deprecated, legacy behavior of treating the CommonName field on X.509 certificates as a host name when no Subject Alternative Names are present is now disabled by default. It can be temporarily re-enabled by adding the value x509ignoreCN=0 to the GODEBUG environment variable.

Note that if the CommonName is an invalid host name, it's always ignored, regardless of GODEBUG settings. Invalid names include those with any characters other than letters, digits, hyphens and underscores, and those with empty labels or trailing dots.


## Changelog

#### Added

- Added an option for using multiple header/value pairs when configuring GraphQL API with a protected upstream and persisting those headers for future use.
- Added documentation on how edge endpoints Dashboard configuration can be used by users to add tags for their API Gateways.
- When retrieving the Tyk OAS API Definition of a versioned API, the base API ID is passed on the GET request as a header: `x-tyk-base-api-id`.
- If Edge Endpoints Dashboard configuration is present, when users add segment/tags to the Tyk OAS API Definition, their corresponding URLs are populated in the servers section of the OAS document.
- Listen path field is now hidden from the API Designer UI, when the screen presents a versioned or internal API.

#### Changed

- Extended existing `x-tyk-gateway` OAS documentation and improved the markdown generator to produce a better-formatted documentation for `x-tyk-gateway` schema.
- Complete change of Universal Data Graph configuration UI. New UI is now fully functional and allows configuration of all existing datasources (REST, GraphQL and Kafka).
- Changed look & feel of request logs for GraphQL Playground. It is now possible to filter the logs and display only the information the user is interested in.

#### Fixed

- Fixed: OAS API definition showing management gateway URL even if segment tags are present in cloud. From now on OAS servers section would be filled with edge endpoint URLs if configured.
- Adding a path that contains a path parameter, doesn’t throw an error anymore on the Dashboard UI, and creates default path parameter description in the OAS.

## Updated Versions

Tyk Dashboard 4.3 ([docker images](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=1&name=4.3.0))

## Upgrade process

Follow the [standard upgrade guide]({{< ref "/content/upgrading-tyk.md" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

{{< note success >}}
**Note**  

Note: Upgrading the Golang version implies that all the Golang custom plugins that you are using need to be recompiled before migrating to 4.3 version of the Gateway. Check our docs for more details [Golang Plugins]({{< ref "/content/plugins/supported-languages/golang.md" >}}).
{{< /note >}}
