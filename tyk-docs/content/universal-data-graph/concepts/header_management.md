---
title: "Concepts - Header management"
date: 2020-08-28
menu:
  main:
    parent: "UDG Concepts"
weight: 0
---
With Tyk v5.2 the possibilities of managing headers for Universal Data Graph and all its data sources have been extended.

### Global headers for UDG

Global headers can be configured via Tyk API Definition. The correct place to do that is within `graphql.engine.global_headers` section. For example:

```json
{
    "graphql": {
        "engine": {
            "global_headers": [
                {
                    "key": "global",
                    "value": "global-header"
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
                        "global": "different-value",
                        "datasource1": "$tyk_context.jwt_claims_datasource1"
                    }
                }
            }
        ]
    }
}
```

Data source headers now have access to all [request context variables]({{< ref "/content/context-variables.md" >}}).

### Headers priority order

In cases where user sets the same header name both for a global and data source header, but different values, the value set at data source header level takes priority.

For example for the below configuration:

```json
{
    "engine": {
        "data_sources": [
            {
                "config": {
                    "headers": {
                        "global": "data-source-value",
                        "datasource1": "$tyk_context.jwt_claims_datasource1"
                    }
                }
            }
        ],
        "global_headers": [
          {
              "key": "global",
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

`global` header name is used both for global level and data source level header, but the values are different. Value `data-source-value` will take priority over `global-header-value` and in the end the following headers will be sent to the data source:

| Header name | Header value                        | Defined on level |
|-------------|-------------------------------------|------------------|
| global      | data-source-value                   | data source      |
| datasource1 | $tyk_context.jwt_claims_datasource1 | data source      |
| request-id  | $tyk_context.request_id             | global           |