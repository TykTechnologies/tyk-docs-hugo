---
title: "Kafka Datasource"
date: 2020-06-03
menu:
  main:
    parent: "UDG DataSources"
weight: 2
url: /universal-data-graph/datasources/kafka/
aliases:
    - /universal-data-graph/data-sources/kafka
---

The Kafka DataSource is able to subscribe to Kafka topics and query the events with GraphQL.


The Kafka DataSource utilises consumer groups to subscribe to the given topics, and inherits all behavior of the consumer group concept.   

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

#### Subscribing to topics

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

#### Publishing events for testing

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


#### API Definition for the Kafka DataSource

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
