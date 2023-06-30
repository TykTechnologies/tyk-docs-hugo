---
date: 2023-06-14T15:47:05+01:00
title: Moesif Setup
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 3 
---

This is a step by step guide to setting up [Moesif API Analytics and Monetization platform](https://www.moesif.com/solutions/track-api-program?language=tyk-api-gateway&utm_medium=docs&utm_campaign=partners&utm_source=tyk) to understand [customer API usage](https://www.moesif.com/features/api-analytics?utm_medium=docs&utm_campaign=partners&utm_source=tyk) and [setup usage-based billing](https://www.moesif.com/solutions/metered-api-billing?utm_medium=docs&utm_campaign=partners&utm_source=tyk).

We also have a [blog post](https://tyk.io/tyk-moesif-the-perfect-pairing/) which highlights how Tyk and Moesif work together.

The assumptions are that you have Docker installed and Tyk Self-Managed already running.
See the [Tyk Pump Configuration]({{< ref "tyk-pump" >}}) for more details.


## Overview 
With the Moesif Tyk plugin, your API logs are sent to Moesif asynchronously to provide analytics on customer API usage along with your API payloads like JSON and XML. This plugin also enables you to monetize your API with [billing meters](https://www.moesif.com/solutions/metered-api-billing?utm_medium=docs&utm_campaign=partners&utm_source=tyk) and provide a self-service onboarding experience. Moesif also collects information such as the authenticated user (AliasId or OAuthId) to identify customers using your API. An overview on how Moesif and Tyk works together is [available here](https://tyk.io/tyk-moesif-the-perfect-pairing/).

### 1. Get a Moesif Application Id

Go to [www.moesif.com](https://www.moesif.com/?language=tyk-api-gateway) and sign up for a free account. 
Application Ids are write-only API keys specific to an application in Moesif such as “Development” or “Production”. You can always create more applications in Moesif. 

### 2. Enable Moesif backend in Tyk Pump

Add Moesif as an analytics backend along with your Moesif Application Id you obtained in the last step to your [Tyk Pump](https://github.com/TykTechnologies/tyk-pump) Configuration

###### JSON / Conf File
```json
{
    "pumps": {
        "moesif": {
            "name": "moesif",
            "meta": {
            "application_id": "Your Moesif Application Id"
            }
        }
    }
}
```

###### Env Variables:
```
TYK_PMP_PUMPS_MOESIF_TYPE=moesif
TYK_PMP_PUMPS_MOESIF_META_APPLICATIONID=your_moesif_application_id
```

### 3. Ensure analytics is enabled
If you want to log HTTP headers and body, ensure the [detailed analytics recording](https://tyk.io/docs/analytics-and-reporting/useful-debug-modes/) flag is set to true in your [Tyk Gateway Conf](https://tyk.io/docs/tyk-oss-gateway/configuration/)

###### JSON / Conf File

```json
{
    "enable_analytics" : true,
    "analytics_config": {
      "enable_detailed_recording": true
    }
}
```

###### Env Variables:
```conf
TYK_GW_ENABLEANALYTICS=true
TYK_GW_ANALYTICSCONFIG_ENABLEDETAILEDRECORDING=true
```
{{< note success >}}
**Note**  

This will enable detailed recording for all APIs, overriding the one at API configuration level, it requires the Gateway to be restarted.
{{< /note >}}
### 4. Restart Tyk Pump to pickup the Moesif config

Once your config changes are done, you need to restart your Tyk Pump and Tyk Gateway instances (if you've modified Tyk gateway config). 
If you are running Tyk Pump in Docker:

`$ docker restart tyk-pump`

### 5. PROFIT!

You can now make a few API calls and verify they show up in Moesif.

```bash
$ curl localhost:8080
```
{{< img src="/img/pump/moesif_step5.png" alt="Step5" >}}

The Moesif Tyk integration automatically maps a [Tyk Token Alias](https://tyk.io/simpler-usage-tracking-token-aliases-tyk-cloud/) to a user id in Moesif. With a Moesif SDK, you can store additional customer demographics to break down API usage by customer email, company industry, and more.

## Configuration options

The Tyk Pump for Moesif has a few configuration options that can be set in your `pump.env`:

|Parameter|Required|Description|Environment Variable|
|---------|---------|-----------|-----------|
|application_id|required|Moesif Application Id. Multiple Tyk api_id's will be logged under the same app id.|TYK_PMP_PUMPS_MOESIF_META_APPLICATIONID|
|request_header_masks|optional|Mask a specific request header field. Type: String Array [] string|TYK_PMP_PUMPS_MOESIF_META_REQUESTHEADERMASKS|
|request_body_masks|optional|Mask a specific - request body field. Type: String Array [] string| TYK_PMP_PUMPS_MOESIF_META_REQUESTBODYMASKS |
|response_header_masks|optional|Mask a specific response header field. Type: String Array [] string|TYK_PMP_PUMPS_MOESIF_META_RESPONSEHEADERMASKS|
|response_body_masks|optional|Mask a specific response body field. Type: String Array [] string|TYK_PMP_PUMPS_MOESIF_META_RESPONSEBODYMASKS|
|disable_capture_request_body|optional|Disable logging of request body. Type: Boolean. Default value is false.|TYK_PMP_PUMPS_MOESIF_META_DISABLECAPTUREREQUESTBODY|
|disable_capture_response_body|optional|Disable logging of response body. Type: Boolean. Default value is false.|TYK_PMP_PUMPS_MOESIF_META_DISABLECAPTURERESPONSEBODY|
|user_id_header|optional|Field name to identify User from a request or response header. Type: String. Default maps to the token alias|TYK_PMP_PUMPS_MOESIF_META_USERIDHEADER|
|company_id_header|optional|Field name to identify Company (Account) from a request or response header. Type: String|TYK_PMP_PUMPS_MOESIF_META_COMPANYIDHEADER|

## Identifying users
By default, the plugin wil collect the authenticated user (AliasId or OAuthId) to identify the customer. This can be overridden by setting the `user_id_header` to a header that contains your API user/consumer id such as `X-Consumer-Id`. You can also set the `company_id_header` which contains the company to link the user to. [See Moesif docs on identifying customers](https://www.moesif.com/docs/getting-started/identify-customers/?utm_medium=docs&utm_campaign=partners&utm_source=tyk)
