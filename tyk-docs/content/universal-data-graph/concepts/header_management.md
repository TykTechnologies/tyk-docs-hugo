---
title: "Concepts - Header management"
date: 2020-08-28
menu:
  main:
    parent: "UDG Concepts"
weight: 0
---
With Tyk v5.2 the possibilities of managing headers for Universal Data Graph and all associated data sources have been extended.

### Global headers for UDG

Global headers can be configured via Tyk API Definition. The correct place to do that is within `graphql.engine.global_headers` section. For example:

```json
{
    "graphql": {
        "engine": {
            "global_headers": [
                {
                    "key": "global-header",
                    "value": "example-value"
                },
                {
                    "key": "request-id",
                    "value": "$tyk_context.request_id"
                }
            ]
        }
    }
}
```

Global headers now have access to all [request context variables]({{< ref "/content/context-variables.md" >}}).

By default, any header that is configured as a global header, will be forwarded to all data sources of the UDG.

### Data source headers

Data source headers can be configured via Tyk API Definition and via Tyk Dashboard UI. The correct place to do that is within `graphql.engine.datasources.config.headers` section. For example:

```json
{
    "engine": {
        "data_sources": [
            {
                "config": {
                    "headers": {
                        "data-source-header": "data-source-header-value",
                        "datasource1-jwt-claim": "$tyk_context.jwt_claims_datasource1"
                    }
                }
            }
        ]
    }
}
```

Data source headers now have access to all [request context variables]({{< ref "/content/context-variables.md" >}}).

### Headers priority order

If a header has a value at the data source and global level, then the data source value takes precedence.

For example for the below configuration:

```json
{
    "engine": {
        "data_sources": [
            {
                "config": {
                    "headers": {
                        "example-header": "data-source-value",
                        "datasource1-jwt-claim": "$tyk_context.jwt_claims_datasource1"
                    }
                }
            }
        ],
        "global_headers": [
          {
              "key": "example-header",
              "value": "global-header-value"
          },
          {
              "key": "request-id",
              "value": "$tyk_context.request_id"
          }
      ]
    }
}
```

The `example-header` header name is used globally and there is also a data source level header, with a different value. Value `data-source-value` will take priority over `global-header-value`, resulting in the following headers being sent to the data source:

| Header name    | Header value                        | Defined on level |
|----------------|-------------------------------------|------------------|
| example-header | data-source-value                   | data source      |
| datasource1    | $tyk_context.jwt_claims_datasource1 | data source      |
| request-id     | $tyk_context.request_id             | global           |