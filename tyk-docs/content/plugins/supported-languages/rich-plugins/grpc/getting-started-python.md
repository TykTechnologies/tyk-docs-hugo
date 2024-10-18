---
date: 2024-05-10T11:54:00Z
title: "Getting Started: Creating A Python gRPC Server"
---

In the realm of API integration, establishing seamless connections between services is paramount.

Understanding the fundamentals of gRPC server implementation is crucial, especially when integrating with a Gateway solution like Tyk. This guide aims to provide practical insights into this process, starting with the basic principles of how to implement a Python gRPC server that integrates with Tyk Gateway.

## Objectives

By the end of this guide, you will be able to implement a gRPC server that will integrate with Tyk Gateway, setting the stage for further exploration in subsequent parts:

- Establishing the necessary tools, Python libraries and gRPC service definition for implementing a gRPC server that integrates with Tyk Gateway.
- Developing a basic gRPC server that echoes the request payload to the console, showcasing the core principles of integration.
- Configuring Tyk Gateway to interact with our gRPC server, enabling seamless communication between the two services.

Before implementing our first gRPC server it is first necessary to understand the service interface that defines how Tyk Gateway integrates with a gRPC server.


## Tyk Dispatcher Service

The *Dispatcher* service, defined in the [coprocess_object.proto](https://github.com/TykTechnologies/tyk/blob/master/coprocess/proto/coprocess_object.proto) file, contains the *Dispatch* RPC method, invoked by Tyk Gateway to request remote execution of gRPC plugins. Tyk Gateway dispatches accompanying data relating to the original client request and session. The service definition is listed below:

```protobuf
service Dispatcher {
  rpc Dispatch (Object) returns (Object) {}
  rpc DispatchEvent (Event) returns (EventReply) {}
}
```

On the server side, we will implement the *Dispatcher* service methods and a gRPC server to handle requests from Tyk Gateway. The gRPC infrastructure decodes incoming requests, executes service methods and encodes service responses.

Before we start developing our gRPC server we need to setup our development environment with the supporting libraries and tools.


## Prerequisites

Firstly, we need to download the [Tyk Protocol Buffers](https://github.com/TykTechnologies/tyk/tree/master/coprocess/proto) and install the Python protoc compiler.

We are going to use the *protoc* compiler to generate the supporting classes and data structures to implement the *Dispatcher* service.


### Tyk Protocol Buffers

Issue the following command to download and extract the Tyk Protocol Buffers from the Tyk GitHub repository:

```bash
curl -sL "https://github.com/TykTechnologies/tyk/archive/master.tar.gz " -o tyk.tar.gz && \
    mkdir tyk && \
    tar -xzvf tyk.tar.gz --strip-components=1 -C tyk && \
    mv tyk/coprocess/proto/* . && \
    rm -r tyk tyk.tar.gz
```

### Install Dependencies

We are going to setup a Python virtual environment and install some supporting dependencies. Assuming that you have Python [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) already installed, then issue the following commands to setup a Python virtual environment containing the grpcio and grpcio-tools libraries:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install –upgrade pip
pip install grpcio grpcio-tools grpcio-reflection
```

The [grpcio](https://pypi.org/project/grpcio/) library offers essential functionality to support core gRPC features such as message serialisation and deserialisation. The [grpcio-tools](https://pypi.org/project/grpcio-tools/) library provides the Python *protoc* compiler that we will use to generate the supporting classes and data structures to implement our gRPC server. The [grpcio-reflection](https://pypi.org/project/grpcio-reflection/) library allows clients to query information about the services and methods provided by a gRPC server at runtime. It enables clients to dynamically discover available services, their RPC methods, in addition to the message types and field names associated with those methods.


### Install grpcurl

Follow the [installation instructions](https://github.com/fullstorydev/grpcurl?tab=readme-ov-file#installation) to install grpcurl. We will use grpcurl to send test requests to our gRPC server.


### Generate Python Bindings

We are now able to generate the Python classes and data structures to allow us to implement our gRPC server. To accomplish this we will use the Python *protoc* command as listed below:

```bash
python -m grpc_tools.protoc --proto_path=. --python_out=. --grpc_python_out=. *.proto
```

This compiles the Protocol Buffer files (*.proto) from the current working directory and generates the Python classes representing the Protocol Buffer messages and services. A series of *.py* files should now exist in the current working directory. We are interested in the *coprocess_object_pb2_grpc.py* file, containing a default implementation of *Tyk’s Dispatcher* service.

Inspect the generated Python file, *coprocess_object_pb2_grpc.py*, containing the *DispatcherServicer* class:

```python
class DispatcherServicer(object):
    """ GRPC server interface, that must be implemented by the target language """
    def Dispatch(self, request, context):
        """ Accepts and returns an Object message """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')
    def DispatchEvent(self, request, context):
        """ Dispatches an event to the target language """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')
```

This superclass contains a default stub implementation for the **Dispatch** and **DispatchEvent** RPC methods, each defining request and context parameters:

The *request* parameter allows our server to access the message payload sent by Tyk Gateway. We can use this data, pertaining to the request and session, to process and generate a response.

The *context* parameter provides additional information and functionalities related to the RPC call, such as timeout limits, cancelation signals etc. This is a [grpc.ServicerContext](https://grpc.github.io/grpc/python/grpc.html#grpc.ServicerContext) or a [grpc.aio.ServicerContext](https://grpc.github.io/grpc/python/grpc_asyncio.html#grpc.aio.ServicerContext), object depending upon whether a synchronous or AsyncIO gRPC server is implemented.

In the next step we will implement a subclass that will handle requests made by Tyk Gateway for remote execution of custom plugins.


## Implement Dispatcher Service

We will now develop the *Dispatcher* service, adding implementations of the *Dispatch* and *DispatchEvent* methods, to allow our gRPC server to integrate with Tyk Gateway. Before we continue, create a file, *async_server.py*, within the same folder as the generated Protocol Buffer (.proto) files. 


### Dispatch

Our implementation of the Dispatch RPC method will deserialize the request payload and output to the console as JSON format. This serves as a useful development and debugging aid, allowing inspection of the request and session state dispatched by Tyk Gateway to our gRPC server.

Copy and paste the following source code into the *async_server.py* file. Notice that we have used type hinting to aid readability. The type hints are located within the type hint files (.pyi) we generated with the protoc compiler. 


```python
import asyncio
import grpc
import json
import signal
import logging
from google.protobuf.json_format import MessageToJson
from grpc_reflection.v1alpha import reflection
import coprocess_object_pb2_grpc
import coprocess_object_pb2
from coprocess_common_pb2 import HookType
from coprocess_session_state_pb2 import SessionState
class PythonDispatcher(coprocess_object_pb2_grpc.DispatcherServicer):
    async def Dispatch(
        self, object: coprocess_object_pb2.Object, context: grpc.aio.ServicerContext
    ) -> coprocess_object_pb2.Object:
        logging.info(f"STATE for {object.hook_name}\n{MessageToJson(object)}\n")
        if object.hook_type == HookType.Pre:
            logging.info(f"Pre plugin name: {object.hook_name}")
            logging.info(f"Activated Pre Request plugin from API: {object.spec.get('APIID')}")
        elif object.hook_type == HookType.CustomKeyCheck:
            logging.info(f"CustomAuth plugin: {object.hook_name}")
            logging.info(f"Activated CustomAuth plugin from API: {object.spec.get('APIID')}")
        elif object.hook_type == HookType.PostKeyAuth:
            logging.info(f"PostKeyAuth plugin name: {object.hook_name}")
            logging.info(f"Activated PostKeyAuth plugin from API: {object.spec.get('APIID')}")
        elif object.hook_type == HookType.Post:
            logging.info(f"Post plugin name: {object.hook_name}")
            logging.info(f"Activated Post plugin from API: {object.spec.get('APIID')}")
        elif object.hook_type == HookType.Response:
            logging.info(f"Response plugin name: {object.hook_name}")
            logging.info(f"Activated Response plugin from API: {object.spec.get('APIID')}")
            logging.info("--------\n")
        return object
```

Our *Dispatch* RPC method accepts the two parameters, *object* and *context*. The object parameter allows us to inspect the state and session of the request object dispatched by Tyk Gateway, via accessor methods. The *context* parameter can be used to set timeout limits etc. associated with the RPC call.

The important takeaways from the source code listing above are:

- The [MessageToJson](https://googleapis.dev/python/protobuf/latest/google/protobuf/json_format.html#google.protobuf.json_format.MessageToJson) function is used to deserialize the request payload as JSON.
- In the context of custom plugins we access the *hook_type* and *hook_name* attributes of the *Object* message to determine which plugin to execute.
- The ID of the API associated with the request is accessible from the spec dictionary, *object.spec.get('APIID')*.

An implementation of the *Dispatch* RPC method must return the object payload received from Tyk Gateway. The payload can be modified by the service implementation, for example to add or remove headers and query parameters before the request is sent upstream.


### DispatchEvent

Our implementation of the *DispatchEvent* RPC method will deserialize and output the event payload as JSON. Append the following source code to the *async_server.py* file:

```python
   async def DispatchEvent(
        self, event: coprocess_object_pb2.Event, context: grpc.aio.ServicerContext
    ) -> coprocess_object_pb2.EventReply:
        event = json.loads(event.payload)
        http://logging.info (f"RECEIVED EVENT: {event}")
        return coprocess_object_pb2.EventReply()
```

The *DispatchEvent* RPC method accepts the two parameters, *event* and *context*. The event parameter allows us to inspect the payload of the event dispatched by Tyk Gateway. The context parameter can be used to set timeout limits etc. associated with the RPC call.

The important takeaways from the source code listing above are:

- The event data is accessible from the *payload* attribute of the event parameter.
- An implementation of the *DispatchEvent* RPC method must return an instance of  *coprocess_object_pb2.EventReply*.


## Create gRPC Server

Finally, we will implement an AsyncIO gRPC server to handle requests from Tyk Gateway to the *Dispatcher* service. We will add functions to start and stop our gRPC server. Finally, we will use *grpcurl* to issue a test payload to our gRPC server to test that it is working.


### Develop gRPC Server

Append the following source code from the listing below to the *async_server.py* file:

```python
async def serve() -> None:
    server = grpc.aio.server()
    coprocess_object_pb2_grpc.add_DispatcherServicer_to_server(
        PythonDispatcher(), server
    )
   listen_addr = "[::]:50051"
    SERVICE_NAMES = (
        coprocess_object_pb2.DESCRIPTOR.services_by_name["Dispatcher"].full_name,
        reflection.SERVICE_NAME,
    )

    reflection.enable_server_reflection(SERVICE_NAMES, server)
    server.add_insecure_port(listen_addr)

    logging.info ("Starting server on %s", listen_addr)

    await server.start()
    await server.wait_for_termination()

async def shutdown_server(server) -> None:
    http://logging.info ("Shutting down server...")
    await server.stop(None)
```

The *serve* function starts the gRPC server, listening for requests on port 50051 with reflection enabled.

Clients can use reflection to list available services, obtain their RPC methods and retrieve their message types and field names dynamically. This is particularly useful for tooling and debugging purposes, allowing clients to discover server capabilities without prior knowledge of the service definitions. 

{{< note success >}}

**note**

A descriptor is a data structure that describes the structure of the messages, services, enums and other elements defined in a .proto file. The purpose of the descriptor is primarily metadata: it provides information about the types and services defined in the protocol buffer definition. The *coprocess_object_pb2.py* file that we generated using *protoc* contains a DESCRIPTOR field that we can use to retrieve this metadata. For further details consult the documentation for the Google's protobuf [FileDescriptor](https://googleapis.dev/python/protobuf/latest/google/protobuf/descriptor.html#google.protobuf.descriptor.FileDescriptor.services_by_name) class. 

{{< /note >}}

The *shutdown_server* function stops the gRPC server via the *stop* method of the server instance. 

The key takeaways from the source code listing above are:

- An instance of a gRPC server is created using *grpc.aio.server()*.
- A service implementation should be registered with the gRPC server. We register our *PythonDispatcher* class via *coprocess_object_pb2_grpc.add_DispatcherServicer_to_server(PythonDispatcher(), server)*.
- Reflection can be enabled to allow clients to dynamically discover the services available at a gRPC server. We enabled our *Dispatcher* service to be discovered via *reflection.enable_server_reflection(SERVICE_NAMES, server)*. SERVICE_NAMES is a tuple containing the full names of two gRPC services: the *Dispatcher* service obtained by using the DESCRIPTOR field within the *coprocess_object_pb2* module and the other being the standard reflection service.
- The server instance should be started via invoking and awaiting the *start* and *wait_for_termination* methods of the server instance.
- A port may be configured for the server. In this example we configured an insecure port of 50051 on the server instance via the [add_insecure_port function](https://grpc.github.io/grpc/python/grpc.html#grpc.Server.add_insecure_port). It is also possible to add a secure port via the [add_secure_port](https://grpc.github.io/grpc/python/grpc.html#grpc.Server.add_secure_port) method of the server instance, which accepts the port number in addition to an SSL certificate and key to enable TLS encryption.
- The server instance can be stopped via its stop method.

Finally, we will allow our server to terminate upon receipt of SIGTERM and SIGINT signals. To achieve this, append the source code listed below to the *async_server.py* file.

```python
def handle_sigterm(sig, frame) -> None:
    asyncio.create_task(shutdown_server(server))

async def handle_sigint() -> None:
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, loop.stop)

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    server = None
    signal.signal(signal.SIGTERM, handle_sigterm)
    try:
        asyncio.get_event_loop().run_until_complete(serve())
    except KeyboardInterrupt:
        pass
```


### Start gRPC Server

Issue the following command to start the gRPC server:

```bash
python3 -m async_server
```

A message should be output on the console, displaying the port number and confirming that the gRPC server has started.


### Test gRPC Server

To test our gRPC server is working, issue test requests to the *Dispatch* and *DispatchEvent* methods, using *grpcurl*.


##### Send Dispatch Request

Use the *grpcurl* command to send a test dispatch request to our gRPC server:

```bash
grpcurl -plaintext -d '{
  "hookType": "Pre",
  "hookName": "MyPreCustomPluginForBasicAuth",
  "request": {
    "headers": {
      "User-Agent": "curl/8.1.2",
      "Host": "tyk-gateway.localhost:8080",
      "Authorization": "Basic ZGV2QHR5ay5pbzpwYXN0cnk=",
      "Accept": "*/*"
    },
    "url": "/basic-authentication-valid/get",
    "returnOverrides": {
      "responseCode": -1
    },
    "method": "GET",
    "requestUri": "/basic-authentication-valid/get",
    "scheme": "https"
  },
  "spec": {
    "bundle_hash": "d41d8cd98f00b204e9800998ecf8427e",
    "OrgID": "5e9d9544a1dcd60001d0ed20",
    "APIID": "04e911d3012646d97fcdd6c846fafc4b"
  }
}' localhost:50051 coprocess.Dispatcher/Dispatch
```

Inspect the console output of your gRPC server. It should echo the payload that you sent in the request.


##### Send DispatchEvent Request

Use the grpcurl command to send a test event payload to our gRPC server:

```bash
grpcurl -plaintext -d '{"payload": "{\"event\": \"test\"}"}' localhost:50051 coprocess.Dispatcher/DispatchEvent
```

Inspect the console output of your gRPC server. It should display a log similar to that shown below:

```bash
INFO:root:RECEIVED EVENT: {'event': 'test'}
```

The response received from the server should be an empty event reply, similar to that shown below:

```bash
grpcurl -plaintext -d '{"payload": "{\"event\": \"test\"}"}' localhost:50051 coprocess.Dispatcher/DispatchEvent
{}
```

At this point we have tested, independently of Tyk Gateway, that our gRPC Server can handle an example request payload for gRPC plugin execution. In the next section we will create a test environment for testing that Tyk Gateway integrates with our gRPC server for API requests.


## Configure Test Environment

Now that we have implemented and started a gRPC server, Tyk Gateway needs to be configured to integrate with it. To achieve this we will enable the coprocess feature and configure the URL of the gRPC server.

We will also create an API so that we can test that Tyk Gateway integrates with our gRPC server.


### Configure Tyk Gateway

Within the root of the *tyk.conf* file, add the following configuration, replacing host and port with values appropriate for your environment:

```yaml
"coprocess_options": {
  "enable_coprocess":   true,
  "coprocess_grpc_server": "tcp://host:port"
}
```

Alternatively, the following environment variables can be set in your .env file:

```bash
TYK_GW_COPROCESSOPTIONS_ENABLECOPROCESS=true
TYK_GW_COPROCESSOPTIONS_COPROCESSGRPCSERVER=tcp://host:port
```

Replace host and port with values appropriate for your environment.


### Configure API

Before testing our gRPC server we will create and configure an API with 2 plugins:

- **Pre Request**: Named *MyPreRequestPlugin*.
- **Response**: Named *MyResponsePlugin* and configured so that Tyk Gateway dispatches the session state with the request.

Each plugin will be configured to use the *grpc* plugin driver.

Tyk Gateway will forward details of an incoming request to the gRPC server, for each of the configured API plugins.


##### Tyk Classic API

gRPC plugins can be configured within the *custom_middleware* section of the Tyk Classic ApiDefinition, as shown in the listing below:

```yaml
{
  "created_at": "2024-03-231T12:49:52Z",
  "api_model": {},
  "api_definition": {
    ...
    ...
    "custom_middleware": {
      "pre": [
        {
          "disabled": false,
          "name": "MyPreRequestPlugin",
          "path": "",
          "require_session": false,
          "raw_body_only": false
        }
      ],
      "post": [],
      "post_key_auth": [],
      "auth_check": {
        "disabled": false,
        "name": "",
        "path": "",
        "require_session": false,
        "raw_body_only": false
      },
      "response": [
        {
          "disabled": false,
          "name": "MyResponsePlugin",
          "path": "",
          "require_session": true,
          "raw_body_only": false
        }
      ],
      "driver": "grpc",
      "id_extractor": {
        "disabled": false,
        "extract_from": "",
        "extract_with": "",
        "extractor_config": {}
      }
    }
}
```

In the above listing, the plugin driver parameter has been configured with a value of *grpc*. Two plugins are configured within the *custom_middleware* section: a *Pre Request* plugin and a *Response* plugin.

The *Response* plugin is configured with *require_session* enabled, so that Tyk Gateway will send details for the authenticated key / user with the gRPC request. Note, this is not configured for *Pre Request* plugins that are triggered before authentication in the request lifecycle.


##### Tyk OAS API

To quickly get started, a Tyk OAS API schema can be created by importing the infamous [pet store](https://petstore3.swagger.io/api/v3/openapi.json) OAS schema. Then the [findByStatus](https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available) endpoint can be used for testing.

The resulting Tyk OAS API Definition contains the OAS JSON schema with an *x-tyk-api-gateway* section appended, as listed below. gRPC plugins can be configured within the middleware section of the *x-tyk-api-gateway* that is appended at the end of the OAS schema:

```yaml
"x-tyk-api-gateway": {
  "info": {
    "id": "6e2ae9b858734ea37eb772c666517f55",
    "dbId": "65f457804773a600011af41d",
    "orgId": "5e9d9544a1dcd60001d0ed20",
    "name": "Swagger Petstore - OpenAPI 3.0 Custom Authentication",
    "state": {
      "active": true
    }
  },
  "upstream": {
    "url": "https://petstore3.swagger.io/api/v3/"
  },
  "server": {
    "listenPath": {
      "value": "/custom_auth",
      "strip": true
    },
    "authentication": {
      "enabled": true,
      "custom": {
        "enabled": true,
        "header": {
          "enabled": false,
          "name": "Authorization"
        }
      }
    }
  },
  "middleware": {
    "global": {
      "pluginConfig": {
        "driver": "grpc"
      }
    },
    "cors": {
      "enabled": false,
      "maxAge": 24,
      "allowedHeaders": [
        "Accept",
        "Content-Type",
        "Origin",
        "X-Requested-With",
        "Authorization"
      ],
      "allowedOrigins": [
        "*"
      ],
      "allowedMethods": [
        "GET",
        "HEAD",
        "POST"
      ]
    },
    "prePlugin": {
      "plugins": [
        {
          "enabled": true,
          "functionName": "MyPreRequestPlugin",
          "path": ""
        }
      ]
    },
    "responsePlugin": {
      "plugins": [
        {
          "enabled": true,
          "functionName": "MyResponsePlugin",
          "path": "",
          "requireSession": true
        }
      ]
    }
  }
}
```

In the above listing, the plugin driver parameter has been set to *grpc*. Two plugins are configured within the middleware section: a *Pre Request* plugin and a *Response* plugin.

The *Response* plugin is configured with *requireSession* enabled, so that Tyk Gateway will send details for the authenticated key / user with the gRPC request. Note, this is not configurable for *Pre Request* plugins that are triggered before authentication in the request lifecycle.

Tyk Gateway will forward details of an incoming request to the gRPC server, for each plugin.


## Test API

We have implemented and configured a gRPC server to integrate with Tyk Gateway. Furthermore, we have created an API that has been configured with two gRPC plugins: a *Pre Request* and *Response* plugin.

When we issue a request to our API and observe the console output of our gRPC server we should see a JSON representation of the request headers etc. echoed in the terminal.

Issue a request for your API in the terminal window. For example:

```bash
curl -L http://.localhost:8080/grpc-http-bin
```

Observe the console output of your gRPC server. Tyk Gateway should have dispatched two requests to your gRPC server; a request for the *Pre Request* plugin and a request for the *Response* plugin.  

The gRPC server we implemented echoes a JSON representation of the request payload dispatched by Tyk Gateway.

Note that this is a useful feature for learning how to develop gRPC plugins and understanding the structure of the request payload dispatched by Tyk Gateway to the gRPC server. However, in production environments care should be taken to avoid inadvertently exposing sensitive data such as secrets in the session. 


## Summary

In this guide, we've delved into the integration of a Python gRPC server with Tyk Gateway.

We have explained how to implement a Python gRPC server and equipped developers with the necessary tools, knowledge and capabilities to effectively utilize Tyk Gateway through gRPC services.

The following essential groundwork has been covered:

- Setting up tools, libraries and service definitions for the integration.
- Developing a basic gRPC server with functionality to echo the request payload, received from Tyk Gateway, in JSON format.
- Configuring Tyk Gateway for seamless communication with our gRPC server.
