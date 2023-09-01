# Tyk Dashboard (Licensed) 5.2 Release Notes

### Breaking Changes

This release has no breaking changes.

## Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience of Tyk Dashboard.

**PMs summary paragraph is included here**

## Support Lifetime

Full support for this release ends on May 2024. Extended support ends on May 2025.

## Downloads

Tyk Dashboard 5.2 - [docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.0/images/sha256-075df4d840b452bfe2aa9bad8f1c1b7ad4ee06a7f5b09d3669f866985b8e2600?tab=vulnerabilities)

## Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "/upgrading-tyk" >}}) page for further guidance with respect to upgrade strategy.

## Changelog

### Added

- Added a new endpoint, _/system/stats_, to provide API insights and operations statistics. These statistics include _Create_, _Read_, _Update_, and _Delete_ operations. This feature equips managers to proactively inform customers about plan updates, while the endpoint's customisable data display and flexible date filtering options, offer comprehensive insights into usage trends and management activities.

- Added enhanced Gateway usage reporting. Tyk Dashboard now offers expanded usage reporting, giving customers valuable insights into their _hybrid_ and _standard_ Gateways. With this addition, users can efficiently monitor deployed gateways and track monthly maximum Gateway usage.

- Added support for API developers to easily configure both request and response body transformations for more precise data management. Define input data, craft transformation templates and test them against specific inputs for reliable customization.

- Adding a new data source is simpler. The default value for the data source name is pre-filled, saving time. The data source name is pre-filled in the format _fieldName_typeName_, with _typeName_ being the name of any GraphQL type.


### Changed

- Improved the flow when creating an API within the API Designer so that you remain on the same screen after saving. This means you can continue editing without having to navigate back to the screen to make subsequent changes.

- Updated the screen for configuring and saving UDG data sources. The _Save_ button has been replaced with _Save & Update API_ button and users no longer need to additionally click _Update_ at the top of the screen to persist changes. Saving a UDG data source is now simpler and quicker.

- Update the Dashboard with enhanced API usage monitoring. Users now benefit from an insightful chart on the _Licensing Statistics_ page, detailing: maximum, minimum, average API counts, in addition to active API counts. Flexible date filtering, license limit reference lines and the ability to toggle between line and bar graphs empowers users to monitor usage effortlessly, ensuring license adherence.

- Update the Dashboard with enhanced API usage visibility. A new chart has been introduced on the _License Statistics_ page, presenting the number of deployed _Data Planes_. This addition enables users to easily monitor their _Data Plane_ usage and demonstrate compliance to contract limits.

### Fixed

- Fixed an issue where _advanced_cache_config_ data was absent in the _Raw Editor_. This fix now ensures visibility of this data. Furthermore, API modifications in the _Designer_ no longer lead to data loss, safeguarding cache configuration consistency. The UI now offers a clear view of advanced cache settings, including Timeout and Cache response codes fields.

- Fixed an issue with JWT claim names containing spaces. Previously 403 errors were raised when using tokens containing such claims.

- Fixed an issue where _popular endpoints_ data was not displayed in Tyk Dasboard with SQL aggregated analytics enabled. Users can now view _popular endpoints_ when viewing _Traffic Activity_ per API or filtering by API with SQL aggregated analytics enabled.

- Fixed a potential security vulnerability where static or dynamic mTLS requests with expired certificates could be proxied upstream.

- Fixed an issue in the _API Activity_ dashboard where users were unable to view request analytics for a specific date. Subsequently, users can now make informed decisions based on access to this data. 

- Fixed an issue where the _enforced timeout_ configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.

- Fixed an issue in Tyk Dashboard where duplicate API names and listen paths could be created. Configurations are now unique.

- Fixed a critical issue in MDCB deployments, relating to _Control Plane_ stability. The _Control Plane_ Gateway was found to crash with a panic when creating a Tyk OAS API. The bug has been addressed, ensuring stability and reliability in such deployments.

- Fixed an issue with _MongoDB_ connection strings. To ensure consistent compatibility with both _mgo_ and _mongo-go_ drivers, users should now utilise URL-encoded values within the _MongoDB_ connection string's username and password fields when they contain characters like "?", "@". This resolves the need for different handling across _MongoDB_ drivers.


### Community Contributions

Special thanks to the following members of the Tyk community for their contributions in this release:

**Example**

Thanks to PatrickTaibel for fixing an issue where global_size_limit was not enabling request size limit middleware.

### Further Information

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading tyk, technical support and how to contribute.
