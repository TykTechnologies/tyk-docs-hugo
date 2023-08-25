# What’s Changed?

Paragraph received from PMs is pasted here

## Changelog

### Added

- **TT-8809:** Added open telemetry support for GraphQL proxy and UDG to allow end to end visibility of requests to facilitate troubleshooting and fault diagnosis.
- **TT-9133:** Added support to use [request context variables]({{< ref "context-variables#the-available-context-variables-are" >}}) in UDG from a global or data source header. This feature can be very useful for customised transformation of request data, for example, in converting a form-based POST into a JSON-based PUT.
- **TT-9448:** Implemented UI for Request/Response Body Transformation middleware.
- **TT-8993:** Added a pre-filled default value to the data source name field when the user adds a new data source via the _Configure Data Source_ screen. The data source name is pre-filled with a value in the format _fieldName_typeName_, where _typeName_ is _Query_, _Mutation_, _Subscription_ etc.
- **TT-9309:** Enable MDCB to track the number of connected gateways and gateway health info.
- **TT-9134:** Added a way to configure global headers for any UDG, that will by default be forwarded to all data sources.
- **TT-8959:** Added a new timeout option to allow granular control of cache timeout at the endpoint level.
- **TT-8959:** Enable MDCB to track the number of connected gateways and gateway health info.


### Changed
- **TT-9434:** Updated the process for creating a new API in Tyk Dashboard so that users stay on the same screen after saving, allowing them to continue configuring the API without interruption. Previously, users were redirected to the APIs list after saving.
- **TT-9134:** Allow header injections configured for any UDG to be forwarded to all data sources by default.
- **TT-7152:** Improved the usability when configuring and saving a UDG data source in Tyk Dashboard. Previously, the user had to click _Save_ and then _Update_ to ensure the data source was saved when changin tabs. The user now clicks _Save_ and the data source configuration is persisted.


### Fixed
- **TT-6455:** Fixed an issue encountered with JWT claim names containing spaces. Requests with tokens containing such claims were denied and a 403 error was raised.
- **TT-9467:** Fixed an issue where the _most popular endpoints_ was not displayed when filtering per API ("enable_aggregate_lookups": true) and the dashboard is using SQL aggregated analytics.
- **TT-9233:** Fixed a security issue where static and dynamic mTLS requests, with an expired certificate, could be proxied upstream.
- **TT-9275:** Fixed "show analytics for <date>" dropdown option on Gateway usage chart.
- **TT-9365:** Fixed an issue where a negative value could be provided in the Enforced Timeout configuration.
- **TT-8526:** Fixed an issue with UDG API queries containing an array parameter. UDG was dropping the parameter from the final request URL sent upstream.
- **TT-9747:** Fixed an issue in Tyk Dashboard where it was possible to create API with duplicate names and listen path.
- **TT-7550:** Fixed an issue where an error was raised when introspecting GraphQL schemas containing customised root types other than Query, Mutation or Subscription. Subsequently, introspection was unavailable for these types of schemas.