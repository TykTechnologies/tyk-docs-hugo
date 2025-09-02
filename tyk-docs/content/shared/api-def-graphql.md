---
---

Tyk Classic is the home of Tyk GraphQL. All of the specific settings required to configure Tyk Gateway to proxy GraphQL services is gathered in a single `graphql` object in the API definition.

An example is shown below that composes two different data sources:

1. *countries* which is a `GraphQLDataSource`
2. *people* which is a `HTTPJSONDataSource`

```json
{
  "graphql": {
    "enabled": true,
    "execution_mode": "executionEngine",
    "schema": "type Country {\n  code: String\n}\n\ntype People {\n  count: Int\n}\n\ntype Query {\n  countries: [Country]\n  people: People\n}\n",
    "type_field_configurations": [
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
            "url": "https://countries.trevorblades.com/",
            "method": "POST"
          }
        }
      },
      {
        "type_name": "Query",
        "field_name": "people",
        "mapping": {
          "disabled": true,
          "path": ""
        },
        "data_source": {
          "kind": "HTTPJSONDataSource",
          "data_source_config": {          
            "url": "https://swapi.dev/api/people/",
            "method": "GET",
            "body": "",
            "headers": [],
            "default_type_name": "People",
            "status_code_type_name_mappings": [
              {
                "status_code": 200,
                "type_name": ""
              }
            ]
          }
        }
      }
    ],
    "playground": {
      "enabled": true,
      "path": "/playground"
    }
  }
}
```

**Field: `graphql`**
All the GraphQL configuration is gathered in the `graphql` object.

**Field: `graphql.enabled`**
If set to `true`, this means the API definition describes a GraphQL API. Tyk GraphQL middleware will be enabled.
    
**Field: `graphql.execution_mode`**
The mode of a GraphQL API. There are two options:

- `proxyOnly`: there is a single upstream which is a GraphQL API.
- `executionEngine`: configure your own GraphQL API with multiple data sources; you will compose your own schema.

**Field: `graphql.schema`**   
The GraphQL schema of your API, stored in SDL format
    
**Field: `graphql.type_field_configurations`**  
A list of configurations used when `execution_mode` is `executionEngine`. For your schema, you can set data sources for fields in your types.

**Field: `graphql.type_field_configurations.type_name`**
A type of the schema that a field of it will be data source configured.

**Field: `graphql.type_field_configurations.field_name`**
A field of the type that will be data source configured.

**Field: `graphql.type_field_configurations.mapping`**
- `mapping`: Mapping configurations of a field. It is used to map the field in the received data and a field in the schema. It is used to represent a field with a different name in the schema.

**Field: `graphql.type_field_configurations.mapping.disabled`**
If it is `false`, it means enabled.

**Field: `graphql.type_field_configurations.mapping.path`**
Original name of the field in the received data.

**Field: `graphql.type_field_configurations.data_source`**
Configuration of a specific data source.

**Field: `graphql.type_field_configurations.data_source.kind`**
Kind of the upstream. It can be one of `HTTPJSONDataSource` or `GraphQLDataSource`.

**Field: `graphql.type_field_configurations.data_source.data_source_config`**
The details of the `data_source`

**Field: `graphql.type_field_configurations.data_source.data_source_config.url`**
URL of the upstream data source like `https://swapi.dev/api` or it can be another Tyk API which you can set like `tyk://<tyk-api-name>` or `tyk://<tyk-api-id>`. Also, you can pass parameters e.g. `"/my-path/{{ .arguments.id }}`, where `id` is passed as query variable in a GraphQL request. 

**Field: `graphql.type_field_configurations.data_source.data_source_config.method`**
HTTP request method which the upstream server waits for the url e.g. `GET`, `POST`, `UPDATE`, `DELETE`.

**Field: `graphql.type_field_configurations.data_source.data_source_config.body`**
HTTP request body to send to upstream.

**Field: `graphql.type_field_configurations.data_source.data_source_config.headers`**
HTTP headers to send to upstream composed of `key` and `value` pairs.

**Field: `graphql.type_field_configurations.data_source.data_source_config.default_type_name`**
The optional variable to define a default type name for the response object. It is useful in case the response might be a `Union` or `Interface` type which uses `status_code_type_name_mappings`. - only valid for `HTTPJSONDataSource`

**Field: `graphql.type_field_configurations.data_source.data_source_config.status_code_type_name_mappings`**
A list of mappings from `http.StatusCode` to GraphQL `type_name`. It can be used when the `type_name` depends on the response code. - only valid for `HTTPJSONDataSource`
- `status_code`: The HTTP response code to map to `type_name`.
- `type_name`: Type name to be mapped to `status_code`.
    
**Field: `graphql.playground`**
Configuration of the playground which is exposed from the Gateway route.

**Field: `graphql.playground.enabled`**
If it is `true`, it means the playground will be exposed.

**Field: `graphql.playground.path`**
The path where playground will sit e.g. if it is `/playground` in your API with name `composed`, you can access to the playground by `https://tyk-gateway/composed/playground`.             

