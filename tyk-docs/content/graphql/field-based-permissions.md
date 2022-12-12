---
title: "Field Based Permissions"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 2
aliases:
    - /graphql/field-based-permissions/
---

You may want to allow different consumers access to your GraphQL API without exposing all data to them. So for example this could be a schema for a GraphQL API:

```
type Query {
  accounts: [Account!]
}

type Account {
  owner: String!
  number: ID!
  balance: Float!
}
```

For one type of consumer, it will be fine to query all data the schema exposes, while for another type of consumer it should not be allowed to retrieve the `balance` for example.

Field access can be restricted by setting up *field based permissions* in a policy or directly on a key.

When a field is restricted and used in a GraphQL operation, the consumer will receive an error response (*400 Bad Request*):

```
{
    "errors": [
        {
            "message": "field: balance is restricted on type: Account"
        }
    ]
}
```
## Field based permissions with the list of allowed types
Field access can be restricted by setting up an allowed types list in a policy or directly on a key. If new fields are added to the GraphQL schema, you don't need to update the field-based permissions. This is because the fields that are not in the list of allowed types are automatically access-restricted.

First, you need to learn [how to create a security policy with the API]({{< ref "/getting-started/create-security-policy/#tutorial-create-a-security-policy-with-the-api" >}}) or [how to create an API Key with the API]({{< ref "/getting-started/create-security-policy/#tutorial-create-a-security-policy-with-the-api" >}}).

Once you learn how to utilise the API to create a security policy or key, you can use the following snippet:

```
{
    "access_rights": {
        "{API-ID}": {
            "api_id": "{API-ID}",
            "api_name": "{API-NAME}",
            "allowed_types": [
                {
                    "name": "Query",
                    "fields": ["accounts"]
                },
                {
                    "name": "Account",
                    "fields": ["owner"]
                }
            ]
        }
    }
}
```
With this configuration, a consumer can only access the field called the `owner`. When any other fields are used in a GraphQL operation, the consumer will receive an error response *(400 Bad Request)*: 

```
{
    "errors": [
        {
            "message": "field: balance is restricted on type: Account"
        }
    ]
}
```
It's important to note that once you set a list of allowed types, Tyk will use this list to control access rights and disable the list of restricted types. The same behaviour will occur if an asterisk operator is used to control access.

## Allow or restrict all fields with the asterisk operator

You can allow or restrict all fields of a type by using an asterisk (*) operator. Any new fields of that type will be allowed or blocked by default. For example: 

```
{
    "access_rights": {
        "{API-ID}": {
            "api_id": "{API-ID}",
            "api_name": "{API-NAME}",
            "allowed_types": [
                {
                    "name": "Query",
                    "fields": ["*"]
                },
                {
                    "name": "Account",
                    "fields": ["*"]
                }
            ]
        }
    }
}
```
With this configuration, the consumers are allowed to access all current and future fields of the `Query` and `Account` types. Please note that the asterisk operator does not work recursively. For example, in the example below, the asterisk operator only allows access to fields of the `Query` type. Fields of the `Account` type remain restricted.

```
{
    "access_rights": {
        "{API-ID}": {
            "api_id": "{API-ID}",
            "api_name": "{API-NAME}",
            "allowed_types": [
                {
                    "name": "Query",
                    "fields": ["*"]
                }
            ]
        }
    }
}
```
The asterisk operator also works for the list of restricted types:  

```
{
    "access_rights": {
        "{API-ID}": {
            "api_id": "{API-ID}",
            "api_name": "{API-NAME}",
            "restricted_types": [
                {
                    "name": "Query",
                    "fields": ["accounts"]
                },
                {
                    "name": "Account",
                    "fields": ["*"]
                }
            ]
        }
    }
}
```

The configuration above restricts access to all fields of the `Account` type. 

Please note that the list of allowed types overrides the list of restricted types.



## Setup field based permissions in Dashboard

Currently only restricted types and fields can be set up via Tyk Dashboard. Support for allowed types in Tyk Dashboard is coming soon.

1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
3. Select your GraphQL API (marked as *GraphQL*).
4. Enable **Field-Based Permissions** for the selected API.
5. By default all *Types* and *Fields* will be checked. By unchecking a *Type* or *Field* you will disallow to use it for any GraphQL operation associated with the key.

![field-based-permissions](/img/dashboard/system-management/field_based_permissions.png)
