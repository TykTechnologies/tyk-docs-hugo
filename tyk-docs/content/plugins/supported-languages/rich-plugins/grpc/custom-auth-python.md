---
date: 2024-05-12T17:00:00Z
title: "Create Custom Authentication Plugin With Python"
---

In the realm of API security, HMAC-signed authentication serves as a foundational concept. In this developer-focused blog post, we'll use HMAC-signed authentication as the basis for learning how to write gRPC custom authentication plugins with Tyk Gateway. Why learn how to write Custom Authentication Plugins?

- **Foundational knowledge**: Writing custom authentication plugins provides foundational knowledge of Tyk's extensibility and customization capabilities.
- **Practical experience**: Gain hands-on experience in implementing custom authentication logic tailored to specific use cases, starting with HMAC-signed authentication.
- **Enhanced control**: Exercise greater control over authentication flows and response handling, empowering developers to implement advanced authentication mechanisms beyond built-in features.

While Tyk Gateway offers built-in support for HMAC-signed authentication, this tutorial serves as a practical guide for developers looking to extend Tyk's capabilities through custom authentication plugins. It extends the gRPC server that we developed in our [getting started guide]({{< ref "getting-started-python" >}}).

We will develop a basic gRPC server that implements the Tyk Dispatcher service with a custom authentication plugin to handle authentication keys, signed using the HMAC SHA512 algorithm. Subsequently, you will be able to make a request to your API with a HMAC signed authentication key in the *Authorization* header. Tyk Gateway will intercept the request and forward it to your Python gRPC server for HMAC signature and token verification.

Our plugin will only verify the key against an expected value. In a production environment it will be necessary to verify the key against Redis storage.

Before we continue ensure that you have:

- Read and completed our getting started guide that explains how to implement a basic Python gRPC server to echo the request payload received from Tyk Gateway. This tutorial extends the source code of the tyk_async_server.py file to implement a custom authentication plugin for a HMAC signed authentication key.
- Read our HMAC signatures documentation for an explanation of HMAC signed authentication  with Tyk Gateway. A brief summary is given in the HMAC Signed Authentication section below. 


## HMAC Signed Authentication

Before diving in further, we will give a brief overview of HMAC signed authentication using our custom authentication plugin.

- **Client request**: The journey begins with a client requesting access to a protected resource on the Tyk API.
- **HMAC signing**: Before dispatching the request, the client computes an HMAC signature using a secret key and request date, ensuring the payload's integrity.
- **Authorization header**: The HMAC signature, along with essential metadata such as the API key and HMAC algorithm, is embedded within the Authorization header.
- **Tyk Gateway verification**: Upon receipt, Tyk Gateway forwards the request to our gRPC server to execute the custom authentication plugin. This will validate the HMAC signature, ensuring the request's authenticity before proceeding with further processing.

Requests should be made to an API that uses our custom authentication plugin as follows. A HMAC signed key should be included in the *Authorization* header and a date/time string in the *Date* header. An example request is shown in the curl command below:

```bash
curl -v -H 'Date: Fri, 03 May 2024 12:00:42 GMT' \
-H 'Authorization: Signature keyId="eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==", \
algorithm="hmac-sha512",signature="9kwBK%2FyrjbSHJDI7INAhBmhHLTHRDkIe2uRWHEP8bgQFQvfXRksm6t2MHeLUyk9oosWDZyC17AbGeP8EFqrp%2BA%3D%3D"' \
http://localhost:8080/grpc-custom-auth/get
```

From the above example, it should be noted that:

- The *Date* header contains a date string formatted as follows: *Fri, 03 May 2024 11:06:00 GMT*.
- The *Authorization* header is formatted as *Signature keyId=”<keyId>”, algorithm=”<hmac-algorithm>”, signature=”<hmac signature>”* where:

    - **keyId** is a Tyk authentication key.
    - **algorithm** is the HMAC algorithm used to sign the signature, *hmac-sha512* or *hmac-sha256*. 
    - **signature** is the HAMC signature calculated with the date string from the *Date* header, signed with a base64 encoded secret value, using the specified HMAC algorithm. The HMAC signature is then encoded as base64.

## Prerequisites

Firstly, we need to create the following:

- An API configured to use a custom authentication plugin.
- A HMAC enabled key with a configured secret for signing.

This will enable us to issue a request to test that Tyk Gateway integrates with our custom authentication plugin on the gRPC server.

#### Create API

We will create an API served by Tyk Gateway, that will forward requests upstream to https://httpbin.org/. 

The API will have the following parameters configured:

- **Listen path**: Tyk Gateway will listen to API requests on */grpc-custom-auth/* and will strip the listen path for upstream requests.
- **Target URL**: The target URL will be configured to send requests to *http://httpbin/*.
- **Authentication Mode**: The authentication mode will be configured for custom authentication. This is used to trigger CoProcess (gRPC), Python or JSVM plugins to handle custom authentication.

You can use the following Tyk Classic API definition to get you started, replacing the *org_id* with the ID of your organisation.

```json
{
    "api_definition": {
        "id": "662facb2f03e750001a03500",
        "api_id": "6c56dd4d3ad942a94474df6097df67ed",
        "org_id": "5e9d9544a1dcd60001d0ed20",
        "name": "Python gRPC Custom Auth",
        "enable_coprocess_auth": true,
        "auth": {
            "auth_header_name": "Authorization"
        },
        "proxy": {
            "preserve_host_header": false,
            "listen_path": "/grpc-custom-auth/",
            "disable_strip_slash": true,
            "strip_listen_path": true,
            "target_url": "http://httpbin/"
        },
        "version_data": {
            "not_versioned": false,
            "versions": {
                "Default": {
                    "name": "Default",
                    "expires": "",
                    "use_extended_paths": true,
                    "extended_paths": {
                        "ignored": [],
                        "white_list": [],
                        "black_list": []
                    }
                }
            },
            "default_version": "Default"
        },
        "active": true
    }
}
```

The Tyk API definition above can be imported via Tyk Dashboard. Alternatively, if using Tyk Gateway OSS, a POST request can be made to the *api/apis* endpoint of Tyk Gateway. Consult the [Tyk Gateway Open API Specification documentation]({{< ref "tyk-gateway-api" >}}) for usage.

An illustrative example using *curl* is given below. Please note that you will need to:

- Update the location to use the protocol scheme, host and port suitable for your environment.
- Replace the value in the *x-tyk-authorization* header with the secret value in your *tyk.conf* file.
- Replace the *org_id* with the ID of your organisation.

```bash
curl -v \
	--header 'Content-Type: application/json' \
  	--header 'x-tyk-authorization: your Gateway admin secret' \
	--location http://localhost:8080/tyk/apis/ \
	--data '{\
		"api_definition": {\
			"id": "662facb2f03e750001a03502",\
			"api_id": "6c56dd4d3ad942a94474df6097df67ef",\
			"org_id": "5e9d9544a1dcd60001d0ed20",\
			"name": "Python gRPC Custom Auth",\
			"enable_coprocess_auth": true,\
			"auth": {\
				"auth_header_name": "Authorization"\
			},\
			"proxy": {\
				"preserve_host_header": false,\
				"listen_path": "/grpc-custom-auth-error/",\
				"disable_strip_slash": true,\
				"strip_listen_path": true,\
				"target_url": "http://httpbin/"\
			},\
			"version_data": {\
				"not_versioned": false,\
				"versions": {\
					"Default": {\
						"name": "Default",\
						"expires": "",\
						"use_extended_paths": true,\
						"extended_paths": {\
							"ignored": [],\
							"white_list": [],\
							"black_list": []\
						}\
					}\
				},\
				"default_version": "Default"\
			},\
			"active": true\
		}\
	}'
```

A response similar to that given below will be returned by Tyk Gateway:

```bash
{
    "key": "f97b748fde734b099001ca15f0346dfe",
    "status": "ok",
    "action": "added"
}
```

#### Create HMAC Key

We will create an key configured to use HMAC signing, with a secret of *secret*. The key will configured to have access to our test API.

You can use the following configuration below, replacing the value of the *org_id* with the ID of your organisation.

```bash
{
    "quota_max": 1000,
    "quota_renews": 1596929526,
    "quota_remaining": 1000,
    "quota_reset": 1596843126,
    "quota_used": 0,
    "org_id": "5e9d9544a1dcd60001d0ed20",
    "access_rights": {
        "662facb2f03e750001a03500": {
            "api_id": "662facb2f03e750001a03500",
            "api_name": "Python gRPC Custom Auth",
            "versions": ["Default"],
            "allowed_urls": [],
            "limit": null,
            "quota_max": 1000,
            "quota_renews": 1596929526,
            "quota_remaining": 1000,
            "quota_reset": 1596843126,
            "quota_used": 0,
            "per": 1,
            "expires": -1
        }
    },
    "enable_detailed_recording": true,
    "hmac_enabled": true,
    "hmac_string": "secret",
    "meta_data": {}
}
```

You can use Tyk Gateway’s API to create the key by issuing a POST request to the *tyk/keys* endpoint. Consult the [Tyk Gateway Open API Specification documentation]({{< ref "tyk-gateway-api" >}}) for usage.

An illustrative example using *curl* is given below. Please note that you will need to:

- Update the location to use the protocol scheme, host and port suitable for your environment.
- Replace the value in the *x-tyk-authorization* header with the secret value in your *tyk.conf* file.

Replace the *org_id* with the ID of your organisation.

```bash
curl --location 'http://localhost:8080/tyk/keys/grpc_hmac_key' \
--header 'x-tyk-authorization: your Gateay admin secret' \
--header 'Content-Type: application/json' \
--data '{\
    "alias": "grpc_hmac_key",\
    "quota_max": 1000,\
    "quota_renews": 1596929526,\
    "quota_remaining": 1000,\
    "quota_reset": 1596843126,\
    "quota_used": 0,\
    "org_id": "5e9d9544a1dcd60001d0ed20",\
    "access_rights": {\
        "662facb2f03e750001a03500": {\
            "api_id": "662facb2f03e750001a03500",\
            "api_name": "python-grpc-custom-auth",\
            "versions": ["Default"],\
            "allowed_urls": [],\
            "limit": null,\
            "quota_max": 1000,\
            "quota_renews": 1596929526,\
            "quota_remaining": 1000,\
            "quota_reset": 1596843126,\
            "quota_used": 0,\
            "per": 1,\
            "expires": -1\
        }\
    },\
    "enable_detailed_recording": true,\
    "hmac_enabled": true,\
    "hmac_string": "secret",\
    "meta_data": {}\
}\
'
```

A response similar to that given below should be returned by Tyk Gateway:

```json
{
    "key": "eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==",
    "status": "ok",
    "action": "added",
    "key_hash": "a72fcdc09caa86b5"
}
```

{{< note success>}}

**Note**

Make a note of the key ID given in the response, since we will need this to test our API.
{{< /note >}}

## Implement Plugin

Our custom authentication plugin will perform the following tasks:

- Extract the *Authorization* and *Date* headers from the request object.
- Parse the *Authorization* header to extract the *keyId*, *algorithm* and *signature* attributes.
- Compute the HMAC signature using the specific algorithm and date included in the header.
- Verify that the computed HMAC signature matches the signature included in the *Authorization* header. A 401 error response will be returned if verification fails. Our plugin will only verify the key against an expected value. In a production environment it will be necessary to verify the key against Redis storage.
- Verify that the *keyId* matches an expected value (VALID_TOKEN). A 401 error response will be returned to Tyk Gateway if verification fails.
- If verification of the signature and key passes then update the session with HMAC enabled and set the HMAC secret. Furthermore, add the key to the *Object* metadata.

Return the request *Object* containing the updated session back to Tyk Gateway. When developing custom authentication plugins it is the responsibility of the developer to update the session state with the token, in addition to setting the appropriate response status code and error message when authentication fails.

### Import Python Modules

Ensure that the following Python modules are imported at the top of your *tyk_async_server.py* file:

```python
import asyncio
import base64
import hashlib
import hmac
import json
import re
import signal
import logging
import urllib.parse

import grpc
from google.protobuf.json_format import MessageToJson
from grpc_reflection.v1alpha import reflection
import coprocess_object_pb2_grpc
import coprocess_object_pb2
from coprocess_common_pb2 import HookType
from coprocess_session_state_pb2 import SessionState
```

### Add Constants

Add the following constants to the top of the *tyk_async_server.py* file, after the import statements:

```bash
SECRET = "c2VjcmV0"
VALID_TOKEN = "eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ=="
```

- **SECRET** is a base64 representation of the secret used for HMAC signing.
- **VALID_TOKEN** is the key ID that we will authenticate against.

The values listed above are designed to align with the examples provided in the *Prerequisites* section, particularly those related to HMAC key generation. If you've made adjustments to the HMAC secret or you've modified the key alias referred to in the endpoint path (for instance, *grpc_hmac_key*), you'll need to update these constants accordingly.

### Extract headers

Add the following function to your *tyk_async_server.py* file to extract a dictionary of the key value pairs from the *Authorization* header. We will use a regular expression to extract the key value pairs.

```python
def parse_auth_header(auth_header: str) -> dict[str,str]:
    pattern = r'(\w+)\s*=\s*"([^"]+)"'

    matches = re.findall(pattern, auth_header)

    parsed_data = dict(matches)

    return parsed_data
```

### Compute HMAC Signature

Add the following function to your *tyk_async_server.py* to compute the HMAC signature.

```python
def generate_hmac_signature(algorithm: str, date_string: str, secret_key: str) -> str:

    if algorithm == "hmac-sha256":
        hash_algorithm = hashlib.sha256
    elif algorithm == "hmac-sha512":
        hash_algorithm = hashlib.sha512
    else:
        raise ValueError("Unsupported hash algorithm")

    base_string = f"date: {date_string}"

    logging.info(f"generating signature from: {base_string}")
    hmac_signature = hmac.new(secret_key.encode(), base_string.encode(), hash_algorithm)

    return base64.b64encode(hmac_signature.digest()).decode()
```

Our function accepts three parameters:

- **algorithm** is the HMAC algorithm to use for signing. We will use HMAC SHA256 or HMAC SHA512 in our custom authentication plugin
- **date_string** is the date extracted from the date header in the request sent by Tyk Gateway.
- **secret_key** is the value of the secret used for signing.

The function computes and returns the HMAC signature for a string formatted as *date: date_string*, where *date_string* corresponds to the value of the *date_string* parameter. The signature is computed using the secret value given in the *secret_key* parameter and the HMAC algorithm given in the *algorithm* parameter. A *ValueError* is raised if the hash algorithm is unrecognized. 

We use the following Python modules in our implementation:

- hmac Python module to compute the HMAC signature.
- base64 Python module to encode the result.

### Verify HMAC Signature

Add the following function to your *tyk_async_server.py* file to verify the HMAC signature provided by the client:

```python
def verify_hmac_signature(algorithm: str, signature: str, source_string) -> bool:

    expected_signature = generate_hmac_signature(algorithm, source_string, SECRET)
    received_signature = urllib.parse.unquote(signature)

    if expected_signature != received_signature:
        error = f"Signatures did not match\nreceived: {received_signature}\nexpected: {expected_signature}"
        logging.error(error)
    else:
        logging.info("Signatures matched!")

    return expected_signature == received_signature
```

Our function accepts three parameters:

- **algorithm** is the HMAC algorithm to use for signing. We will use hmac-sha256 or hmac-sha512 in our custom authentication plugin.
- **signature** is the signature string extracted from the *Authorization* header.
- **source_string** is the date extracted from the date header in the request sent by Tyk Gateway.
- **secret_key** is the value of the secret used for signing.

The function calls *generate_hmac_signature* to verify the signatures match. It returns true if the computed and client HMAC signatures match, otherwise false is returned.

### Set Error Response

Add the following helper function to *tyk_async_server.py* to allow us to set the response status and error message if authentication fails.

```python
def set_response_error(object: coprocess_object_pb2.Object, code: int, message: str) -> None:
    object.request.return_overrides.response_code = code
    object.request.return_overrides.response_error = message
```

Our function accepts the following three parameters:

- **object** is an instance of the [Object]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures#object" >}}) message representing the payload sent by Tyk Gateway to the *Dispatcher* service in our gRPC server. For further details of the payload structure dispatched by Tyk Gateway to a gRPC server please consult our gRPC documentation.
- **code** is the HTTP status code to return in the response.
- **message** is the response message.

The function modifies the *return_overrides* attribute of the request, updating the response status code and error message. The *return_overrides* attribute is an instance of a [ReturnOverrides]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures#returnoverrides" >}}) message that can be used to override the response of a given HTTP request. When this attribute is modified the request is terminated and is not sent upstream.

### Authenticate

Add the following to your *tyk_async_server.py* file to implement the main custom authentication function. This parses the headers to extract the signature and date from the request, in addition to verifying the HMAC signature and key:

```python
def authenticate(object: coprocess_object_pb2.Object) -> coprocess_object_pb2.Object:
    keys_to_check = ["keyId", "algorithm", "signature"]

    auth_header = object.request.headers.get("Authorization")
    date_header = object.request.headers.get("Date")

    parse_dict = parse_auth_header(auth_header)

    if not all(key in parse_dict for key in keys_to_check) or not all([auth_header, date_header]):
        set_response_error(object, 400, "Custom middleware: Bad request")
        return object

    try:
        signature_valid = verify_hmac_signature(
            parse_dict["algorithm"],
            parse_dict["signature"],
            date_header
        )
    except ValueError:
        set_response_error(object, 400, "Bad HMAC request, unsupported algorithm")
        return object

    if not signature_valid or parse_dict["keyId"] != VALID_TOKEN:
        set_response_error(object, 401, "Custom middleware: Not authorized")
    else:
        new_session = SessionState()
        new_session.hmac_enabled = True
        new_session.hmac_secret = SECRET

        object.metadata["token"] = VALID_TOKEN
        object.session.CopyFrom(new_session)

    return object
```

The *Object* payload received from the Gateway is updated and returned as a response from the *Dispatcher* service:

- If authentication fails then we set the error message and status code for the response accordingly, using our *set_response_error* function.
- If authentication passes then we update the session attribute in the *Object* payload to indicate that HMAC verification was performed and provide the secret used for signing. We also add the verified key to the meta data of the request payload.

Specifically, our function performs the following tasks:

- Extracts the *Date* and *Authorization* headers from the request and verifies that the *Authorization* header is structured correctly, using our *parse_auth_header* function. We store the extracted *Authorization* header fields in the *parse_dict* dictionary. If the structure is invalid then a 400 bad request response is returned to Tyk Gateway, using our *set_response_error* function.
- We use our *verify_hmac_signature* function to compute and verify the HMAC signature. A 400 bad request error is returned to the Gateway if HMAC signature verification fails, due to an unrecognized HMAC algorithm.
- A 401 unauthorized error response is returned to the Gateway under the following conditions:

    - The client HMAC signature and the computed HMAC signature do not match.
    - The extracted key ID does not match the expected key value in VALID_TOKEN.

- If HMAC signature verification passed and the key included in the *Authorization* header is valid then we update the *SessionState* instance to indicate that HMAC signature verification is enabled, i.e. *hmac_enabled* is set to true.  We also specify the HMAC secret used for signing in the *hmac_secret* field and include the valid token in the metadata dictionary.

### Integrate Plugin

Update the *Dispatch* method of the *PythonDispatcher* class in your *tyk_async_server.py* file so that our authenticate function is called when the a request is made by Tyk Gateway to execute a custom authentication (*HookType.CustomKeyCheck*) plugin.

```python
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
            
            authenticate(object)

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

## Test Plugin

Create the following bash script, *hmac.sh*, to issue a test request to an API served by Tyk Gateway. The script computes a HMAC signature and constructs the *Authorization* and *Date* headers for a specified API. The *Authorization* header contains the HMAC signature and key for authentication.

Replace the following constant values with values suitable for your environment:

- **KEY** represents the key ID for the HMAC signed key that you created at the beginning of this guide.
- **HMAC_SECRET** represents the base64 encoded value of the secret for your HMAC key that you created at the beginning of this guide.
- **BASE_URL** represents the base URL, containing the protocol scheme, host and port number that Tyk Gateway listens to for API requests.
- **ENDPOINT** represents the path of your API that uses HMAC signed authentication.

```bash
#!/bin/bash

BASE_URL=http://localhost:8080
ENDPOINT=/grpc-custom-auth/get
HMAC_ALGORITHM=hmac-sha512
HMAC_SECRET=c2VjcmV0
KEY=eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==
REQUEST_URL=${BASE_URL}${ENDPOINT}


function urlencode() {
  echo -n "$1" | perl -MURI::Escape -ne 'print uri_escape($_)' | sed "s/%20/+/g"
}

# Set date in expected format
date="$(LC_ALL=C date -u +"%a, %d %b %Y %H:%M:%S GMT")"

# Generate the signature using hmac algorithm with hmac secret from created Tyk key and
# then base64 encoded
signature=$(echo -n "date: ${date}" | openssl sha512 -binary -hmac "${HMAC_SECRET}" | base64)

# Ensure the signature is base64 encoded
url_encoded_signature=$(echo -n "${signature}" | perl -MURI::Escape -ne 'print uri_escape($_)' | sed "s/%20/+/g")

# Output the date, encoded date, signature and the url encoded signature
echo "request: ${REQUEST_URL}"
echo "date: $date"
echo "signature: $signature"
echo "url_encoded_signature: $url_encoded_signature"

# Make the curl request using headers
printf "\n\n----\n\nMaking request to  http://localhost:8080/grpc-custom-auth/get\n\n"
set -x
curl -v -H "Date: ${date}" \
    -H "Authorization: Signature keyId=\"${KEY}\",algorithm=\"${HMAC_ALGORITHM}\",signature=\"${url_encoded_signature}\"" \
    ${REQUEST_URL}
```

After creating and saving the script, ensure that it is executable by issuing the following command:

```bash
chmod +x hmac.sh
```

Issue a test request by running the script:

```bash
./hmac.sh
```

Observe the output of your gRPC server. You should see the request payload appear in the console output for the server and your custom authentication plugin should have been triggered. An illustrative example is given below:

```bash
2024-05-13 12:53:49 INFO:root:STATE for CustomHMACCheck
2024-05-13 12:53:49 {
2024-05-13 12:53:49   "hookType": "CustomKeyCheck",
2024-05-13 12:53:49   "hookName": "CustomHMACCheck",
2024-05-13 12:53:49   "request": {
2024-05-13 12:53:49     "headers": {
2024-05-13 12:53:49       "User-Agent": "curl/8.1.2",
2024-05-13 12:53:49       "Date": "Mon, 13 May 2024 11:53:49 GMT",
2024-05-13 12:53:49       "Host": "localhost:8080",
2024-05-13 12:53:49       "Authorization": "Signature keyId=\"eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==\",algorithm=\"hmac-sha512\",signature=\"e9OiifnTDgi3PW2EGJWfeQXCuhuhi6bGLiGhUTFpjEfgdKmX%2FQOFrePAQ%2FAoSFGU%2FzpP%2FCabmQi4zQDPdRh%2FZg%3D%3D\"",
2024-05-13 12:53:49       "Accept": "*/*"
2024-05-13 12:53:49     },
2024-05-13 12:53:49     "url": "/grpc-custom-auth/get",
2024-05-13 12:53:49     "returnOverrides": {
2024-05-13 12:53:49       "responseCode": -1
2024-05-13 12:53:49     },
2024-05-13 12:53:49     "method": "GET",
2024-05-13 12:53:49     "requestUri": "/grpc-custom-auth/get",
2024-05-13 12:53:49     "scheme": "http"
2024-05-13 12:53:49   },
2024-05-13 12:53:49   "spec": {
2024-05-13 12:53:49     "bundle_hash": "d41d8cd98f00b204e9800998ecf8427e",
2024-05-13 12:53:49     "OrgID": "5e9d9544a1dcd60001d0ed20",
2024-05-13 12:53:49     "APIID": "6c56dd4d3ad942a94474df6097df67ed"
2024-05-13 12:53:49   }
2024-05-13 12:53:49 }
2024-05-13 12:53:49 
2024-05-13 12:53:49 INFO:root:CustomAuth plugin: CustomHMACCheck
2024-05-13 12:53:49 INFO:root:Activated CustomAuth plugin from API: 6c56dd4d3ad942a94474df6097df67ed
2024-05-13 12:53:49 INFO:root:generating signature from: date: Mon, 13 May 2024 11:53:49 GMT
2024-05-13 12:53:49 INFO:root:Signatures matched!
2024-05-13 12:53:49 INFO:root:--------
```

Try changing the SECRET and/or KEY constants with invalid values and observe the output of your gRPC server. You should notice that authentication fails. An illustrative example is given below:

```
2024-05-13 12:56:37 INFO:root:STATE for CustomHMACCheck
2024-05-13 12:56:37 {
2024-05-13 12:56:37   "hookType": "CustomKeyCheck",
2024-05-13 12:56:37   "hookName": "CustomHMACCheck",
2024-05-13 12:56:37   "request": {
2024-05-13 12:56:37     "headers": {
2024-05-13 12:56:37       "User-Agent": "curl/8.1.2",
2024-05-13 12:56:37       "Date": "Mon, 13 May 2024 11:56:37 GMT",
2024-05-13 12:56:37       "Host": "localhost:8080",
2024-05-13 12:56:37       "Authorization": "Signature keyId=\"eyJvcmciOiI1ZTlkOTU0NGExZGNkNjAwMDFkMGVkMjAiLCJpZCI6ImdycGNfaG1hY19rZXkiLCJoIjoibXVybXVyNjQifQ==\",algorithm=\"hmac-sha512\",signature=\"KXhkWOS01nbxuFfK7wEBggkydXlKJswxbukiplboJ2n%2BU6JiYOil%2Bx4OE4edWipg4EcG9T49nvY%2Fc9G0XFJcfg%3D%3D\"",
2024-05-13 12:56:37       "Accept": "*/*"
2024-05-13 12:56:37     },
2024-05-13 12:56:37     "url": "/grpc-custom-auth/get",
2024-05-13 12:56:37     "returnOverrides": {
2024-05-13 12:56:37       "responseCode": -1
2024-05-13 12:56:37     },
2024-05-13 12:56:37     "method": "GET",
2024-05-13 12:56:37     "requestUri": "/grpc-custom-auth/get",
2024-05-13 12:56:37     "scheme": "http"
2024-05-13 12:56:37   },
2024-05-13 12:56:37   "spec": {
2024-05-13 12:56:37     "bundle_hash": "d41d8cd98f00b204e9800998ecf8427e",
2024-05-13 12:56:37     "OrgID": "5e9d9544a1dcd60001d0ed20",
2024-05-13 12:56:37     "APIID": "6c56dd4d3ad942a94474df6097df67ed"
2024-05-13 12:56:37   }
2024-05-13 12:56:37 }
2024-05-13 12:56:37 
2024-05-13 12:56:37 INFO:root:CustomAuth plugin: CustomHMACCheck
2024-05-13 12:56:37 INFO:root:Activated CustomAuth plugin from API: 6c56dd4d3ad942a94474df6097df67ed
2024-05-13 12:56:37 INFO:root:generating signature from: date: Mon, 13 May 2024 11:56:37 GMT
2024-05-13 12:56:37 ERROR:root:Signatures did not match
2024-05-13 12:56:37 received: KXhkWOS01nbxuFfK7wEBggkydXlKJswxbukiplboJ2n+U6JiYOil+x4OE4edWipg4EcG9T49nvY/c9G0XFJcfg==
2024-05-13 12:56:37 expected: zT17C2tgDCYBJCgFFN/mknf6XydPaV98a5gMPNUHYxZyYwYedIPIhyDRQsMF9GTVFe8khCB1FhfyhpmzrUR2Lw==
```

## Summary

In this guide, we've explained how to write a Python gRPC custom authentication plugin for Tyk Gateway, using HMAC-signed authentication as a practical example. Through clear instructions and code examples, we've provided developers with insights into the process of creating custom authentication logic tailored to their specific API authentication needs.

While Tyk Gateway already supports HMAC-signed authentication out of the box, this guide goes beyond basic implementation by demonstrating how to extend its capabilities through custom plugins. By focusing on HMAC-signed authentication, developers have gained valuable experience in crafting custom authentication mechanisms that can be adapted and expanded to meet diverse authentication requirements.

It's important to note that the authentication mechanism implemented in this guide solely verifies the HMAC signature's validity and does not include access control checks against specific API resources. Developers should enhance this implementation by integrating access control logic to ensure authenticated requests have appropriate access permissions.

By mastering the techniques outlined in this guide, developers are better equipped to address complex authentication challenges and build robust API security architectures using Tyk Gateway's extensibility features. This guide serves as a foundation for further exploration and experimentation with custom authentication plugins, empowering developers to innovate and customize API authentication solutions according to their unique requirements.

---

</br>