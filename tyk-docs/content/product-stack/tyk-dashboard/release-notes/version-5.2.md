# Tyk Dashboard 5.2 Release Notes

## Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience of Tyk Dashboard.

**PMs summary paragraph is included here**

## Support Lifetime

Full support for this release ends on May 2024. Extended support ends on May 2025.

## Downloads

Tyk Dashboard 5.2 - [docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.0/images/sha256-075df4d840b452bfe2aa9bad8f1c1b7ad4ee06a7f5b09d3669f866985b8e2600?tab=vulnerabilities)

## Changelog

### Added

- **TT-8809:** Added open telemetry support for GraphQL proxy and UDG, allowing end-to-end visibility into requests. This enhancement simplifies troubleshooting and fault diagnosis by providing useful request insights.

- **TT-9133:** Added [request context variables]({{< ref "context-variables#the-available-context-variables-are" >}}) in UDG global or data source headers. This feature enables customising request data transformations, such as converting a form-based POST into a JSON-based PUT.

- **TT-9448:** Added support for API developers to easily configure both request and response body transformations for more precise data management. Define input data, craft transformation templates and test them against specific inputs for reliable customization.

- **TT-8993:** Adding a new data source is simpler. The default value for the data source name is pre-filled, saving time. The data source name is prefilled in the format _fieldName_typeName_, with _typeName_ being _Query_, _Mutation_ _or_ _Subscription_.

- **TT-8833:** Added support for improved gateway visibility. MDCB now helps monitor connected gateways and groups. This facilitates smoother operations and ensures accurate setup. Features such as edge gateway visualisation and enhanced licensing management are provided for further control.

- **TT-9134:** Added support for simpler configuration of global headers for UDG. These headers will be forwarded to all data sources by default, enhancing control over data flow.

- **TT-8959:** Added a new timeout option, offering granular control over cache timeout at the endpoint level.

### Changed

- **TT-9434:** Updated the API creation process in Tyk Dashboard so that users remain on the same screen after saving. This means users can continue editing without having to navigate back to the screen to make subsequent changes.

- **TT-9134:** Updated header injections configured for any UDG so that they are automatically forwarded to all data sources.

- **TT-7152:** Updated the screen for configuring and saving UDG data sources. The additional _Update_ button has been removed and when _Save_ is clicked the data source configuration is persisted. Saving a UDG data source is now simpler.

### Fixed

- **TT-6455:** Fixed an issue with JWT claim names containing spaces. Previously 403 errors were raised when using tokens containing such claims.

- **TT-9467:** Fixed an issue where _popular endpoints_ data was not displayed in Tyk Dasboard with SQL aggregated analytics enabled. Users can now view _popular endpoints_ when viewing _Traffic Activity_ per API or filtering by API with SQL aggregated analytics enabled.

- **TT-9233:** Fixed a potential security vulnerability where static and dynamic mTLS requests,with expired certificates, could be proxied upstream.

-**TT-9275:** Fixed an issue in the _API Activity_ dashboard where users were unable to view request analytics for a specific date. Subsequently, users can now make informed decisions based on access to this data. 

- **TT-9365:** Fixed an issue where the _enforced timeout_ configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.

- **TT-8526:** Fixed an issue with UDG queries containing array parameters. UDG no longer drops these parameters from the final request URL sent upstream.

- **TT-9747:** Fixed an issue in Tyk Dashboard where duplicate API names and listen paths could be created. Configurations are now unique.

- **TT-7550:** Fixed an issue with introspecting GraphQL schemas that previously raised an error when dealing with custom root types other than _Query_, _Mutation_, or _Subscription_.

### Community Contributions

Special thanks to the following members of the Tyk community for their contributions in this release:

**Example**

Thanks to PatrickTaibel for fixing an issue where global_size_limit was not enabling request size limit middleware.

### Breaking Changes

This release has no breaking changes.

### Further Information

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading tyk, technical support and how to contribute.
