---
title: "Migrating to 3.2"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 1
aliases:
    - /graphql/migration/
---


As of 3.2 GraphQL schema for Tyk API definitions (i.e `api_definition.graphql`) changed significantly, hence GraphQL API definitions created in previous beta versions are not supported via the UI and need to go through a manual migration.

{{< note success >}}
**Note**

Before you continue, we strongly advise to simply create a new API and avoid migration of the API definition. You'll achieve results faster and can avoid typos and errors that happens with the manual migration.

{{< /note >}}

{{< note success >}}
**Note**


Old API definitions will continue to work for the Tyk Gateway

{{< /note >}}


## The changes
- To improve performance now a single Data Source can be used to link to multiple fields instead of having an independent data source for every field hence `graphql.type_field_configurations` is now obsolete and new data sources can be defined under `graphql.engine.data_sources` (see example below).

- Data Source kind are `REST` or `GraphQL` regardless of your API being internal or not.

- In case of internal APIs that are accessed via `tyk://`scheme, the `graphql.engine.data_sources[n].internal` property is set to true.

- Each dataSources needs to be defined with a unique name `graphql.engine.data_sources[n].name`.

- Each field connected to the data source is expected to be configured for mapping under `graphql.engine.field_configs` regardless of it requiring mapping or not.

- It is important that all new GraphQL APIs have the version `graphql.version` property set to `2`.



## Examples

### Old Data Source Config

```json
"type_field_configurations": [
  {
    "type_name": "Query",
    "field_name": "pet",
    "mapping": {
      "disabled": true,
      "path": ""
    },
    "data_source": {
      "kind": "HTTPJSONDataSource",
      "data_source_config": {
        "url": "https://petstore.swagger.io/v2/pet/{{.arguments.id}}",
        "method": "GET",
        "body": "",
        "headers": [],
        "default_type_name": "Pet",
        "status_code_type_name_mappings": [
          {
            "status_code": 200,
            "type_name": ""
          }
        ]
      }
    }
  },
  {
    "type_name": "Query",
    "field_name": "countries",
    "mapping": {
      "disabled": false,
      "path": "countries"
    },
    "data_source": {
      "kind": "GraphQLDataSource",
      "data_source_config": {
        "url": "https://countries.trevorblades.com",
        "method": "POST"
      }
    }
  },
]
```

### New Data Source Config

```json
"engine": {
  "field_configs": [
    {
      "type_name": "Query",
      "field_name": "pet",
      "disable_default_mapping": true,
      "path": [
        ""
      ]
    },
    {
      "type_name": "Query",
      "field_name": "countries",
      "disable_default_mapping": false,
      "path": [
        "countries"
      ]
    },
  ],
  "data_sources": [
    {
      "kind": "REST",
      "name": "PetStore Data Source",
      "internal": false,
      "root_fields": [
        {
          "type": "Query",
          "fields": [
            "pet"
          ]
        }
      ],
      "config": {
        "url": "https://petstore.swagger.io/v2/pet/{{.arguments.id}}",
        "method": "GET",
        "body": "",
        "headers": {},
      }
    },
    {
      "kind": "GraphQL",
      "name": "Countries Data Source",
      "internal": false,
      "root_fields": [
        {
          "type": "Query",
          "fields": [
            "countries"
          ]
        }
      ],
      "config": {
        "url": "https://countries.trevorblades.com",
        "method": "POST",
        "body": ""
      }
    }
  ]
},
```

### Example of new graphql definition

``` json
"graphql" : {
  "schema": "type Mutation {\n  addPet(name: String, status: String): Pet\n}\n\ntype Pet {\n  id: Int\n  name: String\n  status: String\n}\n\ntype Query {\n  default: String\n}\n",
  "enabled": true,
  "engine": {
    "field_configs": [
      {
        "type_name": "Mutation",
        "field_name": "addPet",
        "disable_default_mapping": true,
        "path": [""]
      },
      {
        "type_name": "Pet",
        "field_name": "id",
        "disable_default_mapping": true,
        "path": [""]
      },
      {
        "type_name": "Query",
        "field_name": "default",
        "disable_default_mapping": false,
        "path": ["default"]
      }
    ],
    "data_sources": [
      {
        "kind": "REST",
        "name": "Petstore",
        "internal": false,
        "root_fields": [
          {
            "type": "Mutation",
            "fields": ["addPet"]
          }
        ],
        "config": {
          "url": "https://petstore.swagger.io/v2/pet",
          "method": "POST",
          "body": "{\n  \"name\": \"{{ .arguments.name }}\",\n  \"status\": \"{{ .arguments.status }}\"\n}",
          "headers": {
            "qa": "{{ .request.header.qa }}",
            "test": "data"
          },
        }
      },
      {
        "kind": "REST",
        "name": "Local Data Source",
        "internal": false,
        "root_fields": [
          {
            "type": "Pet",
            "fields": ["id"]
          }
        ],
        "config": {
          "url": "http://localhost:90909/graphql",
          "method": "HEAD",
          "body": "",
          "headers": {},
        }
      },
      {
        "kind": "GraphQL",
        "name": "asd",
        "internal": false,
        "root_fields": [
          {
            "type": "Query",
            "fields": ["default"]
          }
        ],
        "config": {
          "url": "http://localhost:8200/{{.arguments.id}}",
          "method": "POST",
        }
      }
    ]
  },
  "execution_mode": "executionEngine",
  "version": "2",
  "playground": {
    "enabled": false,
    "path": ""
  },
  "last_schema_update": "2021-02-16T15:05:27.454+05:30"
}
```
