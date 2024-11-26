---
title: Tyk Dashboard v5.1
description: "Release notes 5.1 for Tyk Dashboard"
tags: ["Release notes", "Dashboard", "5.1"]
main: menu
---

**Licensed Protected Product**

### Support Lifetime
Minor releases are supported until our next minor comes out in Q3.

## 5.1 Release Notes

##### Release Date 23 June 2023

#### Breaking Changes
**Attention warning*: Please read carefully this section. We have two topics to report:
 
##### Golang Version upgrade
Our Dashboard is using [Golang 1.19](https://tip.golang.org/doc/go1.19) programming language starting with the 5.1 release. This brings improvements to the code base and allows us to benefit from the latest features and security enhancements in Go. Don’t forget that, if you’re using GoPlugins, you'll need to [recompile]({{< ref "plugins/supported-languages/golang#upgrading-your-tyk-gateway" >}}) these to maintain compatibility with the latest Gateway.

##### Tyk OAS APIs
To provide a superior experience with OAS APIs, we have made some changes which include various security fixes, improved validation etc. Upgrading to v5.1 from v4.x.x may be irreversible, rollback to v4.x.x could break your OAS API definitions. For this reason, we recommend making a database backup so you can always restore from the backup (of v4.X.X) in case you encounter a problem during the upgrade. Please refer to our guides for detailed information on [upgrading Tyk]({{<ref "upgrading-tyk">}}) and [how to back up tyk]({{<ref "frequently-asked-questions/how-to-backup-tyk">}})

#### Deprecation
There are no deprecations in this release.

#### Upgrade Instructions
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade instructions.

#### Release Highlights

##### Dashboard Analytics for API Ownership

When we implemented Role Based Access Control and API Ownership in Tyk
Dashboard, we unlocked great flexibility for you to assign different roles to
different users and user groups with visibility and control over different
collections of APIs on your Gateway. Well, from 5.1 we have added a new Role,
which layers on top of the existing “Analytics” role and can be used to restrict
a user’s access, within the Dashboard Analytics screens, to view only the
statistics from APIs that they own; we’ve called this “Owned Analytics”. Due to
the way the analytics data are aggregated (to optimize storage), a user granted
this role will not have access to the full range of charts. Take a look at the
documentation for a full description of this new [user role]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}).

##### Import API examples from within the Dashboard

In 5.0 we introduced the possibility to import API examples manually or via
[_Tyk Sync_]({{< ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}). We have now extended this feature and it is now possible to do this without
leaving the Dashboard. When having an empty “Data Graphs” section you will be
presented with 3 icon buttons with one of them offering you to import an Example
API.

If you already have Data Graphs in your Dashboard you can either click on
the “Import” button or click on the “Add Data Graph“ button and select “Use
example data graph“ on the next screen. The examples UI will present you with a
list of available examples. You can navigate to the details page for every
example and import it as well from the same page.

##### Improved nested GraphQL stitching

Before this release, it was only possible to implement nested GraphQL stitching
(GraphQL data source inside another data source) by using a REST data source and
providing the GraphQL body manually. We have now extended the GraphQL data source so
that you can provide a custom operation and therefore access arguments or object
data from parent data sources.

To use this feature you will only need to check the “Add GraphQL operation“ checkbox when creating a GraphQL data source.

##### Import UDG API from OAS 3.0.0

We added a [Dashboard API Endpoint]({{< ref "universal-data-graph/datasources/rest#automatically-creating-rest-udg-configuration-based-on-oas-specification" >}}) that is capable of taking an OAS 3.0.0 document and converting it into a UDG API.

This will generate the full schema as well as the data sources that are defined inside the OAS document.

##### Changed default RPC pool size for MDCB deployments

We have reduced the default RPC pool size from 20 to 5. This can reduce the CPU and
memory footprint in high throughput scenarios. Please monitor the CPU and memory
allocation of your environment and adjust accordingly. You can change the pool
size using [slave_options.rpc_pool_size]({{< ref "tyk-oss-gateway/configuration#slave_optionsrpc_pool_size" >}})

#### Downloads

[docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.1/images/sha256-8cde3c6408b9a34daa508a570539ca6cd9fcb8ee5c4790abe907eaecddc1bd9b?context=explore)


#### Changelog

##### Added

- Added two endpoints to the dashboard to support the retrieval of example API definitions. One for fetching all examples and another for fetching a single example.
- Added a way to display UDG examples from the [tyk-examples](https://github.com/TykTechnologies/tyk-examples) repository in the Dashboard UI
- Added screens in Dashboard New Graph flow, that allows users to choose between creating a graph from scratch or importing one of our example graphs
- Added a screen to display details of a UDG example API
- Added a feature to display a full [_Tyk Sync_]({{<ref "/api-management/automations#synchronize-tyk-environment-with-github-repository" >}}) command that will allow a user to import an example UDG into their Dashboard
- Added `/examples` endpoint to Dashboard API that returns a list of available API examples that can later be imported into the Dashboard `GET /api/examples`
- Added `/data-graphs/data-sources/import` endpoint to Dashboard API that transforms an OpenAPI document into UDG config and publishes it in Dashboard `POST /api/data-graphs/data-sources/import`
- Added query param `apidef=true` to example detail endpoint in Dashboard API to retrieve the API definition of an example
- Added new `owned_analytics` user permission which restricts the user's access only to analytics relating to APIs they own. These are the _API Activity Dashboard Requests_ and _Average Errors Over Time_ charts in the Tyk Dashboard. Note that it is not currently possible to respect API Ownership in other aggregated charts

##### Changed

- Tyk Dashboard updated to Go 1.19
- Updated npm package dependencies of Dashboard, to address critical and high CVEs
- Changed the field mapping tickbox description in GUI to be 'Use default field mapping'

##### Fixed

- Fixed an issue when using custom authentication with multiple authentication methods. Custom authentication could not be selected to provide the base identity
- Fixed an issue where the login URL was displayed as undefined when creating a TIB Profile using LDAP as a provider
- Fixed an issue where it was not possible to download Activity by API or Activity by Key from the Dashboard when using PostgreSQL for the analytics store
- Fixed an issue where a new user could be stuck in a password reset loop in the dashboard if TYK_DB_SECURITY_FORCEFIRSTLOGINPWRESET was enabled
- Fixed an issue where the `ssl_force_common_name_check` flag was disappearing. The flag was disappearing after being updated via dashboard UI raw API editor and a subsequent page reload. It was also disappearing when updating the API Definition via the GW/DB API.
- Fixed an issue where a user could update their email address to match that of another user within the same organization
- Fixed an issue where users without `user:write` permission were able to update their permissions through manipulation of Dashboard API calls
- Fixed an issue where the versions endpoint returned APIs that were not owned by the logged-in user
- Fixed an issue where the log browser showed analytics for APIs not owned by the logged-in user
- Fixed an issue that prevented non-admin users from seeing _Endpoint Popularity_ data in the Tyk Dashboard
- Fixed an issue where additional data was returned when requesting analytics with p=-1 query when using SQL for the analytics store
- Fixed an issue so that filtering by API now respects API Ownership in three Dashboard charts.

  - Gateway Dashboard - API Activity Dashboard - Requests
  - Activity by API - Traffic Activity per API
  - Errors - Average Errors Over Time

- Fixed an issue so that the Log Browser now respects API Ownership. A user will now only be able to see logs for the APIs that they are authorized to view
- Fixed filters for the Log Browser, Errors - Average Errors Over Time and API Activity Dashboard - Requests so that a user can only select from versions of APIs for which they have visibility
- Fixed UI bug so that data graphs created with multiple words are [sluggified](https://www.w3schools.com/django/ref_filters_slugify.php#:~:text=Definition%20and%20Usage,ASCII%20characters%20and%20hyphens%20(%2D).), i.e. spaces are replaced with a hyphen `-`
- Fixed an issue with routing, which was sending the user to a blank screen while creating a new Data Graph or importing an example API

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### API Documentation

- [OpenAPI Document]({{<ref "tyk-dashboard-api">}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/27225007-374cc3d0-f16d-4620-a435-68c53553ca40)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
