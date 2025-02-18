---
title: "Universal Data Graph"
date: 2025-02-10
tags: ["UDG", "Universal Data Graph", "Datasource", "Concepts", "Arguments", "Field Mapping", "Header Management", "Graphql", "Kafka", "Rest", "Examples"]
description: "How to Configure data graph"
keywords: ["UDG", "Universal Data Graph", "Datasource", "Concepts", "Arguments", "Field Mapping", "Header Management", "Graphql", "Kafka", "Rest", "Examples"]
aliases:
  - /universal-data-graph
  - /universal-data-graph/udg-concepts
  - /tyk-stack/universal-data-graph/concepts/datasources
  - /universal-data-graph/concepts/arguments
  - /universal-data-graph/concepts/field_mappings
  - /universal-data-graph/concepts/reusing_response_fields
  - /universal-data-graph/concepts/header_management
  - /universal-data-graph/concepts/datasources
  - /universal-data-graph/datasources/graphql
  - /universal-data-graph/datasources/kafka
  - /universal-data-graph/datasources/rest
  - /universal-data-graph/datasources/tyk
  - /universal-data-graph/udg-examples

  - /universal-data-graph/data-sources/tyk
  - /universal-data-graph/data-sources/rest
  - /universal-data-graph/data-sources/kafka
  - /universal-data-graph/data-sources/graphql
  - /universal-data-graph/concepts/reusing-response-fields
  - /universal-data-graph/data-sources/graphql
  - /universal-data-graph/data-sources/graphql
  - /universal-data-graph/data-sources/graphql
  - /universal-data-graph/datasources
  - /universal-data-graph
  - /universal-data-graph/examples
  - /universal-data-graph/udg-getting-started/header-forwarding
  - /universal-data-graph/udg-getting-started/field-based-permission
  - /universal-data-graph/udg-getting-started/security
  - /universal-data-graph/udg-getting-started/mutations
  - /universal-data-graph/udg-getting-started/connect-datasource
  - /universal-data-graph/udg-getting-started/creating-schema
  - /universal-data-graph/getting-started-with-udg
---

## Overview

The Universal Data Graph (UDG) lets you combine multiple APIs into one universal interface.
With the help of GraphQL you're able to access multiple APIs with a single query.

It's important to note that you don't even have to build your own GraphQL server.
If you have existing REST APIs all you have to do is configure the UDG.

With the Universal Data Graph Tyk becomes your central integration point for all your internal as well as external APIs.
In addition to this, the UDG benefits from all existing solutions that already come with your Tyk installation.
That is, your Data Graph will be secure from the start and there's a large array of middleware you can build on to power your Graph.

{{< img src="/img/diagrams/universal_datagraph_overview.png" alt="Universal Datagraph Overview" >}}

Currently supported DataSources:
- REST
- GraphQL
- SOAP (through the REST datasource)
- Kafka

{{< note >}}
**Note**  
To start creating your first Universal Data Graph in Tyk Dashboard, go to "Data Graphs" section of the menu.
{{< /note >}}

Make sure to check some of the resources to help you start:
- [How to create UDG schema]({{< ref "api-management/data-graph#creating-schema" >}})
- [How to connect data sources]({{< ref "api-management/data-graph#connect-datasource" >}})
- [How to secure the data graph]({{< ref "api-management/data-graph#security" >}})

## Key Concepts

### Universal Data Graph

The Universal Data Graph (UDG) introduces a few concepts you should fully understand in order to make full use of it.

UDG comes with a fully spec compliant GraphQL engine that you don't have to code, you just have to configure it. 

For that you have to define your "DataSources" and might want to add "Field Mappings" as well as "Arguments" to your configuration.
Read on in the sub sections to understand the full picture to use UDG to its full potential.

To help you, we have put together the following video.

{{< youtube Z2kTqpxcv-E >}}

### DataSources

In most GraphQL implementations you have the concept of Resolvers.
Resolvers are functions that take optional parameters and return (resolve) some data.
Each resolver is attached to a specific type and field.

DataSources are similar in that they are responsible for loading the data for a certain field and type.
The difference is that with DataSources you simply configure how the engine should fetch the data whereas with traditional GraphQL frameworks you have to implement the function on your own.

DataSources can be internal as well as external.

Internal DataSources are those APIs that are already managed by tyk, e.g. REST or SOAP APIs which you already manage through the Dashboard.
You can make use of the rich ecosystem of middlewares for internal DataSources to validate and transform requests and responses.

External DataSources are those APIs that you're not (yet) managing through tyk.
For simplicity reasons you can also add these to your data graph without previously adding them as a dedicated API to tyk.
If you later decide you want to add additional middlewares to one of them you can always make the transition from external to internal API.

Head over to the [connect data source]({{<ref "api-management/data-graph#udg" >}}) section to learn about the supported data sources and how to connect them to Tyk.

### Arguments

Looking back at the example from the "Field Mappings", you might wonder how to use the "id" argument from the GraphQL query to make the correct REST API call to the user service.

Here's the schema again:

```graphql
type Query {
    user(id: Int!): User
}

type User {
    id: Int!
    name: String
}
```

We assume you already have your DataSource attached and now want to configure it so that the path argument gets propagated accordingly.
You need to tell the GraphQL engine that when it comes to resolving the field "user", take the argument with the name "id" and use it in the URL to make the request to the REST API.
You do this by using templating syntax to inject it into the URL.
This is done from the "Configure data source" tab, which will show after clicking a schema argument or object field.
Typing an opening curly brace ( { ) will produce a dropdown that contains all available fields and arguments.

```html
https://example.com/user/{{ .arguments.id }}
``` 

{{< img src="/img/dashboard/udg/concepts/parameter_dropdown.png" alt="Create New API" >}}

### Field Mappings

Universal Data Graph can automatically resolve where data source information should go in the GraphQL response as long as the GraphQL schema mirrors the data source response structure.

Let's assume you have a REST API with a user resource like this: `http://example.com/users/:id`

The following is an example response:

```json
{
  "id": 1,
  "name": "Martin Buhr"
}
```

If GraphQL schema in UDG is set as the following:
```graphql
type Query {
    user(id: Int!): User
}

type User {
    id: Int!
    name: String
}
```
and REST data source at attached behind `user(id: Int!)` query, UDG will be able to automatically resolve where `id` and `name` values should be in UDG response. In this case no field mapping is necessary.

{{< note success >}}
**Note**  

GraphQL does not support field names with hyphens (e.g. `"user-name"`). This can be resolved by using field mappings as described below. 
{{< /note >}}

Let's assume that the JSON response looked a little different:

````json
{
  "id": 1,
  "user_name": "Martin Buhr"
}
````

If this were the JSON response you received from the REST API, you must modify the path for the field "name".
This is achieved by unchecking the "Disable field mapping" checkbox and setting the Path to "user_name".

Nested paths can be defined using a period ( . ) to separate each segment of the JSON path, *e.g.*, "name.full_name" 

In cases where the JSON response from the data source is wrapped with `[]` like this:

```json
[
  {
  "id": 1,
  "name": "Martin Buhr",
  "phone-number": "+12 3456 7890"
  }
]
```
UDG will not be able to automatically parse `id`, `name` and `phone-number` and fields mapping needs to be used as well. To get the response from inside the brackets the following syntax has to be used in field mapping: `[0]`.

It is also possible to use this syntax for nested paths. For example: `[0].user.phone-number`

#### Field mapping in Tyk Dashboard

See below how to configure the field mapping for each individual field.

{{< img src="/img/dashboard/udg/concepts/field-mapping-new.png" alt="Field mapping UI" >}}


#### Field mapping in Tyk API definition

If you're working with raw Tyk API definition the field mapping settings look like this:

```json
{"graphql": {
      "engine": {
        "field_configs": [
          {
            "type_name": "User",
            "field_name": "phoneNumber",
            "disable_default_mapping": false,
            "path": [
              "[0]",
              "user",
              "phone-number"
            ]
          }
        ]
      }
    }
  }
```

Notice that even though in Tyk Dashboard the nested path has a syntax with ( . ), in Tyk API definition it becomes an array of strings.

There's more UDG concepts that would be good to understand when using it for the first time:
* [UDG Arguments]({{< ref "api-management/data-graph#arguments" >}})
* [UDG Datasources]({{< ref "api-management/data-graph#udg" >}})

### Reusing response fields

When using the UDG, there may be a situation where you want to access an API with data coming from another API.
Consider the following REST APIs:

 - REST API for people: `https://people-api.dev/people`
 - REST API for a specific person: `https://people-api.dev/people/{person_id}`
 - REST API for driver licenses: `https://driver-license-api.dev/driver-licenses/{driver_license_id}`

The REST API for a person will give us the following response:
```json
{
    "id": 1,
    "name": "John Doe",
    "age": 40,
    "driverLicenseID": "DL1234"
}
```

And the REST API response for driver licenses looks like this:
```json
{
    "id": "DL1234",
    "issuedBy": "United Kingdom",
    "validUntil": "2040-01-01"
}
```

As you can see by looking at the example responses, you could use the `driverLicenseID` from the People API to obtain the driver license data from the Driver License API.

You also want to design the schema so that it represents the relationship between a person and a driver license.
As the person object is referencing a driver license by its ID, it means that we will need to define the driver license inside the person object as a field.
Consequently, a schema representing such a relationship might look like this:

```graphql
type Query {
    people: [Person]  # Data source for people
    person(id: Int!): Person  # Data Source for a specific person
}

type Person {
    id: Int!
    name: String!
    age: Int!
    driverLicenseID: ID
    driverLicense: DriverLicense  # Data Source for a driver license
}

scalar Date

type DriverLicense {
    id: ID!
    issuedBy: String!
    validUntil: Date! 
}
```

#### Defining the data source URLs

Now it's all about defining the data source URLs. 

For the field `Query.people`, you can simply use the URL to the API:
```
https://people-api.dev/people
```

The `Query.person` field needs to use its `id` argument to call the correct API endpoint.

See [Concept: Arguments]({{< ref "api-management/data-graph#arguments" >}}) to learn more about it.
 ```
 https://people-api.dev/people/{{.arguments.id}}
 ```

To retrieve the driver license data you need to be able to use the `driverLicenseID` from the `Person` object. As we defined the driver license data source on the `Person` object, you can now access all properties from the `Person` object by using the `.object` placeholder.

{{< note success >}}
**Note**  

If you want to access data from the object on which the data source is defined, use the `.object` placeholder (e.g: `.object.id` to access the `id` property from an object).
{{< /note >}}

So the URL for the driver license data source would look like this:
```
https://driver-license-api.dev/driver-licenses/{{.object.driverLicenseID}}
```
 {{< img src="/img/dashboard/udg/concepts/object_placeholder.png" alt="Use the object placeholder" >}}

#### Result

A query like:
```graphql
{
    people {
        id
        name
        age
        driverLicense {
            id
            issuedBy
            validUntil
        }
    }
}
```

... will now result in something like this:
```json
{
    "data": {
        "people": [
            {
                "id": 1,
                "name": "John Doe",
                "age": 40,
                "driverLicense": {
                    "id": "DL1234",
                    "issuedBy": "United Kingdom",
                    "validUntil": "2040-01-01"
                }
            },
            {
                "id": 2,
                "name": "Jane Doe",
                "age": 30,
                "driverLicense": {
                    "id": "DL5555",
                    "issuedBy": "United Kingdom",
                    "validUntil": "2035-01-01"
                }
            }
        ]
    }
}
```


### Header management

With Tyk v5.2 the possibilities of managing headers for Universal Data Graph and all associated data sources have been extended.

#### Global headers for UDG

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

Global headers now have access to all [request context variables]({{< ref "context-variables" >}}).

By default, any header that is configured as a global header, will be forwarded to all data sources of the UDG.

#### Data source headers

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

Data source headers now have access to all [request context variables]({{< ref "context-variables" >}}).

#### Headers priority order

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

## Connect Data Sources

### UDG

Datasources are the fuel to power any Unified Data Graph and the designed schema.

Datasources can be attached to any field available in the composed UDG schema. They can also be nested within each other.

You can add Datasources to your Universal Data Graph without adding them to Tyk as a dedicated API. This is useful for getting started but also limited in capabilities. Datasources that are managed within Tyk offer much more flexibility and allow for a much fuller API Management control.

If you want to add quotas, rate limiting, body transformations etc. to a REST Datasource it is recommended to first import the API to Tyk.

Supported DataSources:
- REST
- GraphQL
- SOAP (through the REST DataSource)
- Kafka

### GraphQL

The GraphQL Datasource is able to make GraphQL queries to your upstream GraphQL service. In terms of configuration there are no real differences between the GraphQL Datasource and the one for REST with one slight exception.

#### GraphQL data source at operation root level

To illustrate this we'll have a look at an example graph.

Consider the following schema:

```graphql
type Query {
    employee(id: Int!): Employee
}
type Employee {
    id: Int!
    name: String!
}
```

Let's assume we would send the following query to a GraphQL server running this schema:

```graphql
query TykCEO {
    employee(id: 1) {
        id
        name
    }
}
```

The response of this query would look like this:

```json
{
  "data": {
    "employee": {
        "id": 1,
        "name": "Martin Buhr"
      }
  }
}
```

Compared to a REST API one difference is obvious. The response is wrapped in the root field "data".
There's also the possibility of having a root field "errors" but that's another story.
For simplicity reasons the GraphQL Datasource will not return the "data" object but rather extract the "employee" object directly.
So if you want to get the field mappings right you don't have to think about errors or data.
You can assume that your response object looks like this:

````json
{
  "employee": {
    "id": 1,
    "name": "Martin Buhr"
  }
}
````

Compared to a REST API you should be able to identify the key difference here.
The response is wrapped in the field "employee" whereas in a typical REST API you usually don't have this wrapping.

Because of this, field mappings are by default disabled for REST APIs.
For GraphQL APIs, the mapping is enabled by default and the path is set to the root field name.

{{< img src="/img/dashboard/udg/datasources/graph-fieldmapping.png" alt="Create New API" >}}

Other than this slight difference what's so special about the GraphQL Datasource to give it a dedicated name?

The GraphQL Datasource will make specification-compliant GraphQL requests to your GraphQL upstream. When you attach a GraphQL Datasource to a field the Query planner of the Tyk GraphQL engine will collect all the sub fields of a root field in order to send the correct GraphQL query to the upstream. This means you can have multiple GraphQL and REST APIs side by side in the same schema, even nested, and the query planner will always send the correct query/request to each individual upstream to fetch all the data required to return a query response.

**How does the query planner know which Datasource is responsible for a field?**

When the query planner enters a field it will check if there is a Datasource attached to it.
If that's the case this Datasource will be responsible for resolving this field.
If there are multiple nested fields underneath this root field they will all be collected and provided to the root field Datasource.

If however, one of the nested fields has another Datasource attached, ownership of the Datasource will shift to this new "root" field.
After leaving this second root field ownership of the Datasource for resolving fields will again shift back to the first Datasource.

#### GraphQL data source at type/field level

In case you want to add GraphQL data source at a lower level of your schema - type/field - the configuration steps are as follows:

1. Navigate to the field you want the GraphQL data source to be connected to and click on it.
2. From the right-hand side menu choose **GraphQL | Tyk** or **External GraphQL** depending on wheather your data source was previously created in Tyk or if it's an external service.
Provide a data source name and URL.

Above steps are explained in detail in our [Getting started pages]({{< ref "api-management/data-graph#connect-datasource" >}}).


4. Tick the box next to `Add GraphQL operation` to see additional configuration fields. This will allow you to provide a query that will execute against the data source.
5. Write the query in the `Operation` box and if you're using any variables provide those in `Variables` box.

{{< note >}}
**Note**  
You can use objects from your Data Graph schema as variables by referring to them using this syntax: `{{.object.code}}`
{{< /note >}}


{{< img src="/img/dashboard/udg/datasources/add_gql_operation.png" alt="Add GQL Operation" >}}

### Kafka

The Kafka DataSource is able to subscribe to Kafka topics and query the events with GraphQL.


The Kafka DataSource utilizes consumer groups to subscribe to the given topics, and inherits all behavior of the consumer group concept.   

Consumer groups are made up of multiple cooperating consumers, and the membership of these groups can change over time. Users can easily add a new consumer to the group to scale the processing load. A consumer can also go offline either for planned maintenance or due to an unexpected failure. Kafka maintains the membership of each group and redistributes work when necessary.   

When multiple consumers are subscribed to a topic and belong to the same consumer group, each consumer in the group will receive messages from a different subset of the partitions in the topic. You should know that if you add more consumers to a single group with a single topic than you have partitions, some consumers will be idle and get no messages.  

#### Basic Configuration

You can find the full documentation for Kafka DataSource configuration here.

**broker_addresses**
In order to work with the Kafka DataSource, you first need a running Kafka cluster. The configuration takes a list of known broker addresses and discovers the rest of the cluster.

``` bash
{
    "broker_addresses": ["localhost:9092"]
}
```

**topics**
The Kafka DataSource is able to subscribe to multiple topics at the same time but you should know that the structs of events have to match the same GraphQL schema.

```bash
{
    "topics": ["product-updates"]
}
```

**group_id**
As mentioned earlier, the Kafka DataSource utilizes the consumer group concept to subscribe to topics. We use the `group_id` field to set the consumer group name.

```bash
{
    "group_id": "product-updates-group"
}
```

Multiple APIs can use the same `group_id` or you can run multiple subscription queries using the same API. Please keep in mind that the Kafka DataSource inherits all behaviors of the consumer group concept.

**client_id**
Finally, we need the `client_id` field to complete the configuration. It is a user-provided string that is sent with every request to the brokers for logging, debugging, and auditing purposes.

```bash
{
    "client_id": "tyk-kafka-integration"
}
```

Here is the final configuration for the Kafka DataSource:

```bash
{
    "broker_addresses": ["localhost:9092"],
    "topics": ["product-updates"],
    "group_id": "product-updates-group",
    "client_id": "tyk-kafka-integration"
}
```

The above configuration object is just a part of the API Definition Object of Tyk Gateway.

#### Kafka Datasource configuration via Dashboard

1. Click on the field which should have Kafka datasource attached

2. From the right-hand side *Configure data source* panel choose KAFKA at the bottom in the *Add a new external data source* section

{{< img src="/img/dashboard/udg/datasources/kafka-config.png" alt="Kafkaconfig" >}} 

3. Provide datasource name, broker address (at least 1), topics (at least 1), groupID, clientID. Optionally you can also choose Kafka version, balance strategy and field mapping options. 

4. Click *SAVE* button to persist the configuration.

Once done the field you just configured will show information about data source type and name:

{{< img src="/img/dashboard/udg/datasources/kafka-list.png" alt="KafkaList" >}} 

##### Subscribing to topics

The `Subscription` type always defines the top-level fields that consumers can subscribe to. Let's consider the following definition:

```bash
type Product {
  name: String
  price: Int
  inStock: Int
}

type Subscription {
  productUpdated: Product
}
```

The `productUpdated` field will be updated each time a product is updated. Updating a product means a `price` or `inStock` fields of `Product` are updated and an event is published to a Kafka topic.  Consumers can subscribe to the `productUpdated` field by sending the following query to the server:

```bash
subscription Products {
    productUpdated {
        name
        price
        inStock
    }
}
```

You can use any GraphQL client that supports subscriptions.

##### Publishing events for testing

In order to test the Kafka DataSource, you can publish the following  event to `product-updates` topic:

```bash
{
    "productUpdated": {
        "name": "product1",
        "price": 1624,
        "inStock": 219
    }
}
```

You can use any Kafka client or GUI to publish events to `product-updates`.

When you change any of the fields, all subscribers of the `productUpdated`kafk field are going to receive the new product info.

The result should be similar to the following:

{{< img src="/img/2.10/kafka0.png" alt="API Menu" >}}


##### API Definition for the Kafka DataSource

The Kafka DataSource configuration:

```bash
{
	"kind": "Kafka",
	"name": "kafka-consumer-group",
	"internal": false,
	"root_fields": [{
		"type": "Subscription",
		"fields": [
			"productUpdated"
		]
	}],
	"config": {
		"broker_addresses": [
			"localhost:9092"
		],
		"topics": [
			"product-updates"
		],
		"group_id": "product-updates-group",
		"client_id": "tyk-kafka-integration"
	}
}
```

Here is a sample API definition for the Kafka DataSource.

```bash
{
	"created_at": "2022-09-15T16:19:07+03:00",
	"api_model": {},
	"api_definition": {
		"api_id": "7ec1a1c117f641847c5adddfdcd4630f",
		"jwt_issued_at_validation_skew": 0,
		"upstream_certificates": {},
		"use_keyless": true,
		"enable_coprocess_auth": false,
		"base_identity_provided_by": "",
		"custom_middleware": {
			"pre": [],
			"post": [],
			"post_key_auth": [],
			"auth_check": {
				"name": "",
				"path": "",
				"require_session": false,
				"raw_body_only": false
			},
			"response": [],
			"driver": "",
			"id_extractor": {
				"extract_from": "",
				"extract_with": "",
				"extractor_config": {}
			}
		},
		"disable_quota": false,
		"custom_middleware_bundle": "",
		"cache_options": {
			"cache_timeout": 60,
			"enable_cache": true,
			"cache_all_safe_requests": false,
			"cache_response_codes": [],
			"enable_upstream_cache_control": false,
			"cache_control_ttl_header": "",
			"cache_by_headers": []
		},
		"enable_ip_blacklisting": false,
		"tag_headers": [],
		"jwt_scope_to_policy_mapping": {},
		"pinned_public_keys": {},
		"expire_analytics_after": 0,
		"domain": "",
		"openid_options": {
			"providers": [],
			"segregate_by_client": false
		},
		"jwt_policy_field_name": "",
		"enable_proxy_protocol": false,
		"jwt_default_policies": [],
		"active": true,
		"jwt_expires_at_validation_skew": 0,
		"config_data": {},
		"notifications": {
			"shared_secret": "",
			"oauth_on_keychange_url": ""
		},
		"jwt_client_base_field": "",
		"auth": {
			"disable_header": false,
			"auth_header_name": "Authorization",
			"cookie_name": "",
			"name": "",
			"validate_signature": false,
			"use_param": false,
			"signature": {
				"algorithm": "",
				"header": "",
				"use_param": false,
				"param_name": "",
				"secret": "",
				"allowed_clock_skew": 0,
				"error_code": 0,
				"error_message": ""
			},
			"use_cookie": false,
			"param_name": "",
			"use_certificate": false
		},
		"check_host_against_uptime_tests": false,
		"auth_provider": {
			"name": "",
			"storage_engine": "",
			"meta": {}
		},
		"blacklisted_ips": [],
		"graphql": {
			"schema": "type Product {\n  name: String\n  price: Int\n  inStock: Int\n}\n\ntype Query {\n    topProducts(first: Int): [Product]\n}\n\ntype Subscription {\n  productUpdated: Product\n}",
			"enabled": true,
			"engine": {
				"field_configs": [{
						"type_name": "Query",
						"field_name": "topProducts",
						"disable_default_mapping": false,
						"path": [
							"topProducts"
						]
					},
					{
						"type_name": "Subscription",
						"field_name": "productUpdated",
						"disable_default_mapping": false,
						"path": [
							"productUpdated"
						]
					}
				],
				"data_sources": [{
						"kind": "GraphQL",
						"name": "topProducts",
						"internal": false,
						"root_fields": [{
							"type": "Query",
							"fields": [
								"topProducts"
							]
						}],
						"config": {
							"url": "http://localhost:4002/query",
							"method": "POST",
							"headers": {},
							"default_type_name": "Product"
						}
					},
					{
						"kind": "Kafka",
						"name": "kafka-consumer-group",
						"internal": false,
						"root_fields": [{
							"type": "Subscription",
							"fields": [
								"productUpdated"
							]
						}],
						"config": {
							"broker_addresses": [
								"localhost:9092"
							],
							"topics": [
								"product-updates"
							],
							"group_id": "product-updates-group",
							"client_id": "tyk-kafka-integration"
						}
					}
				]
			},
			"type_field_configurations": [],
			"execution_mode": "executionEngine",
			"proxy": {
				"auth_headers": {
					"Authorization": "Bearer eyJvcmciOiI2MWI5YmZmZTY4OGJmZWNmZjAyNGU5MzEiLCJpZCI6IjE1ZmNhOTU5YmU0YjRmMDFhYTRlODllNWE5MjczZWZkIiwiaCI6Im11cm11cjY0In0="
				}
			},
			"subgraph": {
				"sdl": ""
			},
			"supergraph": {
				"subgraphs": [],
				"merged_sdl": "",
				"global_headers": {},
				"disable_query_batching": false
			},
			"version": "2",
			"playground": {
				"enabled": false,
				"path": "/playground"
			},
			"last_schema_update": "2022-09-15T16:45:42.062+03:00"
		},
		"hmac_allowed_clock_skew": -1,
		"dont_set_quota_on_create": false,
		"uptime_tests": {
			"check_list": [],
			"config": {
				"expire_utime_after": 0,
				"service_discovery": {
					"use_discovery_service": false,
					"query_endpoint": "",
					"use_nested_query": false,
					"parent_data_path": "",
					"data_path": "",
					"cache_timeout": 60
				},
				"recheck_wait": 0
			}
		},
		"enable_jwt": false,
		"do_not_track": false,
		"name": "Kafka DataSource",
		"slug": "kafka-datasource",
		"analytics_plugin": {},
		"oauth_meta": {
			"allowed_access_types": [],
			"allowed_authorize_types": [],
			"auth_login_redirect": ""
		},
		"CORS": {
			"enable": false,
			"max_age": 24,
			"allow_credentials": false,
			"exposed_headers": [],
			"allowed_headers": [
				"Origin",
				"Accept",
				"Content-Type",
				"X-Requested-With",
				"Authorization"
			],
			"options_passthrough": false,
			"debug": false,
			"allowed_origins": [
				"*"
			],
			"allowed_methods": [
				"GET",
				"POST",
				"HEAD"
			]
		},
		"event_handlers": {
			"events": {}
		},
		"proxy": {
			"target_url": "",
			"service_discovery": {
				"endpoint_returns_list": false,
				"cache_timeout": 0,
				"parent_data_path": "",
				"query_endpoint": "",
				"use_discovery_service": false,
				"_sd_show_port_path": false,
				"target_path": "",
				"use_target_list": false,
				"use_nested_query": false,
				"data_path": "",
				"port_data_path": ""
			},
			"check_host_against_uptime_tests": false,
			"transport": {
				"ssl_insecure_skip_verify": false,
				"ssl_min_version": 0,
				"proxy_url": "",
				"ssl_ciphers": []
			},
			"target_list": [],
			"preserve_host_header": false,
			"strip_listen_path": true,
			"enable_load_balancing": false,
			"listen_path": "/kafka-datasource/",
			"disable_strip_slash": true
		},
		"client_certificates": [],
		"use_basic_auth": false,
		"version_data": {
			"not_versioned": true,
			"default_version": "",
			"versions": {
				"Default": {
					"name": "Default",
					"expires": "",
					"paths": {
						"ignored": [],
						"white_list": [],
						"black_list": []
					},
					"use_extended_paths": true,
					"extended_paths": {
						"ignored": [],
						"white_list": [],
						"black_list": [],
						"transform": [],
						"transform_response": [],
						"transform_jq": [],
						"transform_jq_response": [],
						"transform_headers": [],
						"transform_response_headers": [],
						"hard_timeouts": [],
						"circuit_breakers": [],
						"url_rewrites": [],
						"virtual": [],
						"size_limits": [],
						"method_transforms": [],
						"track_endpoints": [],
						"do_not_track_endpoints": [],
						"validate_json": [],
						"internal": []
					},
					"global_headers": {},
					"global_headers_remove": [],
					"global_response_headers": {},
					"global_response_headers_remove": [],
					"ignore_endpoint_case": false,
					"global_size_limit": 0,
					"override_target": ""
				}
			}
		},
		"jwt_scope_claim_name": "",
		"use_standard_auth": false,
		"session_lifetime": 0,
		"hmac_allowed_algorithms": [],
		"disable_rate_limit": false,
		"definition": {
			"enabled": false,
			"name": "",
			"default": "",
			"location": "header",
			"key": "x-api-version",
			"strip_path": false,
			"strip_versioning_data": false,
			"versions": {}
		},
		"use_oauth2": false,
		"jwt_source": "",
		"jwt_signing_method": "",
		"jwt_not_before_validation_skew": 0,
		"use_go_plugin_auth": false,
		"jwt_identity_base_field": "",
		"allowed_ips": [],
		"request_signing": {
			"is_enabled": false,
			"secret": "",
			"key_id": "",
			"algorithm": "",
			"header_list": [],
			"certificate_id": "",
			"signature_header": ""
		},
		"org_id": "630899e6688bfe5fd6bbe679",
		"enable_ip_whitelisting": false,
		"global_rate_limit": {
			"rate": 0,
			"per": 0
		},
		"protocol": "",
		"enable_context_vars": false,
		"tags": [],
		"basic_auth": {
			"disable_caching": false,
			"cache_ttl": 0,
			"extract_from_body": false,
			"body_user_regexp": "",
			"body_password_regexp": ""
		},
		"listen_port": 0,
		"session_provider": {
			"name": "",
			"storage_engine": "",
			"meta": {}
		},
		"auth_configs": {
			"authToken": {
				"disable_header": false,
				"auth_header_name": "Authorization",
				"cookie_name": "",
				"name": "",
				"validate_signature": false,
				"use_param": false,
				"signature": {
					"algorithm": "",
					"header": "",
					"use_param": false,
					"param_name": "",
					"secret": "",
					"allowed_clock_skew": 0,
					"error_code": 0,
					"error_message": ""
				},
				"use_cookie": false,
				"param_name": "",
				"use_certificate": false
			},
			"basic": {
				"disable_header": false,
				"auth_header_name": "Authorization",
				"cookie_name": "",
				"name": "",
				"validate_signature": false,
				"use_param": false,
				"signature": {
					"algorithm": "",
					"header": "",
					"use_param": false,
					"param_name": "",
					"secret": "",
					"allowed_clock_skew": 0,
					"error_code": 0,
					"error_message": ""
				},
				"use_cookie": false,
				"param_name": "",
				"use_certificate": false
			},
			"coprocess": {
				"disable_header": false,
				"auth_header_name": "Authorization",
				"cookie_name": "",
				"name": "",
				"validate_signature": false,
				"use_param": false,
				"signature": {
					"algorithm": "",
					"header": "",
					"use_param": false,
					"param_name": "",
					"secret": "",
					"allowed_clock_skew": 0,
					"error_code": 0,
					"error_message": ""
				},
				"use_cookie": false,
				"param_name": "",
				"use_certificate": false
			},
			"hmac": {
				"disable_header": false,
				"auth_header_name": "Authorization",
				"cookie_name": "",
				"name": "",
				"validate_signature": false,
				"use_param": false,
				"signature": {
					"algorithm": "",
					"header": "",
					"use_param": false,
					"param_name": "",
					"secret": "",
					"allowed_clock_skew": 0,
					"error_code": 0,
					"error_message": ""
				},
				"use_cookie": false,
				"param_name": "",
				"use_certificate": false
			},
			"jwt": {
				"disable_header": false,
				"auth_header_name": "Authorization",
				"cookie_name": "",
				"name": "",
				"validate_signature": false,
				"use_param": false,
				"signature": {
					"algorithm": "",
					"header": "",
					"use_param": false,
					"param_name": "",
					"secret": "",
					"allowed_clock_skew": 0,
					"error_code": 0,
					"error_message": ""
				},
				"use_cookie": false,
				"param_name": "",
				"use_certificate": false
			},
			"oauth": {
				"disable_header": false,
				"auth_header_name": "Authorization",
				"cookie_name": "",
				"name": "",
				"validate_signature": false,
				"use_param": false,
				"signature": {
					"algorithm": "",
					"header": "",
					"use_param": false,
					"param_name": "",
					"secret": "",
					"allowed_clock_skew": 0,
					"error_code": 0,
					"error_message": ""
				},
				"use_cookie": false,
				"param_name": "",
				"use_certificate": false
			},
			"oidc": {
				"disable_header": false,
				"auth_header_name": "Authorization",
				"cookie_name": "",
				"name": "",
				"validate_signature": false,
				"use_param": false,
				"signature": {
					"algorithm": "",
					"header": "",
					"use_param": false,
					"param_name": "",
					"secret": "",
					"allowed_clock_skew": 0,
					"error_code": 0,
					"error_message": ""
				},
				"use_cookie": false,
				"param_name": "",
				"use_certificate": false
			}
		},
		"strip_auth_data": false,
		"id": "6323264b688bfe40b7d71ab3",
		"certificates": [],
		"enable_signature_checking": false,
		"use_openid": false,
		"internal": false,
		"jwt_skip_kid": false,
		"enable_batch_request_support": false,
		"enable_detailed_recording": false,
		"scopes": {
			"jwt": {},
			"oidc": {}
		},
		"response_processors": [],
		"use_mutual_tls_auth": false
	},
	"hook_references": [],
	"is_site": false,
	"sort_by": 0,
	"user_group_owners": [],
	"user_owners": []
}
```

### REST

The REST Datasource is a base component of UDG to help you add existing REST APIs to your data graph. By attaching a REST datasource to a field the engine will use the REST resource for resolving.

We have a video which demoes this functionality for you.

{{< youtube PEwG8F8PxUs >}}

#### Using external REST API as a Datasource

In order to use an external REST API as a Datasource you need to first navigate to the field which that Datasource should be attached to. 

1. Click on the field which should have a datasource attached
2. From the right-hand side *Configure data source* panel choose REST at the bottom in the *Add a new external data source* section

{{< img src="/img/dashboard/udg/datasources/external-rest-config.png" alt="ExternalREST" >}}

3. Provide data source name, URL, method to be used. Optionally you can add headers information and configure field mapping 

{{< img src="/img/dashboard/udg/datasources/rest-datasource.png" alt="ExternalRESTdetail" >}}

4. Click the *Save & Update API* button to persist the configuration and generate a REST resolver, to  resolve this field at runtime.

#### Using Tyk REST API as a Datasource

1. Click on the field which should have a datasource attached
2. From the right-hand side *Configure data source* panel choose *REST | Tyk* dropdown to see all available APIs

{{< img src="/img/dashboard/udg/datasources/rest-internal-config.png" alt="InternalREST" >}}

3. Choose which Tyk REST API you want to attach
4. Provide data source name, endpoint and method to be used. Optionally you can add headers information and configure field mapping

{{< img src="/img/dashboard/udg/datasources/tyk-rest-datasource.png" alt="InternalRESTdetail" >}}

5. Click the *Save & Update API* button to persist the configuration and generate a REST resolver, to resolve this field at runtime.

Once done the field you just configured will show information about data source type and name:

{{< img src="/img/dashboard/udg/datasources/datasources-list.png" alt="datasourcesList" >}}

#### Automatically creating REST UDG configuration based on OAS specification

Tyk Dashboard users have an option to use Tyk Dashboard API and quickly transform REST API OAS specification into a UDG config and have it published in the Dasboard within seconds.

See our [Postman collections](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview) and fork `Tyk Dashboard API v5.1`.

The endpoint you need to use is:

```bash
POST /api/data-graphs/data-sources/import
```

Request body:

```json
{
    "type": "string",
    "data": "string"
}
```

`type` is an enum with the following possible values:

- openapi
- asyncapi

To import an OAS specification you need to choose `openapi`.

If you are using Postman and your OAS document is in `yaml` format you can use a simple pre-request script to transform it into a `string`.

```bash
pm.environment.set("oas_document", JSON.stringify(`<your_yaml_goes_here>`))
```

Then your request body will look like this:

```json
{
    "type": "openapi",
    "data": {{oas_document}}
}
```

### Tyk

Tyk DataSources are exactly the same as GraphQL or REST DataSources.

The only difference is that you can directly choose an endpoint from your existing APIs using a drop-down.
This makes it easier to set up and prevents typos compared to typing in the URL etc.

From a technical perspective there's another difference:

Tyk DataSources make it possible to call into existing APIs on a Tyk Gateway, even if those are marked as internal.
They also add a lot of flexibility as you can add custom middleware, AuthZ as well as AuthN, rate limits, quotas etc. to these.

In general, it is advised to first add all APIs you'd wish to add to a data graph as a dedicated API to Tyk.
Then in a second step you'd add these to your data graph.

Then in a second step you'd add these to your data graph.

{{< note success >}}
**Note**  

As of `v3.2.0` internal datasorces (`TykRESTDataSource` and `TykGraphQLDataSource`) will be deprecated at the API level. Please use `HTTPJSONDataSource` or `GraphQLDataSource` respectively.
{{< /note >}}

## Getting Started

### Overview

{{< youtube TGITEGnJH6c >}} 

In this getting started tutorial we will combine 2 different HTTP services (Users and Reviews) into one single unified UDG API. Instead of querying these two services separately (and probably merging their responses later) we'll use UDG to get result from both the API's in one single response.

#### Prerequisites 

- Access to Tyk Dashboard
- Node.JS v.13^ (only to follow this example)

#### Running example services locally

{{< youtube 9UEgR0VTVmE >}} 

Clone repo

```bash
git clone https://github.com/jay-deshmukh/example-rest-api-for-udg.git
```

Run it locally
```bash
cd example-rest-api-for-udg
```

```bash
npm i
```

```bash
npm run build
```

```bash
npm start
```

You should see following in your terminal

```
Users Service Running on http://localhost:4000
Review service running on http://localhost:4001
```

<hr/>

Now that we have Users service running on port `4000` and Reviews service running on port `4001` let's see how we can combine these two into one single UDG API in following tutorial.


### Creating Schema

{{< youtube ocdY0IKwX_I >}} 

1. Create API

To start with a Universal Data Graph from scratch head over to the dashboard and click on “APIs” in the left menu. Then click the `“Add New API”` and `UDG`. You might want to give your Universal Data Graph an individual name (i.e. `User-Reviews-Demo`)


2. Set Authentication

To get started easily we'll set the API to `Keyless(Open)`. To do this, scroll down to the Authentication section.

{{< note success >}}
**Note**

The API authentication is set to Keyless for demo purposes, it’s not recommended to use this setting in production, we’ll explore how to secure the UDG later in this guide.
{{< /note >}}

3. Configure Schema

Switch to schema tab in your designer and you should already see a default schema. We will edit the schema as follows to connect with our datasources later.

```gql
type Mutation {
  default: String
}

type Query {
  user(id: String): User
}

type Review {
  id: String
  text: String
  userId: String
  user: User
}

type User {
  id: String
  username: String
  reviews: [Review]
}

```

You can also import an existing schema using the import feature, file types supported :  `gql` , `graphql` and `graphqls`.

4. Save

Click on save button and that should create our first UDG API

<hr/>

Now if we try to query our UDG API it should error at this moment as we do not have any data-source attached to it, let's see how we can do that in next section.

### Connect Datasource

{{< youtube tjzjaykQqkg >}} 

Upon navigating to schema tab on API details page you’ll see a split screen view with schema and user interface for available fields to configure the datasource.

You can attach datasource to each individual field and can also re-use the datasource for multiple fields for performance benefits in case it has similar configuration (it needs to use the same upstream URL and method).

We will start with attaching datasource to user query using following approach. 

#### 1. Select field to attach datasource.
Upon selecting the `Users` field on type `Query`, you'll see the options to configure that field for following kinds of datasources.

* REST
* GraphQL
* Kafka

#### 2. Select datasource type.

Since our upstream services are REST, we'll select REST as datasource type but other kind of datasources can be used as well:

* *Use external data source*: Will allow to configure the field to resolve with the external API (outside Tyk environment)
* *Using exiting APIs*: Which will allow to configure the field with the API that already exists in Tyk environment.
* *Re-use already configured data source*: If you already have configured a data source for the same API you can re-use the same data-source. If the data source is reused the endpoint will only be called once by Tyk.

You can learn more about it [here]({{< ref "#udg" >}})

#### 3. Configure datasource details.

Configure the data source with the following fields

**Name**

 Enter a unique datasource name configuration to reuse it in the future. We will name this as `getUserById` for the given example.
When configuring a datasource name with Tyk Dashboard, a default name is created automatically by concatenating the field name and the GraphQL type name with an underscore symbol in between. For example, _getUserById_Query_. This name is editable and can be changed by the user.

**URL**

We will use the URL for our `Users` service which returns details of an user for given `id` i.e `http://localhost:4000/users/:id`.

To dynamically inject the `id` for every request made, we can use templating syntax and inject `id` with user supplied argument or we can also use session object.

To avoid typos in template you can use the UI component to automatically create a template for you. You can select from the available argument and object template options from the list generated by input component which is triggered by entering `{` in input.

To learn more about arguments click [here]({{< ref "#arguments" >}})

To learn more about reusing response fields click [here]({{< ref "#reusing-response-fields" >}})

#### 4. Enter datasource name.

Enter a unique datasource name your configuration to reuse it in the future. We will name this as `getUserById` for the given example

#### 5. Select HTTP method for the URL.

You can select the HTTP method for your upstream url. Which should be `GET` in our case.

#### 6. Add headers (Optional)

If you upstream expects headers, you can supply them using this.
You can also use templating syntax here to reuse request headers.

#### 7. Select field mapping

Keep the field mapping disabled by default.
You can use field mapping to map the API response with your schema.

You can learn more about field mapping [here]({{< ref "#field-mappings" >}})

#### 8. Save data source

It is important to save the datasource configuration in order to reflect the changes in your API definition.
The` “Save & Update API” `button will persist the full API definition.

#### 9. Update API and Test

Click Update the API.

You can now query your UDG API of `user` using the Playground tab in API designer

```gql
query getUser {
  user(id:"1"){
    username
    id
    reviews {
      id
      text
      user {
        id
      }
      
    }
  }
}
```

The above query should return the response as follows 

```json
{
  "data": {
    "user": {
      "username": "John Doe",
      "id": "1",
      "reviews": null
    }
  }
}
```

#### Challenge

1. Try to resolve `reviews` field on type `Users`
2. Try to resolve `users` field on type `Reviews`

As you can see our query resolved for user details but returns `null` for `reviews`. 

This happens because we haven't defined datasource on field level for `reviews` on type `User`. 

```
Notes
- For reviews field on type User
- - Description :: get reviews by userId
- - URL :: http://localhost:4001/reviews/:userId
- - Method :: GET

- For users field on type Review
- - Description :: get user details by Id
- - URL :: http://localhost:4000/users/:userId
- - Method :: GET

- You can reuse response filed using templating syntax example `{{.object.id}}`
```

{{< note success >}}
**Note**

You can find the solution for the challenge in the above video.

{{< /note >}}

<hr />

Now that we have linked datasources for our queries, let's see how we can do the same for mutations in the next section.


### Mutations

{{< youtube za2KdDQSCnI >}} 

Now that we have attached datasources to our `Query` in the schema let's try to do the same for `Mutation`.

#### Steps for Configuration

1. **Update Schema**

    ```gql
    type Mutation {
    addReview(text: String, userId: String): Review
    deletReview(reviewId: String): String
    }
    ```

    We’ll update the Mutatation type as above where we’ll add two operations 

    * `addReview`: Which accepts two `arguments` (i.e `text` and `userId`) and adds a new review by making a `POST` request to `http://localhost:4001/reviews` endpoint, which expects something like the following in the request payload 

    ```
    {
        "id": "1", // UserId of the user posting review 
        "text": "New Review by John Doe11" // review text
    }
    ```
    * `deleteReview`: Which accepts one `argument` (i.e `reviewId`), that deletes a review by making a `DELETE` request to `http://localhost:4001/reviews/:reviewId`

2. **Configure datasource.**

    Follow these steps to configure a data source for the `Mutation`.

    * Navigate to schema tab in the api where you would see the split screen view of schema editor on left and list of configurable fields on right
    * Select `addReview` field from `Mutation` type
    * Select `REST` option
    * Set a unique datasource name
    * Set the URL as `http://localhost:4001/reviews`
    * Select method type as `POST`
    * Set request body to relay the graphql arguments to our upstream payload as follows:

    ```
    {
        "text": "{{.arguments.text}}",
        "userId": "{{.arguments.userId}}"
        }
    ```
    * Update the API

3. **Execute mutation operation**

    We can now test our mutation operation with the playground in API designer using the following operation

    ```gql
    mutation AddReview {
    addReview(text: "review using udg", userId:"1"){
        id
        text
    }
    }
    ```

    That should return us the following response:

    ```gql
    {
    "data": {
        "addReview": {
        "id": "e201e6f3-b582-4772-b95a-d25199b4ab82",
        "text": "review using udg"
        }
    }
    }

    ```


#### Challenge

Configure a datasource to delete a review using review id.

```
Notes

- For users field on type Review
- - Description :: delete review using reviewId
- - URL :: http://localhost:4001/reviews/:reviewId
- - Method :: DELETE

- Enable field mapping to map your API response 

```
{{< note success >}}
**Note**

You can find the solution for the challenge in the above video.

{{< /note >}}

<hr />

Now that we have a good idea how we could do CRUD operations with UDG APIs, let's see how we can secure them using policies

### Security

{{< youtube lRLLFLv2rN4 >}} 

Due to the nature of graphql, clients can craft complex or large queries which can cause your upstream APIs to go down or have performance issues.

Some of the common strategies to mitigate these risks include 

- Rate limiting
- Throttling
- Query depth limiting


For this tutorial we'll mitigate these risks using `Query Depth Limit` but you can also use common strategies like rate limiting and throttling, which you can read more about [here](/api-management/rate-limit)

#### Steps for Configuration

1. **Set authentication mode**

    In you Api designer core settings tab scroll down to Authentication section and set the authentication mode `Authentication Token` and update the API.

    Our API is not open and keyless anymore and would need appropriate Authentication token to execute queries.

2. **Applying to query depth**

    Currently if users want they could run queries with unlimited depth as follows 

    ```gql
    query getUser {
    user(id: "1") {
        reviews {
        user {
            reviews {
            user {
                reviews {
                user {
                    reviews {
                    user {
                        id
                    }
                    }
                }
                }
            }
            }
        }
        }
    }
    }

    ```

    To avoid these kind of scenarios we will set query depth limit on the keys created to access this API.

    Although we can directly create keys by selecting this API but we'll use policy as it will make it easier to update keys for this API in future. You can read more about policies [here](/api-management/policies#what-is-a-security-policy)

    **Create Policy**
    - Navigate to policies page
    - Click Add Policy
    - Select our API from Access Rights table
    - Expand `Global Limits and Quota` section
    - Unselect `Unlimited Query Depth` and set limit to `5`
    - Switch to configuration tab
    - Set policy name (eg. user-reviews-policy)
    - Set expiration date for the keys that would be created using this policy
    - Click on create policy

    **Create a key using above policy**
    - Navigate to keys page
    - Click Add Key
    - Select our newly created policy
    - Click create key
    - Copy the key ID

    Now if you try to query our UDG API using the  key you should see an error as follows

    ```json
    {
    "error": "depth limit exceeded"
    }
    ```

    {{< note success >}}
**Note**

Watch the video above to see how you can use these policies to publish your UDG APIs on your portal with documentation and playground.

    {{< /note >}}

### Field Based Permissions

{{< youtube EBza1BFegrk >}} 

It is also possible to restrict user's based on fields using policies. For example you can create two policies 

1. For read-only access for users to only execute queries.

2. For read and write access to run mutations and queries both. 

#### Creating keys with read-only access

**Create Policy**

- Navigate to policies page
- Click Add Policy
- Select our API from Access Rights table
- Expand Api panel under global section
- Toggle Field-Based Permissions and check Mutation
- Switch to configuration tab
- Set policy name (eg. user-reviews-policy-read-only)
- Set expiration date for the keys that would be created using this policy
- Click on create policy

Now keys created using these policies cannot be used for mutations.

### Header Forwarding

**Min Version: Tyk v3.2.0**

You’re able to configure upstream Headers dynamically, that is, you’re able to inject Headers from the client request into UDG upstream requests. For example, it can be used to access protected upstreams.

The syntax for this is straight forward:

```
{{.request.headers.someheader}}
```

  In your data sources, define your new Header name and then declare which request header's value to use:

  {{< img src="/img/dashboard/udg/getting-started/request-forward-syntax.png" alt="Forwarding Headers" >}}

  That's it!

  {{< note success >}}
**Note**

A JSON string has to be escaped before using as a header value. For example:
```
{\"hello\":\"world\"}
```

{{< /note >}}

### UDG Examples

It is possible to import various UDG examples from the [official Tyk examples repository](https://github.com/TykTechnologies/tyk-examples).

We offer 3 ways of importing an example into Tyk:
 - Using [tyk-sync]({{< ref "api-management/automations/sync#synchronize-api-configurations-with-github-actions" >}})
 - Manually import via [Dashboard API Import]({{< ref "getting-started/import-apis" >}})
- Using Tyk Dashboard to browse and import the examples directly

#### Import via tyk-sync

Please follow the [tyk-sync documentation]({{< ref "api-management/automations/sync#examples-publish-command" >}}) to learn more about this approach.

#### Import via Tyk Dashboard API Import

Navigate to an example inside the [examples repository](https://github.com/TykTechnologies/tyk-examples) and grab the relevant API definition from there.
Then you can move in the Dashboard UI to `APIs -> Import API` and select `Tyk API` as source format.

Paste the API definition inside the text box and hit `Import API`.

You can find more detailed instructions in the [Dashboard API Import documentation section]({{< ref "getting-started/import-apis" >}}).

#### Import via Tyk Dashboard UI

Navigate to `Data Graphs` section of the Tyk Dashboard menu. If you haven't yet created any Universal Data Graphs you will see three options in the screen - one of them `Try example data graph` - will allow you to browse all examples compatible with your Dashboard version and choose the one you want to import.

{{< img src="/img/dashboard/udg/getting-started/example data graph.png" alt="Examples in Dashboard" >}}

In case you have created data graphs before and your screen looks different, just use the `Add Data Graph` button and in the next step decide if you want to create one yourself, or use one of the available examples.

{{< img src="/img/dashboard/udg/getting-started/data graph example new graph menu.png" alt="Examples in Dashboard New Graph">}}