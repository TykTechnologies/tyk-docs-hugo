---
date: 2017-03-23T13:01:30Z
title: Context Variables
menu:
  main:
    parent: "Concepts"
weight: 5 
---

## Concept: Context Variables

Context variables are extracted from the request at the start of the middleware chain, and must be explicitly enabled in order for them to be made available to your transforms. These values can be very useful for later transformation of request data, for example, in converting a Form-based POST into a JSON-based PUT or to capture an IP address as a header.

As of version 2.2 Tyk enables context variables to be injected into various middleware components. The context variables are formatted and accessed differently depending on the calling system.

The context variables that are available are:

*   `request_data`: If the inbound request contained any query data or form data, it will be available in this object, please see the transforms documentation for implementation.
*   `path_parts`: The components of the path, split on `/`, please see the transforms documentation for implementation.
*   `token`: The inbound raw token (if bearer tokens are being used) of this user.
*   `path`: The path that is being requested.
*   `remote_addr`: The IP address of the connecting client.

Components that use context variables:

*   The URL Rewriter
*   Header injection
*   Body transforms