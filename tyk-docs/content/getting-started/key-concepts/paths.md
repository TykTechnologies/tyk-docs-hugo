---
title: "Paths"
date: 2022-07-07
tags: ["API", "OAS", "OpenAPI Specification", "Servers"]
description: "The low level concepts around OpenAPI Specification support in Tyk"
menu:
  main:
    parent: "OpenAPI Low Level Concepts"
weight: 4
---

{{< toc >}}

### Introduction

The OAS API Definition represents the source of truth for the Tyk APIs, therefore, the configuration of the `paths` section within that will tell Tyk which endpoints are available to configure.

Tyk can use information specified within the paths configuration object to perform validation or mocking for incoming requests. For validation, Tyk looks at the `requestBody` JSON schemas. For mocking it looks at the response examples that have been included. Where Tyk offers middleware capabilities that are not part of the OAS specification, Tyk makes use of the OAS `operationID` to extend the OAS API with additional capabilities.

### Operation Id

OAS gives the ability to define an `operationID` in an OAS API Definition. This allows for different parts of the definition to refer to each other. For instance in a Tyk OAS API Definition, if you turn on validation for a particular endpoint, the `x-tyk-api-gateway` middleware section will use the `operationID` to link the enabled validation middleware to the particular endpoint. This is needed because the endpoint is defined within the main OAS API Definition, whereas the details of how Tyk handles the validation is not, since a developer does not need to see that.

### Configuring API Middleware

Whenever a middleware needs to be enabled for a specific API path, you need to make sure that the `operationId` of that path, is equal with the one under the middleware.operations section within `x-tyk-api-gateway`.

```.json
{
  ...
  "paths": {
    ...
    "/pet": {
      "post": {
        ...
        operationId: "someOperationId"
      }
    }
  },
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      ...
      "operations": {
        ...
        "someOperationId": {
          "allowList": {
            "enabled": true
          }
        }
      }
    }
  }
}
```
### Configuring middleware when importing an OAS API Definition

When importing an OAS API Definition, if the request is accompanied by either `validateRequest` or `allowList` query params, Tyk traverses the entire paths section, and if there is an existing operationId setting already configured for a path, Tyk will copy that value and uses it as a key for the path middleware configuration, under `x-tyk-api-gateway.middleware.operations`.

For example: We want to explicitly allow access for paths when importing the following OAS API Definition:

```.json
{
  ...
  "paths": {
    "/pet": {
      "post": {
        ...
        operationId: "addPet"
      }
    }
  }
}
```
The resulting Tyk OAS API Definition will use the `addPet` `operationId` to match the middleware configuration to the `/pet` `post` path and method. 

Tyk OAS API Definition

```.json
{
  ...
  "paths": {
    "/pet": {
      "post": {
        ...
        operationId: "addPet"
      }
    }
  },
  "x-tyk-api-gateway": {
    "middleware": {
      "operations": {
        "addPet": {
          "allowList": {
            "enabled": true
          }
        }
      }
    }
  }
}
```
If there is no existing `operationId` setting for a path, then Tyk will concatenate the path value with the method value, to generate an `operationId` unique value. Tyk uses that in the `x-tyk-api-gateway.middleware.operations` to link the middleware configuration back to the paths section

For example: When you want to explicitly allow access for the paths when importing the following OAS API Definition:

```.json
{
  ...
  "paths": {
    "/pet": {
      "post": {
        ...
      }
    }
  }
}
```
The resulting Tyk OAS API Definition will generate the petpost `operationId`, and use this value in both paths `operationId` as well as in `middleware.operations`.

Tyk OAS API Definition:

```.json
{
  ...
  "paths": {
    "/pet": {
      "post": {
        ...
        operationId: "petpost"
      }
    }
  },
  "x-tyk-api-gateway": {
    "middleware": {
      "operations": {
        "petpost": {
          "allowList": {
            "enabled": true
          }
        }
      }
    }
  }
}
```
{{< note success >}}
**Note**  

The same logic for configuring middleware applies as well when updating a Tyk OAS API Definition by providing an updated OAS API Definition. 
{{< /note >}}