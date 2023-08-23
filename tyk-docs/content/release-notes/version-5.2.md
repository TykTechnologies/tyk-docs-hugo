## Changelog for Tyk Gateway:

### Fixed:
- **TT-9747:** Fix: Fixed an issue where the user was able to create multiple APIs with the same name and listen path.
- **TT-8526:** fix: fixed an issue where UDG was not handling query parameters for REST data source correctly, when parameter was an array.

### Added:
- **TT-8809:** Added tracing to graphql execution for grapqhl proxy only and UDG.
- **TT-8005:** Added: new recommended websocket protocol graphql-transport-ws.
- **TT-7488:** Added: Implemented OAS Response Body Transformation contract within the OAS API Definition.

### Updated:
- **TT-9133:** Modified: Added support for request context variables in UDG - globally and per data source as well.

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
- **TT-9309:** [Internal] Lint swagger schema in pull requests.
- **TT-9152:** Allows the user to save the data source settings and update the API with one click.
- **TT-8515:** Implemented and exposed a new function ctx.GetOASDefinition which provides access to the OAS API definition from within custom GoPlugins.
- **TT-7550:** fix: introspection not working for custom root operation types.
- **TT-7489:** Modified: Response processor doesn't need to be configured to enable transform response body middleware anymore.

## Changelog for Tyk Dashboard:

### Fixed:
- **TT-9467:** Fixed a bug in the Dashboard's 'Most popular endpoints' section when using SQL Aggregate analytics.
- **TT-9233:** Fixed: mTLS request with an expired certificate allowed the request to be proxied upstream in static mTLS and dynamic mTLS.

### Added:
- **TT-9448:** Implemented UI for Request/Response Body Transformation middleware.
- **TT-8993:** Added a new timeout option to allow granular control of cache timeout at the endpoint level.

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

### Miscellaneous:
- **TT-9365:** Fixed a bug where a negative value could be provided in the Enforced Timeout configuration.
- **TT-9309:** Enable MDCB to track the number of connected gateways and gateway health info.
- **TT-9275:** Fixed "show analytics for <date>" dropdown option on Gateway usage chart.
- **TT-9233:** Fixed: mTLS request with an expired certificate allowed the request to be proxied upstream in static mTLS and dynamic mTLS.
- **TT-9134:** feature: added a way to configure global headers for any UDG, that will by default be forwarded to all data sources.
- **TT-8993:** Added a new timeout option to allow granular control of cache timeout at the endpoint level.
- **TT-8959:** Enable MDCB to track the number of connected gateways and gateway health info.

Feel free to adjust or format it further as needed!