---
date: 2020-10-30T15:47:05+01:00
title: Moesif Setup
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 3 
url: /tyk-configuration-reference/tyk-pump-configuration/moesif/
---

This is a step by step guide to setting up [Moesif API Analytics](https://www.moesif.com/solutions/track-api-program?language=tyk-api-gateway) to receive logs from the Tyk Pump.

We also have a [blog post](https://tyk.io/tyk-moesif-the-perfect-pairing/) which highlights how Tyk and Moesif work together.

The assumptions are that you have Docker installed and Tyk Pro On-premises already running.
See the [Tyk Pump Configuration]({{< ref "tyk-pump" >}}) for more details.


## Overview 
With the Moesif Tyk plugin, your API logs are sent to Moesif to provide analytics on API traffic along with your API payloads like JSON and XML. Moesif also collects information such as the authenticated user (AliasId or OAuthId) so you’re able to drill into activation funnels and track metrics like active users. An overview on how Moesif and Tyk works together is [available here](https://tyk.io/tyk-moesif-the-perfect-pairing/).

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

### 4. Restart Tyk Pump to pickup the Moesif config

Once your config changes are done, you need to restart your Tyk Pump and Tyk Gateway instances (if you've modified Tyk gateway config). 
If you are running Tyk Pump in Docker:

`$ docker restart tyk-pump`

### 5. PROFIT!

You can now make a few API calls and verify they show up in Moesif.

```bash
$ curl localhost:8080
```
![Step5](img/pump/moesif_step5.png)

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

