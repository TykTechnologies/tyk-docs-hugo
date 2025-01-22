---
title: "Dashboard - API Governance"
date: 2025-01-10
tags: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
description: "How to manage users, teams, permissions, rbac in Tyk Dashboard"
keywords: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
aliases:
---

## Introduction

## Tyk Classic API Endpoint Designer

Tyk Dashboard's Endpoint Designer provides a graphical environment for the creation and update of your Tyk Classic APIs.

The Endpoint Designer allows to configure all elements of your Tyk Classic API and consists of several tabs, plus a **Raw Definition** view which allows you to directly edit the Tyk Classic API Definition (in JSON format). Note that 

### Core Settings

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-core.png" alt="The Tyk Classic Endpoint Designer - Core Settings tab" >}}

The **Core Settings** tab provides access to configure basic settings for the API:
- [Detailed logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#tyk-classic" >}})
- API Settings including
   - Listen path
   - [API Categories]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories" >}})
- Upstream settings including
   - Upstream service (target) URL
   - [Service Discovery]({{< ref "tyk-self-managed#service-discovery" >}})
- [API Ownership]({{< ref "product-stack/tyk-dashboard/advanced-configurations/user-management/api-ownership" >}})
- [API level rate limiting]({{< ref "basic-config-and-security/control-limit-traffic/rate-limiting#configuring-the-rate-limiter-at-the-api-level" >}})
- [Authentication]({{< ref "/api-management/client-authentication" >}})

### Versions

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-versions.png" alt="The Tyk Classic Endpoint Designer - Versions tab" >}}

The **Versions** tab allows you to create and manage [API versioning]({{< ref "getting-started/key-concepts/versioning" >}}) for the API.

At the top of the Endpoint Designer, you can see which version you are currently editing. If you have more than one option, selecting it from the drop-down will load its endpoint configuration into the editor.

### Endpoint Designer

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-endpoint.png" alt="The Tyk Classic Endpoint Designer - Endpoint Designer tab" >}}

The **Endpoint Designer** is where you can define endpoints for your API so that you can enable and configure Tyk middleware to [perform checks and transformations]({{< ref "advanced-configuration/transform-traffic" >}}) on the API traffic.

In some cases, you will want to set global settings that affect all paths that are managed by Tyk. The **Global Version Settings** section will enable you to configure API-level [request]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic#tyk-classic-api" >}}) and [response]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic#tyk-classic-api" >}}) header transformation.

### Advanced Options

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-advanced.png" alt="The Tyk Classic Endpoint Designer - Advanced Options tab" >}}

The **Advanced Options** tab is where you can configure Tyk's other powerful features including:
- Upstream certificate management
- [API-level caching]({{< ref "basic-config-and-security/reduce-latency/caching/global-cache#configuring-the-cache-via-the-dashboard" >}}) including a button to invalidate (flush) the cache for the API
- [CORS]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}})
- Add custom attributes to the API definition as *config data* that can be accessed by middleware
- Enable [context variables]({{< ref "context-variables" >}}) so that they are extracted from requests and made available to middleware
- Manage *segment tags* if you are working with [sharded gateways]({{< ref "advanced-configuration/manage-multiple-environments/with-tyk-multi-cloud" >}})
- Manage client IP address [allow]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting" >}}) and [block]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting" >}}) lists
- Attach [webhooks]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) that will be triggered for different events

### Uptime Tests

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-uptime.png" alt="The Tyk Classic Endpoint Designer - Uptime Tests tab" >}}

In the **Uptime Tests** tab you can configure Tyk's [Uptime Test]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/uptime-tests" >}}) functionality

### Debugging

{{< img src="/img/dashboard/endpoint-designer/classic-endpoint-designer-debugging.png" alt="The Tyk Classic Endpoint Designer - Debugging tab" >}}

The **Debugging** tab allows you to test your endpoints before you publish or update them. You can also use it for testing any middleware plugins you have implemented. Any debugging you create will persist while still in the current API, enabling you to make changes in the rest of the API settings without losing the debugging scenario.

The Debugging tab consists of the following sections:

- Request
- Response
- Logs

##### Request

{{< img src="/img/2.10/debugging_request.png" alt="Debugging Request" >}}

In this section, you can enter the following information:

- Method - select the method for your test from the drop-down list
- Path - your endpoint to test
- Headers/Body - enter any header information, such as Authorization, etc. Enter any body information. For example, entering user information if creating/updating a user.

Once you have entered all the requested information, click **Run**. Debugging Response and Log information will be displayed:

##### Response

{{< img src="/img/2.10/debugging_results.png" alt="Debugging Response" >}}

The Response section shows the JSON response to your request.

##### Logs

{{< img src="/img/2.10/debugging_logs.png" alt="Debugging Logs" >}}

The debugging level is set to **debug** for the request. This outputs all logging information in the Endpoint Designer. In the Tyk Gateway logs you will see a single request. Any Error messages will be displayed at the bottom of the Logs output.

## API Categories

API categorization is a governance feature provided within the Tyk Dashboard that helps you to manage a portfolio of APIs. You can filter the list of APIs visible in the Dashboard UI or to be returned by the Dashboard API by category. You can assign an API to any number of categories and any number of APIs to a category. All category names are entirely user defined.

### When to use API categories
#### Managing a large portfolio of APIs
As a platform manager looking after a large portfolio of APIs, if I need to make changes to a sub-set of APIs, it's cumbersome having to identify which APIs they are and then to find them one-by-one in the list. If I have assigned categories to my APIs then I can filter quickly and easily to work with that sub-set. What's really powerful is that an API can appear in as many different categories as I like. 

#### Multi-tenant deployment
Multi-tenant deployments with [role-based access control]({{< ref "tyk-dashboard/rbac" >}}) enabled allows an admin user to give different users or groups access to a sub-set of the entire API portfolio. Categories can be aligned with the API ownership rules that you have deployed to allow filtering the list of APIs for those visible to each separate user group/team.

### How API categories work
API categories with Tyk are a very simple concept - you can define any string as a category and then tag the relevant APIs with that string.

Categories might refer to the API's general focus (e.g. 'weather' or 'share prices'); they might relate to geographic location (e.g. 'APAC' or 'EMEA'); they might refer to technical markers (e.g. 'dev', 'test'); or anything else you might need. It's completely up to you.

Categories can be defined, added to and removed from APIs without limitation.

#### Tyk OAS APIs
When a Tyk OAS API is assigned to a category, the category name (string) is appended to a list in the database object where the API definition is stored by Tyk Dashboard. No change is made to the API definition itself.

#### Tyk Classic APIs
When a Tyk Classic API is assigned to a category, the category name (string) is appended to the `name` field in the API definition using a `#` qualifier. For example, let's say you have an API with this (partial) API definition:
``` json
{
    "name": "my-classic-api"  
}
```
You can add it to the `global` and `staging` categories by updating the API definition to:
``` json
{
    "name": "my-classic-api #global #staging"  
}
```
When a Tyk Classic API is migrated from one environment to another using Tyk Sync, it will retain any category labels that it has been assigned.

{{< note success >}}
**Note**  

The use of the `#` qualifier to identify a category prevents the use of `#` in your API names; this is not an issue when working with Tyk OAS APIs.
{{< /note >}}

### Using API categories
API categories can be added and removed from APIs within the [API Designer]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories#api-designer" >}}), via the [Tyk Dashboard API]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories#tyk-dashboard-api" >}}), or via [Tyk Operator]({{< ref "/api-management/automations#what-is-tyk-operator" >}}).

#### API Designer
The API Designer in the Tyk Dashboard UI provides a simple method for assigning APIs to categories, removing categories and filtering the API list by category.

##### Managing categories with Tyk OAS APIs
When working with Tyk OAS APIs, the API Designer has a separate **Access** tab where you can configure the categories to which the API is assigned.
{{< img src="/img/dashboard/endpoint-designer/categories-oas.png" alt="Tyk OAS API Designer" >}} 

You can choose existing categories from the drop-down or define new categories simply by typing in the box. You can also remove the API from a category by clicking on the `x` or deleting the category from the box.
{{< img src="/img/dashboard/endpoint-designer/categories-oas-add.png" alt="Managing categories for a Tyk OAS API" >}}

##### Managing categories with Tyk Classic APIs
When working with Tyk Classic APIs, the API Designer has a box in the **API Settings** section where you can configure the categories to which the API is assigned.
{{< img src="/img/dashboard/endpoint-designer/categories-classic.png" alt="Tyk Classic API Designer" >}} 

You can choose existing categories from the list that appears when you click in the box or you can define new categories simply by typing in the box. You can also remove the API from a category by clicking on the `x` or deleting the category from the box.
{{< img src="/img/dashboard/endpoint-designer/categories-classic-add.png" alt="Managing categories for a Tyk Classic API" >}}

##### Filtering the API list
When you have APIs assigned to categories, you can choose to view only the APIs in a specific category by using the **FILTER BY API CATEGORY** drop-down on the **Created APIs** screen.
{{< img src="/img/dashboard/endpoint-designer/categories-filter.png" alt="View APIs in a category" >}} 

#### Tyk Dashboard API
The [Tyk Dashboard API]({{< ref "tyk-dashboard-api" >}}) provides endpoints to manage categories directly, if you are not using the API Designer.

When working with Tyk OAS APIs, you can manage categories for an API using these endpoints:

| Method | Endpoint path                        | Action                                                                                 |
|--------|--------------------------------------|----------------------------------------------------------------------------------------|
| `PUT`  | `/api/apis/oas/{apiID}/categories`   | Assign a list of categories to the specified API   
| `GET`  | `/api/apis/oas/{apiID}/categories`   | Retrieve the list of categories assigned to the specified API                          |

When working with Tyk Classic APIs, you manage categories for an API by modifying the `name` field in the API definition and then updating the API in Tyk with that using these endpoints:

| Method | Endpoint                             | Action                                                                                 |
|--------|--------------------------------------|----------------------------------------------------------------------------------------|
| `PUT`  | `/api/apis/{apiID}`                  | Update the API definition for the specified API - CRUD category tags in the `name` field |
| `GET`  | `/api/apis/{apiID}`                  | Retrieve the API definition for the specified API - category tags in `name` field      |

These endpoints will return information for categories across all APIs in the system (both Tyk OAS and Tyk Classic):

| Method | Endpoint path                        | Action                                                                                 |
|--------|--------------------------------------|----------------------------------------------------------------------------------------|
| `GET`  | `/api/apis/categories`               | Retrieve a list of all categories defined in the system and the number of APIs in each |
| `GET`  | `/api/apis?category={category_name}` | Retrieve a list of all APIs assigned to the specified category                         |

#### Tyk Operator

You can manage categories using Tyk Operator custom resources. Please refer to [Tyk Operator]({{<ref "/api-management/automations#api-categories">}}) documentation to see how to manage API categories for Tyk OAS APIs and Tyk Classic APIs.

## API Templates

API Templates are an API governance feature provided to streamline the process of creating Tyk OAS APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition.

The default template is a blank API definition; your custom templates will contain some configuration, for example cache configuration or default endpoints with pre-configured middleware. When you create a new API using a custom template, whether importing an OpenAPI document or building the API from scratch in the Tyk API Designer, those elements of the API configuration included in the template will be pre-configured for you.

{{< note success >}}
**Note**  

API Templates are exclusive to [Tyk OAS APIs]({{< ref "getting-started/key-concepts/what-is-an-api-definition#api-definition-types" >}}) and can be managed via the Tyk Dashboard API or within the Tyk Dashboard UI.
{{< /note >}}

### When to use API templates
#### Gateway agnostic API design
When working with OpenAPI described upstream service APIs, your service developers do not need to learn about Tyk. You can create and maintain a suitable suite of templates that contain the Tyk-specific configuration (`x-tyk-api-gateway`) that you require for your externally published API portfolio. Creating an API on Tyk is as simple as importing the OpenAPI document and selecting the correct template. Tyk will combine the OpenAPI description with the template to produce a valid Tyk OAS API.

#### Standardizing API configuration
If you have specific requirements for your external facing APIs - for example authentication, caching or even a healthcheck endpoint - you can define the appropriate API templates so that when APIs are created on Tyk these fields are automatically and correctly configured.

### How API templating works
An API template is a blueprint from which you can build new APIs - it is an incomplete JSON representation of a Tyk OAS API definition that you can use as the starting point when creating a new API on Tyk. There is no limit to how much or how little of the API definition is pre-configured in the template (such that when you choose to create a new API without choosing a template, the blank API definition that you start from is itself a template).

Templates are used only during the creation of an API, they cannot be applied later. Before you can use a template as the basis for an API, you must register the template with Tyk Dashboard.

#### Structure of an API template
An API template asset has the following structure:
 - `id`: a unique string type identifier for the template
 - `kind`: the asset type, which is set to `oas-template`
 - `name`: human-readable name for the template
 - `description`: a short description of the template, that could be used for example to indicate the configuration held within the template
 - `data`: a Tyk OAS API definition, the content of which will be used for templating APIs
 - `_id`: a unique identifier assigned by Tyk when the template is registered in the Dashboard database

#### Creating an API from a template
When you use a template during the [creation]({{< ref "getting-started/using-oas-definitions/create-an-oas-api" >}}) of an API, the fields configured in `data` will be pre-set in your new API. You are able to modify these during and after creation of the template. No link is created between the API and the template, so changes made to the API will not impact the template.

#### Merging with an OpenAPI description or Tyk OAS API definition
When you use a template during the creation of an API where you [import]({{< ref "getting-started/using-oas-definitions/import-an-oas-api" >}}) the OpenAPI document or a full Tyk OAS API definition, the template is combined with the imported OAS description. If the `x-tyk-api-gateway` extension exists in the template, it will be applied to the newly created API.

Where there are clashes between configuration in the OpenAPI description and the template:
 - for maps, such as `paths` and `components`, new keys will be added alongside any existing ones from the template
   - if a key in the OpenAPI description matches one in the template, the OpenAPI description takes precedence
 - for array properties, such as `servers` and `tags`, values in the OpenAPI description will replace those in the template

<hr>

If you're using the API Designer in the Tyk Dashboard UI, then you can find details and examples of how to work with API templates [here]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer" >}}).

If you're using the Tyk Dashboard API, then you can find details and examples of how to work with API templates [here]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api" >}}).

## API Templates - Working with API Templates using the Template Designer

[API Templates]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-overview" >}}) are an API governance feature provided to streamline the process of creating Tyk OAS APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition.

The Tyk Dashboard UI provides the following functionality to support working with API templates:
 - Creating templates
   - [new template]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer#creating-a-new-api-template" >}})
   - [from an existing API]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer#creating-a-template-from-an-existing-api" >}})
 - Using templates
   - [when creating an API]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer#using-a-template-when-creating-a-new-api" >}})
   - [when importing an OpenAPI description or API definition]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer#using-a-template-when-importing-an-openapi-description-or-api-definition" >}})
 - [Managing templates]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer#managing-templates" >}})

API Templates can be found in the **API Templates** section of the **API Management** menu in the Tyk Dashboard. This screen lists all the templates currently registered with Tyk and displays their names and short descriptions. It also gives access to options to create and manage templates.

{{< img src="/img/dashboard/api-assets/api-templates/api-templates-menu.png" alt="API Templates" >}}

{{< note success >}}
**Note**  

API Templates are exclusive to [Tyk OAS APIs]({{< ref "getting-started/key-concepts/what-is-an-api-definition#api-definition-types" >}}).
{{< /note >}}

### Creating templates
API templates can be created starting from a blank template or from an existing API

#### Creating a new API template
To create a template, simply visit the **API Templates** section of the Tyk Dashboard and select **ADD TEMPLATE**.

This will take you to the **Create API Template** screen, where you can configure all aspects of the template.

The template does not need to be a complete or valid API definition however as a minimum:
 - you must give the template a **Name**
 - you must give the template a **Description**

In this example, we have configured just the Name, Description, Gateway Status and Access settings:

{{< img src="/img/dashboard/api-assets/api-templates/create-api-template.png" alt="Configure the template" >}}
 
When you have configured all of the API-level and endpoint-level settings you require, select **SAVE TEMPLATE** to create and register the template with Tyk.

Returning to the **API Template** screen you will see your new template has been added to the list and assigned a unique `id` that can be used to access the template from the [Tyk Dashboard API]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api#structure-of-an-api-template" >}}):

{{< img src="/img/dashboard/api-assets/api-templates/template-created.png" alt="Template has been successfully created" >}}

#### Creating a template from an existing API
You can use an existing API deployed on Tyk as the basis for a new API template - this is a great way to build up a portfolio of standardized APIs once you've got your first one correctly configured.

From the **Created APIs** screen within the **APIs** section of the Tyk Dashboard, select the API that you wish to use as your starting point. In the **ACTIONS** drop-down select the **CREATE API TEMPLATE** option.

{{< img src="/img/dashboard/api-assets/api-templates/create-from-api.png" alt="Select Create API Template" >}}

This will take you to the **Create API Template** screen, where you can configure all aspects of the template.

The template does not need to be a complete or valid API definition however as a minimum:
 - you must give the template a **Name**
 - you must give the template a **Description**

In this example, we have configured the Name and Description. The base API included response header transformation middleware on the `/anything` endpoint and API-level cache configuration, all of which will be configured within the template.

{{< img src="/img/dashboard/api-assets/api-templates/second-template.png" alt="Configure the template" >}}
{{< img src="/img/dashboard/api-assets/api-templates/second-template-cache.png" alt="Cache settings inherited from base API" >}}
{{< img src="/img/dashboard/api-assets/api-templates/second-template-endpoints.png" alt="Endpoint settings inherited from base API" >}}
 
When you have configured all of the API-level and endpoint-level settings you require, select **SAVE TEMPLATE** to create and register the template with Tyk.

Returning to the **API Template** screen you will see your new template has been added to the list and assigned a unique `id` that can be used to access the template from the [Tyk Dashboard API]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api#structure-of-an-api-template" >}}).

{{< img src="/img/dashboard/api-assets/api-templates/second-template-created.png" alt="Template has been successfully created" >}}

### Using templates
API templates are used as the starting point during the creation of a new API. They can be applied in all of the methods supported by Tyk for creating new APIs.

#### Using a template when creating a new API
There are two ways to base a new API, created entirely within the Tyk Dashboard's API Designer, on a template that you've created and registered with Tyk.

You can go from the **API Template** screen - for the template you want to use, select **CREATE API FROM TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/create-api-from-template.png" alt="Select Create API from template" >}}

Or, from the **Created APIs** screen, select **ADD NEW API** as normal and then select the template you want to use from the **API Template** section:
{{< img src="/img/dashboard/api-assets/api-templates/create-api-from-template2.png" alt="Select the template you want to use" >}}

Both of these routes will take you through to the API Designer, where the settings from your API template will be pre-configured.

In this example, we applied "My first template" that we created [here]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer#creating-a-new-api-template" >}}). You can see that the Gateway Status and Access fields have been configured:
{{< img src="/img/dashboard/api-assets/api-templates/created-api.png" alt="The API with template applied" >}}

#### Using a template when importing an OpenAPI description or API definition
From the **Import API** screen, if you select the OpenAPI **type** then you can create an API from an OpenAPI description or Tyk OAS API definition; choose the appropriate method to provide this to the Dashboard:
- paste the JSON into the text editor
- provide a plain text file containing the JSON
- provide a URL to the JSON
{{< img src="/img/dashboard/api-assets/api-templates/import-select-source.png" alt="Options when importing an OpenAPI description" >}} 

After pasting the JSON or locating the file, you can select the template you want to use from the **API Template** section:
{{< img src="/img/dashboard/api-assets/api-templates/import-select-template.png" alt="Select the template you want to use" >}} 

In this example we used this simple OpenAPI description and selected "My second template" that we created [here]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer#creating-a-template-from-an-existing-api" >}}):
``` json  {linenos=true, linenostart=1}
{
  "components": {},
  "info": {
    "title": "my-open-api-document",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://httpbin.org"
    }
  ],
  "paths": {
    "/xml": {
      "get": {
        "operationId": "xmlget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  }
}
```
The API that is created has both `/xml` and `/anything` endpoints defined, with API-level caching configured. You can see the API definition [here](https://gist.github.com/andyo-tyk/5d5cfeda404ce1ba498bbf4b9c105cf0).

### Managing templates
The Dashboard UI allows you to edit and delete templates after they have been created and registered with the Tyk Dashboard

#### Editing a template
You can make changes to a template that has been registered with Tyk from the **API Templates** screen. For the template that you want to modify, simply select **EDIT TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 

This will take you to the **API Template Details** screen where you can view the current template configuration. If you want to make changes, simply select **EDIT** to make the fields editable:
{{< img src="/img/dashboard/api-assets/api-templates/template-editor.png" alt="Modifying the API template" >}} 

Alternatively you can view and modify the raw JSON for the template by selecting **VIEW RAW TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/template-raw-editor.png" alt="Modifying the API template JSON" >}} 

You'll need to select **SAVE TEMPLATE** to apply your changes from either screen.

#### Deleting a template
You can delete a template from your Tyk Dashboard from the **API Template Details** screen. This screen can be accessed by selecting the template from the **API Templates** screen (either by clicking on the template name, or selecting **EDIT TEMPLATE** from the **ACTIONS** menu):
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 

From the **API Template Details** screen you can select **DELETE TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/delete-template.png" alt="Deleting the API template" >}} 

{{< note success >}}
**Note**  

You will be asked to confirm the deletion, because this is irrevocable. Once confirmed, the template will be removed from the database and cannot be recovered.
{{< /note >}}

## API Templates - Working with API Templates using the Dashboard API

[API Templates]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-overview" >}}) are an API governance feature provided to streamline the process of creating Tyk OAS APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition.

The Tyk Dashboard API provides the following functionality to support working with API templates:
 - [registering a template with Tyk Dashboard]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api#registering-a-template-with-tyk-dashboard" >}})
 - [applying a template when creating an API from an OpenAPI document]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api#applying-a-template-when-creating-an-api-from-an-openapi-document" >}})
 - [applying a template when creating an API from a Tyk OAS API definition]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api#applying-a-template-when-creating-an-api-from-a-tyk-oas-api-definition" >}})

{{< note success >}}
**Note**  

API Templates are exclusive to [Tyk OAS APIs]({{< ref "getting-started/key-concepts/what-is-an-api-definition#api-definition-types" >}}).
{{< /note >}}

### Structure of an API template
An API template asset has the following structure:
 - `id`: a unique string type identifier for the template
 - `kind`: the asset type, which is set to `oas-template`
 - `name`: human-readable name for the template
 - `description`: a short description of the template, that could be used for example to indicate the configuration held within the template
 - `data`: a Tyk OAS API definition, the content of which will be used for templating APIs
 - `_id`: a unique identifier assigned by Tyk when the template is registered in the Dashboard database

### Registering a template with Tyk Dashboard
To register an API template with Tyk, you pass the asset in the body of a `POST` request to the dashboard's `/api/assets` endpoint.

For example, if you send this command to the endpoint:
``` bash {linenos=true, linenostart=1}
curl --location 'http://localhost:3000/api/assets' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer d9957aff302b4f5e5596c86a685e63d8' \
--data '{
  "kind": "oas-template",
  "name": "my-template",
  "description": "My first template",
  "id": "my-unique-template-id",
  "data": {
    "info": {
      "title": "",
      "version": ""
    },
    "openapi": "3.0.3",
    "paths": {
      "/anything": {
        "post": {
          "operationId": "anythingpost",
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      }
    },
    "x-tyk-api-gateway": {
      "middleware": {
        "global": {
          "cache": {
            "enabled": true,
            "timeout": 5,
            "cacheAllSafeRequests": true
          }
        },
        "operations": {
          "anythingpost": {
            "requestSizeLimit": {
              "enabled": true,
              "value": 100
            }
          }
        }
      }
    }
  }
}'
```

Tyk will respond with `HTTP 201 Created` and will provide this payload in response:
``` json
{
    "Status": "success",
    "Message": "asset created",
    "Meta": "65e8c352cb71918520ff660c",
    "ID": "my-unique-template-id"
}
```

Here `Meta` contains the database ID (where the asset has been registered in the persistent storage) and `ID` contains the unique identifier for the template. This unique identifier will be automatically generated by Tyk if none was provided in the `id` of the template asset provided in the `curl` request.

### Applying a template when creating an API from an OpenAPI document
When creating an API on Tyk using an OpenAPI document describing your upstream service, you can use the `/apis/oas/import` endpoint to import the OpenAPI description and apply it to your API.

If you have a template registered with your Dashboard, you can use this as the starting point for your new API. Tyk will combine the OpenAPI document with the template, automating the configuration of any element in the Tyk OAS API definition as defined in your chosen template.

You'll need to identify the template to be used during the import. You can use either its unique `id` or the database ID that was assigned when the template was [registered with Tyk Dashboard]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api#registering-a-template-with-tyk-dashboard" >}}). You provide either the `id` or `_id ` in the `templateID` query parameter in the call to `/oapis/oas/import`.

For example:
``` bash  {linenos=true, linenostart=1}
curl --location 'http://localhost:3000/api/apis/oas/import?templateID=my-unique-template-id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <DASHBOARD_SECRET>' \
--data '{
  "components": {},
  "info": {
    "title": "my-open-api-document",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://httpbin.org"
    }
  ],
  "paths": {
    "/xml": {
      "get": {
        "operationId": "xmlget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  }
}'
```
Tyk will respond with `HTTP 200 OK` and will provide this payload in response:
``` json
{
    "Status": "OK",
    "Message": "API created",
    "Meta": "65e8c4f4cb71918520ff660d",
    "ID": "970560005b564c4755f1db51ca5660e6"
}
```

Here `Meta` contains the database ID (where the API has been registered in the persistent storage) and `ID` contains the unique identifier for the API. This unique identifier will be automatically generated by Tyk as none was provided in the `id` field of the `x-tyk-api-gateway.info` field provided in the `curl` request.

The new Tyk OAS API will have this definition, combining the OpenAPI description provided in the body of the `curl` request with the template with Id `my-unique-template-id`:
``` json  {linenos=true, linenostart=1}
{
  "info": {
    "title": "my-open-api-document",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://localhost:8181/"
    },
    {
      "url": "http://httpbin.org"
    }
  ],
  "security": [],
  "paths": {
    "/anything": {
      "post": {
        "operationId": "anythingpost",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/xml": {
      "get": {
        "operationId": "xmlget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {}
  },
  "x-tyk-api-gateway": {
    "info": {
      "dbId": "65e8c4f4cb71918520ff660d",
      "id": "970560005b564c4755f1db51ca5660e6",
      "orgId": "65d635966ec69461e0e7ee52",
      "name": "my-open-api-document",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "middleware": {
      "global": {
        "cache": {
          "cacheResponseCodes": [],
          "cacheByHeaders": [],
          "timeout": 5,
          "cacheAllSafeRequests": true,
          "enabled": true
        }
      },
      "operations": {
        "anythingpost": {
          "requestSizeLimit": {
            "enabled": true,
            "value": 100
          }
        }
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/"
      }
    },
    "upstream": {
      "url": "http://httpbin.org"
    }
  }
}
```
Note that the `GET /xml` endpoint from the OpenAPI description and the `POST /anything` endpoint from the template (complete with `requestSizeLimit` middleware) have both been defined in the API definition. API-level caching has been enabled, as configured in the template. Tyk has included the `server` entry from the OpenAPI description (which points to the upstream server) and added the API URL on Tyk Gateway ([as explained here]({{< ref "getting-started/key-concepts/servers#import-oas-definition" >}})).

### Applying a template when creating an API from a Tyk OAS API definition
When creating an API using a complete Tyk OAS API definition (which includes `x-tyk-api-gateway`), you can use the `/apis/oas` endpoint to import the API defintiion.

If you have a template registered with your Dashboard, you can use this as the starting point for your new API. Tyk will combine the API definition with the template, automating the configuration of any element defined in your chosen template.

You'll need to identify the template to be used during the import. You can use either its unique `id` or the database ID that was assigned when the template was [registered with Tyk Dashboard]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api#registering-a-template-with-tyk-dashboard" >}}). You provide either the `id` or `_id` in the `templateID` query parameter in the call to `/apis/oas`.

For example:
``` bash  {linenos=true, linenostart=1}
curl --location 'http://localhost:3000/api/apis/oas?templateID=my-unique-template-id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <DASHBOARD_SECRET>' \
--data '{
  "components": {},  
  "info": {
    "title": "example-api",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "paths": {
    "/json": {
      "get": {
        "operationId": "jsonget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "example-api",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/example-api/"
      }
    },    
    "middleware": {
      "operations": {
        "jsonget": {
          "transformResponseHeaders": {
            "enabled": true,
            "add": [
              {
                "name": "X-Foo",
                "value": "bar"
              }
            ]
          }
        }
      }
    }
  }
}'
```
Tyk will respond with `HTTP 200 OK` and will provide this payload in response:
``` json
{
    "Status": "OK",
    "Message": "API created",
    "Meta": "65e98ca5cb71918520ff6616",
    "ID": "b8b693c5e28a49154659232ca615a7e8"
}
```

Here `Meta` contains the database ID (where the API has been registered in the persistent storage) and `ID` contains the unique identifier for the API. This unique identifier will be automatically generated by Tyk as none was provided in the `id` field of the `x-tyk-api-gateway.info` field provided in the `curl` request.

The new Tyk OAS API will have this definition, combining the Tyk OAS API definition provided in the body of the `curl` request with the template with Id `my-unique-template-id`:

``` json  {linenos=true, linenostart=1}
{
  "info": {
    "title": "example-api",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "servers": [
    {
      "url": "http://localhost:8181/example-api/"
    }
  ],
  "security": [],
  "paths": {
    "/anything": {
      "post": {
        "operationId": "anythingpost",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/json": {
      "get": {
        "operationId": "jsonget",
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {}
  },
  "x-tyk-api-gateway": {
    "info": {
      "dbId": "65e98ca5cb71918520ff6616",
      "id": "b8b693c5e28a49154659232ca615a7e8",
      "orgId": "65d635966ec69461e0e7ee52",
      "name": "example-api",
      "state": {
        "active": true,
        "internal": false
      }
    },
    "middleware": {
      "global": {
        "cache": {
          "cacheResponseCodes": [],
          "cacheByHeaders": [],
          "timeout": 5,
          "cacheAllSafeRequests": true,
          "enabled": true
        }
      },
      "operations": {
        "anythingpost": {
          "requestSizeLimit": {
            "enabled": true,
            "value": 100
          }
        },
        "jsonget": {
          "transformResponseHeaders": {
            "enabled": true,
            "add": [
              {
                "name": "X-Foo",
                "value": "bar"
              }
            ]
          }
        }
      }
    },
    "server": {
      "listenPath": {
        "strip": true,
        "value": "/example-api/"
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    }
  }
}
```
Note that the `GET /json` endpoint from the OpenAPI description and the `POST /anything` endpoint from the template (complete with `requestSizeLimit` middleware) have both been defined in the API definition. API-level caching has been enabled, as configured in the template.

