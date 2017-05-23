---
date: 2017-03-23T12:58:24Z
title: Session Meta Data
menu:
  main:
    parent: "Concepts"
weight: 3 
---

## Concept: Meta Data

As mentioned in the Session Object concept documentation, all tokens within Tyk can contain a meta data field, and this field is a string key/value map that can store any kind of information about the underlying identity of a session.

The meta data field is important, because it can be used in various ways:

* To inform an admin of the providence of a token
* Values can be injected into headers for upstream services to consume (e.g. a user ID or an email address provided at the time of creation)
* Values can be used in dynamic JavaScript middleware and Virtual Endpoints for further validation or request modification

Meta data is also injected by other Tyk Components when keys are created using “generative” methods, such as JSON Web Token and OIDC session creation and via the Developer Portal, to include information about the underlying identity of the token when it comes from a third-party such as an OAuth IDP (e.g. OIDC).

