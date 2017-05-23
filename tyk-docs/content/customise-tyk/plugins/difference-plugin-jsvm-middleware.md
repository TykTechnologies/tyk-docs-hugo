---
date: 2017-03-24T13:48:00Z
title: Difference between plugin and JSVM middleware?
menu:
  main:
    parent: "Plugins"
weight: 2 
---

The JavaScript Virtual Machine provides pluggable middleware that can modify a request on the fly and are designed to augment a running Tyk process, are easy to implement and run inside the Tyk process in a sandboxed ECMAScript interpreter. This is good, but there are some drawbacks with the JSVM:

*   **Performance**: JSVM is performant, but not easy to optimise and is dependent on the otto interpreter - this is not ideal, the JSVM also requires a copy of the interpreter object for each request to be made, which can increase memory footprint.
*   **Extensibility**: JSVM is a limited interpreter, although it can use some NPM modules, it isn't NodeJS so writing interoperable code (especially with other DBs) is difficult.
*   **TCP Access**: The JSVM has no socket access so working with DB drivers and directly with Redis is not possible.

Plugins can provide replacements for existing middleware functions (as opposed to augmentation) and are designed to be full-blown, optimised, highly capable services. They enable a full customised architecture to be built that integrates with a user's infrastructure.

Plugins bring about the following improvements:

*   **Performance**: Run on STDIN (unix pipes), which are extremely fast and run in their own memory space, and so can be optimised for performance way beyond what the JSVM could offer.
*   **Extensibility**: By allowing any language to be used so long as JSONRPC is supported, the extensibility of a CPH is completely open.
*   **TCP Access**: Because a plugin is a separate process, it can have it's own low-level TCP connections opens to databases and services.

There are some caveats to plugins:

*   Must run as a single process.
*   Can implement some or any of the API hooks.
*   API hooks to use *must* be specified in an API definition and are not global across APIs.
*   They must manage API-specific cases in the same process, only one CoProcess will be managed by a Tyk Instance.
