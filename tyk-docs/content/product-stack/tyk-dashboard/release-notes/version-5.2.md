# What’s Changed?

Paragraph received from PMs is pasted here

## Changelog

### Added

- **TT-9133:** Added support to use [request context variables]({{< ref "context-variables#the-available-context-variables-are" >}}) in UDG from a global or data source header. This feature can be very useful for customised transformation of request data, for example, in converting a form-based POST into a JSON-based PUT.
- **TT-9448:** Implemented UI for Request/Response Body Transformation middleware.
- **TT-8993:** Added a pre-filled default value to the data source name field when the user adds a new data source via the _Configure Data Source_ screen. The data source name is pre-filled with a value in the format _fieldName_typeName_, where _typeName_ is _Query_, _Mutation_, _Subscription_ etc.
- **TT-9309:** Enable MDCB to track the number of connected gateways and gateway health info.
- **TT-9134:** Added a way to configure global headers for any UDG, that will by default be forwarded to all data sources.
- **TT-8959:** Added a new timeout option to allow granular control of cache timeout at the endpoint level.
- **TT-8959:** Enable MDCB to track the number of connected gateways and gateway health info.

### Changed
- **TT-9434:** Updated the process for creating a new API so that users stay on the same screen after saving. This means users are able to continue configuring the API without interruption. Previously, users were redirected to the APIs list after saving.
- **TT-9134:** Allow header injections to be configured for any UDG so that when the consumer request hits the Gateway it will be forwarded to all data sources by default.

### Fixed
- **TT-9467:** Fixed a bug where the _most popular endpoints_ was not displayed when filtering per API ("enable_aggregate_lookups": true) and the dashboard is using SQL aggregated analytics.
- **TT-9233:** Fixed a security issue where static and dynamic mTLS requests, with an expired certificate, could be proxied upstream.
- **TT-9275:** Fixed "show analytics for <date>" dropdown option on Gateway usage chart.
- **TT-9365:** Fixed a bug where a negative value could be provided in the Enforced Timeout configuration.
