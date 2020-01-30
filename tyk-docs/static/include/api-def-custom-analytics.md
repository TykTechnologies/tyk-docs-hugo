

`tag_headers`:  This specifies a string array of HTTP headers which can be extracted and turned to tags. 

For example if you include `X-Request-ID` header to tag_headers, for each incoming request it will include a `x-request-id-<header_value>` tag to request an analytic record.

This functionality can be useful if you need to pass additional information from the request to the analytics, without enabling detailed logging, which records the full request and response objects.

See [Log Browser](/docs/analytics-and-reporting/log-browser/) for more details on setting via the Dashboard.

> **NOTE**: This functionality is available from Gateway v2.4 and Dashboard v1.4.