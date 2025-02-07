---
aliases:
- /quickstart-configure-first-api
date: 2020-06-24
description: Configure your first API on Tyk Cloud
linkTitle: Getting Started
tags:
- Tyk API Management
- Open Source
- Self-Managed
- Tyk Cloud
- API Gateway
title: Tyk QuickStart Configure Your First API
---


## Overview
This guide helps you get started with Tyk Cloud by covering the basics:

- **Set up your API**: Create and configure a new API in the Tyk Dashboard.
- **Create API keys**: Generate API keys and assign them to your APIs for secure access.
- **Monitor API performance**: Track traffic, logs, and performance analytics.

Follow these steps to quickly create and manage your APIs in Tyk Cloud.

## Prerequisites

Before you begin, make sure you have:
- [A Tyk Cloud account](/getting-started/create-account).
- Admin access to the Tyk Dashboard.
- (optional) A backend service that your API will proxy (e.g., a RESTful API) - or you can use the httpbin service.


## Set Up Your API

Start by creating a new API in Tyk Cloud:

1. **Log in to the Tyk Dashboard**.
2. **Navigate to APIs** and click **Add New API** or **Design From Scratch** button.

  {{< img src="/img/getting-started/create-account-design-from-scratch.png" alt="Create New API" >}}

3. **Configure API Details**:
  - **API Name**: Name your API (e.g., `My First API`).
  - **API Type**: Choose from HTTP, TCP, GraphQL, UDG, or Federation, depending on your use case.
  - **API Style**: Select OpenAPI for standardized HTTP APIs or Classic for flexible configurations and non-HTTP APIs.
  - **Target URL**: Provide the URL of your backend service (e.g., `http://httpbin.org`).

  {{< img src="/img/getting-started/create-new-api.png" alt="Create New API" >}}

4. **Connect to Your Desired Gateway**:

  You will be prompted to choose between a Gateway and an Edge Gateway, which are already created for you.
  - `Edge Gateways` generally provide low-latency, regionally distributed API processing, ideal for a global user base.
  - `Regular Gateways` centralize API management, offering comprehensive API processing without additional edge optimizations.

  {{< img src="/img/getting-started/apis-connect-gateways.png" alt="Connect Gateways" >}}

5. **Configure your API Settings**:

  - **Expiration Date**: An optional config that allows you to set an expiry date for this API, where access will expire after this date. This can be edited at any time.
  - **Gateway Status**: Setting this to `Active` will publish your API and make it public. When in the `Disabled` state, your API will stay in a draft state until you are ready to publish it. This is a required field, for this guide we will set it to `Active`.
  - **Access**: Your API can be set to either `Internal` or `External`, determining whether you want to keep your API accessible only through Tyk or to external services, respectively. This is a required field, for this guide we will set it to `External`.

{{< img src="/img/getting-started/apis-configure-settings-1.png" alt="Configure Settings" >}}

Scrolling down, In the **Upstream** section you can configure settings to control the behaviour of your upstream APIs. 
{{< note success >}}
  **Note**  

  These are not necessary to add now but they are good to explore.
  {{< /note >}}

  - **API Rate Limiting**: Set limits on the number of requests (e.g., 100 requests per minute) to control usage and prevent abuse.
  - **Service Discovery**: Enable dynamic backend discovery with tools like Consul or Kubernetes, ensuring traffic is directed to healthy instances.
  - **Upstream Client Certificates**: Use client certificates for secure backend connections via mutual TLS (mTLS), adding an extra layer of security.
  - **Certificate Public Key Pinning**: Pin specific public keys to validate certificate authenticity and prevent unauthorized access.

  {{< img src="/img/getting-started/apis-configure-settings-2.png" alt="Configure Settings cont" >}}

6. **Configuring the Server section**:

  In the section you can configure Tyk Gateway related settings. Below are some important configurations.
  - **Listen Path**: This is the `path` Tyk API will use to proxy your API requests. So a request made to this URL `https://<tyk-clou-url>/<listen-path>` will be proxied to the upstream URL configured above.
  - **Authentication**: Choose the desired authentication method (e.g., **API Key**).

    {{< img src="/img/getting-started/create-api-select-authentication.png" alt="Add Authentication" >}}

Save your API configuration once complete.

7. **Copy the API URL**
  - When you save the API configuration, Tyk generates a unique Gateway URL that can be used to access your API. Copy this URL, we will use it later during testing.

    {{< img src="/img/getting-started/api-url-provided-by-tyk.png" alt="Tyk API Gateway URL" >}}

## Create an API Key

The Tyk Dashboard provides the simplest way to generate a new API key. Follow these steps:

1. **Select "Keys"** from the **API Security** section and **Click "Add Key"** to generate a new key.
   
   {{< img src="/img/getting-started/create-api-security-key.png" alt="Create API Key" >}}

2. **Add a Policy or API to Your Key**:
   - You can either add your key to an existing **Policy** or assign it to an individual **API**.
   - For this guide, we will assign the key to the `My First API` which we created in the previous step. You can:
     - Scroll through your **API Name list**,
     - Use the **Search field** or **Group by Authentication Type** to filter APIs.
   - Leave all other options at their default settings.

   {{< img src="/img/getting-started/configure-api-key.png" alt="Configure API Key" >}}

4. Click on the **Configuration Tab** and add the below details.
   - **Enable Detailed Logging**: This is optional and disabled by default.
   - **Key Alias**: Assign an alias to your key for easier identification.
   - **Key Expiry**: Set an expiry time from the drop-down list. This is required.
   - **Tags**: Add tags for filtering data in Analytics. Tags are case-sensitive.
   - **Metadata**: Add metadata such as user IDs, which can be used by middleware components.

5. Click **CREATE**:
   - Once the key is created, a **Key successfully generated** pop-up will be displayed showing your key. **Copy the key ID** to your clipboard and save it for future reference as it will not be shown again. And that should result in a successfully generated key!

   {{< img src="/img/getting-started/apis-keys-success.png" alt="Key Success" >}}
  

  {{< note success >}}
  **Note**  

  When creating a key in Tyk, you should copy the key ID. This is the identifier you’ll need for referencing the key in your API requests or configurations. The hash is generally used internally by Tyk and is not required for most user-facing tasks.

  {{< /note >}}
  

## Test Your API

After configuring and deploying your API, it’s essential to test it to ensure it performs as expected. Follow these steps to verify your API setup:

1. **Retrieve Your API Key**:
   - Copy the **API Key ID** from the previous step as you'll need it to authenticate requests to your API.

2. **Make a Test Request**:
   - Use a tool like [Postman](https://www.postman.com/) or `curl` to send a request to your API endpoint.
   - Example request using `curl`:
     ```bash
     curl -H "Authorization: {YOUR_API_KEY_ID}" https://{YOUR_TYK_GATEWAY_URL}/my-first-api/
     ```
   - Replace `{YOUR_API_KEY_ID}` with the actual key ID and `{YOUR_TYK_GATEWAY_URL}` with your gateway's URL.
   - Send the request and you should get HTML output with `200` status code.


## Monitor Traffic and Analyze API Performance

With your API live, monitor its traffic and analyze performance:

### View Traffic Analytics

1. **Navigate to the Monitoring Section** in the dashboard. And click on **Activity Overview**.
2. **View Traffic Metrics**: Review metrics such as request count, response times, and error rates.
3. **Analyze Data**: Use traffic trends to identify performance issues or optimize API behavior.

{{< img src="/img/getting-started/apis-analytics.png" alt="APIs Analytics" >}}


### View Log Data

1. **Go to the Activity Logs Section** of your API.
2. **Search and Filter Logs**: Use filters to drill down by response status, endpoint, or client IP.
3. **Review Detailed Logs**: View full request and response data to troubleshoot issues.

{{< img src="/img/getting-started/api-activity-logs.png" alt="APIs Logs" >}}


## Next Steps

Congratulations! You've successfully created, secured, and deployed your first API in Tyk Cloud. Next, explore more advanced features such as adding [rate limiting]({{< ref "api-management/rate-limit#introduction" >}}) to protect your API from abuse.

Explore more features in your [dashboard]({{< ref "getting-started/using-tyk-dashboard" >}}) to optimize and scale your API offerings.
