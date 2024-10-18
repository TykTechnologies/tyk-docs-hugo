---
date: 2017-03-24T16:39:31Z
title: Sample TCP Proxy
tags: ["Tyk Operator", "Sample", "Kubernetes"]
description: "Tyk Operator manifest example"
---

This page provides sample manifest for creating [Universal Data Graph (UDG)]({{<ref "universal-data-graph/getting-started-with-udg">}}) APIs. Follow the example to learn how to configure your APIs.

## UDG v2 (Tyk 3.2 and above)

If you are on Tyk 3.2 and above, you can use the following manifest to create an UDG API. This example configures a Universal Data Graph from a [GraphQL datasource]({{<ref "universal-data-graph/datasources/graphql">}}) and a [REST Datasource]({{<ref "universal-data-graph/datasources/rest">}}).

```yaml {hl_lines=["20-39", "46-80"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: udg
spec:
  name: Universal Data Graph v2a
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: ""
    listen_path: /udg
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
  graphql:
    enabled: true
    execution_mode: executionEngine
    schema: |
      type Country {
        name: String
        code: String
        restCountry: RestCountry
      }

      type Query {
        countries: [Country]
      }

      type RestCountry {
        altSpellings: [String]
        subregion: String
        population: Int
      }
    version: "2"
    last_schema_update: "2022-10-12T14:27:55.511+03:00"
    type_field_configurations: []
    playground:
      enabled: true
      path: /playground
    engine:
      field_configs:
        - disable_default_mapping: false
          field_name: countries
          path:
            - "countries"
          type_name: Query
        - disable_default_mapping: true #very important for rest APIs
          field_name: restCountry
          path: []
          type_name: Country
      data_sources:
        - kind: "GraphQL"
          name: "countries"
          internal: false
          root_fields:
            - type: Query
              fields:
                - "countries"
          config:
            url: "https://countries.trevorblades.com/"
            method: "POST"
            headers: {}
            body: ""
        - kind: "REST"
          internal: false
          name: "restCountries"
          root_fields:
            - type: "Country"
              fields:
                - "restCountry"
          config:
            url: "https://restcountries.com/v2/alpha/{{ .object.code }}"
            method: "GET"
            body: ""
            headers: {}
```

## UDG v1 (Tyk 3.1 or before)

If you are on Tyk 3.1, you can use the following manifest to create an UDG API. This example creates a Universal Data Graph with GraphQL datasource and HTTP JSON datasource.

```yaml
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: udg
spec:
  name: Universal Data Graph Example
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: ""
    listen_path: /udg
    strip_listen_path: true
  graphql:
    enabled: true
    execution_mode: executionEngine
    schema: |
      type Country {
        name: String
        code: String
        restCountry: RestCountry
      }

      type Query {
        countries: [Country]
      }

      type RestCountry {
        altSpellings: [String]
        subregion: String
        population: String
      }
    type_field_configurations:
      - type_name: Query
        field_name: countries
        mapping:
          disabled: false
          path: countries
        data_source:
          kind: GraphQLDataSource
          data_source_config:
            url: "https://countries.trevorblades.com"
            method: POST
            status_code_type_name_mappings: []
      - type_name: Country
        field_name: restCountry
        mapping:
          disabled: true
          path: ""
        data_source:
          kind: HTTPJSONDataSource
          data_source_config:
            url: "https://restcountries.com/v2/alpha/{{ .object.code }}"
            method: GET
            default_type_name: RestCountry
            status_code_type_name_mappings:
              - status_code: 200
    playground:
      enabled: true
      path: /playground
```