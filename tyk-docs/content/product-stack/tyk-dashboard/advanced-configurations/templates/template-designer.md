---
title: Working with API Templates using the Template Designer
date: 2024-03-04
description: "Using API Templates with Tyk"
tags: ["template", "templating", "governance", "API governance", "create", "manage", "Tyk OAS", "Tyk OAS API", "Template Designer"]
---

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

## Creating templates
API templates can be created starting from a blank template or from an existing API

### Creating a new API template
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

### Creating a template from an existing API
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

## Using templates
API templates are used as the starting point during the creation of a new API. They can be applied in all of the methods supported by Tyk for creating new APIs.

### Using a template when creating a new API
There are two ways to base a new API, created entirely within the Tyk Dashboard's API Designer, on a template that you've created and registered with Tyk.

You can go from the **API Template** screen - for the template you want to use, select **CREATE API FROM TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/create-api-from-template.png" alt="Select Create API from template" >}}

Or, from the **Created APIs** screen, select **ADD NEW API** as normal and then select the template you want to use from the **API Template** section:
{{< img src="/img/dashboard/api-assets/api-templates/create-api-from-template2.png" alt="Select the template you want to use" >}}

Both of these routes will take you through to the API Designer, where the settings from your API template will be pre-configured.

In this example, we applied "My first template" that we created [here]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer#creating-a-new-api-template" >}}). You can see that the Gateway Status and Access fields have been configured:
{{< img src="/img/dashboard/api-assets/api-templates/created-api.png" alt="The API with template applied" >}}

### Using a template when importing an OpenAPI description or API definition
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

## Managing templates
The Dashboard UI allows you to edit and delete templates after they have been created and registered with the Tyk Dashboard

### Editing a template
You can make changes to a template that has been registered with Tyk from the **API Templates** screen. For the template that you want to modify, simply select **EDIT TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 

This will take you to the **API Template Details** screen where you can view the current template configuration. If you want to make changes, simply select **EDIT** to make the fields editable:
{{< img src="/img/dashboard/api-assets/api-templates/template-editor.png" alt="Modifying the API template" >}} 

Alternatively you can view and modify the raw JSON for the template by selecting **VIEW RAW TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/template-raw-editor.png" alt="Modifying the API template JSON" >}} 

You'll need to select **SAVE TEMPLATE** to apply your changes from either screen.

### Deleting a template
You can delete a template from your Tyk Dashboard from the **API Template Details** screen. This screen can be accessed by selecting the template from the **API Templates** screen (either by clicking on the template name, or selecting **EDIT TEMPLATE** from the **ACTIONS** menu):
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 
{{< img src="/img/dashboard/api-assets/api-templates/edit-template.png" alt="Accessing the API template" >}} 

From the **API Template Details** screen you can select **DELETE TEMPLATE** from the **ACTIONS** menu:
{{< img src="/img/dashboard/api-assets/api-templates/delete-template.png" alt="Deleting the API template" >}} 

{{< note success >}}
**Note**  

You will be asked to confirm the deletion, because this is irrevocable. Once confirmed, the template will be removed from the database and cannot be recovered.
{{< /note >}}
