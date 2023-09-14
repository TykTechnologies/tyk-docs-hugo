# Tyk Dashboard 5.2 Release Notes

**Licensed**

## Breaking Changes

This release has no breaking changes.

## Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience with Tyk Dashboard. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#changelog">}}) below.

#### Configure Caching For Each API Endpoint

We’ve added the ability to [configure]({{< ref "/basic-config-and-security/reduce-latency/caching/advanced-cache#advanced-caching-by-endpoint" >}}) per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services. While doing this, we’ve also fixed a longstanding issue within the *Tyk Dashboard* so that you can configure more of the [advanced caching]({{< ref "/basic-config-and-security/reduce-latency/caching/advanced-cache#configuring-endpoint-caching-in-the-dashboard" >}}) options from within the UI.

#### Added Configurable Middleware For Body Transformations For Tyk OAS APIs

With this release we are adding the much requested *Body Transformations* to *Tyk OAS API Definition*. You can now [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) middleware for both [request]({{< ref "transform-traffic/request-body" >}}) and [response]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) *Body Transformations* and - as a *Tyk Dashboard* user - you’ll be able to do so from within our simple and elegant API Designer tool. Visually test and preview *Body Transformations* from within the API Designer.

#### Track Usage Of License APIs, Gateways And Distributed Data Planes Over Time

Within the Dashboard UI, we’ve enhanced the *Licensing* information page, so that you can visualise your usage of licensed APIs, *Gateways* and distributed *Data Planes* over time. This allows visualisation of deployed and active APIs using a range of different types of interactive charts.


## Support Lifetime

Full support for this release ends on May 2024. Extended support ends on May 2025.

## Downloads

Tyk Dashboard 5.2 - [docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.0/images/sha256-075df4d840b452bfe2aa9bad8f1c1b7ad4ee06a7f5b09d3669f866985b8e2600?tab=vulnerabilities)

## Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "/upgrading-tyk" >}}) page for further guidance with respect to upgrade strategy.

## API Changes

The following is a list of API changes in this release. Please visit our [Postman collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview) for further information on our APIs.

- Added a new [endpoint]({{< ref "/tyk-dashboard-api" >}}), */system/stats*, to provide insight and operational statistics on total and active APIs deployed. The endpoint's flexible date filtering options, equip users to obtain comprehensive insights into usage trends.

## Changelog

#### Added

- Added support for API developers to easily [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) both request and response *Body Transformations* for more precise data management when working with *Tyk OAS* APIs. Define input data, craft transformation templates and test them against specific inputs for reliable customization.

- Adding a new [data source]({{< ref "universal-data-graph/udg-getting-started/connect-datasource#3-configure-datasource-details" >}}) is simpler when working with *UDG*. The default value for the *data source name* is pre-filled, saving time. The *data source name* is pre-filled in the format *fieldName_typeName*, with *typeName* being the name of any GraphQL type.

- Added a new [endpoint]({{< ref "/tyk-dashboard-api" >}}), */system/stats*, to provide insight and operational statistics on total and active APIs deployed. The endpoint's flexible date filtering options, equip users to obtain comprehensive insights into usage trends.


#### Changed

- Improved the flow when creating an API within the *API Designer* so that you remain on the same screen after saving. This means you can continue editing without having to navigate back to the screen to make subsequent changes.

- Updated the [screen]({{< ref "/universal-data-graph/udg-getting-started/connect-datasource" >}}) for configuring and saving *UDG* data sources. The *Save* button has been replaced with *Save & Update API* button and users no longer need to additionally click *Update* at the top of the screen to persist changes. Saving a *UDG* data source is now simpler and quicker.

- Updated the *Dashboard* with enhanced API usage monitoring. Users now benefit from an insightful chart on the *Licensing Statistics* page, detailing: maximum, minimum and average counts of created and active APIs. Flexible date filtering, license limit reference lines and the ability to toggle between line and bar graphs empowers users to monitor usage effortlessly, ensuring license adherence.

- A new chart has been introduced on the *License Statistics* page that presents the number of deployed *Data Planes*. This addition enables users to easily monitor their *Data Plane* usage and nearness to their contract limits.

#### Fixed

- Fixed an issue where *advanced_cache_config* data was absent in the *Raw Editor*. This fix now ensures that *advanced_cache_config* can be configured. Furthermore, API modifications in the *Designer* no longer lead to data loss, safeguarding cache configuration consistency. The UI now offers a clear view of advanced cache settings, including the new *Timeout* field and *Cache* response codes fields.

- Fixed an issue with *JWT claim names* containing spaces. Previously 403 errors were raised when using tokens containing such claims.

- Fixed an issue where *popular endpoints* data was not displayed in *Tyk Dashboard* with *SQL aggregated analytics* enabled. Users can now view *popular endpoints* when viewing *Traffic Activity* per API or filtering by API with *SQL aggregated analytics* enabled.

- Fixed a potential security vulnerability where *static* or *dynamic mTLS* requests with expired certificates could be proxied upstream.

- Fixed an issue in where duplicate API names and listen paths could be created. Configurations are now unique.

- Fixed an issue in the *API Activity* dashboard where users were unable to view request analytics for a specific date. Subsequently, users can now make informed decisions based on access to this data. 

- Fixed an issue where the *enforced timeout* configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.

- Fixed an issue in *Tyk Dashboard* where duplicate APIs could be created with the same names and listen paths if you clicked multiple times on the *save* button in the API Designer. Now, when you save your new API, you are taken to the list of APIs.

- Fixed an issue with *MongoDB* connection strings. To ensure consistent compatibility with both *mgo* and *mongo-go* drivers, users should now utilise URL-encoded values within the *MongoDB* connection string's username and password fields when they contain characters like "?", "@". This resolves the need for different handling across *MongoDB* drivers.


## Further Information

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading tyk, technical support and how to contribute.
