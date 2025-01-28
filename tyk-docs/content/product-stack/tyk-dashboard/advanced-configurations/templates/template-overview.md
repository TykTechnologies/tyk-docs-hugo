---
title: API Templates
date: 2024-03-04
description: "Using API Templates with Tyk"
tags: ["template", "templating", "governance", "API governance", "create", "manage", "Tyk OAS", "Tyk OAS API"]
---

API Templates are an API governance feature provided to streamline the process of creating Tyk OAS APIs. An API template is an asset managed by Tyk Dashboard that is used as the starting point - a blueprint - from which you can create a new Tyk OAS API definition.

The default template is a blank API definition; your custom templates will contain some configuration, for example cache configuration or default endpoints with pre-configured middleware. When you create a new API using a custom template, whether importing an OpenAPI document or building the API from scratch in the Tyk API Designer, those elements of the API configuration included in the template will be pre-configured for you.

{{< note success >}}
**Note**  

API Templates are exclusive to [Tyk OAS APIs]({{< ref "api-management/gateway-config-introduction#api-definition-types" >}}) and can be managed via the Tyk Dashboard API or within the Tyk Dashboard UI.
{{< /note >}}

## When to use API templates
#### Gateway agnostic API design
When working with OpenAPI described upstream service APIs, your service developers do not need to learn about Tyk. You can create and maintain a suitable suite of templates that contain the Tyk-specific configuration (`x-tyk-api-gateway`) that you require for your externally published API portfolio. Creating an API on Tyk is as simple as importing the OpenAPI document and selecting the correct template. Tyk will combine the OpenAPI description with the template to produce a valid Tyk OAS API.

#### Standardizing API configuration
If you have specific requirements for your external facing APIs - for example authentication, caching or even a healthcheck endpoint - you can define the appropriate API templates so that when APIs are created on Tyk these fields are automatically and correctly configured.

## How API templating works
An API template is a blueprint from which you can build new APIs - it is an incomplete JSON representation of a Tyk OAS API definition that you can use as the starting point when creating a new API on Tyk. There is no limit to how much or how little of the API definition is pre-configured in the template (such that when you choose to create a new API without choosing a template, the blank API definition that you start from is itself a template).

Templates are used only during the creation of an API, they cannot be applied later. Before you can use a template as the basis for an API, you must register the template with Tyk Dashboard.

### Structure of an API template
An API template asset has the following structure:
 - `id`: a unique string type identifier for the template
 - `kind`: the asset type, which is set to `oas-template`
 - `name`: human-readable name for the template
 - `description`: a short description of the template, that could be used for example to indicate the configuration held within the template
 - `data`: a Tyk OAS API definition, the content of which will be used for templating APIs
 - `_id`: a unique identifier assigned by Tyk when the template is registered in the Dashboard database

### Creating an API from a template
When you use a template during the [creation]({{< ref "getting-started/using-oas-definitions/create-an-oas-api" >}}) of an API, the fields configured in `data` will be pre-set in your new API. You are able to modify these during and after creation of the template. No link is created between the API and the template, so changes made to the API will not impact the template.

### Merging with an OpenAPI description or Tyk OAS API definition
When you use a template during the creation of an API where you [import]({{< ref "getting-started/using-oas-definitions/import-an-oas-api" >}}) the OpenAPI document or a full Tyk OAS API definition, the template is combined with the imported OAS description. If the `x-tyk-api-gateway` extension exists in the template, it will be applied to the newly created API.

Where there are clashes between configuration in the OpenAPI description and the template:
 - for maps, such as `paths` and `components`, new keys will be added alongside any existing ones from the template
   - if a key in the OpenAPI description matches one in the template, the OpenAPI description takes precedence
 - for array properties, such as `servers` and `tags`, values in the OpenAPI description will replace those in the template

<hr>

If you're using the API Designer in the Tyk Dashboard UI, then you can find details and examples of how to work with API templates [here]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-designer" >}}).

If you're using the Tyk Dashboard API, then you can find details and examples of how to work with API templates [here]({{< ref "product-stack/tyk-dashboard/advanced-configurations/templates/template-api" >}}).
