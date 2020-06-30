---
---

- `graphql`: The GraphQL config object.

    - `enabled`: If it is set to `true`, it means the API is a GraphQL API. Tyk GraphQL middlewares will be enabled.
    
    - `execution_mode`: The mode of a GraphQL API. There are two types: `proxyOnly` and `executionEngine`. 
        - `proxyOnly`: There is one single upstream which is a GraphQL API and Tyk proxies it.
        - `executionEngine`: It lets you to configure your own GraphQL API with multiple data sources. This means that you will compose your own schema.
    
    - `schema`: The GraphQL schema of your API is saved in this variable in SDL format.
    
    - `type_field_configurations`: A list of configurations used when `execution_mode` is `executionEngine`. For your schema, you can set data sources for fields in your types.
        - `type_name`: A type of the schema that a field of it will be data source configured.
        - `field_name`: A field of the type that will be data source configured.
        - `mapping`: Mapping configurations of a field. It is used to map the field in the received data and a field in the schema. It is used to represent a field with a different name in the schema.
            - `disabled`: If it is `false`, it means enabled.
            - `path`: Original name of the field in the received data.
    
        - `data_source`: Configuration object of a data source.
            - `kind`: Kind of the upstream. It can be one of `HTTPJSONDataSource`, `GraphQLDataSource`.
            - `data_source_config`: The details of the `data_source`.
                - `url`: URL of the upstream data source like `https://swapi.dev/api` or it can be another Tyk API which you can set like `tyk://<tyk-api-name>` or `tyk://<tyk-api-id>`. Also, you can pass parameters e.g. `"/my-path/{{ .arguments.id }}`, where `id` is passed as query variable in a GraphQL request.           
                - `method`: HTTP request method which the upstream server waits for the url e.g. `GET`, `POST`, `UPDATE`, `DELETE`.
                - `body`: HTTP request body to send to upstream.
                - `headers`: HTTP headers to send to upstream.
                    - `key`: Key of the header.                  
                    - `value`: Value of the header.
                    
                    Example: 
                    ```
                    [
                        {
                            "key": "Authorization",
                            "value": "{{ .request.headers.Authorization }}"
                        }                                                
                    ]
                    ```                                     
                - `default_type_name`: The optional variable to define a default type name for the response object. It is useful in case the response might be a `Union` or `Interface` type which uses `status_code_type_name_mappings`. - only valid for `HTTPJSONDataSource`
                - `status_code_type_name_mappings`: A list of mappings from `http.StatusCode` to GraphQL `type_name`. It can be used when the `type_name` depends on the response code. - only valid for `HTTPJSONDataSource`
                    - `status_code`: The HTTP response code to map to `type_name`.
                    - `type_name`: Type name to be mapped to `status_code`.
    
    - `playground`: Configuration of the playground which is exposed from the Gateway route.
        - `enabled`: If it is `true`, it means the playground will be exposed. 
        - `path`: The path where playground will sit e.q. if it is `/playground` in your API with name `composed`, you can access to the playground by `https://tyk-gateway/composed/playground`.             
                

A composed API example is shown below. It composes two different data sources:

1. Countries - `GraphQLDataSource`
2. People - `HTTPJSONDataSource`

```
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
```
