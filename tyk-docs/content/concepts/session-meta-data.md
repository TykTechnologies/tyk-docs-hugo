---
date: 2017-03-23T12:58:24Z
title: Session Meta Data
menu:
  main:
    parent: "Concepts"
weight: 3 
---

## Concept: Meta Data

As described in [What is a Session Object?][1], all Tyk tokens can contain a meta data field. This field is a string key/value map that can store any kind of information about the underlying identity of a session.

The meta data field is important, because it can be used in various ways:

* To inform an admin of the provenance of a token
* Values can be injected into headers for upstream services to consume (e.g. a user ID or an email address provided at the time of creation)
* Values can be used in dynamic JavaScript middleware and Virtual Endpoints for further validation or request modification

Meta data is also injected by other Tyk Components when keys are created using "generative" methods, such as JSON Web Token and OIDC session creation and via the Developer Portal, to include information about the underlying identity of the token when it comes from a third-party such as an OAuth IDP (e.g. OIDC).

 [1]: /docs/concepts/what-is-a-session-object/ 
