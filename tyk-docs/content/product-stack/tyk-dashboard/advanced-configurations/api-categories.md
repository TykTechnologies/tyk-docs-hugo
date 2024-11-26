---
title: API Categories
date: 2024-03-04
description: "Using API categories with Tyk"
tags: ["category", "categories", "governance", "API governance"]
---

API categorization is a governance feature provided within the Tyk Dashboard that helps you to manage a portfolio of APIs. You can filter the list of APIs visible in the Dashboard UI or to be returned by the Dashboard API by category. You can assign an API to any number of categories and any number of APIs to a category. All category names are entirely user defined.

## When to use API categories
#### Managing a large portfolio of APIs
As a platform manager looking after a large portfolio of APIs, if I need to make changes to a sub-set of APIs, it's cumbersome having to identify which APIs they are and then to find them one-by-one in the list. If I have assigned categories to my APIs then I can filter quickly and easily to work with that sub-set. What's really powerful is that an API can appear in as many different categories as I like. 

#### Multi-tenant deployment
Multi-tenant deployments with [role-based access control]({{< ref "tyk-dashboard/rbac" >}}) enabled allows an admin user to give different users or groups access to a sub-set of the entire API portfolio. Categories can be aligned with the API ownership rules that you have deployed to allow filtering the list of APIs for those visible to each separate user group/team.

## How API categories work
API categories with Tyk are a very simple concept - you can define any string as a category and then tag the relevant APIs with that string.

Categories might refer to the API's general focus (e.g. 'weather' or 'share prices'); they might relate to geographic location (e.g. 'APAC' or 'EMEA'); they might refer to technical markers (e.g. 'dev', 'test'); or anything else you might need. It's completely up to you.

Categories can be defined, added to and removed from APIs without limitation.

### Tyk OAS APIs
When a Tyk OAS API is assigned to a category, the category name (string) is appended to a list in the database object where the API definition is stored by Tyk Dashboard. No change is made to the API definition itself.

### Tyk Classic APIs
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

## Using API categories
API categories can be added and removed from APIs within the [API Designer]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories#api-designer" >}}), via the [Tyk Dashboard API]({{< ref "product-stack/tyk-dashboard/advanced-configurations/api-categories#tyk-dashboard-api" >}}), or via [Tyk Operator]({{< ref "/api-management/automations#what-is-tyk-operator" >}}).

### API Designer
The API Designer in the Tyk Dashboard UI provides a simple method for assigning APIs to categories, removing categories and filtering the API list by category.

#### Managing categories with Tyk OAS APIs
When working with Tyk OAS APIs, the API Designer has a separate **Access** tab where you can configure the categories to which the API is assigned.
{{< img src="/img/dashboard/endpoint-designer/categories-oas.png" alt="Tyk OAS API Designer" >}} 

You can choose existing categories from the drop-down or define new categories simply by typing in the box. You can also remove the API from a category by clicking on the `x` or deleting the category from the box.
{{< img src="/img/dashboard/endpoint-designer/categories-oas-add.png" alt="Managing categories for a Tyk OAS API" >}}

#### Managing categories with Tyk Classic APIs
When working with Tyk Classic APIs, the API Designer has a box in the **API Settings** section where you can configure the categories to which the API is assigned.
{{< img src="/img/dashboard/endpoint-designer/categories-classic.png" alt="Tyk Classic API Designer" >}} 

You can choose existing categories from the list that appears when you click in the box or you can define new categories simply by typing in the box. You can also remove the API from a category by clicking on the `x` or deleting the category from the box.
{{< img src="/img/dashboard/endpoint-designer/categories-classic-add.png" alt="Managing categories for a Tyk Classic API" >}}

#### Filtering the API list
When you have APIs assigned to categories, you can choose to view only the APIs in a specific category by using the **FILTER BY API CATEGORY** drop-down on the **Created APIs** screen.
{{< img src="/img/dashboard/endpoint-designer/categories-filter.png" alt="View APIs in a category" >}} 

### Tyk Dashboard API
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

### Tyk Operator

You can manage categories using Tyk Operator custom resources. Please refer to [Tyk Operator]({{<ref "/api-management/automations#api-categories">}}) documentation to see how to manage API categories for Tyk OAS APIs and Tyk Classic APIs.