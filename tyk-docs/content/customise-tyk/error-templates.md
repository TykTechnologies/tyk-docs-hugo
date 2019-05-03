---
date: 2017-03-24T13:01:00Z
title: Error Templates
menu:
  main:
    parent: "Customise Tyk"
weight: 2 
---

In v2.2 the error handler allowed the use a single JSON template to communicate errors to users (a default one is shipped with Tyk, it's located in `templates/error.json`).

As of v2.3 it is possible to use different templates for specific HTTP error codes. The `content-type` header of the request is also checked, enabling the usage of different template formats, e.g. an XML template.

## <a name="use-cases"></a> Use Cases

### JSON Request

When a HTTP 500 error occurs, and the request is a JSON request, Tyk will follow this logic:

*   If `templates/error_500.json` exists, this template will be used.
*   Otherwise, Tyk will use `templates/error.json`.

### XML Request

When a HTTP 500 error occurs, and the request is a XML request, Tyk will follow this logic:

*   If `templates/error_500.xml` exists, this template will be used.
*   If no specific template exists for this HTTP code, `templates/error.xml` will be used.
*   If `error.xml` doesn't exist, `templates/error.json` will be used.