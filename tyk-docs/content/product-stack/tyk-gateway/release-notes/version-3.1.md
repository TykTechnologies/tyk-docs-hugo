---
title: Tyk Gateway v3.1
description: "Tyk Gateway 3.1 release notes"
tags: ["release notes", "Tyk Gateway", "v3.1", "3.1"]
aliases:
    - /release-notes/version-3.1/
---

## Release Highlights

#### Identity Management UX and SAML support
You will notice that the experience for creating a new profile in the Identity management section of the dashboard was changed to a ‘wizard’ approach which reduces the time it takes to get started and configure a profile. 
In addition, users are now able to use SAML for the dashboard and portal login, whether you use TIB(Tyk Identity Broker) internally or externally of the dashboard.

This follows the recent changes that we have made to embed TIB (Tyk Identity Broker)in the dashboard. See 3.0 [release notes](https://tyk.io/docs/release-notes/version-3.0/) for more information regarding this. 

To learn more [see the documentation](https://tyk.io/docs/getting-started/tyk-components/identity-broker/)

#### UDG (Universal Data Graph) & GraphQL
##### Schema Validation

For any GraphQL API that is created via Dashboard or through our API, the GraphQL schema is now validated before saving the definition. Instant feedback is returned in case of error.

##### Sync / Update schema with upstream API (Proxy Only Mode)

If you’ve configured just a proxy GraphQL API, you can now keep in sync the upstream schema with the one from the API definition, just by clicking on the `Get latest version` button on the `Schema` tab from API Designer

Docs [here](https://tyk.io/docs/graphql/syncing-schema/)

##### Debug logs

You can now see what responses are being returned by the data sources used while configuring a UDG (universal data graph). These can be seen by calling the `/api/debug` API or using the playground tab within API designer.

The data that will be displayed will show information on the query before and after the request to a data source happens, as follows:

Before the request is sent:

Example log message: "Query.countries: preSendHttpHook executed”. Along with this message, the log entry will contain the following set of fields: Typename, Fieldname and Upstream url;


After the request is sent:

Example log message: "Query.countries: postReceiveHttpHook executed”. Along with this message, the log entry will contain the following set of fields: Typename, Filename, response body, status code.

Example: 

```{"typename": "Query", "fielname": "countries", "response_body": "{\"data\":{}}", "status_code": 200}```

Docs [here](https://tyk.io/docs/graphql/graphql-playground/)

#### Portal
##### GraphQL Documentation

Documentation for the GraphQL APIs that you are exposing to the portal is available now through a GraphQL Playground UI component, same as on the playground tab of API Designer.

Also to overcome the CORS issues that you might encounter while testing documentation pages on the portal, we have pre-filled the CORS settings section in API Designer with explicit values from the start. All you need to do is to check the “Enable CORS” option.

##### Portal - API key is hidden in email
You now have the option to hide the API key in the email generated after you approve the key request for a developer.

[Docs here](https://tyk.io/docs/tyk-developer-portal/key-requests/)


## Changelog
The 3.1 version includes the fixes that are part of 3.0.1. 
https://github.com/TykTechnologies/tyk/releases/tag/v3.0.1


## Updated Versions

- Tyk Gateway 3.1

