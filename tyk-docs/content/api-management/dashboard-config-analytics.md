---
title: "Dashboard - API Traffic Analytics"
date: 2025-01-10
tags: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
description: "How to manage users, teams, permissions, rbac in Tyk Dashboard"
keywords: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
aliases:
---

## Introduction

The Tyk Dashboard provides a full set of analytics functions and graphs that you can use to segment and view your API traffic and activity. The Dashboard offers a great way for you to debug your APIs and quickly pin down where errors might be cropping up and for which clients.

{{< note success >}}
**Note**

In Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) we introduced [User Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) which can be used to limit the visibility of aggregate statistics to users when API Ownership is enabled. Due to the way that the analytics data are aggregated, not all statistics can be filtered by API and so may be inaccessible to users with the Owned Analytics permission.
{{< /note >}}

## How does Tyk capture and process Traffic Analytics?
When a client makes a request to the Tyk Gateway, the details of the request and response are captured and stored in a temporary Redis list. This list is read (and then flushed) every 10 seconds by the [Tyk Pump]({{< ref "tyk-pump" >}}). The Pump processes the records that it has read from Redis and forwards them to the required data sinks using the pumps configured in your system. You can set up multiple pumps and configure them to send different analytics to different data sinks.

The Mongo Aggregate and SQL Aggregate pumps perform aggregation of the raw analytics records before storing the aggregated statistics in the MongoDB or SQL database respectively.

{{< note success >}}
**Note**

Note that you must [enable traffic analytics]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/logging-api-traffic">}}) in your Tyk Gateway so that it will generate analytics records.
{{< /note >}}

### Minimal pump configuration for Tyk Dashboard analytics
For the Tyk Dashboard's analytics functionality to work, you must configure both per request and aggregated pumps for the database platform that you are using
 - if you are using MongoDB, you must configure `mongo` and `mongo_aggregate` pumps
 - if you are using SQL, you must configure `sql` and `sql_aggregate` pumps

### Per-request (raw) analytics
The transaction records contain information about each request and response, such as path or status. The fields captured in each analytics record are included in the [Tyk Pump documentation]({{< ref "tyk-stack/tyk-pump/tyk-analytics-record-fields">}}).

It is also possible to enable [detailed request logging]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording">}}) in the Gateway so that Tyk will log the requests and responses (including payloads) in wire format as base64 encoded data.

These data are displayed in the Log Browser, on the [Activity logs]({{< ref "tyk-stack/tyk-manager/analytics/log-browser">}}) screen in the Tyk Dashboard.

### Aggregated analytics
The [Mongo Aggregate]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config#2-mongo-aggregate-pump">}}) and [SQL Aggregate]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config#2-sql-aggregate-pump">}}) pumps will collate statistics from the analytics records, aggregated by hour, for the following keys:

| Key            |  Analytics aggregated by         | Dashboard screen                                                                              |
|----------------|----------------------------------|-----------------------------------------------------------------------------------------------|
| `APIID`        | API                              | [Activity by API]({{< ref "tyk-dashboard-analytics/traffic-per-api" >}})                      |
| `TrackPath`    | API endpoint                     | [Activity by endpoint]({{< ref "product-stack/tyk-dashboard/advanced-configurations/analytics/activity-by-endpoint" >}}) |
| `ResponseCode` | HTTP status code (success/error) | [Activity by errors]({{< ref "tyk-dashboard-analytics/error-overview" >}})                    |
| `APIVersion`   | API version                      | n/a                                                                                              |
| `APIKey`       | Client access key/token          | [Activity by Key]({{< ref "tyk-dashboard-analytics/traffic-per-token" >}})                    |
| `OauthID`      | OAuth client (if OAuth used)     | [Traffic per OAuth Client]({{< ref "tyk-dashboard-analytics/traffic-per-oauth-client" >}})    |
| `Geo`          | Geographic location of client    | [Activity by location]({{< ref "tyk-stack/tyk-manager/analytics/geographic-distribution" >}}) |
| `Tags`         | Custom session context tags      | n/a                                                                                              |

## API Activity Dashboard

The first screen (and main view) of the Tyk Dashboard will show you an overview of the aggregate usage of your APIs, this view includes the number of hits, the number of errors and the average latency over time for all of your APIs as an average:

{{< img src="/img/2.10/analytics_overview2.png" alt="API Activity Dashboard" >}}

You can toggle the graphs by clicking the circular toggles above the graph to isolate only the stats you want to see.

Use the Start and End dates to set the range of the graph, and the version drop-down to select the API and version you wish to see traffic for.

You can change the granularity of the data by selecting the granularity drop down (in the above screenshot: it is set to “Day”).

The filter by tag option, in a graph view, will enable you to see the graph filtered by any tags you add to the search.

Below the aggregate graph, you’ll see an error breakdown and endpoint popularity chart. These charts will show you the overall error type (and code) for your APIs as an aggregate and the popularity of the endpoints that are being targeted by your clients:

{{< img src="/img/2.10/error_breakdown.png" alt="Error Breakdown and Endpoints" >}}

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Error Breakdown and Endpoint Popularity charts will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

## Activity Logs - Log Browser

When you look through your Dashboard and your error breakdown statistics, you'll find that you will want to drill down to the root cause of the errors. This is what the Log Browser is for.

The Log Browser will isolate individual log lines in your analytics data set and allow you to filter them by:

* API Name
* Token ID (hashed)
* Errors Only
* By Status Code

You will be presented with a list of requests, and their metadata:

{{< img src="/img/2.10/log_browser.png" alt="Log Viewer" >}}

Click a request to view its details.

{{< img src="/img/2.10/log_browser_selected.png" alt="Log Viewer Details" >}}

### Self-Managed Installations Option

In an Self-Managed installation, if you have request and response logging enabled, then you can also view the request payload and the response if it is available.
To enable request and response logging, please take a look at [useful debug modes]({{< ref "api-management/troubleshooting-debugging#capturing-detailed-logs" >}}) .

**A warning on detailed logging:** This mode generates a very large amount of data, and that data exponentially increases the size of your log data set, and may cause problems with delivering analytics in bulk to your MongoDB instances. This mode should only be used to debug your APIs for short periods of time.

{{< note success >}}
**Note**  

Detailed logging is not available for Tyk Cloud Classic customers.
{{< /note >}}

## Activity by API - Traffic per API

To get a tabular view of how your API traffic is performing, you can select the **Activity by API** option in the navigation and see a tabular view of your APIs. This table will list out your APIs by their traffic volume and you'll be able to see when they were last accessed:

{{< img src="/img/2.10/traffic_api.png" alt="Activity per API" >}}

You can use the same range selectors as with the Dashboard view to modify how you see the data. However, granularity and tag views will not work since they do not apply to a tabulated view.

If you select an API name, you will be taken to the drill-down view for that specific API, here you will have a similar Dashboard as you do with the aggregate API Dashboard that you first visit on log in, but the whole view will be constrained to just the single API in question:

{{< img src="/img/2.10/average_use_api.png" alt="Traffic per API: CLosed graph" >}}

You will also see an error breakdown and the endpoint popularity stats for the API:

{{< img src="/img/2.10/error_breakdown_api.png" alt="API error breakdown pie chart" >}}

Tyk will try to normalize endpoint metrics by identifying IDs and UUIDs in a URL string and replacing them with normalized tags, this can help make your analytics more useful. It is possible to configure custom tags in the configuration file of your Tyk Self-Managed or Multi-Cloud installation.

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Error Breakdown and Endpoint Popularity charts will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

## Activity by Key - Traffic per Key

You will often want to see what individual keys are up to in Tyk, and you can do this with the **Activity per Key** section of your analytics Dashboard. This view will show a tabular layout of all keys that Tyk has seen in the range period and provide analytics for them:

{{< img src="/img/dashboard/usage-data/test_alias_key.png" alt="Activity per Token" >}}

You'll notice in the screenshot above that the keys look completely different to the ones you can generate in the key designer (or via the API), this is because, by default, Tyk will hash all keys once they are created in order for them to not be snooped should your key-store be breached.

This poses a problem though, and that is that the keys also no longer have any meaning as analytics entries. You'll notice in the screenshot above, one of the keys is appended by the text **TEST_ALIAS_KEY**. This is what we call an Alias, and you can add an alias to any key you generate and that information will be transposed into your analytics to make the information more human-readable.

The key `00000000` is an empty token, or an open-request. If you have an API that is open, or a request generates an error before we can identify the API key, then it will be automatically assigned this nil value.

If you select a key, you can get a drill down view of the activity of that key, and the errors and codes that the token has generated:

{{< img src="/img/2.10/traffic_by_key.png" alt="Traffic activity by key graph" >}}

{{< img src="/img/2.10/error_by_key.png" alt="Errors by Key" >}}

(The filters in this view will not be of any use except to filter by API Version).

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the <b>Traffic per Key</b> screen will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

## Activity by endpoint

To get a tabular view of how your API traffic is performing at the endpoint level, you can select the Activity by Endpoint option in the navigation and see a tabular view of your API endpoints. This table will list your API endpoints by their traffic volume and you’ll be able to see when they were last accessed:

{{< img src="img/dashboard/analytics/endpoint_popularity.png" alt="Activity by endpoint" >}}

### Controlling which endpoints appear in the analytics data

The aggregate pumps have an option to `track_all_paths` which will ensure that all analytics records generated by the Tyk Gateway will be included in the aggregated statistics on the Endpoint Popularity screen. Set this to `true` to capture all endpoints in the aggregated data and subsequently on the Dashboard page.

You can alternatively select only a subset of the endpoints to include in the aggregated data by setting `track_all_paths` to `false` and identifying specific endpoints to be "tracked". These are identified by the `TrackPath` [flag]({{< ref "tyk-stack/tyk-pump/tyk-analytics-record-fields#trackpath" >}}) being set to `true` in the record. In this configuration, the Pump will only include transaction records from "tracked" endpoints in the aggregated data.

Tyk Gateway will set `TrackPath` to `true` in transaction records generated for endpoints that have the track endpoint middleware enabled.

{{< note success >}}
**Note**  

The *track endpoint* middleware only affects the inclusion of endpoints in the per-endpoint aggregates, it does not have any impact on other [aggregated data]({{< ref "tyk-dashboard-analytics#aggregated-analytics" >}}) nor the [per-request data]({{< ref "tyk-dashboard-analytics#per-request-raw-analytics" >}}).
{{< /note >}}

### Selecting Tyk OAS APIs endpoints to be tracked

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The track endpoint middleware (`trackEndpoint`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `trackEndpoint` object has the following configuration:
 - `enabled`: enable the middleware for the endpoint

For example:
```json {hl_lines=["39-41"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-track-endpoint",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
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
            "name": "example-track-endpoint",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-track-endpoint/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "trackEndpoint": {
                        "enabled": true
                    }               
                }
            }
        }
    }
}
```

In this example the track endpoint middleware has been configured for requests to the `GET /anything` endpoint. These requests will appear in the Endpoint Popularity analytics screen, located within the API Usage section of Tyk Dashboard.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the track endpoint middleware.

#### Configuring the middleware in the API Designer

Adding the track endpoint middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

1. **Add an endpoint**

    From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Track Endpoint middleware**

    Select **ADD MIDDLEWARE** and choose the **Track Endpoint** middleware from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-track.png" alt="Adding the Track Endpoint middleware" >}}

3. **Save the API**

    Select **SAVE API** to apply the changes to your API.

### Selecting Tyk Classic API endpoints to be tracked 
If you are working with Tyk Classic APIs then you must add a new `track_endpoints` object to the `extended_paths` section of your API definition.

The `track_endpoints` object has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method

For example:
```.json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "track_endpoints": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "GET",
            }
        ]
    }
}
```

In this example the track endpoint middleware has been configured for HTTP `GET` requests to the `/anything` endpoint.  These requests will appear in the Endpoint Popularity analytics screen, located within the API Usage section of Tyk Dashboard.

#### Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the track endpoint middleware for your Tyk Classic API by following these steps.

1. **Add an endpoint for the path and select the plugin**

    From the **Endpoint Designer** add an endpoint that matches the path for which you want to allow access. Select the **Track endpoint** plugin.

    {{< img src="img/dashboard/analytics/classic_track_endpoint.png" alt="Select the middleware" >}}

2. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the middleware for the selected endpoint.

## Activity by Location - Geographic Distribution

Tyk will attempt to record GeoIP based information based on your inbound traffic. This requires a MaxMind IP database to be available to Tyk and is limited to the accuracy of that database.

You can view the overview of what the traffic breakdown looks like per country, and then drill down into the per-country traffic view by selecting a country code from the list:

{{< img src="/img/2.10/geographic_dist.png" alt="Geographic Distribution" >}}

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the <b>Geographic Distribution</b> screen will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

### MaxMind Settings

To use a MaxMind database, see [MaxMind Database Settings]({{< ref "tyk-oss-gateway/configuration#analytics_configenable_geo_ip" >}}) in the Tyk Gateway Configuration Options.

## Activity by Error - Error Overview

The error overview page limits the analytics down to errors only, and gives you a detailed look over the range of the number of errors that your APIs have generated. This view is very similar to the Dashboard, but will provide more detail on the error types:

{{< img src="/img/2.10/errors_overview.png" alt="Error Overview" >}}

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Errors by Category data will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

## Activity by Oauth Client - Traffic per OAuth Client

Traffic statistics are available on a per OAuth Client ID basis if you are using the OAuth mode for one of your APIs. To get a breakdown view of traffic aggregated to a Client ID, you will need to go to the **System Management -> APIs** section and then under the **OAuth API**, there will be a button called **OAuth API**. Selecting an OAuth client will then show its aggregate activity

{{< img src="/img/dashboard/system-management/oauthClientNav.png" alt="OAuth Client" >}}

In the API list view – an **OAuth Clients** button will appear for OAuth enabled APIs, use this to browse to the Client ID and the associated analytics for that client ID:

{{< img src="/img/dashboard/system-management/oauthClientAnalytics.png" alt="OAuth Client Analytics Data" >}}

You can view the analytics of individual tokens generated by this Client ID in the regular token view.

{{< note success >}}
**Note**

From Tyk v5.1 (and LTS patches v4.0.14 and v5.0.3) the Traffic per OAuth Client ID charts will not be visible to a user if they are assigned the [Owned Analytics]({{< ref "basic-config-and-security/security/dashboard/user-roles" >}}) permission.
{{< /note >}}

---

