---
title: "Tyk Streams Configuration"
date: 2025-02-10
tags: ["Broker", "Input", "Output", "HTTP Client", "HTTP Server", "Processors", "Scanners", "CSV", "Lines", "Regular Expression", "Switch", "Avro", "Kafka"]
description: "How to configure Tyk Streams"
keywords: ["Broker", "Input", "Output", "HTTP Client", "HTTP Server", "Processors", "Scanners", "CSV", "Lines", "Regular Expression", "Switch", "Avro", "Kafka"]
aliases:
  - /product-stack/tyk-streaming/configuration/overview
  - /product-stack/tyk-streaming/configuration/inputs/overview
  - /product-stack/tyk-streaming/configuration/inputs/broker
  - /product-stack/tyk-streaming/configuration/inputs/http-client
  - /product-stack/tyk-streaming/configuration/inputs/http-server
  - /product-stack/tyk-streaming/configuration/inputs/kafka
  - /product-stack/tyk-streaming/configuration/outputs/overview
  - /product-stack/tyk-streaming/configuration/outputs/broker
  - /product-stack/tyk-streaming/configuration/outputs/http-client
  - /product-stack/tyk-streaming/configuration/outputs/http-server
  - /product-stack/tyk-streaming/configuration/outputs/kafka
  - /product-stack/tyk-streaming/configuration/processors/overview
  - /product-stack/tyk-streaming/configuration/processors/avro
  - /product-stack/tyk-streaming/configuration/scanners/overview
  - /product-stack/tyk-streaming/configuration/scanners/csv
  - /product-stack/tyk-streaming/configuration/scanners/lines
  - /product-stack/tyk-streaming/configuration/scanners/re-match
  - /product-stack/tyk-streaming/configuration/scanners/switch
  - /product-stack/tyk-streaming/configuration/common-configuration/batching
  - /product-stack/tyk-streaming/configuration/common-configuration/field-paths
  - /product-stack/tyk-streaming/configuration/common-configuration/processing-pipelines
  - /product-stack/tyk-streaming/configuration/common-configuration/secrets
---

## Overview

Tyk streams configuration is specified using YAML. The configuration consists of several main sections: *input*, *pipeline*, *output* and optionally *logger*.

### Input

The input section defines the publisher source of the data stream. Tyk Streams supports various input types such as Kafka, HTTP, MQTT etc. Each input type has specific configuration parameters.

```yaml
input:
  kafka:
    addresses:
      - localhost:9092
    topics:
      - example_topic
    consumer_group: example_group
    client_id: example_client
```

### Pipeline

The pipeline section defines the processing steps applied to the data. It includes processors for filtering, mapping, enriching and transforming the data. Processors can be chained together.

```yaml
pipeline:
  processors:
    - mapping: |
        root = this
        root.foo = this.bar.uppercase()
    - json_schema:
        schema_path: "./schemas/example_schema.json"
```

### Output

The output section specifies the destination of the processed data. Similar to inputs, Tyk Streams supports various output types like Kafka, HTTP etc.

```yaml
output:
  kafka:
    addresses:
      - localhost:9092
    topic: output_topic
    client_id: example_output_client
```

### Logger (Optional)

The logger section is used to configure logging options, such as log level and output format.

```yaml
logger:
  level: INFO
  format: json
```

## Inputs

### Overview

An input is a source of data piped through an array of optional [processors]({{< ref "api-management/stream-config#overview-3" >}}):

```yaml
input:
  label: my_kafka_input

  kafka:
    addresses: [ localhost:9092 ]
    topics: [ foo, bar ]
    consumer_group: foogroup

  # Optional list of processing steps
  processors:
    - avro:
        operator: to_json
```

#### Brokering

Only one input is configured at the root of a Tyk Streams config. However, the root input can be a [broker]({{< ref "api-management/stream-config#broker" >}}) which combines multiple inputs and merges the streams:

```yaml
input:
  broker:
    inputs:
      - kafka:
          addresses: [ localhost:9092 ]
          topics: [ foo, bar ]
          consumer_group: foogroup

      - http_client:
          url: https://localhost:8085
          verb: GET
          stream:
            enabled: true
```

#### Labels

Inputs have an optional field `label` that can uniquely identify them in observability data such as logs.

<!-- TODO

When know if Tyk Streams will support metrics then link to metrics

Inputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple inputs, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation][metrics.about].

-->

### Broker

Allows you to combine multiple inputs into a single stream of data, where each input will be read in parallel.

#### Common

```yml
# Common config fields, showing default values
input:
  label: ""
  broker:
    inputs: [] # No default (required)
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
```

#### Advanced

```yml
# All config fields, showing default values
input:
  label: ""
  broker:
    copies: 1
    inputs: [] # No default (required)
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
      processors: [] # No default (optional)
```

A broker type is configured with its own list of input configurations and a field to specify how many copies of the list of inputs should be created.

Adding more input types allows you to combine streams from multiple sources into one. For example, reading from both RabbitMQ and Kafka:

```yaml
input:
  broker:
    copies: 1
    inputs:
      - amqp_0_9:
          urls:
            - amqp://guest:guest@localhost:5672/
          consumer_tag: tyk-consumer
          queue: tyk-queue

        # Optional list of input specific processing steps
        processors:
          - mapping: |
              root.message = this
              root.meta.link_count = this.links.length()
              root.user.age = this.user.age.number()

      - kafka:
          addresses:
            - localhost:9092
          client_id: tyk_kafka_input
          consumer_group: tyk_consumer_group
          topics: [ tyk_stream:0 ]
```

If the number of copies is greater than zero the list will be copied that number of times. For example, if your inputs were of type foo and bar, with 'copies' set to '2', you would end up with two 'foo' inputs and two 'bar' inputs.

##### Batching

It's possible to configure a [batch policy]({{< ref "api-management/stream-config#batch-policy" >}}) with a broker using the `batching` fields. When doing this the feeds from all child inputs are combined. Some inputs do not support broker based batching and specify this in their documentation.

##### Processors

It is possible to configure processors at the broker level, where they will be applied to *all* child inputs, as well as on the individual child inputs. If you have processors at both the broker level *and* on child inputs then the broker processors will be applied *after* the child nodes processors.

#### Fields

##### copies

Whatever is specified within `inputs` will be created this many times.


Type: `int`
Default: `1`

##### inputs

A list of inputs to create.


Type: `array`

##### batching

Allows you to configure a [batching policy]({{< ref "api-management/stream-config#batch-policy" >}}).


Type: `object`

```yml
# Examples

batching:
  byte_size: 5000
  count: 0
  period: 1s

batching:
  count: 10
  period: 1s

batching:
  check: this.contains("END BATCH")
  count: 0
  period: 1m
```

##### batching.count

A number of messages at which the batch should be flushed. If `0` disables count based batching.


Type: `int`
Default: `0`

##### batching.byte_size

An amount of bytes at which the batch should be flushed. If `0` disables size based batching.


Type: `int`
Default: `0`

##### batching.period

A period in which an incomplete batch should be flushed regardless of its size.


Type: `string`
Default: `""`

```yml
# Examples

period: 1s

period: 1m

period: 500ms
```

##### batching.check

A Bloblang query that should return a boolean value indicating whether a message should end a batch.


Type: `string`
Default: `""`

```yml
# Examples

check: this.type == "end_of_transaction"
```

##### batching.processors

A list of processors to apply to a batch as it is flushed. This allows you to aggregate and archive the batch however you see fit. Please note that all resulting messages are flushed as a single batch, therefore splitting the batch into smaller batches using these processors is a no-op.


Type: `array`

```yml
# Examples

processors:
  - archive:
      format: concatenate

processors:
  - archive:
      format: lines

processors:
  - archive:
      format: json_array
```

### Http Client

Connects to a server and continuously performs requests for a single message.

#### Common

```yml
# Common config fields, showing default values
input:
  label: ""
  http_client:
    url: "" # No default (required)
    verb: GET
    headers: {}
    timeout: 5s
    payload: "" # No default (optional)
    stream:
      enabled: false
      reconnect: true
    auto_replay_nacks: true
```

#### Advanced

```yml
# All config fields, showing default values
input:
  label: ""
  http_client:
    url: "" # No default (required)
    verb: GET
    headers: {}
    metadata:
      include_prefixes: []
      include_patterns: []
    dump_request_log_level: ""
    oauth:
      enabled: false
      consumer_key: ""
      consumer_secret: ""
      access_token: ""
      access_token_secret: ""
    oauth2:
      enabled: false
      client_key: ""
      client_secret: ""
      token_url: ""
      scopes: []
      endpoint_params: {}
    basic_auth:
      enabled: false
      username: ""
      password: ""
    jwt:
      enabled: false
      private_key_file: ""
      signing_method: ""
      claims: {}
      headers: {}
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
    extract_headers:
      include_prefixes: []
      include_patterns: []
    timeout: 5s
    retry_period: 1s
    max_retry_backoff: 300s
    retries: 3
    backoff_on:
      - 429
    drop_on: []
    successful_on: []
    proxy_url: "" # No default (optional)
    payload: "" # No default (optional)
    drop_empty_bodies: true
    stream:
      enabled: false
      reconnect: true
    auto_replay_nacks: true
```

##### Streaming

If you enable streaming then Tyk Streams will consume the body of the response as a continuous stream of data. This allows you to consume APIs that provide long lived streamed data feeds (such as Twitter).

##### Pagination

This input supports interpolation functions in the `url` and `headers` fields where data from the previous successfully consumed message (if there was one) can be referenced. This can be used in order to support basic levels of pagination.

#### Examples

##### Basic Pagination

Interpolation functions within the `url` and `headers` fields can be used to reference the previously consumed message, which allows simple pagination.

```yaml
input:
  http_client:
    url: >-
      http://api.example.com/search?query=allmyfoos&start_time=${! (
        (timestamp_unix()-300).ts_format("2006-01-02T15:04:05Z","UTC").escape_url_query()
      ) }${! ("&next_token="+this.meta.next_token.not_null()) | "" }
    verb: GET
```

<!--

Update example when Tyk secrets Stream release has been performed

```yaml
input:
  http_client:
    url: >-
      http://api.example.com/search?query=allmyfoos&start_time=${! (
        (timestamp_unix()-300).ts_format("2006-01-02T15:04:05Z","UTC").escape_url_query()
      ) }${! ("&next_token="+this.meta.next_token.not_null()) | "" }
    verb: GET
    rate_limit: foo_searches
    # oauth2:
    #   enabled: true
    #   token_url: https://api.example.com/oauth2/token
    #   client_key: "${EXAMPLE_KEY}"
    #   client_secret: "${EXAMPLE_SECRET}"

rate_limit_resources:
  - label: foo_searches
    local:
      count: 1
      interval: 30s
```
-->

#### Fields

##### url

The URL to connect to.


Type: `string`

##### verb

A verb to connect with


Type: `string`
Default: `"GET"`

```yml
# Examples

verb: POST

verb: GET

verb: DELETE
```

##### headers

A map of headers to add to the request.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `object`
Default: `{}`

```yml
# Examples

headers:
  Content-Type: application/octet-stream
  traceparent: ${! tracing_span().traceparent }
```

##### metadata

Specify optional matching rules to determine which metadata keys should be added to the HTTP request as headers.


Type: `object`

##### metadata.include_prefixes

Provide a list of explicit metadata key prefixes to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_prefixes:
  - foo_
  - bar_

include_prefixes:
  - kafka_

include_prefixes:
  - content-
```

##### metadata.include_patterns

Provide a list of explicit metadata key regular expression (re2) patterns to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_patterns:
  - .*

include_patterns:
  - _timestamp_unix$
```

##### dump_request_log_level

Optionally set a level at which the request and response payload of each request made will be logged.


Type: `string`
Default: `""`
Options: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`, ``.

##### oauth

Allows you to specify open authentication via OAuth version 1.


Type: `object`

##### oauth.enabled

Whether to use OAuth version 1 in requests.


Type: `bool`
Default: `false`

##### oauth.consumer_key

A value used to identify the client to the service provider.


Type: `string`
Default: `""`

##### oauth.consumer_secret

A secret used to establish ownership of the consumer key.


Type: `string`
Default: `""`

##### oauth.access_token

A value used to gain access to the protected resources on behalf of the user.


Type: `string`
Default: `""`

##### oauth.access_token_secret

A secret provided in order to establish ownership of a given access token.


Type: `string`
Default: `""`

##### oauth2

Allows you to specify open authentication via OAuth version 2 using the client credentials token flow.


Type: `object`

##### oauth2.enabled

Whether to use OAuth version 2 in requests.


Type: `bool`
Default: `false`

##### oauth2.client_key

A value used to identify the client to the token provider.


Type: `string`
Default: `""`

##### oauth2.client_secret

A secret used to establish ownership of the client key.


Type: `string`
Default: `""`

##### oauth2.token_url

The URL of the token provider.


Type: `string`
Default: `""`

##### oauth2.scopes

A list of optional requested permissions.


Type: `array`
Default: `[]`

##### oauth2.endpoint_params

A list of optional endpoint parameters, values should be arrays of strings.


Type: `object`
Default: `{}`

```yml
# Examples

endpoint_params:
  bar:
    - woof
  foo:
    - meow
    - quack
```

##### basic_auth

Allows you to specify basic authentication.


Type: `object`

##### basic_auth.enabled

Whether to use basic authentication in requests.


Type: `bool`
Default: `false`

##### basic_auth.username

A username to authenticate as.


Type: `string`
Default: `""`

##### basic_auth.password

A password to authenticate with.


Type: `string`
Default: `""`

##### jwt

Allows you to specify JWT authentication.


Type: `object`

##### jwt.enabled

Whether to use JWT authentication in requests.


Type: `bool`
Default: `false`

##### jwt.private_key_file

A file with the PEM encoded via PKCS1 or PKCS8 as private key.


Type: `string`
Default: `""`

##### jwt.signing_method

A method used to sign the token such as RS256, RS384, RS512 or EdDSA.


Type: `string`
Default: `""`

##### jwt.claims

A value used to identify the claims that issued the JWT.


Type: `object`
Default: `{}`

##### jwt.headers

Add optional key/value headers to the JWT.


Type: `object`
Default: `{}`

##### tls

Custom TLS settings can be used to override system defaults.


Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.


Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.


Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're seeing the error message `local error: tls: no renegotiation`.


Type: `bool`
Default: `false`

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified, but not both.


Type: `array`
Default: `[]`

```yml
# Examples

client_certs:
  - cert: foo
    key: bar

client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.


Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].cert_file

The path of a certificate to use.


Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in PKCS#1 or PKCS#8 format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an attacker recover the plaintext.

Type: `string`
Default: `""`

```yml
# Examples

password: foo
```

##### extract_headers

Specify which response headers should be added to resulting messages as metadata. Header keys are lowercased before matching, so ensure that your patterns target lowercased versions of the header keys that you expect.


Type: `object`

##### extract_headers.include_prefixes

Provide a list of explicit metadata key prefixes to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_prefixes:
  - foo_
  - bar_

include_prefixes:
  - kafka_

include_prefixes:
  - content-
```

##### extract_headers.include_patterns

Provide a list of explicit metadata key regular expression (re2) patterns to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_patterns:
  - .*

include_patterns:
  - _timestamp_unix$
```

##### timeout

A static timeout to apply to requests.


Type: `string`
Default: `"5s"`

##### retry_period

The base period to wait between failed requests.


Type: `string`
Default: `"1s"`

##### max_retry_backoff

The maximum period to wait between failed requests.


Type: `string`
Default: `"300s"`

##### retries

The maximum number of retry attempts to make.


Type: `int`
Default: `3`

##### backoff_on

A list of status codes whereby the request should be considered to have failed and retries should be attempted, but the period between them should be increased gradually.


Type: `array`
Default: `[429]`

##### drop_on

A list of status codes whereby the request should be considered to have failed but retries should not be attempted. This is useful for preventing wasted retries for requests that will never succeed. Note that with these status codes the *request* is dropped, but *message* that caused the request will not be dropped.


Type: `array`
Default: `[]`

##### successful_on

A list of status codes whereby the attempt should be considered successful, this is useful for dropping requests that return non-2XX codes indicating that the message has been dealt with, such as a 303 See Other or a 409 Conflict. All 2XX codes are considered successful unless they are present within `backoff_on` or `drop_on`, regardless of this field.


Type: `array`
Default: `[]`

##### proxy_url

An optional HTTP proxy URL.


Type: `string`

##### payload

An optional payload to deliver for each request.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->


Type: `string`

##### drop_empty_bodies

Whether empty payloads received from the target server should be dropped.


Type: `bool`
Default: `true`

##### stream

Allows you to set streaming mode, where requests are kept open and messages are processed line-by-line.


Type: `object`

##### stream.enabled

Enables streaming mode.


Type: `bool`
Default: `false`

##### stream.reconnect

Sets whether to re-establish the connection once it is lost.


Type: `bool`
Default: `true`


##### auto_replay_nacks

Whether messages that are rejected (nacked) at the output level should be automatically replayed indefinitely, eventually resulting in back pressure if the cause of the rejections is persistent. If set to `false` these messages will instead be deleted. Disabling auto replays can greatly improve memory efficiency of high throughput streams as the original shape of the data can be discarded immediately upon consumption and mutation.


Type: `bool`
Default: `true`

### HTTP Server

Receive messages POSTed over HTTP(S). HTTP 2.0 is supported when using TLS, which is enabled when key and cert files are specified.

#### Common

```yml
# Common config fields, showing default values
input:
  label: ""
  http_server:
    address: ""
    path: /post
    ws_path: /post/ws
    allowed_verbs:
      - POST
    timeout: 5s
```

#### Advanced

```yml
# All config fields, showing default values
input:
  label: ""
  http_server:
    address: ""
    path: /post
    ws_path: /post/ws
    ws_welcome_message: ""
    allowed_verbs:
      - POST
    timeout: 5s
    cert_file: ""
    key_file: ""
    cors:
      enabled: false
      allowed_origins: []
    sync_response:
      status: "200"
      headers:
        Content-Type: application/octet-stream
      metadata_headers:
        include_prefixes: []
        include_patterns: []
```

<!-- TODO add link to service wide HTTP server If the `address` config field is left blank the [service-wide HTTP server](/docs/components/http/about) will be used. -->

<!-- TODO add rate limit The field `rate_limit` allows you to specify an optional [`rate_limit` resource](/docs/components/rate_limits/about), which will be applied to each HTTP request made and each websocket payload received.

When the rate limit is breached HTTP requests will have a 429 response returned with a Retry-After header. Websocket payloads will be dropped and an optional response payload will be sent as per `ws_rate_limit_message`. -->

##### Responses

<!-- TODO describe how to use synchronous responses when avail:

It's possible to return a response for each message received using synchronous responses. When doing so you can customise headers with the `sync_response` field `headers`, which can also use function interpolation in the value based on the response message contents.
 -->


##### Endpoints

The following fields specify endpoints that are registered for sending messages, and support path parameters of the form `/{foo}`, which are added to ingested messages as metadata. A path ending in `/` will match against all extensions of that path:

###### path (defaults to `/post`)

This endpoint expects POST requests where the entire request body is consumed as a single message.

If the request contains a multipart `content-type` header as per [rfc1341](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html) then the multiple parts are consumed as a batch of messages, where each body part is a message of the batch.

###### ws_path (defaults to `/post/ws`)

Creates a websocket connection, where payloads received on the socket are passed through the pipeline as a batch of one message.

Please note that components within a Tyk Streams config will register their respective endpoints in a non-deterministic order. This means that establishing precedence of endpoints that are registered via multiple `http_server` inputs or outputs (either within brokers or from cohabiting streams) is not possible in a predictable way.

This ambiguity makes it difficult to ensure that paths which are both a subset of a path registered by a separate component, and end in a slash (`/`) and will therefore match against all extensions of that path, do not prevent the more specific path from matching against requests.

It is therefore recommended that you ensure paths of separate components do not collide unless they are explicitly non-competing.

For example, if you were to deploy two separate `http_server` inputs, one with a path `/foo/` and the other with a path `/foo/bar`, it would not be possible to ensure that the path `/foo/` does not swallow requests made to `/foo/bar`.

You may specify an optional `ws_welcome_message`, which is a static payload to be sent to all clients once a websocket connection is first established.

##### Metadata

This input adds the following metadata fields to each message:

``` text
- http_server_user_agent
- http_server_request_path
- http_server_verb
- http_server_remote_ip
- All headers (only first values are taken)
- All query parameters
- All path parameters
- All cookies
```

If HTTPS is enabled, the following fields are added as well:
``` text
- http_server_tls_version
- http_server_tls_subject
- http_server_tls_cipher_suite
```

<!-- TODO: when interpolaion supported
You can access these metadata fields using interpolation functions.
-->

#### Examples


##### Path Switching

This example shows an `http_server` input that captures all requests and processes them by switching on that path:

```yaml
input:
  http_server:
    path: /
    allowed_verbs: [ GET, POST ]
    sync_response:
      headers:
        Content-Type: application/json

  processors:
    - switch:
      - check: '@http_server_request_path == "/foo"'
        processors:
          - mapping: |
              root.title = "You Got Fooed!"
              root.result = content().string().uppercase()

      - check: '@http_server_request_path == "/bar"'
        processors:
          - mapping: 'root.title = "Bar Is Slow"'
          - sleep: # Simulate a slow endpoint
              duration: 1s
```

##### Mock OAuth 2.0 Server

This example shows an `http_server` input that mocks an OAuth 2.0 Client Credentials flow server at the endpoint `/oauth2_test`:

```yaml
input:
  http_server:
    path: /oauth2_test
    allowed_verbs: [ GET, POST ]
    sync_response:
      headers:
        Content-Type: application/json

  processors:
    - log:
        message: "Received request"
        level: INFO
        fields_mapping: |
          root = @
          root.body = content().string()

    - mapping: |
        root.access_token = "MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3"
        root.token_type = "Bearer"
        root.expires_in = 3600

    - sync_response: {}
    - mapping: 'root = deleted()'
```

#### Fields

##### address

An alternative address to host from. If left empty the service wide address is used.


Type: `string`
Default: `""`

##### path

The endpoint path to listen for POST requests.


Type: `string`
Default: `"/post"`

##### ws_path

The endpoint path to create websocket connections from.


Type: `string`
Default: `"/post/ws"`

##### ws_welcome_message

An optional message to deliver to fresh websocket connections.


Type: `string`
Default: `""`

##### allowed_verbs

An array of verbs that are allowed for the `path` endpoint.


Type: `array`
Default: `["POST"]`
Requires version 3.33.0 or newer

##### timeout

Timeout for requests. If a consumed messages takes longer than this to be delivered the connection is closed, but the message may still be delivered.


Type: `string`
Default: `"5s"`

<!-- TODO add rate limit ##### rate_limit

An optional [rate limit](/docs/components/rate_limits/about) to throttle requests by. -->


Type: `string`
Default: `""`

##### cert_file

Enable TLS by specifying a certificate and key file. Only valid with a custom `address`.


Type: `string`
Default: `""`

##### key_file

Enable TLS by specifying a certificate and key file. Only valid with a custom `address`.


Type: `string`
Default: `""`

##### cors

Adds Cross-Origin Resource Sharing headers. Only valid with a custom `address`.


Type: `object`
Requires version 3.63.0 or newer

##### cors.enabled

Whether to allow CORS requests.


Type: `bool`
Default: `false`

##### cors.allowed_origins

An explicit list of origins that are allowed for CORS requests.


Type: `array`
Default: `[]`

##### sync_response

<!-- TODO add links to synchronous responses -->
Customize messages returned via synchronous responses.


Type: `object`

##### sync_response.status

Specify the status code to return with synchronous responses. This is a string value, which allows you to customize it based on resulting payloads and their metadata.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->


Type: `string`
Default: `"200"`

```yml
# Examples

status: ${! json("status") }

status: ${! meta("status") }
```

##### sync_response.headers

Specify headers to return with synchronous responses.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->


Type: `object`
Default: `{"Content-Type":"application/octet-stream"}`

##### sync_response.metadata_headers

Specify criteria for which metadata values are added to the response as headers.


Type: `object`

##### sync_response.metadata_headers.include_prefixes

Provide a list of explicit metadata key prefixes to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_prefixes:
  - foo_
  - bar_

include_prefixes:
  - kafka_

include_prefixes:
  - content-
```

##### sync_response.metadata_headers.include_patterns

Provide a list of explicit metadata key regular expression (re2) patterns to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_patterns:
  - .*

include_patterns:
  - _timestamp_unix$
```

### Kafka

Connects to Kafka brokers and consumes one or more topics.

#### Common

```yml
# Common config fields, showing default values
input:
  label: ""
  kafka:
    addresses: [] # No default (required)
    topics: [] # No default (required)
    target_version: 2.1.0 # No default (optional)
    consumer_group: ""
    checkpoint_limit: 1024
    auto_replay_nacks: true
```

#### Advanced

```yml
# All config fields, showing default values
input:
  label: ""
  kafka:
    addresses: [] # No default (required)
    topics: [] # No default (required)
    target_version: 2.1.0 # No default (optional)
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
    sasl:
      mechanism: none
      user: ""
      password: ""
      access_token: ""
      token_cache: ""
      token_key: ""
    consumer_group: ""
    client_id: tyk
    rack_id: ""
    start_from_oldest: true
    checkpoint_limit: 1024
    auto_replay_nacks: true
    commit_period: 1s
    max_processing_period: 100ms
    extract_tracing_map: root = @ # No default (optional)
    group:
      session_timeout: 10s
      heartbeat_interval: 3s
      rebalance_timeout: 60s
    fetch_buffer_cap: 256
    multi_header: false
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
      processors: [] # No default (optional)
```

Offsets are managed within Kafka under the specified consumer group, and partitions for each topic are automatically balanced across members of the consumer group.

The Kafka input allows parallel processing of messages from different topic partitions, and messages of the same topic partition are processed with a maximum parallelism determined by the field [checkpoint_limit](#checkpoint_limit).

In order to enforce ordered processing of partition messages set the [checkpoint_limit](#checkpoint_limit) to `1` and this will force partitions to be processed in lock-step, where a message will only be processed once the prior message is delivered.

Batching messages before processing can be enabled using the [batching](#batching) field, and this batching is performed per-partition such that messages of a batch will always originate from the same partition. This batching mechanism is capable of creating batches of greater size than the [checkpoint_limit](#checkpoint_limit), in which case the next batch will only be created upon delivery of the current one.

##### Metadata

This input adds the following metadata fields to each message:

``` text
- kafka_key
- kafka_topic
- kafka_partition
- kafka_offset
- kafka_lag
- kafka_timestamp_unix
- kafka_tombstone_message
- All existing message headers (version 0.11+)
```

The field `kafka_lag` is the calculated difference between the high water mark offset of the partition at the time of ingestion and the current message offset.

<!-- TODO: when interpolation supported
You can access these metadata fields using function interpolation.
-->

##### Ordering

By default messages of a topic partition can be processed in parallel, up to a limit determined by the field `checkpoint_limit`. However, if strict ordered processing is required then this value must be set to 1 in order to process shard messages in lock-step. When doing so it is recommended that you perform batching at this component for performance as it will not be possible to batch lock-stepped messages at the output level.

##### Troubleshooting

- I'm seeing logs that report `Failed to connect to kafka: kafka: client has run out of available brokers to talk to (Is your cluster reachable?)`, but the brokers are definitely reachable.

Unfortunately this error message will appear for a wide range of connection problems even when the broker endpoint can be reached. Double check your authentication configuration and also ensure that you have [enabled TLS](#tlsenabled) if applicable.

#### Fields

##### addresses

A list of broker addresses to connect to. If an item of the list contains commas it will be expanded into multiple addresses.


Type: `array`

```yml
# Examples

addresses:
  - localhost:9092

addresses:
  - localhost:9041,localhost:9042

addresses:
  - localhost:9041
  - localhost:9042
```

##### topics

A list of topics to consume from. Multiple comma separated topics can be listed in a single element. Partitions are automatically distributed across consumers of a topic. Alternatively, it's possible to specify explicit partitions to consume from with a colon after the topic name, e.g. `foo:0` would consume the partition 0 of the topic foo. This syntax supports ranges, e.g. `foo:0-10` would consume partitions 0 through to 10 inclusive.


Type: `array`
Requires version 3.33.0 or newer

```yml
# Examples

topics:
  - foo
  - bar

topics:
  - foo,bar

topics:
  - foo:0
  - bar:1
  - bar:3

topics:
  - foo:0,bar:1,bar:3

topics:
  - foo:0-5
```

##### target_version

The version of the Kafka protocol to use. This limits the capabilities used by the client and should ideally match the version of your brokers. Defaults to the oldest supported stable version.


Type: `string`

```yml
# Examples

target_version: 2.1.0

target_version: 3.1.0
```

##### tls

Custom TLS settings can be used to override system defaults.


Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.


Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.


Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're seeing the error message `local error: tls: no renegotiation`.


Type: `bool`
Default: `false`
Requires version 3.45.0 or newer

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified, but not both.


Type: `array`
Default: `[]`

```yml
# Examples

client_certs:
  - cert: foo
    key: bar

client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.


Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].cert_file

The path of a certificate to use.


Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in PKCS#1 or PKCS#8 format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an attacker recover the plaintext.


Type: `string`
Default: `""`

```yml
# Example

password: foo
```

<!-- When Tyk streams with secrets released include this in above example => password: ${KEY_PASSWORD} -->

##### sasl

Enables SASL authentication.


Type: `object`

##### sasl.mechanism

The SASL authentication mechanism, if left empty SASL authentication is not used.


Type: `string`
Default: `"none"`

| Option | Summary |
|---|---|
| `OAUTHBEARER` | OAuth Bearer based authentication. |
| `PLAIN` | Plain text authentication. NOTE: When using plain text auth it is extremely likely that you'll also need to [enable TLS](#tlsenabled). |
| `SCRAM-SHA-256` | Authentication using the SCRAM-SHA-256 mechanism. |
| `SCRAM-SHA-512` | Authentication using the SCRAM-SHA-512 mechanism. |
| `none` | Default, no SASL authentication. |


##### sasl.user

A PLAIN username. It is recommended that you use environment variables to populate this field.


Type: `string`
Default: `""`

```yml
# Examples

user: ${USER}
```

##### sasl.password

A PLAIN password. It is recommended that you use environment variables to populate this field.


Type: `string`
Default: `""`

```yml
# Examples

password: ${PASSWORD}
```

##### sasl.access_token

A static OAUTHBEARER access token


Type: `string`
Default: `""`

<!-- TODO add ##### sasl.token_cache

Instead of using a static `access_token` allows you to query a [`cache`](/docs/components/caches/about) resource to fetch OAUTHBEARER tokens from -->


Type: `string`
Default: `""`

##### sasl.token_key

Required when using a `token_cache`, the key to query the cache with for tokens.


Type: `string`
Default: `""`

##### consumer_group

An identifier for the consumer group of the connection. This field can be explicitly made empty in order to disable stored offsets for the consumed topic partitions.


Type: `string`
Default: `""`

##### client_id

An identifier for the client connection.


Type: `string`
Default: `"tyk"`

##### rack_id

A rack identifier for this client.


Type: `string`
Default: `""`

##### start_from_oldest

Determines whether to consume from the oldest available offset, otherwise messages are consumed from the latest offset. The setting is applied when creating a new consumer group or the saved offset no longer exists.


Type: `bool`
Default: `true`

##### checkpoint_limit

The maximum number of messages of the same topic and partition that can be processed at a given time. Increasing this limit enables parallel processing and batching at the output level to work on individual partitions. Any given offset will not be committed unless all messages under that offset are delivered in order to preserve at least once delivery guarantees.


Type: `int`
Default: `1024`
Requires version 3.33.0 or newer

##### auto_replay_nacks

Whether messages that are rejected (nacked) at the output level should be automatically replayed indefinitely, eventually resulting in back pressure if the cause of the rejections is persistent. If set to `false` these messages will instead be deleted. Disabling auto replays can greatly improve memory efficiency of high throughput streams as the original shape of the data can be discarded immediately upon consumption and mutation.


Type: `bool`
Default: `true`

##### commit_period

The period of time between each commit of the current partition offsets. Offsets are always committed during shutdown.


Type: `string`
Default: `"1s"`

##### max_processing_period

A maximum estimate for the time taken to process a message, this is used for tuning consumer group synchronization.


Type: `string`
Default: `"100ms"`

##### extract_tracing_map

A Bloblang mapping that attempts to extract an object containing tracing propagation information, which will then be used as the root tracing span for the message. The specification of the extracted fields must match the format used by the service wide tracer.


Type: `string`
Requires version 3.45.0 or newer

```yml
# Examples

extract_tracing_map: root = @

extract_tracing_map: root = this.meta.span
```

##### group

Tuning parameters for consumer group synchronization.


Type: `object`

##### group.session_timeout

A period after which a consumer of the group is kicked after no heartbeats.


Type: `string`
Default: `"10s"`

##### group.heartbeat_interval

A period in which heartbeats should be sent out.


Type: `string`
Default: `"3s"`

##### group.rebalance_timeout

A period after which rebalancing is abandoned if unresolved.


Type: `string`
Default: `"60s"`

##### fetch_buffer_cap

The maximum number of unprocessed messages to fetch at a given time.


Type: `int`
Default: `256`

##### multi_header

Decode headers into lists to allow handling of multiple values with the same key


Type: `bool`
Default: `false`

##### batching

Allows you to configure a [batching policy]({{< ref "api-management/stream-config#batch-policy" >}}).

Type: `object`

```yml
# Examples

batching:
  byte_size: 5000
  count: 0
  period: 1s

batching:
  count: 10
  period: 1s

batching:
  check: this.contains("END BATCH")
  count: 0
  period: 1m
```

##### batching.count

A number of messages at which the batch should be flushed. If `0` disables count based batching.


Type: `int`
Default: `0`

##### batching.byte_size

An amount of bytes at which the batch should be flushed. If `0` disables size based batching.


Type: `int`
Default: `0`

##### batching.period

A period in which an incomplete batch should be flushed regardless of its size.


Type: `string`
Default: `""`

```yml
# Examples

period: 1s

period: 1m

period: 500ms
```

##### batching.check

A Bloblang query that should return a boolean value indicating whether a message should end a batch.

Type: `string`
Default: `""`

```yml
# Examples

check: this.type == "end_of_transaction"
```

##### batching.processors

A list of processors to apply to a batch as it is flushed. This allows you to aggregate and archive the batch however you see fit. Please note that all resulting messages are flushed as a single batch, therefore splitting the batch into smaller batches using these processors is a no-op.


Type: `array`

```yml
# Examples

processors:
  - archive:
      format: concatenate

processors:
  - archive:
      format: lines

processors:
  - archive:
      format: json_array
```

### MQTT
Subscribe to topics on MQTT brokers.

#### Common
```yml
# Common config fields, showing default values
input:
  label: ""
  mqtt:
    urls: [] # No default (required)
    client_id: ""
    connect_timeout: 30s
    topics: [] # No default (required)
    auto_replay_nacks: true
```

#### Advanced
```yml
# All config fields, showing default values
input:
  label: ""
  mqtt:
    urls: [] # No default (required)
    client_id: ""
    dynamic_client_id_suffix: "" # No default (optional)
    connect_timeout: 30s
    will:
      enabled: false
      qos: 0
      retained: false
      topic: ""
      payload: ""
    user: ""
    password: ""
    keepalive: 30
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
    topics: [] # No default (required)
    qos: 1
    clean_session: true
    auto_replay_nacks: true
```

#### Metadata

This input adds the following metadata fields to each message:

``` text
- mqtt_duplicate
- mqtt_qos
- mqtt_retained
- mqtt_topic
- mqtt_message_id
```

You can access these metadata fields using function interpolation.

#### Fields

##### urls

A list of URLs to connect to. If an item of the list contains commas it will be expanded into multiple URLs.


Type: `array`

```yml
# Examples

urls:
  - tcp://localhost:1883
```

##### client_id

An identifier for the client connection.


Type: `string`
Default: `""`

##### dynamic_client_id_suffix

Append a dynamically generated suffix to the specified `client_id` on each run of the pipeline. This can be useful when clustering Streams producers.


Type: `string`

| Option | Summary |
|---|---|
| `nanoid` | append a nanoid of length 21 characters |


##### connect_timeout

The maximum amount of time to wait in order to establish a connection before the attempt is abandoned.


Type: `string`
Default: `"30s"`
Requires version 1.0.0 or newer

```yml
# Examples

connect_timeout: 1s

connect_timeout: 500ms
```

##### will

Set last will message in case of Streams failure


Type: `object`

##### will.enabled

Whether to enable last will messages.


Type: `bool`
Default: `false`

##### will.qos

Set QoS for last will message. Valid values are: 0, 1, 2.


Type: `int`
Default: `0`

##### will.retained

Set retained for last will message.


Type: `bool`
Default: `false`

##### will.topic

Set topic for last will message.


Type: `string`
Default: `""`

##### will.payload

Set payload for last will message.


Type: `string`
Default: `""`

##### user

A username to connect with.


Type: `string`
Default: `""`

##### password

A password to connect with.


Type: `string`
Default: `""`

##### keepalive

Max seconds of inactivity before a keepalive message is sent.


Type: `int`
Default: `30`

##### tls

Custom TLS settings can be used to override system defaults.

Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.

Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.

Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're seeing the error message `local error: tls: no renegotiation`.


Type: `bool`
Default: `false`
Requires version 1.0.0 or newer

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified, but not both.


Type: `array`
Default: `[]`

```yml
# Examples

client_certs:
  - cert: foo
    key: bar

client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].cert_file

The path of a certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.

Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in PKCS#1 or PKCS#8 format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an attacker recover the plaintext.


Type: `string`
Default: `""`

```yml
# Examples

password: foo

password: ${KEY_PASSWORD}
```

##### topics

A list of topics to consume from.


Type: `array`

##### qos

The level of delivery guarantee to enforce. Has options 0, 1, 2.


Type: `int`
Default: `1`

##### clean_session

Set whether the connection is non-persistent.


Type: `bool`
Default: `true`

##### auto_replay_nacks

Whether messages that are rejected (nacked) at the output level should be automatically replayed indefinitely, eventually resulting in back pressure if the cause of the rejections is persistent. If set to `false` these messages will instead be deleted. Disabling auto replays can greatly improve memory efficiency of high throughput streams as the original shape of the data can be discarded immediately upon consumption and mutation.

Type: `bool`
Default: `true`


### amqp_0_9

Connects to an AMQP (0.91) queue. AMQP is a messaging protocol used by various message brokers, including RabbitMQ.

#### Common

```yaml
# Common config fields, showing default values
input:
  label: ""
  amqp_0_9:
    urls: [] # No default (required)
    queue: "" # No default (required)
    consumer_tag: ""
    prefetch_count: 10
```

#### Advanced

```yaml
# All config fields, showing default values
input:
  label: ""
  amqp_0_9:
    urls: [] # No default (required)
    queue: "" # No default (required)
    queue_declare:
      enabled: false
      durable: true
      auto_delete: false
    bindings_declare: [] # No default (optional)
    consumer_tag: ""
    auto_ack: false
    nack_reject_patterns: []
    prefetch_count: 10
    prefetch_size: 0
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
```

TLS is automatic when connecting to an `amqps` URL, but custom settings can be enabled in the `tls` section.

#### Metadata

This input adds the following metadata fields to each message:

```
- amqp_content_type
- amqp_content_encoding
- amqp_delivery_mode
- amqp_priority
- amqp_correlation_id
- amqp_reply_to
- amqp_expiration
- amqp_message_id
- amqp_timestamp
- amqp_type
- amqp_user_id
- amqp_app_id
- amqp_consumer_tag
- amqp_delivery_tag
- amqp_redelivered
- amqp_exchange
- amqp_routing_key
```

All existing message headers, including nested headers prefixed with the key of their respective parent, can be added.

#### Fields

##### urls

A list of URLs to connect to. The first URL to successfully establish a connection will be used until the connection is closed. 
If an item of the list contains commas, it will be expanded into multiple URLs.

Type: `array`

```yaml
# Examples
urls:
  - amqp://guest:guest@127.0.0.1:5672/
urls:
  - amqp://127.0.0.1:5672/,amqp://127.0.0.2:5672/
urls:
  - amqp://127.0.0.1:5672/
  - amqp://127.0.0.2:5672/
```

##### queue

An AMQP queue to consume from.

Type: `string`

##### queue_declare

Allows you to passively declare the target queue. If the queue already exists, then the declaration passively verifies that 
they match the target fields.

type: `object`

##### queue_declare.enabled

Whether to enable queue declaration.

Type: `bool`
Default: `false`

##### queue_declare.durable

Whether the declared queue is durable.

Type: `bool`
Default: `true`

##### queue_declare.auto_delete

Whether the declared queue will auto-delete.

Type: `bool`
Default: `false`

##### bindings_declare

Allows you to passively declare bindings for the target queue.

Type: `array`

```yaml
# Examples
bindings_declare:
  - exchange: foo
    key: bar
```

##### bindings_declare[].exchange

The exchange of the declared binding.

Type: `string`
Default: `""`

##### bindings_declare[].key

The key of the declared binding.

Type: `string`
Default: `""`

##### consumer_tag

A consumer tag.

Type: `string`
Default: `""`

##### auto_ack

Acknowledge messages automatically as they are consumed rather than waiting for acknowledgments from downstream. 
This can improve throughput and prevent the pipeline from blocking but at the cost of eliminating delivery guarantees.

Type: `bool`
Default: `false`

##### nack_reject_patterns

A list of regular expression patterns whereby if a message that has failed to be delivered by Bento has an error that matches 
it will be dropped (or delivered to a dead-letter queue if one exists). By default, failed messages are nacked with requeue enabled.

Type: `array`
Default: `[]`

```yaml
# Examples
nack_reject_patterns:
  - ^reject me please:.+$
```

##### prefetch_count

The maximum number of pending messages to have consumed at a time.

Type: `int`
Default: `10`

##### prefetch_size

The maximum number of pending messages measured in bytes to have consumed at a time.

Type: `int`
Default: `0`

##### tls

Custom TLS settings can be used to override system defaults.

Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.

Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.

Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're getting the error message 
`local error: tls: no renegotiation.`

Type: `bool`
Default: `false`

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate, 
to possible intermediate signing certificates, to the host certificate.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

```yaml
# Examples
root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing 
a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host 
certificate.

Type: `string`
Default: `""`

```yaml
# Examples
root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified, 
but not both.

Type: `array`
Default: `[]`

```yaml
# Examples
client_certs:
  - cert: foo
    key: bar
client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: ""

##### tls.client_certs[].cert_file

The path of a certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.

Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in *PKCS#1* or *PKCS#8* format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not 
supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an 
attacker recover the plaintext.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

```yaml
# Examples
password: foo
```



### amqp_1

Reads messages from an AMQP (1.0) server.

#### Common

```yaml
# Common config fields, showing default values
input:
  label: ""
  amqp_1:
    urls: [] # No default (optional)
    source_address: /foo # No default (required)
```

#### Advanced

```yaml
# All config fields, showing default values
input:
  label: ""
  amqp_1:
    urls: [] # No default (optional)
    source_address: /foo # No default (required)
    azure_renew_lock: false
    read_header: false
    credit: 64
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
    sasl:
      mechanism: none
      user: ""
      password: ""
```

#### Metadata

This input adds the following metadata fields to each message:

```
- amqp_content_type
- amqp_content_encoding
- amqp_creation_time
- All string typed message annotations
```

You can access these metadata fields using function interpolation.

By setting `read_header` to `true`, additional message header properties will be added to each message:

```
- amqp_durable
- amqp_priority
- amqp_ttl
- amqp_first_acquirer
- amqp_delivery_count
```

#### Performance

This input benefits from receiving multiple messages in flight in parallel for improved performance. You can tune the max 
number of in flight messages with the field `credit`.

#### Fields

##### urls

A list of URLs to connect to. The first URL to successfully establish a connection will be used until the connection is closed. 
If an item of the list contains commas it will be expanded into multiple URLs.

Type: `array`

```yaml
# Examples
urls:
  - amqp://guest:guest@127.0.0.1:5672/
urls:
  - amqp://127.0.0.1:5672/,amqp://127.0.0.2:5672/
urls:
  - amqp://127.0.0.1:5672/
  - amqp://127.0.0.2:5672/
```

##### source_address

The source address to consume from.

Type: `string`

```yaml
# Examples
source_address: /foo
source_address: queue:/bar
source_address: topic:/baz
```

##### azure_renew_lock

**Experimental:** Azure service bus specific option to renew lock if processing takes more then configured lock time.

Type: `bool`
Default: `false`

##### read_header

Read additional message header fields into `amqp_*` metadata properties.

Type: `bool`
Default: `false`

##### credit

Specifies the maximum number of unacknowledged messages the sender can transmit. Once this limit is reached, no more messages 
will arrive until messages are acknowledged and settled.

Type: `int`
Default: `64`


##### tls

Custom TLS settings can be used to override system defaults.

Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.

Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.

Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're getting the error message
`local error: tls: no renegotiation.`

Type: `bool`
Default: `false`

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate,
to possible intermediate signing certificates, to the host certificate.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

```yaml
# Examples
root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing
a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host
certificate.

Type: `string`
Default: `""`

```yaml
# Examples
root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified,
but not both.

Type: `array`
Default: `[]`

```yaml
# Examples
client_certs:
  - cert: foo
    key: bar
client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: ""

##### tls.client_certs[].cert_file

The path of a certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.

Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in *PKCS#1* or *PKCS#8* format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not
supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an
attacker recover the plaintext.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

```yaml
# Examples
password: foo
```

##### sasl

Enables SASL authentication.

Type: `object`

##### sasl.mechanism

The SASL authentication mechanism to use.

Type: `string`
Default: `"none"`

| Option    | Summary                              |
|-----------|--------------------------------------|
| anonymous | Anonymous SASL authentication.       |
| none      | No SASL based authentication.        |
| plain     | Plain text SASL authentication.      |


##### sasl.user

A SASL plain text username. It is recommended that you use environment variables to populate this field.

Type: `string`
Default: `""`

```yaml
# Examples
user: ${USER}
```

##### sasl.password

A SASL plain text password. It is recommended that you use environment variables to populate this field.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`


```yaml
# Examples
password: ${PASSWORD}
```

## Outputs

### Overview

An output is a sink where we wish to send our consumed data after applying an optional array of [processors]({{< ref "api-management/stream-config#overview-3" >}}). Only one output is configured at the root of a Tyk Streams config. However, the output can be a [broker]({{< ref "api-management/stream-config#broker-1" >}}) which combines multiple outputs under a chosen brokering pattern.

An output config section looks like this:

```yaml
outout:
  label: my_kafka_output

  kafka:
    addresses: [ localhost:9092 ]
    topic: "foobar"

  # Optional list of processing steps
  processors:
    - avro:
        operator: from_json
```

#### Labels

Outputs have an optional field `label` that can uniquely identify them in observability data such as logs.

<!--

TODO replace with this paragraph when determine if product supports metrics

Outputs have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple outputs, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation][metrics.about].

-->

### Broker

Allows you to route messages to multiple child outputs using a range of brokering [patterns](#patterns).

#### Common

```yml
# Common config fields, showing default values
output:
  label: ""
  broker:
    pattern: fan_out
    outputs: [] # No default (required)
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
```

#### Advanced

```yml
# All config fields, showing default values
output:
  label: ""
  broker:
    copies: 1
    pattern: fan_out
    outputs: [] # No default (required)
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
      processors: [] # No default (optional)
```

Processors can be listed to apply across individual outputs or all outputs:

```yaml
output:
  broker:
    pattern: fan_out
    outputs:
      - resource: foo
      - resource: bar
        # Processors only applied to messages sent to bar.
        processors:
          - resource: bar_processor

  # Processors applied to messages sent to all brokered outputs.
  processors:
    - resource: general_processor
```

#### Fields

##### copies

The number of copies of each configured output to spawn.


Type: `int`
Default: `1`

##### pattern

The brokering pattern to use.


Type: `string`
Default: `"fan_out"`
Options: `fan_out`, `fan_out_fail_fast`, `fan_out_sequential`, `fan_out_sequential_fail_fast`, `round_robin`, `greedy`.

##### outputs

A list of child outputs to broker.


Type: `array`

##### batching

Allows you to configure a [batching policy]({{< ref "api-management/stream-config#batch-policy" >}}).


Type: `object`

```yml
# Examples

batching:
  byte_size: 5000
  count: 0
  period: 1s

batching:
  count: 10
  period: 1s

batching:
  check: this.contains("END BATCH")
  count: 0
  period: 1m
```

##### batching.count

A number of messages at which the batch should be flushed. If `0` disables count based batching.


Type: `int`
Default: `0`

##### batching.byte_size

An amount of bytes at which the batch should be flushed. If `0` disables size based batching.


Type: `int`
Default: `0`

##### batching.period

A period in which an incomplete batch should be flushed regardless of its size.


Type: `string`
Default: `""`

```yml
# Examples

period: 1s

period: 1m

period: 500ms
```

##### batching.check

A Bloblang query that should return a boolean value indicating whether a message should end a batch.


Type: `string`
Default: `""`

```yml
# Examples

check: this.type == "end_of_transaction"
```

##### batching.processors

A list of processors to apply to a batch as it is flushed. This allows you to aggregate and archive the batch however you see fit. Please note that all resulting messages are flushed as a single batch, therefore splitting the batch into smaller batches using these processors is a no-op.


Type: `array`

```yml
# Examples

processors:
  - archive:
      format: concatenate

processors:
  - archive:
      format: lines

processors:
  - archive:
      format: json_array
```

#### Patterns

The broker pattern determines the way in which messages are allocated and can be chosen from the following:

##### fan_out

With the fan out pattern all outputs will be sent every message that passes through Tyk Streams in parallel.

If an output applies back pressure it will block all subsequent messages, and if an output fails to send a message it will be retried continuously until completion or service shut down. This mechanism is in place in order to prevent one bad output from causing a larger retry loop that results in a good output from receiving unbounded message duplicates.

##### fan_out_fail_fast

The same as the `fan_out` pattern, except that output failures will not be automatically retried. This pattern should be used with caution as busy retry loops could result in unlimited duplicates being introduced into the non-failure outputs.

##### fan_out_sequential

Similar to the fan out pattern except outputs are written to sequentially, meaning an output is only written to once the preceding output has confirmed receipt of the same message.

If an output applies back pressure it will block all subsequent messages, and if an output fails to send a message it will be retried continuously until completion or service shut down. This mechanism is in place in order to prevent one bad output from causing a larger retry loop that results in a good output from receiving unbounded message duplicates.

##### fan_out_sequential_fail_fast

The same as the `fan_out_sequential` pattern, except that output failures will not be automatically retried. This pattern should be used with caution as busy retry loops could result in unlimited duplicates being introduced into the non-failure outputs.

##### round_robin

With the round robin pattern each message will be assigned a single output following their order. If an output applies back pressure it will block all subsequent messages. If an output fails to send a message then the message will be re-attempted with the next input, and so on.

##### greedy

The greedy pattern results in higher output throughput at the cost of potentially disproportionate message allocations to those outputs. Each message is sent to a single output, which is determined by allowing outputs to claim messages as soon as they are able to process them. This results in certain faster outputs potentially processing more messages at the cost of slower outputs.


### HTTP Client

Sends messages to an HTTP server.

#### Common

```yml
# Common config fields, showing default values
output:
  label: ""
  http_client:
    url: "" # No default (required)
    verb: POST
    headers: {}
    timeout: 5s
    max_in_flight: 64
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
```

#### Advanced

```yml
# All config fields, showing default values
output:
  label: ""
  http_client:
    url: "" # No default (required)
    verb: POST
    headers: {}
    metadata:
      include_prefixes: []
      include_patterns: []
    dump_request_log_level: ""
    oauth:
      enabled: false
      consumer_key: ""
      consumer_secret: ""
      access_token: ""
      access_token_secret: ""
    oauth2:
      enabled: false
      client_key: ""
      client_secret: ""
      token_url: ""
      scopes: []
      endpoint_params: {}
    basic_auth:
      enabled: false
      username: ""
      password: ""
    jwt:
      enabled: false
      private_key_file: ""
      signing_method: ""
      claims: {}
      headers: {}
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
    extract_headers:
      include_prefixes: []
      include_patterns: []
    timeout: 5s
    retry_period: 1s
    max_retry_backoff: 300s
    retries: 3
    backoff_on:
      - 429
    drop_on: []
    successful_on: []
    proxy_url: "" # No default (optional)
    batch_as_multipart: false
    propagate_response: false
    max_in_flight: 64
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
      processors: [] # No default (optional)
    multipart: []
```

When the number of retries expires the output will reject the message, the behavior after this will depend on the pipeline but usually this simply means the send is attempted again until successful whilst applying back pressure.

<!-- TODO: when interpolation supported
The URL and header values of this type can be dynamically set using function interpolations.
-->

The body of the HTTP request is the raw contents of the message payload. If the message has multiple parts (is a batch) the request will be sent according to [RFC1341](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html). This behavior can be disabled by setting the field [batch_as_multipart](#batch_as_multipart) to `false`.

##### Propagating Responses

It's possible to propagate the response from each HTTP request back to the input source by setting `propagate_response` to `true`. Only inputs that support synchronous responses are able to make use of these propagated responses.

#### Performance

This output benefits from sending multiple messages in flight in parallel for improved performance. You can tune the max number of in flight messages (or message batches) with the field `max_in_flight`.

This output benefits from sending messages as a [batch]({{< ref "api-management/stream-config#batching-6" >}}) for improved performance. Batches can be formed at both the input and output level.

#### Fields

##### url

The URL to connect to.
<!-- TODO: when interpolation supported
This field supports interpolation functions.
-->

Type: `string`

##### verb

A verb to connect with


Type: `string`
Default: `"POST"`

```yml
# Examples

verb: POST

verb: GET

verb: DELETE
```

##### headers

A map of headers to add to the request.
<!-- TODO: when interpolation supported
This field supports interpolation functions.
-->


Type: `object`
Default: `{}`

```yml
# Examples

headers:
  Content-Type: application/octet-stream
  traceparent: ${! tracing_span().traceparent }
```

##### metadata

Specify optional matching rules to determine which metadata keys should be added to the HTTP request as headers.


Type: `object`

##### metadata.include_prefixes

Provide a list of explicit metadata key prefixes to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_prefixes:
  - foo_
  - bar_

include_prefixes:
  - kafka_

include_prefixes:
  - content-
```

##### metadata.include_patterns

Provide a list of explicit metadata key regular expression (re2) patterns to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_patterns:
  - .*

include_patterns:
  - _timestamp_unix$
```

##### dump_request_log_level

Optionally set a level at which the request and response payload of each request made will be logged.


Type: `string`
Default: `""`
Options: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`, ``.

##### oauth

Allows you to specify open authentication via OAuth version 1.


Type: `object`

##### oauth.enabled

Whether to use OAuth version 1 in requests.


Type: `bool`
Default: `false`

##### oauth.consumer_key

A value used to identify the client to the service provider.


Type: `string`
Default: `""`

##### oauth.consumer_secret

A secret used to establish ownership of the consumer key.


Type: `string`
Default: `""`

##### oauth.access_token

A value used to gain access to the protected resources on behalf of the user.


Type: `string`
Default: `""`

##### oauth.access_token_secret

A secret provided in order to establish ownership of a given access token.


Type: `string`
Default: `""`

##### oauth2

Allows you to specify open authentication via OAuth version 2 using the client credentials token flow.


Type: `object`

##### oauth2.enabled

Whether to use OAuth version 2 in requests.


Type: `bool`
Default: `false`

##### oauth2.client_key

A value used to identify the client to the token provider.


Type: `string`
Default: `""`

##### oauth2.client_secret

A secret used to establish ownership of the client key.


Type: `string`
Default: `""`

##### oauth2.token_url

The URL of the token provider.


Type: `string`
Default: `""`

##### oauth2.scopes

A list of optional requested permissions.


Type: `array`
Default: `[]`

##### oauth2.endpoint_params

A list of optional endpoint parameters, values should be arrays of strings.


Type: `object`
Default: `{}`

```yml
# Examples

endpoint_params:
  bar:
    - woof
  foo:
    - meow
    - quack
```

##### basic_auth

Allows you to specify basic authentication.


Type: `object`

##### basic_auth.enabled

Whether to use basic authentication in requests.


Type: `bool`
Default: `false`

##### basic_auth.username

A username to authenticate as.


Type: `string`
Default: `""`

##### basic_auth.password

A password to authenticate with.


Type: `string`
Default: `""`

##### jwt

Allows you to specify JWT authentication.


Type: `object`

##### jwt.enabled

Whether to use JWT authentication in requests.


Type: `bool`
Default: `false`

##### jwt.private_key_file

A file with the PEM encoded via PKCS1 or PKCS8 as private key.


Type: `string`
Default: `""`

##### jwt.signing_method

A method used to sign the token such as RS256, RS384, RS512 or EdDSA.


Type: `string`
Default: `""`

##### jwt.claims

A value used to identify the claims that issued the JWT.


Type: `object`
Default: `{}`

##### jwt.headers

Add optional key/value headers to the JWT.


Type: `object`
Default: `{}`

##### tls

Custom TLS settings can be used to override system defaults.


Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.


Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.


Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're seeing the error message `local error: tls: no renegotiation`.


Type: `bool`
Default: `false`

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified, but not both.


Type: `array`
Default: `[]`

```yml
# Examples

client_certs:
  - cert: foo
    key: bar

client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.


Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].cert_file

The path of a certificate to use.


Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in PKCS#1 or PKCS#8 format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an attacker recover the plaintext.


Type: `string`
Default: `""`

```yml
# Examples

password: foo
```

##### extract_headers

Specify which response headers should be added to resulting synchronous response messages as metadata. Header keys are lowercased before matching, so ensure that your patterns target lowercased versions of the header keys that you expect. This field is not applicable unless `propagate_response` is set to `true`.


Type: `object`

##### extract_headers.include_prefixes

Provide a list of explicit metadata key prefixes to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_prefixes:
  - foo_
  - bar_

include_prefixes:
  - kafka_

include_prefixes:
  - content-
```

##### extract_headers.include_patterns

Provide a list of explicit metadata key regular expression (re2) patterns to match against.


Type: `array`
Default: `[]`

```yml
# Examples

include_patterns:
  - .*

include_patterns:
  - _timestamp_unix$
```

##### timeout

A static timeout to apply to requests.


Type: `string`
Default: `"5s"`

##### retry_period

The base period to wait between failed requests.


Type: `string`
Default: `"1s"`

##### max_retry_backoff

The maximum period to wait between failed requests.


Type: `string`
Default: `"300s"`

##### retries

The maximum number of retry attempts to make.


Type: `int`
Default: `3`

##### backoff_on

A list of status codes whereby the request should be considered to have failed and retries should be attempted, but the period between them should be increased gradually.


Type: `array`
Default: `[429]`

##### drop_on

A list of status codes whereby the request should be considered to have failed but retries should not be attempted. This is useful for preventing wasted retries for requests that will never succeed. Note that with these status codes the _request_ is dropped, but _message_ that caused the request will not be dropped.


Type: `array`
Default: `[]`

##### successful_on

A list of status codes whereby the attempt should be considered successful, this is useful for dropping requests that return non-2XX codes indicating that the message has been dealt with, such as a 303 See Other or a 409 Conflict. All 2XX codes are considered successful unless they are present within `backoff_on` or `drop_on`, regardless of this field.


Type: `array`
Default: `[]`

##### proxy_url

An optional HTTP proxy URL.


Type: `string`

##### batch_as_multipart

Send message batches as a single request using [RFC1341](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html). If disabled messages in batches will be sent as individual requests.


Type: `bool`
Default: `false`

##### propagate_response

Whether responses from the server should be propagated back to the input.


Type: `bool`
Default: `false`

##### max_in_flight

The maximum number of parallel message batches to have in flight at any given time.


Type: `int`
Default: `64`

##### batching

Allows you to configure a [batching policy]({{< ref "api-management/stream-config#batching-6" >}}).


Type: `object`

```yml
# Examples

batching:
  byte_size: 5000
  count: 0
  period: 1s

batching:
  count: 10
  period: 1s

batching:
  check: this.contains("END BATCH")
  count: 0
  period: 1m
```

##### batching.count

A number of messages at which the batch should be flushed. If `0` disables count based batching.


Type: `int`
Default: `0`

##### batching.byte_size

An amount of bytes at which the batch should be flushed. If `0` disables size based batching.


Type: `int`
Default: `0`

##### batching.period

A period in which an incomplete batch should be flushed regardless of its size.


Type: `string`
Default: `""`

```yml
# Examples

period: 1s

period: 1m

period: 500ms
```

<!-- TODO: when bloblang supported
##### batching.check

A Bloblang query that should return a boolean value indicating whether a message should end a batch.


Type: `string`
Default: `""`

```yml
# Examples

check: this.type == "end_of_transaction"
```
-->

##### batching.processors

A list of processors to apply to a batch as it is flushed. This allows you to aggregate and archive the batch however you see fit. Please note that all resulting messages are flushed as a single batch, therefore splitting the batch into smaller batches using these processors is a no-op.


Type: `array`

```yml
# Examples

processors:
  - archive:
      format: concatenate

processors:
  - archive:
      format: lines

processors:
  - archive:
      format: json_array
```

##### multipart

Create explicit multipart HTTP requests by specifying an array of parts to add to the request, each part specified consists of content headers and a data field that can be populated dynamically. If this field is populated it will override the default request creation behavior.


Type: `array`
Default: `[]`

##### multipart[].content_type

The content type of the individual message part.
<!-- TODO: when interpolation supported
This field supports interpolation functions.
-->


Type: `string`
Default: `""`

```yml
# Examples

content_type: application/bin
```

##### multipart[].content_disposition

The content disposition of the individual message part.
<!-- TODO: when interpolation supported
This field supports interpolation functions.
-->


Type: `string`
Default: `""`

```yml
# Examples

content_disposition: form-data; name="bin"; filename='${! @AttachmentName }
```

##### multipart[].body

The body of the individual message part.
<!-- TODO: when interpolation supported
This field supports interpolation functions.
-->


Type: `string`
Default: `""`

```yml
# Examples

body: ${! this.data.part1 }
```

### HTTP Server

Sets up an HTTP server that will send messages over HTTP(S) GET requests. HTTP 2.0 is supported when using TLS, which is enabled when key and cert files are specified.

#### Common

```yml
# Common config fields, showing default values
output:
  label: ""
  http_server:
    address: ""
    path: /get
    stream_path: /get/stream
    ws_path: /get/ws
    allowed_verbs:
      - GET
```

#### Advanced

```yml
# All config fields, showing default values
output:
  label: ""
  http_server:
    address: ""
    path: /get
    stream_path: /get/stream
    ws_path: /get/ws
    allowed_verbs:
      - GET
    timeout: 5s
    cert_file: ""
    key_file: ""
    cors:
      enabled: false
      allowed_origins: []
```

Sets up an HTTP server that will send messages over HTTP(S) GET requests.

<!-- TODO add link here  If the `address` config field is left blank the [service-wide HTTP server](/docs/components/http/about) will be used. -->

Three endpoints will be registered at the paths specified by the fields `path`, `stream_path` and `ws_path`. Which allow you to consume a single message batch, a continuous stream of line delimited messages, or a websocket of messages for each request respectively.

When messages are batched the `path` endpoint encodes the batch according to [RFC1341](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html).

<!-- TODO add link here - This behavior can be overridden by [archiving your batches](/docs/configuration/batching#post-batch-processing). -->

Please note, messages are considered delivered as soon as the data is written to the client. There is no concept of at least once delivery on this output.

Please note that components within a Tyk config will register their respective endpoints in a non-deterministic order. This means that establishing precedence of endpoints that are registered via multiple `http_server` inputs or outputs (either within brokers or from cohabiting streams) is not possible in a predictable way.

This ambiguity makes it difficult to ensure that paths which are both a subset of a path registered by a separate component, and end in a slash (`/`) and will therefore match against all extensions of that path, do not prevent the more specific path from matching against requests.

It is therefore recommended that you ensure paths of separate components do not collide unless they are explicitly non-competing.

For example, if you were to deploy two separate `http_server` inputs, one with a path `/foo/` and the other with a path `/foo/bar`, it would not be possible to ensure that the path `/foo/` does not swallow requests made to `/foo/bar`.


#### Fields

##### address

An alternative address to host from. If left empty the service wide address is used.


Type: `string`
Default: `""`

##### path

The path from which discrete messages can be consumed.


Type: `string`
Default: `"/get"`

##### stream_path

The path from which a continuous stream of messages can be consumed.


Type: `string`
Default: `"/get/stream"`

##### ws_path

The path from which websocket connections can be established.


Type: `string`
Default: `"/get/ws"`

##### allowed_verbs

An array of verbs that are allowed for the `path` and `stream_path` HTTP endpoint.


Type: `array`
Default: `["GET"]`

##### timeout

The maximum time to wait before a blocking, inactive connection is dropped (only applies to the `path` endpoint).


Type: `string`
Default: `"5s"`

##### cert_file

Enable TLS by specifying a certificate and key file. Only valid with a custom `address`.


Type: `string`
Default: `""`

##### key_file

Enable TLS by specifying a certificate and key file. Only valid with a custom `address`.


Type: `string`
Default: `""`

##### cors

Adds Cross-Origin Resource Sharing headers. Only valid with a custom `address`.


Type: `object`

##### cors.enabled

Whether to allow CORS requests.


Type: `bool`
Default: `false`

##### cors.allowed_origins

An explicit list of origins that are allowed for CORS requests.


Type: `array`
Default: `[]`



### Kafka

The kafka output type writes a batch of messages to Kafka brokers and waits for acknowledgment before propagating it back to the input.

#### Common

```yml
# Common config fields, showing default values
output:
  label: ""
  kafka:
    addresses: [] # No default (required)
    topic: "" # No default (required)
    target_version: 2.1.0 # No default (optional)
    key: ""
    partitioner: fnv1a_hash
    compression: none
    static_headers: {} # No default (optional)
    metadata:
      exclude_prefixes: []
    max_in_flight: 64
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
```

#### Advanced

```yml
# All config fields, showing default values
output:
  label: ""
  kafka:
    addresses: [] # No default (required)
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
    sasl:
      mechanism: none
      user: ""
      password: ""
      access_token: ""
      token_cache: ""
      token_key: ""
    topic: "" # No default (required)
    client_id: tyk
    target_version: 2.1.0 # No default (optional)
    rack_id: ""
    key: ""
    partitioner: fnv1a_hash
    partition: ""
    custom_topic_creation:
      enabled: false
      partitions: -1
      replication_factor: -1
    compression: none
    static_headers: {} # No default (optional)
    metadata:
      exclude_prefixes: []
    inject_tracing_map: meta = @.merge(this) # No default (optional)
    max_in_flight: 64
    idempotent_write: false
    ack_replicas: false
    max_msg_bytes: 1000000
    timeout: 5s
    retry_as_batch: false
    batching:
      count: 0
      byte_size: 0
      period: ""
      check: ""
      processors: [] # No default (optional)
    max_retries: 0
    backoff:
      initial_interval: 3s
      max_interval: 10s
      max_elapsed_time: 30s
```

The config field `ack_replicas` determines whether we wait for acknowledgment from all replicas or just a single broker.

<!-- Add links to bloblang queries : Both the `key` and `topic` fields can be dynamically set using function interpolations. -->

Metadata will be added to each message sent as headers (version 0.11+), but can be restricted using the field [metadata](#metadata).

##### Strict Ordering and Retries

When strict ordering is required for messages written to topic partitions it is important to ensure that both the field `max_in_flight` is set to `1` and that the field `retry_as_batch` is set to `true`.

You must also ensure that failed batches are never rerouted back to the same output. This can be done by setting the field `max_retries` to `0` and `backoff.max_elapsed_time` to empty, which will apply back pressure indefinitely until the batch is sent successfully.

<!-- TODO: Add link to fallback broker -->
However, this also means that manual intervention will eventually be required in cases where the batch cannot be sent due to configuration problems such as an incorrect `max_msg_bytes` estimate. A less strict but automated alternative would be to route failed batches to a dead letter queue using a `fallback` broker, but this would allow subsequent batches to be delivered in the meantime whilst those failed batches are dealt with.

##### Troubleshooting

- I'm seeing logs that report `Failed to connect to kafka: kafka: client has run out of available brokers to talk to (Is your cluster reachable?)`, but the brokers are definitely reachable.

Unfortunately this error message will appear for a wide range of connection problems even when the broker endpoint can be reached. Double check your authentication configuration and also ensure that you have [enabled TLS](#tlsenabled) if applicable.

#### Performance

This output benefits from sending multiple messages in flight in parallel for improved performance. You can tune the max number of in flight messages (or message batches) with the field `max_in_flight`.

This output benefits from sending messages as a [batch]({{< ref "api-management/stream-config#batching-6" >}}) for improved performance. Batches can be formed at both the input and output level.

#### Fields

##### addresses

A list of broker addresses to connect to. If an item of the list contains commas it will be expanded into multiple addresses.


Type: `array`

```yml
# Examples

addresses:
  - localhost:9092

addresses:
  - localhost:9041,localhost:9042

addresses:
  - localhost:9041
  - localhost:9042
```

##### tls

Custom TLS settings can be used to override system defaults.


Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.


Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.


Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're seeing the error message `local error: tls: no renegotiation`.


Type: `bool`
Default: `false`

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified, but not both.


Type: `array`
Default: `[]`

```yml
# Examples

client_certs:
  - cert: foo
    key: bar

client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.


Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].cert_file

The path of a certificate to use.


Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.


Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in PKCS#1 or PKCS#8 format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an attacker recover the plaintext.


Type: `string`
Default: `""`

```yml
# Example

password: foo
```

<!-- When Tyk streams with secrets released include this in above example => password: ${KEY_PASSWORD} -->

##### sasl

Enables SASL authentication.


Type: `object`

##### sasl.mechanism

The SASL authentication mechanism, if left empty SASL authentication is not used.


Type: `string`
Default: `"none"`

| Option | Summary |
|---|---|
| `OAUTHBEARER` | OAuth Bearer based authentication. |
| `PLAIN` | Plain text authentication. NOTE: When using plain text auth it is extremely likely that you'll also need to [enable TLS](#tlsenabled). |
| `SCRAM-SHA-256` | Authentication using the SCRAM-SHA-256 mechanism. |
| `SCRAM-SHA-512` | Authentication using the SCRAM-SHA-512 mechanism. |
| `none` | Default, no SASL authentication. |


##### sasl.user

A PLAIN username. It is recommended that you use environment variables to populate this field.


Type: `string`
Default: `""`

```yml
# Examples

user: ${USER}
```

##### sasl.password

A PLAIN password. It is recommended that you use environment variables to populate this field.


Type: `string`
Default: `""`

```yml
# Examples

password: ${PASSWORD}
```

##### sasl.access_token

A static OAUTHBEARER access token


Type: `string`
Default: `""`

##### sasl.token_cache

Instead of using a static `access_token` allows you to query a `cache` resource to fetch OAUTHBEARER tokens from
<!-- TODO: add cache resource link -->

Type: `string`
Default: `""`

##### sasl.token_key

Required when using a `token_cache`, the key to query the cache with for tokens.


Type: `string`
Default: `""`

##### topic

The topic to publish messages to.
<!-- TODO: when interpolation supported
This field supports interpolation functions.
-->


Type: `string`

##### client_id

An identifier for the client connection.


Type: `string`
Default: `"tyk"`

##### target_version

The version of the Kafka protocol to use. This limits the capabilities used by the client and should ideally match the version of your brokers. Defaults to the oldest supported stable version.


Type: `string`

```yml
# Examples

target_version: 2.1.0

target_version: 3.1.0
```

##### rack_id

A rack identifier for this client.


Type: `string`
Default: `""`

##### key

The key to publish messages with.
<!-- TODO: when interpolation supported
This field supports interpolation functions.
-->


Type: `string`
Default: `""`

##### partitioner

The partitioning algorithm to use.


Type: `string`
Default: `"fnv1a_hash"`
Options: `fnv1a_hash`, `murmur2_hash`, `random`, `round_robin`, `manual`.

##### partition

The manually-specified partition to publish messages to, relevant only when the field `partitioner` is set to `manual`. Must be able to parse as a 32-bit integer.
<!-- TODO: when interpolation supported
This field supports interpolation functions.
-->


Type: `string`
Default: `""`

##### custom_topic_creation

If enabled, topics will be created with the specified number of partitions and replication factor if they do not already exist.


Type: `object`

##### custom_topic_creation.enabled

Whether to enable custom topic creation.


Type: `bool`
Default: `false`

##### custom_topic_creation.partitions

The number of partitions to create for new topics. Leave at -1 to use the broker configured default. Must be >= 1.


Type: `int`
Default: `-1`

##### custom_topic_creation.replication_factor

The replication factor to use for new topics. Leave at -1 to use the broker configured default. Must be an odd number, and less then or equal to the number of brokers.


Type: `int`
Default: `-1`

##### compression

The compression algorithm to use.


Type: `string`
Default: `"none"`
Options: `none`, `snappy`, `lz4`, `gzip`, `zstd`.

##### static_headers

An optional map of static headers that should be added to messages in addition to metadata.


Type: `object`

```yml
# Examples

static_headers:
  first-static-header: value-1
  second-static-header: value-2
```

##### metadata

Specify criteria for which metadata values are sent with messages as headers.


Type: `object`

##### metadata.exclude_prefixes

Provide a list of explicit metadata key prefixes to be excluded when adding metadata to sent messages.


Type: `array`
Default: `[]`

##### inject_tracing_map

A Bloblang mapping used to inject an object containing tracing propagation information into outbound messages. The specification of the injected fields will match the format used by the service wide tracer.


Type: `string`
Requires version 3.45.0 or newer

```yml
# Examples

inject_tracing_map: meta = @.merge(this)

inject_tracing_map: root.meta.span = this
```

##### max_in_flight

The maximum number of messages to have in flight at a given time. Increase this to improve throughput.


Type: `int`
Default: `64`

##### idempotent_write

Enable the idempotent write producer option. This requires the `IDEMPOTENT_WRITE` permission on `CLUSTER` and can be disabled if this permission is not available.


Type: `bool`
Default: `false`

##### ack_replicas

Ensure that messages have been copied across all replicas before acknowledging receipt.


Type: `bool`
Default: `false`

##### max_msg_bytes

The maximum size in bytes of messages sent to the target topic.


Type: `int`
Default: `1000000`

##### timeout

The maximum period of time to wait for message sends before abandoning the request and retrying.


Type: `string`
Default: `"5s"`

##### retry_as_batch

When enabled forces an entire batch of messages to be retried if any individual message fails on a send, otherwise only the individual messages that failed are retried. Disabling this helps to reduce message duplicates during intermittent errors, but also makes it impossible to guarantee strict ordering of messages.


Type: `bool`
Default: `false`

##### batching

Allows you to configure a [batching policy]({{< ref "api-management/stream-config#batch-policy" >}}).


Type: `object`

```yml
# Examples

batching:
  byte_size: 5000
  count: 0
  period: 1s

batching:
  count: 10
  period: 1s

batching:
  check: this.contains("END BATCH")
  count: 0
  period: 1m
```

##### batching.count

A number of messages at which the batch should be flushed. If `0` disables count based batching.


Type: `int`
Default: `0`

##### batching.byte_size

An amount of bytes at which the batch should be flushed. If `0` disables size based batching.


Type: `int`
Default: `0`

##### batching.period

A period in which an incomplete batch should be flushed regardless of its size.


Type: `string`
Default: `""`

```yml
# Examples

period: 1s

period: 1m

period: 500ms
```

##### batching.check

A Bloblang query that should return a boolean value indicating whether a message should end a batch.


Type: `string`
Default: `""`

```yml
# Examples

check: this.type == "end_of_transaction"
```

##### batching.processors

<!-- TODO: add list of processors link -->

A list of processors to apply to a batch as it is flushed. This allows you to aggregate and archive the batch however you see fit. Please note that all resulting messages are flushed as a single batch, therefore splitting the batch into smaller batches using these processors is a no-op.


Type: `array`

```yml
# Examples

processors:
  - archive:
      format: concatenate

processors:
  - archive:
      format: lines

processors:
  - archive:
      format: json_array
```

##### max_retries

The maximum number of retries before giving up on the request. If set to zero there is no discrete limit.


Type: `int`
Default: `0`

##### backoff

Control time intervals between retry attempts.


Type: `object`

##### backoff.initial_interval

The initial period to wait between retry attempts.


Type: `string`
Default: `"3s"`

```yml
# Examples

initial_interval: 50ms

initial_interval: 1s
```

##### backoff.max_interval

The maximum period to wait between retry attempts


Type: `string`
Default: `"10s"`

```yml
# Examples

max_interval: 5s

max_interval: 1m
```

##### backoff.max_elapsed_time

The maximum overall period of time to spend on retry attempts before the request is aborted. Setting this value to a zeroed duration (such as `0s`) will result in unbounded retries.


Type: `string`
Default: `"30s"`

```yml
# Examples

max_elapsed_time: 1m

max_elapsed_time: 1h
```

### MQTT
Pushes messages to an MQTT broker.

The topic field can be dynamically set using function interpolations described here. When sending batched messages these interpolations are performed per message part.

#### Common
```yml
# Common config fields, showing default values
output:
  label: ""
  mqtt:
    urls: [] # No default (required)
    client_id: ""
    connect_timeout: 30s
    topic: "" # No default (required)
    qos: 1
    write_timeout: 3s
    retained: false
    max_in_flight: 64
```

#### Advanced
```yml
# All config fields, showing default values
output:
  label: ""
  mqtt:
    urls: [] # No default (required)
    client_id: ""
    dynamic_client_id_suffix: "" # No default (optional)
    connect_timeout: 30s
    will:
      enabled: false
      qos: 0
      retained: false
      topic: ""
      payload: ""
    user: ""
    password: ""
    keepalive: 30
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
    topic: "" # No default (required)
    qos: 1
    write_timeout: 3s
    retained: false
    retained_interpolated: "" # No default (optional)
    max_in_flight: 64
```

#### Performance

This output benefits from sending multiple messages in flight in parallel for improved performance. You can tune the max number of in flight messages (or message batches) with the field `max_in_flight`.

#### Fields

##### urls

A list of URLs to connect to. If an item of the list contains commas it will be expanded into multiple URLs.


Type: `array`

```yml
# Examples

urls:
  - tcp://localhost:1883
```

##### client_id

An identifier for the client connection.


Type: `string`
Default: `""`

##### dynamic_client_id_suffix

Append a dynamically generated suffix to the specified `client_id` on each run of the pipeline. This can be useful when clustering Streams producers.


Type: `string`

| Option | Summary |
|---|---|
| `nanoid` | append a nanoid of length 21 characters |


##### connect_timeout

The maximum amount of time to wait in order to establish a connection before the attempt is abandoned.


Type: `string`
Default: `"30s"`
Requires version 1.0.0 or newer

```yml
# Examples

connect_timeout: 1s

connect_timeout: 500ms
```

##### will

Set last will message in case of Streams failure


Type: `object`

##### will.enabled

Whether to enable last will messages.


Type: `bool`
Default: `false`

##### will.qos

Set QoS for last will message. Valid values are: 0, 1, 2.


Type: `int`
Default: `0`

##### will.retained

Set retained for last will message.


Type: `bool`
Default: `false`

##### will.topic

Set topic for last will message.


Type: `string`
Default: `""`

##### will.payload

Set payload for last will message.


Type: `string`
Default: `""`

##### user

A username to connect with.


Type: `string`
Default: `""`

##### password

A password to connect with.


Type: `string`
Default: `""`

##### keepalive

Max seconds of inactivity before a keepalive message is sent.


Type: `int`
Default: `30`

##### tls

Custom TLS settings can be used to override system defaults.

Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.

Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.

Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're seeing the error message `local error: tls: no renegotiation`.


Type: `bool`
Default: `false`
Requires version 1.0.0 or newer

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host certificate.


Type: `string`
Default: `""`

```yml
# Examples

root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified, but not both.


Type: `array`
Default: `[]`

```yml
# Examples

client_certs:
  - cert: foo
    key: bar

client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.

Type: `string`
Default: `""`

##### tls.client_certs[].cert_file

The path of a certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.

Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in PKCS#1 or PKCS#8 format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an attacker recover the plaintext.


Type: `string`
Default: `""`

```yml
# Examples

password: foo

password: ${KEY_PASSWORD}
```

##### topic

The topic to publish messages to.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->


Type: `string`

##### qos

The QoS value to set for each message. Has options 0, 1, 2.


Type: `int`
Default: `1`

##### write_timeout

The maximum amount of time to wait to write data before the attempt is abandoned.


Type: `string`
Default: `"3s"`
Requires version 1.0.0 or newer

```yml
# Examples

write_timeout: 1s

write_timeout: 500ms
```

##### retained

Set message as retained on the topic.


Type: `bool`
Default: `false`

##### retained_interpolated

Override the value of `retained` with an interpolable value, this allows it to be dynamically set based on message contents. The value must resolve to either `true` or `false`.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->


Type: `string`
Requires version 1.0.0 or newer

##### max_in_flight

The maximum number of messages to have in flight at a given time. Increase this to improve throughput.


Type: `int`
Default: `64`


### amqp_0_9

Sends messages to an AMQP (0.91) exchange. AMQP is a messaging protocol used by various message brokers, 
including RabbitMQ.

#### Common

```yaml
# Common config fields, showing default values
output:
  label: ""
  amqp_0_9:
    urls: [] # No default (required)
    exchange: "" # No default (required)
    key: ""
    type: ""
    metadata:
      exclude_prefixes: []
    max_in_flight: 64
```

#### Advanced

```yaml
# All config fields, showing default values
output:
  label: ""
  amqp_0_9:
    urls: [] # No default (required)
    exchange: "" # No default (required)
    exchange_declare:
      enabled: false
      type: direct
      durable: true
    key: ""
    type: ""
    content_type: application/octet-stream
    content_encoding: ""
    correlation_id: ""
    reply_to: ""
    expiration: ""
    message_id: ""
    user_id: ""
    app_id: ""
    metadata:
      exclude_prefixes: []
    priority: ""
    max_in_flight: 64
    persistent: false
    mandatory: false
    immediate: false
    timeout: ""
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
```

#### Metadata

The metadata from each message is delivered as headers.

It's possible for this output type to create the target exchange by setting `exchange_declare.enabled` to `true`, if the exchange 
already exists then the declaration passively verifies that the settings match.

TLS is automatic when connecting to an `amqps` URL, but custom settings can be enabled in the `tls` section.

#### Fields

##### urls

A list of URLs to connect to. The first URL to successfully establish a connection will be used until the connection is closed. 
If an item of the list contains commas, it will be expanded into multiple URLs.

Type: `array`

```yaml
# Examples
urls:
  - amqp://guest:guest@127.0.0.1:5672/
urls:
  - amqp://127.0.0.1:5672/,amqp://127.0.0.2:5672/
urls:
  - amqp://127.0.0.1:5672/
  - amqp://127.0.0.2:5672/
```

##### exchange

An AMQP exchange to publish to. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`

##### exchange_declare

Optionally declare the target exchange (passive).

Type: `object`

##### exchange_declare.enabled

Whether to declare the exchange.

Type: `bool`
Default: `false`

##### exchange_declare.type

The type of the exchange.

Type: `string`
Default: `"direct"`
Options: `direct`, `fanout`, `topic`, `x-custom`

##### exchange_declare.durable

Whether the exchange should be durable.

Type: `bool`
Default: `true`


##### key

The binding key to set for each message. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### type

The type property to set for each message. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### content_type

The content type attribute to set for each message. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `application/octet-stream`

##### content_encoding

The content encoding attribute to set for each message. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### correlation_id

Set the correlation ID of each message with a dynamic interpolated expression. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### reply_to

Carries response queue name - set with a dynamic interpolated expression. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### expiration

Set the per-message TTL. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### message_id

Set the message ID of each message with a dynamic interpolated expression. 
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### user_id

Set the user ID to the name of the publisher. If this property is set by a publisher, its value must be equal to the name 
of the user used to open the connection.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### app_id

Set the application ID of each message with a dynamic interpolated expression.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

##### metadata

Specify criteria for which metadata values are attached to messages as headers.

Type: `object`

##### metadata.exclude_prefixes

Provide a list of explicit metadata key prefixes to be excluded when adding metadata to sent messages.

Type: `array`
Default: `[]`

##### priority

Set the priority of each message with a dynamic interpolated expression.
<!-- TODO: when interpolation supported:
This field supports interpolation functions.
-->

Type: `string`
Default: `""`

```yaml
# Examples
priority: "0"
priority: ${! metadata("amqp_priority") }
priority: ${! json("doc.priority") }
```

##### max_in_flight

The maximum number of messages to have in flight at a given time. Increase this to improve throughput.

Type: `int`
Default: `64`

##### persistent

Whether message delivery should be persistent (transient by default).

Type: `bool`
Default: `false`

##### mandatory

Whether to set the mandatory flag on published messages. When set if a published message is routed to zero queues, it is returned.

Type: `bool`
Default: `false`

##### immediate

Whether to set the immediate flag on published messages. When set if there are no ready consumers of a queue, then the message is dropped instead of waiting.

Type: `bool`
Default: `false`

##### timeout

The maximum period to wait before abandoning it and reattempting. If not set, wait indefinitely.

Type: `string`
Default: `""`

##### tls

Custom TLS settings can be used to override system defaults.

Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.

Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.

Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're getting the error message
`local error: tls: no renegotiation.`

Type: `bool`
Default: `false`

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate,
to possible intermediate signing certificates, to the host certificate.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

```yaml
# Examples
root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing
a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host
certificate.

Type: `string`
Default: `""`

```yaml
# Examples
root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified,
but not both.

Type: `array`
Default: `[]`

```yaml
# Examples
client_certs:
  - cert: foo
    key: bar
client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

##### tls.client_certs[].cert_file

The path of a certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.

Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in *PKCS#1* or *PKCS#8* format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not
supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an
attacker recover the plaintext.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

```yaml
# Examples
password: foo
```

### amqp_1

Sends messages to an AMQP (1.0) server.

#### Common

```yaml
# Common config fields, showing default values
output:
  label: ""
  amqp_1:
    urls: [] # No default (optional)
    target_address: /foo # No default (required)
    max_in_flight: 64
    metadata:
      exclude_prefixes: []
```

#### Advanced

```yaml
# All config fields, showing default values
output:
  label: ""
  amqp_1:
    urls: [] # No default (optional)
    target_address: /foo # No default (required)
    max_in_flight: 64
    tls:
      enabled: false
      skip_cert_verify: false
      enable_renegotiation: false
      root_cas: ""
      root_cas_file: ""
      client_certs: []
    application_properties_map: "" # No default (optional)
    sasl:
      mechanism: none
      user: ""
      password: ""
    metadata:
      exclude_prefixes: []
```

#### Metadata

Message metadata is added to each AMQP message as string annotations. To control which metadata keys are added, use the `metadata` config field.

#### Performance

This output benefits from sending multiple messages in flight in parallel for improved performance. You can tune the max number of in flight 
messages (or message batches) with the field `max_in_flight`.


#### Fields

##### urls

A list of URLs to connect to. The first URL to successfully establish a connection will be used until the connection is closed. 
If an item of the list contains commas it will be expanded into multiple URLs.

Type: `array`

```yaml
# Examples
urls:
  - amqp://guest:guest@127.0.0.1:5672/
urls:
  - amqp://127.0.0.1:5672/,amqp://127.0.0.2:5672/
urls:
  - amqp://127.0.0.1:5672/
  - amqp://127.0.0.2:5672/
```

##### target_address

The target address to write to.

Type: `string`

```yaml
# Examples
target_address: /foo
target_address: queue:/bar
target_address: topic:/baz
```

##### max_in_flight

The maximum number of messages to have in flight at a given time. Increase this to improve throughput.

Type: `int`
Default: `64`

##### tls

Custom TLS settings can be used to override system defaults.

Type: `object`

##### tls.enabled

Whether custom TLS settings are enabled.

Type: `bool`
Default: `false`

##### tls.skip_cert_verify

Whether to skip server side certificate verification.

Type: `bool`
Default: `false`

##### tls.enable_renegotiation

Whether to allow the remote server to repeatedly request renegotiation. Enable this option if you're getting the error message
`local error: tls: no renegotiation.`

Type: `bool`
Default: `false`

##### tls.root_cas

An optional root certificate authority to use. This is a string, representing a certificate chain from the parent trusted root certificate,
to possible intermediate signing certificates, to the host certificate.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

```yaml
# Examples
root_cas: |-
  -----BEGIN CERTIFICATE-----
  ...
  -----END CERTIFICATE-----
```

##### tls.root_cas_file

An optional path of a root certificate authority file to use. This is a file, often with a .pem extension, containing
a certificate chain from the parent trusted root certificate, to possible intermediate signing certificates, to the host
certificate.

Type: `string`
Default: `""`

```yaml
# Examples
root_cas_file: ./root_cas.pem
```

##### tls.client_certs

A list of client certificates to use. For each certificate either the fields `cert` and `key`, or `cert_file` and `key_file` should be specified,
but not both.

Type: `array`
Default: `[]`

```yaml
# Examples
client_certs:
  - cert: foo
    key: bar
client_certs:
  - cert_file: ./example.pem
    key_file: ./example.key
```

##### tls.client_certs[].cert

A plain text certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key

A plain text certificate key to use.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

##### tls.client_certs[].cert_file

The path of a certificate to use.

Type: `string`
Default: `""`

##### tls.client_certs[].key_file

The path of a certificate key to use.

Type: `string`
Default: `""`

##### tls.client_certs[].password

A plain text password for when the private key is password encrypted in *PKCS#1* or *PKCS#8* format. The obsolete `pbeWithMD5AndDES-CBC` algorithm is not
supported for the PKCS#8 format. Warning: Since it does not authenticate the ciphertext, it is vulnerable to padding oracle attacks that can let an
attacker recover the plaintext.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`

```yaml
# Examples
password: foo
```

##### application_properties_map

An optional Bloblang mapping that can be defined to set the `application-properties` on output messages.

Type: `string`

##### sasl

Enables SASL authentication.

Type: `object`

##### sasl.mechanism

The SASL authentication mechanism to use.

Type: `string`
Default: `"none"`

| Option    | Summary                              |
|-----------|--------------------------------------|
| anonymous | Anonymous SASL authentication.       |
| none      | No SASL based authentication.        |
| plain     | Plain text SASL authentication.      |


##### sasl.user

A SASL plain text username. It is recommended that you use environment variables to populate this field.

Type: `string`
Default: `""`

```yaml
# Examples
user: ${USER}
```

##### sasl.password

A SASL plain text password. It is recommended that you use environment variables to populate this field.
<!-- TODO add secrets link :::warning Secret
This field contains sensitive information that usually shouldn't be added to a config directly, read our [secrets page for more info](/docs/configuration/secrets).
::: -->

Type: `string`
Default: `""`


```yaml
# Examples
password: ${PASSWORD}
```

##### metadata

Specify criteria for which metadata values are attached to messages as headers.

Type: `object`

##### metadata.exclude_prefixes

Provide a list of explicit metadata key prefixes to be excluded when adding metadata to sent messages.

Type: `array`
Default: `[]`

## Processors

### Overview

Tyk Streams processors are functions applied to messages passing through a pipeline.

Processors are set via config, and depending on where in the config they are placed they will be run either immediately after a specific input (set in the input section), on all messages (set in the pipeline section) or before a specific output (set in the output section). Most processors apply to all messages and can be placed in the pipeline section:

```yaml
pipeline:
  threads: 1
  processors:
    - label: my_avro
      avro:
        operator: "to_json"
        encoding: textual
```

The `threads` field in the pipeline section determines how many parallel processing threads are created. You can read more about parallel processing in the [pipeline guide]({{< ref "api-management/stream-config#processing-pipelines" >}}).

#### Labels

<!--

TODO: Replace paragraph below in subsequent iteration when know if metrics supported from product

Processors have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple nested processors, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation].

-->

Processors have an optional field `label` that can uniquely identify them in observability data such as logs.

### Avro

```yml
# Config fields, with default values
label: ""
avro:
  operator: "" # No default (required)
  encoding: textual
  schema: ""
  schema_path: ""
```

{{< warning success >}}
**Note**

If you are consuming or generating messages using a schema registry service then it is likely this processor will fail as those services require messages to be prefixed with the identifier of the schema version being used.

{{< /warning >}}

#### Operators

##### to_json

Converts Avro documents into a JSON structure. This makes it easier to
manipulate the contents of the document within Tyk Streams. The encoding field
specifies how the source documents are encoded.


##### from_json

Attempts to convert JSON documents into Avro documents according to the
specified encoding.

#### Fields

##### operator

The [operator](#operators) to execute


Type: `string`
Options: `to_json`, `from_json`.

##### encoding

An Avro encoding format to use for conversions to and from a schema.


Type: `string`
Default: `"textual"`
Options: `textual`, `binary`, `single`.

##### schema

A full Avro schema to use.


Type: `string`
Default: `""`

##### schema_path

The path of a schema document to apply. Use either this or the `schema` field.


Type: `string`
Default: `""`

```yml
# Examples

schema_path: file://path/to/spec.avsc

schema_path: http://localhost:8081/path/to/spec/versions/1
```

### Mapping

Executes a Bloblang mapping on messages, creating a new document that replaces (or filters) the original message.

Bloblang is a powerful language that enables various mapping, transformation, and filtering tasks. For more information, check out the [Bloblang docs](https://warpstreamlabs.github.io/bento/docs/guides/bloblang/about/).

```yml
label: ""
mapping: "" # No default (required)
```

#### Example

Given a JSON document with US location names and the states they are located in:
```json
{
  "locations": [
    {"name": "Seattle", "state": "WA"},
    {"name": "New York", "state": "NY"},
    {"name": "Bellevue", "state": "WA"},
    {"name": "Olympia", "state": "WA"}
  ]
}
```

If we want to collapse the location names from the state of Washington into a field `Cities`:

```json
{"Cities": "Bellevue, Olympia, Seattle"}
```

We could use the following bloblang mapping:

```yml
pipeline:
  processors:
    - mapping: |
        root.Cities = this.locations.
                        filter(loc -> loc.state == "WA").
                        map_each(loc -> loc.name).
                        sort().join(", ")
```

#### Considerations

 - If a mapping fails, the message remains unchanged. However, Bloblang provides powerful ways to ensure your mappings do not fail by specifying desired fallback behaviour. See [this section of the Bloblang docs](https://warpstreamlabs.github.io/bento/docs/configuration/error_handling/).
 - Mapping operates by creating an entirely new object during assignments. This has the advantage of treating the original referenced document as immutable and, therefore, queryable at any stage of your mapping. As a result, the `Cities` JSON document in the above example is a new, separate copy of the original document, which remains unchanged.

## Tracers

### Overview

A tracer type represents a destination for Tyk Streams to send tracing events to such as [Jaeger](https://www.jaegertracing.io/).

When a tracer is configured all messages will be allocated a root span during ingestion that represents their journey through a Streams pipeline. Many Streams processors create spans, and so tracing is a great way to analyse the pathways of individual messages as they progress through a Streams instance.

Some inputs, such as `http_server` and `http_client`, are capable of extracting a root span from the source of the message (HTTP headers). This is
a work in progress and should eventually expand so that all inputs have a way of doing so.

Other inputs, such as `kafka` can be configured to extract a root span by using the `extract_tracing_map` field.

A tracer config section looks like this:

```yaml
tracer:
  jaeger:
    agent_address: localhost:6831
    sampler_type: const
    sampler_param: 1
```

{{< warning success >}}
**Note**

Although the configuration spec of this component is stable the format of spans, tags and logs created by Streams is subject to change as it is tuned for improvement.
{{< /warning >}}

### Jaeger

```yml
# Common config fields, showing default values
tracer:
  jaeger:
    agent_address: ""
    collector_url: ""
    sampler_type: const
    flush_interval: "" # No default (optional)
```

#### Advanced

```yml
# All config fields, showing default values
tracer:
  jaeger:
    agent_address: ""
    collector_url: ""
    sampler_type: const
    sampler_param: 1
    tags: {}
    flush_interval: "" # No default (optional)
```

Send tracing events to a [Jaeger](https://www.jaegertracing.io/) agent or collector.

#### Fields

##### agent_address

The address of a Jaeger agent to send tracing events to.

Type: `string`
Default: `""`

```yml
# Examples

agent_address: jaeger-agent:6831
```

##### collector_url

The URL of a Jaeger collector to send tracing events to. If set, this will override `agent_address`.

Type: `string`
Default: `""`

```yml
# Examples

collector_url: https://jaeger-collector:14268/api/traces
```

##### sampler_type

The sampler type to use.

Type: `string`
Default: `"const"`

| Option | Summary |
|---|---|
| `const` | Sample a percentage of traces. 1 or more means all traces are sampled, 0 means no traces are sampled and anything in between means a percentage of traces are sampled. Tuning the sampling rate is recommended for high-volume production workloads. |

##### sampler_param

A parameter to use for sampling. This field is unused for some sampling types.

Type: `float`
Default: `1`

##### tags

A map of tags to add to tracing spans.

Type: `object`
Default: `{}`

##### flush_interval

The period of time between each flush of tracing spans.

Type: `string`

### OpenTelemetry Collector

```yml
# Common config fields, showing default values
tracer:
  open_telemetry_collector:
    http: [] # No default (required)
    grpc: [] # No default (required)
    sampling:
      enabled: false
      ratio: 0.85 # No default (optional)
```

#### Advanced

```yml
# All config fields, showing default values
tracer:
  open_telemetry_collector:
    http: [] # No default (required)
    grpc: [] # No default (required)
    tags: {}
    sampling:
      enabled: false
      ratio: 0.85 # No default (optional)
```

{{< warning success >}}
**Note**

This component is experimental and therefore subject to change or removal outside of major version releases.
{{< /warning >}}

Send tracing events to an [Open Telemetry collector](https://opentelemetry.io/docs/collector/).

#### Fields

##### http

A list of http collectors.

Type: `array`

##### http[].address

The endpoint of a collector to send tracing events to.

Type: `string`

```yml
# Examples

address: localhost:4318
```

##### http[].secure

Connect to the collector over HTTPS

Type: `bool`
Default: `false`

##### grpc

A list of grpc collectors.

Type: `array`

##### grpc[].address

The endpoint of a collector to send tracing events to.

Type: `string`

```yml
# Examples

address: localhost:4317
```

##### grpc[].secure

Connect to the collector with client transport security

Type: `bool`
Default: `false`

##### tags

A map of tags to add to all tracing spans.

Type: `object`
Default: `{}`

##### sampling

Settings for trace sampling. Sampling is recommended for high-volume production workloads.

Type: `object`

##### sampling.enabled

Whether to enable sampling.

Type: `bool`
Default: `false`

##### sampling.ratio

Sets the ratio of traces to sample.

Type: `float`

```yml
# Examples

ratio: 0.85

ratio: 0.5
```

## Metrics

### Overview

Streams emits lots of metrics in order to expose how components configured within your pipeline are behaving. You can configure exactly where these metrics end up with the config field `metrics`, which describes a metrics format and destination. For example, if you wished to push them via the Prometheus protocol you could use this configuration:

```yaml
metrics:
  prometheus:
    push_interval: 1s
    push_job_name: in
    push_url: http://localhost:9091
```

### Metric Names

Metrics are emitted with a prefix that can be configured with the field `prefix`. The default prefix is `bento`. The following metrics are emitted with the respective types:

#### Gauges

- `{prefix}_input_count` Number of inputs currently active.
- `{prefix}_output_count` Number of outputs currently active.
- `{prefix}_processor_count` Number of processors currently active.
- `{prefix}_cache_count` Number of caches currently active.
- `{prefix}_condition_count` Number of conditions currently active.
- `{prefix}_input_connection_up` 1 if a particular input is connected, 0 if it is not.
- `{prefix}_output_connection_up` 1 if a particular output is connected, 0 if it is not.
- `{prefix}_input_running` 1 if a particular input is running, 0 if it is not.
- `{prefix}_output_running` 1 if a particular output is running, 0 if it is not.
- `{prefix}_processor_running` 1 if a particular processor is running, 0 if it is not.
- `{prefix}_cache_running` 1 if a particular cache is running, 0 if it is not.
- `{prefix}_condition_running` 1 if a particular condition is running, 0 if it is not.
- `{prefix}_buffer_running` 1 if a particular buffer is running, 0 if it is not.
- `{prefix}_buffer_available` The number of messages that can be read from a buffer.
- `{prefix}_input_retry` The number of active retry attempts for a particular input.
- `{prefix}_output_retry` The number of active retry attempts for a particular output.
- `{prefix}_processor_retry` The number of active retry attempts for a particular processor.
- `{prefix}_cache_retry` The number of active retry attempts for a particular cache.
- `{prefix}_condition_retry` The number of active retry attempts for a particular condition.
- `{prefix}_buffer_retry` The number of active retry attempts for a particular buffer.
- `{prefix}_threads_active` The number of processing threads currently active.

#### Counters

- `{prefix}_input_received` Count of messages received by a particular input.
- `{prefix}_input_batch_received` Count of batches received by a particular input.
- `{prefix}_output_sent` Count of messages sent by a particular output.
- `{prefix}_output_batch_sent` Count of batches sent by a particular output.
- `{prefix}_processor_processed` Count of messages processed by a particular processor.
- `{prefix}_processor_batch_processed` Count of batches processed by a particular processor.
- `{prefix}_processor_dropped` Count of messages dropped by a particular processor.
- `{prefix}_processor_batch_dropped` Count of batches dropped by a particular processor.
- `{prefix}_processor_error` Count of errors returned by a particular processor.
- `{prefix}_processor_batch_error` Count of batch errors returned by a particular processor.
- `{prefix}_cache_hit` Count of cache key lookups that found a value.
- `{prefix}_cache_miss` Count of cache key lookups that did not find a value.
- `{prefix}_cache_added` Count of new cache entries.
- `{prefix}_cache_err` Count of errors that occurred during a cache operation.
- `{prefix}_condition_hit` Count of condition checks that passed.
- `{prefix}_condition_miss` Count of condition checks that failed.
- `{prefix}_condition_error` Count of errors that occurred during a condition check.
- `{prefix}_buffer_added` Count of messages added to a particular buffer.
- `{prefix}_buffer_batch_added` Count of batches added to a particular buffer.
- `{prefix}_buffer_read` Count of messages read from a particular buffer.
- `{prefix}_buffer_batch_read` Count of batches read from a particular buffer.
- `{prefix}_buffer_ack` Count of messages removed from a particular buffer.
- `{prefix}_buffer_batch_ack` Count of batches removed from a particular buffer.
- `{prefix}_buffer_nack` Count of messages that failed to be removed from a particular buffer.
- `{prefix}_buffer_batch_nack` Count of batches that failed to be removed from a particular buffer.
- `{prefix}_buffer_err` Count of errors that occurred during a buffer operation.
- `{prefix}_buffer_batch_err` Count of batch errors that occurred during a buffer operation.
- `{prefix}_input_error` Count of errors that occurred during an input operation.
- `{prefix}_input_batch_error` Count of batch errors that occurred during an input operation.
- `{prefix}_output_error` Count of errors that occurred during an output operation.
- `{prefix}_output_batch_error` Count of batch errors that occurred during an output operation.
- `{prefix}_resource_cache_error` Count of errors that occurred during a resource cache operation.
- `{prefix}_resource_condition_error` Count of errors that occurred during a resource condition operation.
- `{prefix}_resource_input_error` Count of errors that occurred during a resource input operation.
- `{prefix}_resource_processor_error` Count of errors that occurred during a resource processor operation.
- `{prefix}_resource_output_error` Count of errors that occurred during a resource output operation.
- `{prefix}_resource_rate_limit_error` Count of errors that occurred during a resource rate limit operation.

#### Timers

- `{prefix}_input_latency` Latency of a particular input.
- `{prefix}_input_batch_latency` Latency of a particular input at the batch level.
- `{prefix}_output_latency` Latency of a particular output.
- `{prefix}_output_batch_latency` Latency of a particular output at the batch level.
- `{prefix}_processor_latency` Latency of a particular processor.
- `{prefix}_processor_batch_latency` Latency of a particular processor at the batch level.
- `{prefix}_condition_latency` Latency of a particular condition.
- `{prefix}_condition_batch_latency` Latency of a particular condition at the batch level.
- `{prefix}_cache_latency` Latency of a particular cache.
- `{prefix}_buffer_latency` Latency of a particular buffer.
- `{prefix}_buffer_batch_latency` Latency of a particular buffer at the batch level.

### Metric Labels

All metrics are emitted with the following labels:

- `path` The path of the component within the config.
- `label` A custom label for the component, which is optional and falls back to the component type.

### Prometheus

```yml
# Common config fields, showing default values
metrics:
  prometheus:
    prefix: tyk
    push_interval: ""
    push_job_name: kafka_out
    push_url: ""
```

#### Advanced

```yml
# All config fields, showing default values
metrics:
  prometheus:
    prefix: tyk
    push_interval: ""
    push_job_name: my_stream
    push_url: ""
    push_basic_auth:
      enabled: false
      username: ""
      password: ""
    file_path: ""
    use_histogram_timing: false
    histogram_buckets: [0.000001, 0.00001, 0.0001, 0.001, 0.01, 0.1, 1.0]
```

Send metrics to a Prometheus push gateway, or expose them via HTTP endpoints.

#### Fields

##### prefix

A string prefix for all metrics.

Type: `string`
Default: `"bento"`

##### push_interval

The interval between pushing metrics to the push gateway.

Type: `string`
Default: `""`

```yml
# Examples

push_interval: 1s

push_interval: 1m
```

##### push_job_name

A job name to attach to metrics pushed to the push gateway.

Type: `string`
Default: `"bento_push"`

##### push_url

The URL to push metrics to.

Type: `string`
Default: `""`

```yml
# Examples

push_url: http://localhost:9091
```

##### push_basic_auth

Basic authentication configuration for the push gateway.

Type: `object`

##### push_basic_auth.enabled

Whether to use basic authentication when pushing metrics.

Type: `bool`
Default: `false`

##### push_basic_auth.username

The username to authenticate with.

Type: `string`
Default: `""`

##### push_basic_auth.password

The password to authenticate with.

Type: `string`
Default: `""`

##### file_path

The file path to write metrics to.

Type: `string`
Default: `""`

```yml
# Examples

file_path: /tmp/metrics.txt
```

##### use_histogram_timing

Whether to use histogram metrics for timing values. When set to false, summary metrics are used instead.

Type: `bool`
Default: `false`

##### histogram_buckets

A list of duration buckets to track when use_histogram_timing is set to true.

Type: `array`
Default: `[0.000001, 0.00001, 0.0001, 0.001, 0.01, 0.1, 1.0]`

## Common Configuration

### Batching

Tyk Streams is able to join sources and sinks with sometimes conflicting batching behaviours without sacrificing its strong delivery guarantees. Therefore, batching within Tyk Streams is a mechanism that serves multiple purposes:

1. [Performance (throughput)](#performance)
2. [Compatibility (mixing multi and single part message protocols)](#compatibility)

#### Performance

For most users the only benefit of batching messages is improving throughput over your output protocol. For some protocols this can happen in the background and requires no configuration from you. However, if an output has a `batching` configuration block this means it benefits from batching and requires you to specify how you'd like your batches to be formed by configuring a [batching policy](#batch-policy):

```yaml
output:
  kafka:
    addresses: [ todo:9092 ]
    topic: tyk_stream

    # Either send batches when they reach 10 messages or when 100ms has passed
    # since the last batch.
    batching:
      count: 10
      period: 100ms
```

However, a small number of inputs such as [kafka]({{< ref "api-management/stream-config#kafka" >}}) must be consumed sequentially (in this case by partition) and therefore benefit from specifying your batch policy at the input level instead:

```yaml
input:
  kafka:
    addresses: [ todo:9092 ]
    topics: [ tyk_input_stream ]
    batching:
      count: 10
      period: 100ms

output:
  kafka:
    addresses: [ todo:9092 ]
    topic: tyk_stream
```

Inputs that behave this way are documented as such and have a `batching` configuration block.

Sometimes you may prefer to create your batches before processing, in which case if your input doesn't already support [a batch policy](#batch-policy) you can instead use a [broker]({{< ref "api-management/stream-config#broker" >}}), which also allows you to combine inputs with a single batch policy:

```yaml
input:
  broker:
    inputs:
      - resource: foo
      - resource: bar
    batching:
      count: 50
      period: 500ms
```

This also works the same with [output brokers]({{< ref "api-management/stream-config#broker-1" >}}).

#### Compatibility

Tyk Streams is able to read and write over protocols that support multiple part messages, and all payloads travelling through Tyk Streams are represented as a multiple part message. Therefore, all components within Tyk Streams are able to work with multiple parts in a message as standard.

When messages reach an output that *doesn't* support multiple parts the message is broken down into an individual message per part, and then one of two behaviours happen depending on the output. If the output supports batch sending messages then the collection of messages are sent as a single batch. Otherwise, Tyk Streams falls back to sending the messages sequentially in multiple, individual requests.

This behaviour means that not only can multiple part message protocols be easily matched with single part protocols, but also the concept of multiple part messages and message batches are interchangeable within Tyk Streams.

#### Batch Policy

When an input or output component has a config field `batching` that means it supports a batch policy. This is a mechanism that allows you to configure exactly how your batching should work on messages before they are routed to the input or output it's associated with. Batches are considered complete and will be flushed downstream when either of the following conditions are met:


- The `byte_size` field is non-zero and the total size of the batch in bytes matches or exceeds it (disregarding metadata.)
- The `count` field is non-zero and the total number of messages in the batch matches or exceeds it.
- The `period` field is non-empty and the time since the last batch exceeds its value.

This allows you to combine conditions:

```yaml
output:
  kafka:
    addresses: [ todo:9092 ]
    topic: tyk_stream

    # Either send batches when they reach 10 messages or when 100ms has passed
    # since the last batch.
    batching:
      count: 10
      period: 100ms
```

{{< note >}}
**Note**
A batch policy has the capability to *create* batches, but not to break them down.

{{</ note>}}

If your configured pipeline is processing messages that are batched *before* they reach the batch policy then they may circumvent the conditions you've specified here, resulting in sizes you aren't expecting.

### Field Paths

Many components within Tyk Streams allow you to target certain fields using a JSON dot path. The syntax of a path within Tyk Streams is similar to [JSON Pointers](https://tools.ietf.org/html/rfc6901), except with dot separators instead of slashes (and no leading dot.) When a path is used to set a value any path segment that does not yet exist in the structure is created as an object.

For example, if we had the following JSON structure:

```json
{
  "foo": {
    "bar": 21
  }
}
```

The query path `foo.bar` would return `21`.

The characters `~` (%x7E) and `.` (%x2E) have special meaning in Tyk Streams paths. Therefore `~` needs to be encoded as `~0` and `.` needs to be encoded as `~1` when these characters appear within a key.

For example, if we had the following JSON structure:

```json
{
  "foo.foo": {
    "bar~bo": {
      "": {
        "baz": 22
      }
    }
  }
}
```

The query path `foo~1foo.bar~0bo..baz` would return `22`.

#### Arrays

When Tyk Streams encounters an array whilst traversing a JSON structure it requires the next path segment to be either an integer of an existing index, or, depending on whether the path is used to query or set the target value, the character `*` or `-` respectively.

For example, if we had the following JSON structure:

```json
{
  "foo": [
    0, 1, { "bar": 23 }
  ]
}
```

The query path `foo.2.bar` would return `23`.

##### Querying

When a query reaches an array the character `*` indicates that the query should return the value of the remaining path from each element of the array (within an array.)

##### Setting

When an array is reached the character `-` indicates that a new element should be appended to the end of the existing elements, if this character is not the final segment of the path then an object is created.

### Processing Pipelines

Within a Tyk Streams configuration, in between `input` and `output`, is a `pipeline` section. This section describes an array of processors that are to be applied to *all* messages, and are not bound to any particular input or output.

If you have processors that are heavy on CPU and aren't specific to a certain input or output they are best suited for the pipeline section. It is advantageous to use the pipeline section as it allows you to set an explicit number of parallel threads of execution:

```yaml
input:
  resource: foo

pipeline:
  threads: 4
  processors:
    - avro:
        operator: "to_json"

output:
  resource: bar
```

If the field `threads` is set to `-1` (the default) it will automatically match the number of logical CPUs available. By default almost all Tyk Streams sources will utilize as many processing threads as have been configured, which makes horizontal scaling easy.
