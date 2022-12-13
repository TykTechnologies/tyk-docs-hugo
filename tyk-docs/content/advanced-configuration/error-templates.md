---
date: 2017-03-24T13:01:00Z
title: Error Templates
menu:
  main:
    parent: "Advanced Configuration"
weight: 8
---

In v2.2 the error handler allowed the use a single JSON template to communicate errors to users (a default one is shipped with Tyk, it's located in `templates/error.json`).

As of v2.3 it is possible to use different templates for specific `HTTP error codes`. The `content-type` header of the request is also checked, enabling the usage of different template formats, e.g. an XML template.

## Use Cases

### JSON Request

When a HTTP 500 error occurs, and the request is a JSON request, Tyk will follow this logic:

*   If `templates/error_500.json` exists, this template will be used.
*   Otherwise, Tyk will use `templates/error.json`.

### XML Request

When a HTTP 500 error occurs, and the request is a XML request, Tyk will follow this logic:

*   If `templates/error_500.xml` exists, this template will be used.
*   If no specific template exists for this HTTP code, `templates/error.xml` will be used.
*   If `error.xml` doesn't exist, `templates/error.json` will be used.

### Removing the X-Generator Header

In case of an error, the Tyk Gateway adds the following fixed header and value: `X-Generator: tyk.io`
Please note that for `404 Not found` errors, Tyk will not return this header from a security perspective. To mitigate this issue, in case you want to better understand your clients and provide you, the manager of the platform, with error information, you can set `track_404_logs` to `true` in your `tyk.conf` which will then produce error logs showing the resources that were requested and not found.

If you don't want to return our default X-Generator header (set to tyk.io) in your templates, set `hide_generator_header` to `true` in your `tyk.conf` file
