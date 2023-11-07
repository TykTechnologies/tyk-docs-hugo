---
title: Tyk Gateway v4.2
description: "Tyk Gateway 4.2 release notes"
tags: ["release notes", "Tyk Gateway", "v4.2", "4.2"]
aliases:
    - /release-notes/version-4.2/
---

# Major features

## GraphQL Federation improvements

### Changed GUI in Universal Data Graph configuration section.

A new GUI introduces enhancements to the user experience and more consistent user journey for UDG. 
This change does not yet cover all possible use cases and is released with a feature flag. To enable the new GUI, analytics.conf needs the following setting:

```
"ui": {
  "dev": true
}
```

What’s possible with this change:
- Importing GraphQL schema created outside of Tyk (formats accepted .json, .graphql, .grahqls)
- Creating GraphQL schema in Tyk using schema editor
- Hide/Unhide schema editor to focus on graphical representation of the schema
- Resizing schema editor to adjust workspace look & feel to user preferences
- Improved search in schema editor (search and search & replace available)
- Quick link to UDG documentation from schema editor

> Note: Full configuration of new Universal Data Graph is not yet possible in the GUI, however any UDGs created earlier will not be broken and will work as previously. 

## Changes to federation entities
### Defining the base entity
Entities must be defined with the `@key` directive. The fields argument must reference a field by which the entity can be uniquely identified. Multiple primary keys are possible. For example:

Subgraph 1 (base entity):
```
type MyEntity @key(fields: "id") @key(fields: "name") {
  id: ID!
  name: String!
}
```
 Attempting to extend a non-entity with an extension that includes the @key directive or attempting to extend a base entity with an extension that does not include the @key directive will both result in errors.

### Entity stubs

Entities cannot be shared types (be defined in more than one single subgraph).
If one subgraph references a base entity (an entity defined in another subgraph), that reference must be declared as a stub (stubs look like an extension without any new fields in federation v1). This stub would contain the minimal amount of information to identify the entity (referencing exactly one of the primary keys on the base entity regardless of whether there are multiple primary keys on the base entity). For example, a stub for MyEntity from Subgraph 1 (defined above):

Subgraph 2 (stub)
```
extend type MyEntity @key(fields: "id") {
  id: ID! @external
}
```

### Supergraph extension orphans
It is now possible to define an extension for a type in a subgraph that does not define the base type.
However, if an extension is unresolved (an extension orphan) after an attempted federation, the federation will fail and produce an error.

### Improved Dashboard UI and error messages
GraphQL-related (for example when federating subgraphs into a supergraph) errors in the Dashboard UI will show a lean error message with no irrelevant prefixes or suffixes.

Changed the look & feel of request logs in Playground tab for GraphQL APIs. New component presents all logs in a clearer way and is easier to read for the user

### Shared types
Types of the same name can be defined in more than one subgraph (a shared type). This will no longer produce an error if each definition is identical.
Shared types cannot be extended outside of the current subgraph, and the resolved extension must be identical to the resolved extension of the shared type in all other subgraphs (see subgraph normalisation notes). Attempting to extend a shared type will result in an error.
The federated supergraph will include a single definition of a shared type, regardless of how many times it has been identically defined in its subgraphs.

### Subgraph normalisation before federation
Extensions of types whose base type is defined in the same subgraph will be resolved before an attempt at federation. A valid example involving a shared type:

Subgraph 1:
```
enum Example {
  A,
  B
}

extend enum Example {
  C  
}
```

Subgraph 2:
```
enum Example {
  A,
  B,
  C
}
```
 
The enum named “Example” defined in Subgraph 1 would resolve to be identical to the same-named enum defined in Subgraph 2 before federation takes place. The resulting supergraph would include a single definition of this enum.

### Validation
Union members must be both unique and defined.
Types must have bodies, e.g., enums must contain at least one value; inputs, interfaces, or objects must contain at least one field

## OpenAPI 
Added support for the Request Body Transform middleware, for new Tyk OAS API Definitions.

## Universal Data Graph

Added support for Kafka as a data source in Universal Data Graph. Configuration allows the user to provide multiple topics and broker addresses.

# Changelog

## Tyk Gateway
### Added
- Added support for Kafka as a data source in Universal Data Graph.
- Adding a way to defining the base GraphQL entity via @key directive
- It is now possible to define an extension for a type in a subgraph that does not define the base type.
- Added support for the Request Body Transform middleware, for the new Tyk OAS API Definition
- Session lifetime now can be controled by Key expiration, e.g. key removed when it is expired. Enabled by setting `session_lifetime_respects_key_expiration` to `true`
### Changed
- Generate API ID when API ID is not provided while creating API. 
- Updated the Go plugin loader to load the most appropriate plugin bundle, honouring the Tyk version, architecture and OS
- When GraphQL query with a @skip directive is sent to the upstream it will no longer return “null” for the skipped field, but remove the field completely from the response
- Added validation to Union members - must be both unique and defined.
### Fixed
- Fixed an issue where the Gateway would not create the circuit breaker events (BreakerTripped and BreakerReset) for which the Tyk Dashboard offers webhooks.
- Types of the same name can be defined in more than one subgraph (a shared type). This will no longer produce an error if each definition is exactly identical.
- Apply Federation Subgraph normalisation do avoid merge errors. Extensions of types whose base type is defined in the same subgraph will be resolved before an attempt at federation.

# Updated Versions
Tyk Gateway 4.2

# Upgrade process

Follow the [standard upgrade guide]({{< ref "/content/upgrading-tyk.md" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.
