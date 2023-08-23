## Changelog for Tyk Gateway:

### Fixed:
- **TT-9747:** Fixed an issue where the user was able to create multiple APIs with the same name and listen path.
- **TT-8526:** Fixed an issue where UDG was not handling query parameters for REST data source correctly, when parameter was an array.
- **TT-7550:** Fixed an issue where an error was raised when introspecting GraphQL schemas containing customized root types other than Query, Mutable or Subscription. Subsequently, introspection was unavailable for these types of schemas.

### Added:
- **TT-8809:** Added tracing to GraphQL execution for GraphQL proxy only and UDG.
- **TT-8005:** Added websocket protocol _graphql-transport-ws_.
- **TT-7488:** Added OAS Response body transformation contract within the OAS API Definition.
- **TT-9133:** Added support for request context variables in UDG with global scope and per data source scope.

### No Release Notes Available:
- **TT-9527**
- **TT-9504**
- **TT-9460**
- **TT-9272**
- **TT-9192**

### Miscellaneous:
- **TT-9749:** Fixed a bug where allowed/blocked IP validation error in API definition suppressed all other API definition validation errors.
- **TT-9525:** Emit a signal of API change when the OAS migration script is executed, to notify data planes about the change in API structure in the database.
- **TT-9434:** Routes the user to the newly created API instead of all APIs/UDGs after clicking SAVE for the first time in the API designer.
- **TT-9152:** Allows the user to save the data source settings and update the API with one click.
- **TT-8515:** Implemented and exposed a new function ctx.GetOASDefinition which provides access to the OAS API definition from within custom GoPlugins.
- **TT-7489:** Modified: Response processor doesn't need to be configured to enable transform response body middleware anymore.

## Changelog for Tyk Dashboard:

### Fixed:
- **TT-9467:** Fixed a bug where the _most popular endpoints_ was not displayed when filtering per API ("enable_aggregate_lookups": true) and the dashboard is using SQL aggregated analytics.
- **TT-9233:** Fixed a security issue where static and dynamic mTLS requests with an expired certificate could be proxied upstream.
- **TT-9275:** Fixed "show analytics for <date>" dropdown option on Gateway usage chart.
- **TT-9365:** Fixed a bug where a negative value could be provided in the Enforced Timeout configuration.

### Added:
- **TT-9448:** Implemented UI for Request/Response Body Transformation middleware.
- **TT-8993:** Added a new timeout option to allow granular control of cache timeout at the endpoint level.
- **TT-9309:** Enable MDCB to track the number of connected gateways and gateway health info.
- **TT-9134:** feature: added a way to configure global headers for any UDG, that will by default be forwarded to all data sources.
- **TT-8993:** Added a new timeout option to allow granular control of cache timeout at the endpoint level.
- **TT-8959:** Enable MDCB to track the number of connected gateways and gateway health info.

### Updated:
- **TT-9134:** Modified: Added a way to configure global headers for any UDG, that will by default be forwarded to all data sources.

### No Release Notes Available:
- **TT-9712**
- **TT-9687**
- **TT-9675**
- **TT-9636**
- **TT-9534**
- **TT-9194**
- **TT-8183**

