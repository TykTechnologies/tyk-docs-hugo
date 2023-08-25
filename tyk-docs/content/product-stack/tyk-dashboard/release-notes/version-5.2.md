# What’s New?

We're thrilled to bring you some exciting enhancements and crucial fixes to make your Tyk experience even better. Let's dive into the details:

## Changelog

### Added

- **TT-8809:** We've introduced open telemetry support for GraphQL proxy and UDG, allowing you to gain end-to-end visibility into requests. This enhancement simplifies troubleshooting and fault diagnosis by providing insights from the very start to the final destination.

- **TT-9133:** Say hello to a powerful addition! Now you can use [request context variables]({{< ref "context-variables#the-available-context-variables-are" >}}) in UDG from a global or data source header. This feature is a game-changer for customizing request data transformations. Imagine converting a form-based POST into a JSON-based PUT with ease.

- **TT-9448:** We've rolled out a user-friendly UI for Request/Response Body Transformation middleware. It's now simpler than ever to manage and optimize how data flows through Tyk.

- **TT-8993:** Adding a new data source is smoother than ever. We've pre-filled the default value for the data source name, saving you time. It's now in the format _fieldName_typeName_, with _typeName_ being _Query_, _Mutation_, _Subscription_, and more.

- **TT-9309:** MDCB now helps you keep a close eye on connected gateways and their health. Stay on top of your network's performance effortlessly.

- **TT-9134:** We've made global headers configuration a breeze for any UDG. These headers will be forwarded to all data sources by default, enhancing your control over data flow.

- **TT-8959:** Introducing a new timeout option, offering you granular control over cache timeout at the endpoint level. Your data, your way.

### Changed

- **TT-9434:** Your feedback matters! We've updated the API creation process in Tyk Dashboard to ensure a seamless experience. Now, after saving, you remain on the same screen, so you can keep configuring without any interruptions.

- **TT-9134:** Header injections configured for any UDG now automatically forward to all data sources. Your configurations are now more efficient and effective.

- **TT-7152:** We've listened to your suggestions and improved usability when configuring and saving UDG data sources. No more unnecessary clicks—simply hit _Save_ and your data source configuration is securely stored.

### Fixed

- **TT-6455:** We've addressed an issue with JWT claim names containing spaces. No more 403 errors when using tokens with such claims; everything works smoothly now.

- **TT-9467:** Good news! The _most popular endpoints_ display is back in action when filtering per API ("enable_aggregate_lookups": true) and the dashboard is utilizing SQL aggregated analytics.

- **TT-9233:** Security is paramount. We've fixed a potential security vulnerability where static and dynamic mTLS requests with expired certificates could be proxied upstream.

- **TT-9275:** The "show analytics for <date>" dropdown option on the Gateway usage chart is now working flawlessly.

- **TT-9365:** Negative values are a thing of the past. The Enforced Timeout configuration no longer accepts negative inputs.

- **TT-8526:** Queries with array parameters are now handled smoothly. UDG no longer drops these parameters from the final request URL sent upstream.

- **TT-9747:** We've resolved an issue in Tyk Dashboard where duplicate API names and listen paths could be created. Your configurations are now as unique as they should be.

- **TT-7550:** Introspecting GraphQL schemas is now better than ever. We've fixed an issue that previously caused errors when dealing with custom root types other than Query, Mutation, or Subscription.

We're committed to enhancing your Tyk experience. These additions, changes, and fixes are designed with you in mind. Thanks for being a part of the Tyk journey!

If you have any questions or feedback, don't hesitate to reach out. Happy Tykking! 🚀
