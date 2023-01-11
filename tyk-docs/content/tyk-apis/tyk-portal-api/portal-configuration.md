---
date: 2017-03-27T12:28:24+01:00
title: Portal Configuration
menu:
  main:
    parent: "Tyk Portal API"
weight: 5
---

This section will cover the following endpoints:
* [Configuration](#configuration)
* [Menus](#menus)
* [Pages](#pages)


## Configuration

### List Portal Configuration

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/configuration` |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/configuration HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id":"5cc03284d07e7f00019404b6",
  "org_id":"5cc03283d07e7f00019404b3",
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
  "oauth_usage_limit":0,
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
}
```

### Create Portal Configuration

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/configuration` |
| Method       | POST                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/configuration HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Update Portal Configuration

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/configuration` |
| Method       | PUT                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT/api/portal/configuration HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

## Menus

### List Portal Menus

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/menus`      |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/menus HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id": "5d12262e0313b300010eb5bb",
  "menus": {},
  "is_active": true,
  "org_id": "5cc03283d07e7f00019404b3"
}
```

### Create Portal Menus

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/menus`      |
| Method       | POST                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/menus HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Update Portal Menus

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/menus`      |
| Method       | PUT                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/menus HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```



## Pages

### List Portal Pages

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/pages`      |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/pages HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "Data":[
    {
      "id":"5cc03284d07e7f00019404b5",
      "title":"Tyk Developer Portal",
      "slug":"home",
      "template_name":"",
      "fields":{
        "JumboCTALink":"#cta",
        "JumboCTALinkTitle":"Your awesome APIs, hosted with Tyk!",
        "JumboCTATitle":"Tyk Developer Portal",
        "PanelOneContent":"Panel 1 content.",
        "PanelOneLink":"#panel1",
        "PanelOneLinkTitle":"Panel 1 Button",
        "PanelOneTitle":"Panel 1 Title",
        "PanelThereeContent":"",
        "PanelThreeContent":"Panel 3 content.",
        "PanelThreeLink":"#panel3",
        "PanelThreeLinkTitle":"Panel 3 Button",
        "PanelThreeTitle":"Panel 3 Title",
        "PanelTwoContent":"Panel 2 content.",
        "PanelTwoLink":"#panel2",
        "PanelTwoLinkTitle":"Panel 2 Button",
        "PanelTwoTitle":"Panel 2 Title",
        "SubHeading":"Sub Header"
      },
      "org_id":"5cc03283d07e7f00019404b3",
      "is_homepage":true,
      "page_settings":{

      }
    }
  ],
  "Pages":1
}
```

### Create Portal Pages

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/pages`      |
| Method       | POST                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/pages HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Get a Portal Page

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/pages/{id}`      |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/pages/{id} HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id":"5cc03284d07e7f00019404b5",
  "title":"Tyk Developer Portal",
  "slug":"home",
  "template_name":"",
  "fields":{
    "JumboCTALink":"#cta",
    "JumboCTALinkTitle":"Your awesome APIs, hosted with Tyk!",
    "JumboCTATitle":"Tyk Developer Portal",
    "PanelOneContent":"Panel 1 content.",
    "PanelOneLink":"#panel1",
    "PanelOneLinkTitle":"Panel 1 Button",
    "PanelOneTitle":"Panel 1 Title",
    "PanelThereeContent":"",
    "PanelThreeContent":"Panel 3 content.",
    "PanelThreeLink":"#panel3",
    "PanelThreeLinkTitle":"Panel 3 Button",
    "PanelThreeTitle":"Panel 3 Title",
    "PanelTwoContent":"Panel 2 content.",
    "PanelTwoLink":"#panel2",
    "PanelTwoLinkTitle":"Panel 2 Button",
    "PanelTwoTitle":"Panel 2 Title",
    "SubHeading":"Sub Header"
  },
  "org_id":"5cc03283d07e7f00019404b3",
  "is_homepage":true,
  "page_settings":{

  }
}
```

### Update a Portal Page

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/pages/{id}` |
| Method       | PUT                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/pages/{id} HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Delete a Portal Page

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/pages/{id}` |
| Method       | DELETE                   |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
DELETE /api/portal/pages/{id} HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```
## CSS

### List Portal CSS

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/css`        |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/css HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id": "5ce3b8ffe84526000117899a",
  "org_id": "5cc03283d07e7f00019404b3",
  "page_css": "",
  "email_css": ""
}
```

### Create Portal CSS

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/css`      |
| Method       | POST                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/css HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Update Portal CSS

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/css`      |
| Method       | PUT                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/css HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

## JavaScript

### List Portal JavaScript

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/js`        |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/js HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "id": "5ce3b8ffe84526000117899a",
  "org_id": "5cc03283d07e7f00019404b3",
  "page_js": ""
}
```

### Create Portal JavaScript

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/js`      |
| Method       | POST                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/js HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "page_js": "console.log(1)"
}
```

#### Sample Response

```
{
    "Status": "OK",
    "Message": "5ce3b8ffe84526000117899a",
    "Meta": null
}
```

### Update Portal CSS

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/js`      |
| Method       | PUT                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/js HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8

{
  "id": "5ce3b8ffe84526000117899a",
  "page_js": "console.log(1)"
}
```

#### Sample Response

```
{
    "Status": "OK",
    "Message": "Data updated",
    "Meta": null
}
```

