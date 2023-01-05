---
date: 2017-03-27T12:28:24+01:00
title: Portal Documentation
menu:
  main:
    parent: "Tyk Portal API"
weight: 6
---
This section covers both [Documentation](#documentation) and [Catalogue](#catalogue) endpoints.

## Documentation

### Create Documentation

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/documentation` |
| Method       | POST                     |
| Type         | None                     |
| Body         | Documentation Object     |
| Param        | None                     |

The Swagger or Blueprint should be base64 encoded and included in the `documentation` field of the Request Body, as per the example below.

{{< note success >}}
**Note**  

Support for API Blueprint is being deprecated. See [Importing APIs]({{< ref "getting-started/import-apis#api-blueprint-is-being-deprecated" >}}) for more details.
{{< /note >}}

#### Sample Request

```{.copyWrapper}
POST /api/portal/documentation HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "api_id": "",
  "doc_type": "swagger",
  "documentation": "<base64-encoded-swagger>"
}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "5ea6b2bd971eed0001009ddc",
  "Meta": null
}
```

### Delete Documentation

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/documentation/{id}` |
| Method       | DELETE                   |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
DELETE/api/portal/documentation HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "Data deleted",
  "Meta": null
}
```

## Catalogue

### List Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | GET                    |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/catalogue HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id":"5cc03284d07e7f00019404b4",
  "org_id":"5cc03283d07e7f00019404b3",
  "apis":[
    {
      "name":"Portal OAuth API",
      "short_description":"",
      "long_description":"",
      "show":true,
      "api_id":"",
      "policy_id":"5ce4086ce845260001c1e1f5",
      "documentation":"",
      "version":"v2",
      "is_keyless":false,
      "config":{
        "id":"",
        "org_id":"",
        "signup_fields":[

        ],
        "key_request_fields":[

        ],
        "require_key_approval":false,
        "redirect_on_key_request":false,
        "redirect_to":"",
        "enable_multi_selection":false,
        "disable_login":false,
        "disable_signup":false,
        "disable_auto_login":false,
        "catalogue_login_only":false,
        "oauth_usage_limit":-1,
        "email":"",
        "mail_options":{
          "mail_from_name":"",
          "mail_from_email":"",
          "email_copy":{
            "welcome_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "key_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "reset_password_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            }
          }
        },
        "override":false,
        "HashKeys":false
      },
      "fields":{

      },
      "auth_type":"oauth"
    },
    {
      "name":"Test API",
      "short_description":"",
      "long_description":"",
      "show":true,
      "api_id":"",
      "policy_id":"5ce51721e845260001d0a550",
      "documentation":"5cf0d65d0313b300010b89ab",
      "version":"v2",
      "is_keyless":false,
      "config":{
        "id":"",
        "org_id":"",
        "signup_fields":[

        ],
        "key_request_fields":[

        ],
        "require_key_approval":false,
        "redirect_on_key_request":false,
        "redirect_to":"",
        "enable_multi_selection":false,
        "disable_login":false,
        "disable_signup":false,
        "disable_auto_login":false,
        "catalogue_login_only":false,
        "oauth_usage_limit":-1,
        "email":"",
        "mail_options":{
          "mail_from_name":"",
          "mail_from_email":"",
          "email_copy":{
            "welcome_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "key_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            },
            "reset_password_email":{
              "enabled":false,
              "subject":"",
              "body":"",
              "sign_off":"",
              "hide_token_data":false
            }
          }
        },
        "override":false,
        "HashKeys":false
      },
      "fields":{

      },
      "auth_type":"authToken"
    }
  ],
  "email":""
}
```

### Create Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | POST                   |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/catalogue HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Update Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | PUT                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/catalogue HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```
